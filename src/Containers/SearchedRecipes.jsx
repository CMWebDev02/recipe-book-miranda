import React, { useEffect } from "react";
import { UseRecipeAPI } from "../Hooks/UseRecipeAPI";
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { SearchBox } from "../Components/SearchBox";
import styles from '../Styles/RecipeList.module.css'

/**
 * @component Displays all recipes returned by the Recipes API and provides the user an option to save a recipe to localStorage. 10 Recipes are displayed per page and at top of each page is the
 * search bar so that the user may search for other recipes.
 * @param {string} recipeParam - Defines the recipe title that the user searched for .
 * @param {number} pageParam - Defines the current page of results the user is on.
 * @param {string} APIKey - String that contains the API key needed to provide credentials when making the API call.
 * @param {function} newSearch - Function to update the current state  in the parent component of recipe and page queries injected in the url.
 * @param {function} disableNextPage - Setter function to update the current state of the isButtonDisabled variable in the parent component.
 */
export function SearchedRecipes({ recipeParam, pageParam, APIKey, newSearch, disableNextPage }) {
    // Deconstructs the results returned after the UseRecipeAPI hook finishes executing.
    const { errorOccurred, allRecipes, isLoading } = UseRecipeAPI({recipeParam, pageParam, APIKey});

    //! See if this is necessary or even works
    // Checks if an error occurs instantly upon first loading the component and disables the next page button if so.
    useEffect(() => {
        if (errorOccurred == `No Recipes Found!`) disableNextPage(true);
    }, [])

    return (
        <>
            <div className={styles.informationDiv}>
                <h1>Showing Results for {recipeParam}</h1>
                <h3>Find Other Recipes:</h3>
                <SearchBox updateSearch={newSearch} />
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
            </div>
        
            <div className={styles.recipesDisplayDiv}>
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe key={"recipe-" + Math.random()} 
                                                            recipe={recipe} viewLocation={'searched'} />)}
            </div>
        </>
    )
}