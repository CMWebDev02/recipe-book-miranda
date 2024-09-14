import React from "react";
import { useParams } from "react-router-dom"
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { useRecipeAPI } from "../Hooks/useRecipeAPI";
import { SavedRecipes } from "../JavaScript/localStorage";

export function RecipeList() {
    const { searchParameter } = useParams();
    const showLocalStorage = searchParameter == "booklet";
    const { errorOccurred, allRecipes, isLoading } = !showLocalStorage ? useRecipeAPI(searchParameter) : {errorOccurred: null, isLoading: false, allRecipes: SavedRecipes.getRecipeBook()};

    return (
        <div className="recipes-display">
            <h1>{!showLocalStorage ? `Showing Results for ${searchParameter}` : "Saved Recipes"}</h1>
            <div className="recipes-list">
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe localRecipe={showLocalStorage} recipe={recipe} key={"recipe-" + Math.random()} />)}
            </div>
        </div>
    )
}