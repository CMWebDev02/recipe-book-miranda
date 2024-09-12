import React from "react";
import { SavedRecipes } from "../JavaScript/localStorage";

function handleClick(item) {
    console.log(item)
    let result = SavedRecipes.storeRecipe(item);
    
    if (result) {
        alert('Item Added');
    } else {
        alert('Item Already Saved');
    }
}

export function SaveButton({ toSave }) {
    return (
        <button onClick={() => handleClick(toSave)}>Save Recipe</button>
    )
}