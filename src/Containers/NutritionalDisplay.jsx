import React, { useEffect, useState } from "react";
import { UseNutritionAPI } from "../Hooks/UseNutritionAPI.jsx";
import { FoodNutrients } from "../Components/FoodNutrients";

export function NutritionalDisplay({ ingredientQueries, nutritionalAPIKey }) {
    const { errorOccurred, isLoading, nutritionalInfo } = UseNutritionAPI(ingredientQueries, nutritionalAPIKey);
    const [ nutrients, setNutrients ] = useState([]);
    const [ totalNutrients, setTotalNutrients ] = useState([]);
    const [ nutritionWorker, setNutritionalWorker ] = useState('');
    const [ totalTallied, setTotalTallied ] = useState(false);

    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'collectNutrients') {
                setNutrients(data.ingredientNutrients);
                setTotalNutrients(data.totalNutritionalInfo);
                setTotalTallied(true);
            }
        });

        setNutritionalWorker(worker);

        return () => {
            worker.terminate();
        }
    }, [])


    useEffect(() => {
        if (nutritionWorker) {
            nutritionWorker.postMessage({command: 'collectNutrients', nutrientsArray: nutritionalInfo});
        }
    }, [nutritionalInfo])

    return (
        <>
            {isLoading && <h1>Loading</h1>}
            {errorOccurred && <h1>{errorOccurred}</h1>}
            {(!totalTallied && !errorOccurred && !isLoading) && <h1>Generating List</h1>}
            {nutrients && nutrients.map(({searchQuery, nutritionalInfo}) => <FoodNutrients key={'nutritional-info-' + Math.random()} foodNutrients={nutritionalInfo} foodTitle={searchQuery} />)}
            {totalTallied && <FoodNutrients key={'total-nutritional-info-' + Math.random()} foodNutrients={totalNutrients} foodTitle={'Total Nutrients:'}/>}
        </>
    )
}