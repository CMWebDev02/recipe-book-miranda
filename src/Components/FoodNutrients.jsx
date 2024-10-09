import React, { useEffect, useState } from "react";

export function FoodNutrients({ foodNutrients, foodTitle }) {
    return (
        <>
            <h3>{foodTitle}</h3>
            <ul>
                {foodNutrients && foodNutrients.map(nutrientObj => <li key={'nutrient-' + Math.random()} >{`${nutrientObj.nutrientName}: ${nutrientObj.value}${nutrientObj.unitName}`}</li>)}
            </ul>
        </>
    )
}