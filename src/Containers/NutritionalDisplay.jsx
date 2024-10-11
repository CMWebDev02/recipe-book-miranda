import React, { useEffect, useState } from "react";
import { UseNutritionAPI } from "../Hooks/UseNutritionAPI.jsx";
import { FoodNutrients } from "../Components/FoodNutrients";
import { tempOBJ } from "../JavaScript/tempObject.js";

export function NutritionalDisplay({ ingredientQueries, nutritionalAPIKey }) {
    // const { errorOccurred, isLoading, nutritionalInfo } = UseNutritionAPI(ingredientQueries, nutritionalAPIKey);
    const [ tempVar, setTempVar ] = useState('')
    const [ nutrients, setNutrients ] = useState([]);
    const [ totalNutrients, setTotalNutrients ] = useState([]);
    const [ nutritionWorker, setNutritionalWorker ] = useState('');

    useEffect(() => {
        const worker = new Worker(new URL('../WebWorkers/NutritionWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.message == 'collectNutrients') {
                setNutrients(data.allNutrients);
                setTotalNutrients(data.totalNutritionalInfo);
            }
        });

        setNutritionalWorker(worker);

        setTempVar(tempOBJ);

        return () => {
            worker.terminate();
        }
    }, [])


    useEffect(() => {
        if (nutritionWorker) {
            nutritionWorker.postMessage({message: 'collectNutrients', nutrientsArray: [tempOBJ, tempOBJ]});
        }
    }, [tempVar]) // Replace with nutritionalInfo

    return (
        <>
            {/* {isLoading && <h1>Loading</h1>} */}
            {/* {errorOccurred && <h1>{errorOccurred}</h1>} */}
            {nutrients && nutrients.map(({searchQuery, nutritionalInfo}) => <FoodNutrients key={'nutritional-info-' + Math.random()} foodNutrients={nutritionalInfo} foodTitle={searchQuery} />)}
            {totalNutrients && <FoodNutrients key={'total-nutritional-info-' + Math.random()} foodNutrients={totalNutrients} foodTitle={'Total Nutrients:'}/>}
        </>
    )
}