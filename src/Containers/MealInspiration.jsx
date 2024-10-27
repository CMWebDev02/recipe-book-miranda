import React, { useEffect, useState } from "react";
import { UseRandomRecipe } from "../Hooks/UseRandomRecipe.jsx";
import { DisplayImage } from "../Components/DisplayImage.jsx";

/**
 * @component Displays a random meal to the user and provides a link to search for said meal within the web project. Also, displays if the fetch call is still loading or any error that occurred with the fetch call.
 */
export function MealInspiration() {
    const { errorsOccurred, isLoading, firstResponse } = UseRandomRecipe()
    const [ recipeObject, setRecipeObject ] = useState({})

    // Reloads the component each time the UseRandomRecipe hook is triggered.
    // This sets the recipeObject only if no errors have occurred and if the UseRandomRecipe hook has finished running.
    useEffect(() => {
        if (!isLoading && errorsOccurred == '') {
            setRecipeObject(firstResponse);
        }
    }, [firstResponse, isLoading, errorsOccurred])

    return (
        <div>
            {errorsOccurred && <h2>{errorsOccurred}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {recipeObject && <DisplayImage recipeObject={recipeObject} />} 
        </div>
    )
}