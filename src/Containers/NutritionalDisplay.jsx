import React, { useEffect } from "react";
import { UseNutritionAPI } from "../Hooks/UseNutritionAPI.jsx";
import { FoodNutrients } from "../Components/FoodNutrients";

export function NutritionalDisplay({ ingredientQueries, nutritionalAPIKey }) {
    const { errorOccurred, isLoading, nutritionalInfo } = UseNutritionAPI(ingredientQueries, nutritionalAPIKey);

    return (
        <>
            {isLoading && <h1>Loading</h1>}
            {errorOccurred && <h1>{errorOccurred}</h1>}
            {nutritionalInfo && nutritionalInfo.map(({ foods, foodSearchCriteria}) => <FoodNutrients key={'national-info-' + Math.random()} food={foods[0]} foodTitle={foodSearchCriteria.query} />)}
        </>
    )
}