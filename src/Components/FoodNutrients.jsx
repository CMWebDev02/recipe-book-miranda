import React, { useEffect, useState } from "react";

export function FoodNutrients({ food, foodTitle }) {
    const [ nutrients, setNutrients ] = useState([]);

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
            <p>{foodTitle}</p>
            <ul>
                {nutrients.length > 1 && nutrients.map(nutrientObj => <li key={'nutrient-' + Math.random()} >{`${nutrientObj.nutrientName}: ${nutrientObj.value}${nutrientObj.unitName}`}</li>)}
            </ul>
        </>
    )
}