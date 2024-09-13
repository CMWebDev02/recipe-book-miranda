import React from "react";
import { SavedRecipes } from "../JavaScript/localStorage";


export function InteractButton({ recipe, localRecipe }) {
    function handleClick(item) {
        if (!localRecipe) {
            let result = SavedRecipes.storeRecipe(item);

            if (result) {
                alert('Item Added');
            } else {
                alert('Item Already Saved');
            }
        } else {
            console.log("Add item removing from localStorage")
        }
        
    }
    
    return (
        <button onClick={() => handleClick(recipe)}>{localRecipe ? "Remove Recipe" : "Save Recipe"}</button>
    )
}