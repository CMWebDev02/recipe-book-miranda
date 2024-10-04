import React, { useEffect, useState } from "react";

export function FoodNutrients({ food, foodTitle }) {
    const [ nutrients, setNutrients ] = useState(food.foodNutrients.filter(nutrientObj => {
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


    return (
        <>
            <p>{foodTitle}</p>
            <ul>
                {nutrients.map(nutrientObj => <li key={'nutrient-' + Math.random()} >{`${nutrientObj.nutrientName}: ${nutrientObj.value}`}</li>)}
            </ul>
        </>
    )
}