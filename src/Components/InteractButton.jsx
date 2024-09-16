import React from "react";
import { SavedRecipes } from "../JavaScript/localStorage";

export function InteractButton({ recipe, localRecipe, update }) {
    function handleClick() {
        if (!localRecipe) {
            SavedRecipes.storeRecipe(recipe)
        } else {
            SavedRecipes.removeRecipe(recipe.id)
            update(true);
        }
        
    }
    
    return (
        <button onClick={handleClick}>{localRecipe ? "Remove Recipe" : "Save Recipe"}</button>
    )
}