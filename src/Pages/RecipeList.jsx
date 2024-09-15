import React from "react";
import { useParams } from "react-router-dom"
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { useRecipeAPI } from "../Hooks/useRecipeAPI";

export function RecipeList() {
    const { searchParameter } = useParams();
    const {errorOccurred, allRecipes, isLoading} = useRecipeAPI(searchParameter);
    const displayLocal = searchParameter == 'booklet'

    return (
        <div className="recipes-display">
            <h1>{displayLocal ?  "Saved Recipes" : `Showing Results for ${searchParameter}`}</h1>
            <div className="recipes-list">
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe updateDisplay={false} localRecipe={false} recipe={recipe} key={"recipe-" + Math.random()} />)}
            </div>
        </div>
    )
}