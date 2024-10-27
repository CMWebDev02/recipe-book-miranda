import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MealPlan } from "../JavaScript/localStorage.js";
import { NutritionalDisplay } from "../Containers/NutritionalDisplay.jsx";
import styles from '../Styles/NutritionalInfo.module.css'

/**
 * @component Displays the nutritional info of a recipe. The selected recipe is pulled from localStorage and is found by using the recipe id that is injected into the url.
 * @param {string} NutritionalAPIKey - API key used to provide credentials to the FoodData Central API.
 */
export function NutritionalInfo({ NutritionalAPIKey }) {
    // The id of the recipe is injected into the url and this id is used to determine what nutritional info to display.
    const {id: recipeID} = useParams();
    const [ selectedRecipe, setSelectedRecipe ] = useState({})
    const [ recipeIngredients, setRecipeIngredients ] = useState([]);
    const [ ingredientQueries, setIngredientQueries ] = useState([]);
    const [ ingredientWorker, setIngredientWorker ] = useState();
    const [ errorOccurred, setErrorOccurred ] = useState(false)
    const navigate = useNavigate();

    // Upon first rendering of the component, a worker is initialized and stored in the components state.
    // This worker will handle converting the string of ingredients to separate elements in an array and converting their strings into valid url parameters or queries.
    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'splitIngredientString')
            setRecipeIngredients([...data.ingredientsArray]);
            setIngredientQueries([...data.ingredientQueries]);
        })

        setIngredientWorker(worker);
        return () => {
            worker.terminate();
        }
    }, [])

    // Rerenders every time the recipeID injected into the url changes.
    // The findRecipe method from the MealPlan class is used with the recipeID as an argument to change selected the appropriate recipe from localStorage.
    // If no associated recipe is found, an empty recipe is set as the selectedRecipe
    useEffect(() => {
        let mealPlannerArray = MealPlan.getList();
        let selectedRecipeIndex = MealPlan.findRecipe(recipeID, mealPlannerArray);
        if (!selectedRecipeIndex) {
            setSelectedRecipe({})
            setErrorOccurred(true);
        };
        let selectedRecipe = mealPlannerArray[selectedRecipeIndex];
        setSelectedRecipe({...selectedRecipe});
    }, [recipeID])

    // Rerenders every time the selectedRecipe variable changes state.
    // If the ingredientWorker is initialized, send a message to the worker to generate the ingredients array by passing in the ingredient string.
    useEffect(() => {
        if (ingredientWorker && !errorOccurred) {
            ingredientWorker.postMessage({command: 'splitIngredientString', ingredientsString: selectedRecipe.ingredients})
        }
    }, [selectedRecipe])

    /**
     * @function Navigates the user back to the meal planner to remove the nutritional info from the page.
     */
    function returnToPlanner() {
        navigate('/planner')
    }

    return (
        <div className={styles.nutritionalDialog}>
            <h2>All Ingredients</h2>
            {errorOccurred && <h2 className={styles.errorMessage}>Invalid Recipe, nutritional info not available</h2>}
            {!errorOccurred && <NutritionalDisplay nutritionalAPIKey={NutritionalAPIKey} ingredients={recipeIngredients} ingredientQueries={ingredientQueries} />}
            <button onClick={returnToPlanner} className={styles.closeNutrition}>Close</button>
        </div>
    )
}