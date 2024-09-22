import React from "react";
import { InteractButton } from "./InteractButton";
import { WeekDaySelector } from "./WeekDaySelector";

export function DisplayRecipe({ recipe, viewLocation, update }) {
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
            <InteractButton recipe={recipe} viewLocation={viewLocation} update={update} />
            {viewLocation == 'planner' && <WeekDaySelector recipe={recipe} update={update} />}
        </div>
    )
}