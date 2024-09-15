import React from "react";

export function InteractButton({ recipe, localRecipe }) {
    function handleClick() {
        if (!localRecipe) {

        } else {

        }
        
    }
    
    return (
        <button onClick={handleClick}>{localRecipe ? "Remove Recipe" : "Save Recipe"}</button>
    )
}