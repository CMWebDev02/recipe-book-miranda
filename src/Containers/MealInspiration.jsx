import React, { useEffect, useState } from "react";
import { UseRandomRecipe } from "../Hooks/UseRandomRecipe";
import { DisplayImage } from "../Components/DisplayImage";

export function MealInspiration() {
    const { errorsOccurred, isLoading, firstResponse } = UseRandomRecipe()
    const [ recipeObject, setRecipeObject ] = useState({})


    useEffect(() => {
        if (!isLoading && errorsOccurred == '') {
            setRecipeObject(firstResponse);
        }
    }, [firstResponse])

    return (
        <>
            {errorsOccurred && <h1>{errorsOccurred}</h1>}
            {isLoading && <h1>Loading...</h1>}
            {recipeObject && <DisplayImage recipeObject={recipeObject} />} 
        </>
    )
}