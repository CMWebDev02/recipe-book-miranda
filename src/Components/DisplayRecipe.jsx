import React from "react";
import { InteractButton } from "./InteractButton";

// Change the localRecipe variable to something like viewLocation to better denote if the recipe is being shown from the apiSearch, localStorage, or from the meal plan.
// If it is from the api search, only one interaction button should be present to save the recipe.
// if it is the localStorage recipe book, two buttons should be present, one to remove the recipe and one to add it to the meal plan.
// If it is the meal plan, there should be two buttons one to remove the recipe from the meal plan and one to get nutritional info.
export function DisplayRecipe({ recipe, localRecipe, update }) {
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
            <InteractButton recipe={recipe} localRecipe={localRecipe} update={update} />
        </div>
    )
}