import React from "react";
import { InteractButton } from "./InteractButton";
import { WeekDaySelector } from "./WeekDaySelector";
import styles from '../Styles/RecipeList.module.css'

/**
 * @component Displays various information from the passed in recipe object. The information is accessed based on certain properties and deconstruction is used to obtain these values.
 * @param {object} recipe - Recipe object containing all of the recipe's information that will be displayed.
 * @param {string} viewLocation - String variable that denotes where the recipe is being displayed, values can be either planner, searched, or stored.
 * @param {function} update - State setter that updates a boolean to show if the localStorage array was altered.
 */
export function DisplayRecipe({ recipe, viewLocation, update }) {
    // Deconstructs the recipe object and store the required information in various variables.
    const { title, ingredients, servings, instructions } = recipe;

    return (
        <div className={styles.recipeCardDiv}>
            <h2>{title}</h2>
            <div>
                <ul>
                    {ingredients.split('|').map(ingredient => <li key={"ingredient-" + Math.random()}>{ingredient}</li>)}
                </ul>
                <h5>Makes {servings}.</h5>
            </div>
            <div>
                <h3>Instructions:</h3>
                <p>{instructions}</p>
            </div>
            <div>
                <InteractButton recipe={recipe} viewLocation={viewLocation} update={update} />
                {/* If viewing from the meal planner component, displays the WeekDaySelector to allow the user to choose which day to a recipe to. */}
                {viewLocation == 'planner' && <WeekDaySelector recipe={recipe} update={update} />}
            </div>
        </div>
    )
}