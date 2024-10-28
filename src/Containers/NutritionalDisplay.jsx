import React, { useEffect, useState } from "react";
import { UseNutritionAPI } from "../Hooks/UseNutritionAPI.jsx";
import { FoodNutrients } from "../Components/FoodNutrients.jsx";
import styles from '../Styles/NutritionalInfo.module.css'

/**
 * @component Displays the nutritional information gather from the FoodData Central API to the user based on the passed in ingredientQueries array.
 * @param {array} ingredientQueries - All ingredients that the API will return nutritional information for and then display to the user if a valid response occurs.
 * @param {string} nutritionalAPIKey - API key used to provide credentials to the FoodData Central API.
 */
export function NutritionalDisplay({ ingredientQueries, nutritionalAPIKey }) {
    // The UseNutritionAPI hook is called and the array of ingredient queries is passed in and what is received in turn in an array of the various nutritional information
    // for each of the elements in the ingredientQueries.
    const { errorOccurred, isLoading, nutritionalInfo } = UseNutritionAPI(ingredientQueries, nutritionalAPIKey);
    // The nutrients are saved in the components state in two ways,
    // one, they are saved individually so that the user can see specific values of select ingredients.
    // and two, as a total so that the user 
    const [ nutrients, setNutrients ] = useState([]);
    const [ totalNutrients, setTotalNutrients ] = useState([]);
    const [ nutritionWorker, setNutritionalWorker ] = useState('');

    // Upon first render of the component, a worker is initialized and stored in the components state.
    // This worker will convert the nutritionalInfo acquired by the API into a more manageable format and tally up the total macro and micro nutrients specified.
    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'collectNutrients') {
                setNutrients(data.ingredientNutrients);
                setTotalNutrients(data.totalNutritionalInfo);
            }
        });

        setNutritionalWorker(worker);

        return () => {
            worker.terminate();
        }
    }, [])

    // Rerenders the component every time the nutritionalInfo returned by the hook is altered.
    // First, a check is made to ensure that the nutritionalWorker is initialized before passing a message containing the nutrientInfo array to the worker so that it may convert and total
    // the nutrients.
    useEffect(() => {
        if (nutritionWorker) {
            nutritionWorker.postMessage({command: 'collectNutrients', nutrientsArray: nutritionalInfo});
        }
    }, [nutritionalInfo, nutritionWorker])

    return (
        <div className={styles.nutritionalInfoDiv}>
            {/* Various elements are conditionally displayed if any error had occurred or if the information is still loading. */}
            {isLoading && <h1>Fetching Nutritional Data...</h1>}
            {errorOccurred && <h1>{errorOccurred}</h1>}
            {(nutrients.length == 0 && !errorOccurred && !isLoading) && <h1>Generating List</h1>}
            {nutrients.length > 0 && nutrients.map(({searchQuery, nutritionalInfo}) => <FoodNutrients key={'nutritional-info-' + Math.random()} foodNutrients={nutritionalInfo} foodTitle={searchQuery} />)}
            {nutrients.length > 0 && <FoodNutrients key={'total-nutritional-info-' + Math.random()} foodNutrients={totalNutrients} foodTitle={'Total Nutrients:'}/>}
        </div>
    )
}