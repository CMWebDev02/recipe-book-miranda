import React, { useEffect } from "react";
import { UseRecipeAPI } from "../Hooks/useRecipeAPI";
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { SearchBox } from "../Components/SearchBox";

export function SearchedRecipes({ recipeParam, pageParam, APIKey, newSearch, disableNextPage }) {
    const { errorOccurred, allRecipes, isLoading } = UseRecipeAPI({recipeParam, pageParam, APIKey});
    // Somehow disable the next button based on the returned recipes

    useEffect(() => {
        if (errorOccurred == `No Recipes Found!`) disableNextPage(true);
    }, [])

    return (
        <div className="recipes-display">
            <h1>Showing Results for {recipeParam}</h1>
            <div>
                <h3>Find Other Recipes:</h3>
                <SearchBox updateSearch={newSearch} />
            </div>
        
            <div className="recipes-list">
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe key={"recipe-" + Math.random()} 
                                                            recipe={recipe} viewLocation={'searched'} />)}
            </div>
        </div>
    )
}