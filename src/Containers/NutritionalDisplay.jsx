import React, { useEffect } from "react";
import { useNutritionAPI } from "../Hooks/useNutritionAPI";
import { FoodNutrients } from "../Components/FoodNutrients";

export function NutritionalDisplay({ ingredients, ingredientQueries }) {
    const { errorOccurred, isLoading, nutritionalInfo } = useNutritionAPI(ingredients);

    return (
        <>
            {isLoading && <h1>Loading</h1>}
            {errorOccurred && <h1>{errorOccurred}</h1>}
            {nutritionalInfo && nutritionalInfo.map(ingredient => <FoodNutrients key={'national-info-' + Math.random()} food={ingredient.foods[0]} foodTitle={ingredient.foodSearchCriteria.query} />)}
        </>
    )
}