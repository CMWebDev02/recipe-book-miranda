import React from "react";

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