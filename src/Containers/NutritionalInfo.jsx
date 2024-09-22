import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MealPlan } from "../JavaScript/localStorage";
import styles from '../Styles/NutritionalInfo.module.css'

export function NutritionalInfo({ recipes }) {
    const {id: recipeID} = useParams();
    const [ selectedRecipe, setSelectedRecipe ] = useState({})
    const [ recipeIngredients, setRecipeIngredients ] = useState([]);
    const [ ingredientHandler, setIngredientHandler ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const worker = new Worker(new URL('../WebWorkers/IngredientWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            setRecipeIngredients([...data])
        })

        setIngredientHandler(worker);
        return () => {
            worker.terminate();
        }
    }, [])

    useEffect(() => {
        setSelectedRecipe({...MealPlan.findRecipe(recipeID)})
    }, [recipeID])

    useEffect(() => {
        if (ingredientHandler) {
            ingredientHandler.postMessage({command: 'collectAll', ingredientsList: selectedRecipe.ingredients})
        }
    }, [selectedRecipe])

    function returnToPlanner() {
        navigate('/planner')
    }

    return (
        <div className={styles.nutritionalDialog}>
            <h1>All Ingredients</h1>
            <ul>
                {recipeIngredients.map(item => <li key={'ingredient-' + Math.random()} >{item}</li>)}
            </ul>
            <button onClick={returnToPlanner} className={styles.closeNutrition}>Close</button>
        </div>
    )
}