import React, { useEffect, useState } from "react";
import { UseFetchAPI } from "./UseFetchAPI";

export function UseRandomRecipe() {
    const { isLoading: RandomRecipeLoading, promise: RandomRecipePromise } = UseFetchAPI('https://api.freeapi.app/api/v1/public/meals/meal/random');
    const { isLoading: MealImageLoading, promise: MealImagePromise } = UseFetchAPI('https://foodish-api.com/api');
    const [ errorsOccurred, setErrorsOccurred ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ firstResponse, setFirstResponse ] = useState('')

    async function getFirstResponse() {
        try {
            let data = await Promise.any([RandomRecipePromise, MealImagePromise]);
            setFirstResponse(data);
        } catch (error) {
            console.error(error);
            setErrorsOccurred(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!RandomRecipeLoading || !MealImageLoading) {
            getFirstResponse();
        } 
    }, [RandomRecipeLoading, MealImageLoading])

    return { errorsOccurred, isLoading, firstResponse }
}