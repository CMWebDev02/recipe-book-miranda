import React, { useEffect, useState } from "react";
import { MealPlan, SavedRecipes } from "../JavaScript/localStorage";
import { useNavigate } from "react-router-dom";

export function InteractButton({ recipe, viewLocation, update }) {
    const navigate = useNavigate();

    function storedActions(action) {
        if (action == 'remove') {
            SavedRecipes.removeRecipe(recipe.id)
            update(true);
        } else if (action == 'include') {
            MealPlan.storeRecipe(recipe)
        }
    }

    function plannerActions(action) {
        if (action == 'remove') {
            MealPlan.removeRecipe(recipe.id)
            update(true);
        } else if (action == 'nutrition') {
            navigate(`/planner/${recipe.id}`)
        }
    }

    function handleClick(action) {
        if (viewLocation == 'searched') {
            SavedRecipes.storeRecipe(recipe)
        } else if (viewLocation == 'stored') {
            storedActions(action)
        } else if (viewLocation == 'planner') {
            plannerActions(action)
        }
    }
    
    return (
        <div className="interaction-buttons">
            {viewLocation != 'planner' && <button onClick={() => handleClick('include')}>Save Recipe</button>}
            {viewLocation != 'searched' && <button onClick={() => handleClick('remove')}>Remove Recipe</button>}
            {viewLocation == 'planner' && <button onClick={() => handleClick('nutrition')}>Nutritional Info</button>}
        </div>
    )
}