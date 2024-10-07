import React, { useEffect, useState } from "react";
import { UseRandomRecipe } from "../Hooks/UseRandomRecipe";
import { DisplayImage } from "../Components/DisplayImage";

export function MealInspiration() {
    const { errorsOccurred, isLoading, firstResponse } = UseRandomRecipe()
    const [ recipeSRC, setRecipeSRC ] = useState('');
    const [ recipeTitle, setRecipeTitle ] = useState('');

    function handleFirstResponse() {
        if (firstResponse.image) {
            // // Implement a worker to take care of this and then have it update the title after it is finished with handling it.
            // // It should convert any string from pascal or camel case to just uppercase
            // // Remove any - and include spaces along with capitalizing each word after.
            let imageString = firstResponse.image.substring(firstResponse.image.lastIndexOf('/') + 1, firstResponse.image.lastIndexOf('.'))
            // let foodTitle = imageString.replace(/\d/gi, '')
            // foodTitle = foodTitle.substring(0, 1).toUpperCase() + foodTitle.substring(1) 
            setRecipeTitle(imageString);
            setRecipeSRC(firstResponse.image);
        } else {
            setRecipeSRC(firstResponse.data.strMealThumb);
            // Implement a worker to convert the word 
            setRecipeTitle(firstResponse.data.strMeal);
        }
    }


    useEffect(() => {
        if (!isLoading && errorsOccurred == '') {
            handleFirstResponse();
        }
    }, [firstResponse])

    return (
        <>
            {errorsOccurred && <h1>{errorsOccurred}</h1>}
            {isLoading && <h1>Loading...</h1>}
            {recipeSRC && <DisplayImage imageSrc={recipeSRC} recipeTitle={recipeTitle} />} 
        </>
    )
}