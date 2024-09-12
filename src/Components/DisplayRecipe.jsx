import React from "react";
import { SaveButton } from "./SaveButton";

export function DisplayRecipe({recipe}) {
    const { title, ingredients, servings, instructions } = recipe;

    return (
        <div className="recipe-card">
            <h2>{title}</h2>
            <h5>Makes {servings}.</h5>
            <hr />
            <ul>
                {ingredients.split('|').map(ingredient => <li key={"ingredient-" + Math.random()}>{ingredient}</li>)}
            </ul>
            <hr />
            <h3>Instructions:</h3>
            <p>{instructions}</p>
            <hr />
            <SaveButton toSave={recipe}/>
        </div>
    )
}