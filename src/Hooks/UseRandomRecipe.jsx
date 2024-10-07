import React from "react";
import { UseFetchAPI } from "./UseFetchAPI";

export function UseRandomRecipe() {
    const { errorOccurred: RandomRecipeError, isLoading: RandomRecipeLoading, promise: RandomRecipePromise } = UseFetchAPI('https://api.freeapi.app/api/v1/public/meals/meal/random');
    const { errorOccurred: MealImageError, isLoading: MealImageLoading, promise: MealImagePromise } = UseFetchAPI('https://foodish-api.com/api');
    
}