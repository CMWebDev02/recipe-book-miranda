import React from "react";
import { useParams } from "react-router-dom"
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { useRecipeAPI } from "../Hooks/useRecipeAPI";

export function RecipeList() {
    // const {searchParameter} = useParams();
    const { errorOccurred, allRecipes, isLoading } = useRecipeAPI('searchParameter');


    return (
        <>
            <h1>Showing Results for {'searchParameter'}</h1>
            <div>
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe recipe={recipe} key={"recipe-" + Math.random()} />)}
            </div>
        </>
    )
}