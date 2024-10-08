import React, { useEffect, useState } from "react";

export function FoodNutrients({ food, foodTitle }) {
    const [ nutrients, setNutrients ] = useState([]);
    const [ totalNutrients, setTotalNutrients ] = useState([]);
    const [ nutritionWorker, setNutritionalWorker ] = ('');

    useEffect(() => {
        const worker = new Worker(new URL('../WebWorkers/NutritionWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            setTotalNutrients(data.nutritionalTotal);
        });

        setNutritionalWorker(worker);

        return () => {
            worker.terminate();
        }
    }, [])

    useEffect(() => {
        if (nutritionWorker) {
            nutritionWorker.postMessage({message: 'collectTotal', nutrientsArray: nutrients});
        }
    }, [nutrients])

    useEffect(() => {
        setNutrients(food.foodNutrients.filter(nutrientObj => {
            if (nutrientObj.nutrientId == 1093 || // Sodium
                nutrientObj.nutrientId == 1004 || // Total lipid (fat)
                nutrientObj.nutrientId == 1079 || // Fiber
                nutrientObj.nutrientId == 1003 || // Protein
                nutrientObj.nutrientId == 2048 || // Calories
                nutrientObj.nutrientId == 1050  // Carbohydrates
            ) {
                return nutrientObj;
            }
        }).reverse())
    }, [food])

    return (
        <>
            <h3>{foodTitle}</h3>
            <ul>
                {nutrients && nutrients.map(nutrientObj => <li key={'nutrient-' + Math.random()} >{`${nutrientObj.nutrientName}: ${nutrientObj.value}${nutrientObj.unitName}`}</li>)}
            </ul>
            <h3>Total Nutrients:</h3>
            <ul>

            </ul>
        </>
    )
}