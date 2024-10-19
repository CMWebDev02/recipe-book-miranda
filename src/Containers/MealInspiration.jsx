import React, { useEffect, useState } from "react";
import { UseRandomRecipe } from "../Hooks/UseRandomRecipe";
import { DisplayImage } from "../Components/DisplayImage";

/**
 * MealInspiration
 * @component Displays a random meal to the user and provides a link to search for said meal with the web project. Also, displays if the fetch call is still loading or any error that occurred with the fetch call.
 */
export function MealInspiration() {
    const { errorsOccurred, isLoading, firstResponse } = UseRandomRecipe()
    const [ recipeObject, setRecipeObject ] = useState({})

    // Reloads the component each time the UseRandomRecipe hook is triggered.
    useEffect(() => {
        if (!isLoading && errorsOccurred == '') {
            setRecipeObject(firstResponse);
        }
    }, [firstResponse, isLoading, errorsOccurred])

    return (
        <>
            {errorsOccurred && <h1>{errorsOccurred}</h1>}
            {isLoading && <h1>Loading...</h1>}
            {recipeObject && <DisplayImage recipeObject={recipeObject} />} 
        </>
    )
}