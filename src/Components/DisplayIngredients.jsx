import React from "react";

/**
 * @component Displays an individual meal and the ingredients needed to prepare it.
 * @param {array} meal - Array containing the mealTitle and mealIngredients, these values within the array are accessed via deconstruction.
 */
export function DisplayIngredients({ meal }) {
    const [mealTitle, mealIngredients ] = meal;
    
    return (
        <>
            <h3>{mealTitle}</h3>
            <ul>
                {mealIngredients.map(ingredient => <li key={'shopping-list-ingredient' + Math.random()}>{ingredient}</li>)}
            </ul>
        </>
    )
}