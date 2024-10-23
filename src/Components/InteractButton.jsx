import React, { useEffect, useState } from "react";
import { MealPlan, SavedRecipes } from "../JavaScript/localStorage.js";
import { useNavigate } from "react-router-dom";

/**
 * @component Displays various buttons depending on the viewLocation argument, these buttons can save, remove, or display nutritional info.
 * @param {object} recipe - Recipe object containing all of the recipe's information.
 * @param {string} viewLocation - String variable that denotes where the recipe is being displayed, values can be either planner, searched, or stored.
 * @param {function} update - State setter that updates a boolean to show if the localStorage array was altered.
 */
export function InteractButton({ recipe, viewLocation, update }) {
    const navigate = useNavigate();

    /**
     * @function Triggers the appropriate response based on the action argument passed in for the recipe book's saved recipes, 
     * either the recipe is removed from the recipe book's localStorage or included in the meal planner's localStorage array.
     * @param {string} action - Denotes which code block to execute.
     */
    function storedActionsHandler(action) {
        if (action == 'remove') {
            // Removes the recipe from recipe book's localStorage and updates the state to trigger a rerender for the parent grandparent component.
            SavedRecipes.removeRecipe(recipe.id)
            update(true);
        } else if (action == 'include') {
            // Adds the current recipe to the meal planner's localStorage array.
            MealPlan.storeRecipe(recipe)
        }
    }

    /**
     * @function Triggers the appropriate response based on the action argument passed in for the meal planner's saved recipes,
     * either the recipe is removed the meal planner's localStorage or the recipe's id is injected into the url to display its nutritional info.
     * @param {string} action - Denotes which code block to execute.
     */
    function plannerActionsHandler(action) {
        if (action == 'remove') {
            // Removes the recipe from the meal planner's localStorage array and updates the state to trigger a rerender for the parent grandparent component.
            MealPlan.removeRecipe(recipe.id)
            update(true);
        } else if (action == 'nutrition') {
            // Injects the recipe's current id into the url.
            navigate(`/planner/${recipe.id}`)
        }
    }

    /**
     * @function Triggers the appropriate action depending on the button clicked by the user and the action argument passed in.
     * @param {string} action - Denotes which action will be triggered by the actionHandler function.
     */
    function handleClick(action) {
        // If viewing recipes returned by the API,
        // the user can only save these recipes to localStorage.
        // If viewing from either the recipe book or the meal planner then a function call is made to their associated actionHandler functions.
        if (viewLocation == 'searched') {
            SavedRecipes.storeRecipe(recipe)
        } else if (viewLocation == 'stored') {
            storedActionsHandler(action)
        } else if (viewLocation == 'planner') {
            plannerActionsHandler(action)
        }
    }
    
    return (
        <>
            {/* Depending on the viewLocation, the user is displayed the appropriate buttons,
                if viewing from the meal planner component the remove and nutritional info buttons are displayed,
                if viewing from the searched component only the save button is displayed,
                and if viewing from the recipe book component the save and remove buttons are displayed.*/}
            {viewLocation != 'planner' && <button onClick={() => handleClick('include')}>Save Recipe</button>}
            {viewLocation != 'searched' && <button onClick={() => handleClick('remove')}>Remove Recipe</button>}
            {viewLocation == 'planner' && <button onClick={() => handleClick('nutrition')}>Nutritional Info</button>}
        </>
    )
}