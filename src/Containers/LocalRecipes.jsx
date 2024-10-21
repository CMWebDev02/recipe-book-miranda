import React, { useEffect, useState } from "react";
import { SavedRecipes } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";

/**
 * @component Displays locally saved recipes, 10 recipes are displayed per page, and provides various buttons to remove recipes or add them to a meal planner.
 * @param {number} currentPage - Number value that denotes the current page of the displayed recipes.
 * @param {function} disableNextPage - Setter used to update a boolean value that controls if the next page button is disabled.
 */
export function LocalRecipes({ currentPage, disableNextPage }) {
    // Stores locally saved recipes.
    const [ allRecipes, setAllRecipes ] = useState([]);
    // Boolean to signify if there are recipes stored in localStorage.
    const [ containsRecipes, setContainsRecipes ] = useState(false);
    // Boolean to signify if any updates were made to the recipes stored in localStorage.
    const [ updateOccurred, setUpdateOccurred ] = useState(false);

    // Rerenders the component if either the updateOccurred variable changes to true or if the currentPage value changes.
    useEffect(() => {
        // Determines the first recipe that will be displayed to the user based on the current page value.
        let startIndex = (currentPage - 1) * 10;
        // Slices the localStorage recipe array to get 10 recipes starting from the startIndex.
        let localRecipes = SavedRecipes.getList().slice(startIndex, startIndex + 10)
        // Calls the passed in function to disable the next page button if there are no recipes to be displayed.
        disableNextPage(localRecipes.length > 0 ? false : true);
        // Updates the current state of the various state variables.
        setContainsRecipes(localRecipes.length > 0 ? true : false);
        setAllRecipes(localRecipes);
        setUpdateOccurred(false);
    }, [updateOccurred, currentPage])

    return (
        <>
            {!containsRecipes && <h1>{currentPage == 1 ? 'No Recipes Saved To Recipe Book' : 'No More Recipes To Display'}</h1>}
            {allRecipes.map(recipe => <DisplayRecipe key={"local-recipe-" + Math.random()}
                                        recipe={recipe} viewLocation={'stored'} 
                                        update={setUpdateOccurred} />)}
        </>
    )
}