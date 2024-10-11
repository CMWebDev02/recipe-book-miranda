import React, { useEffect, useState } from 'react';

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)

    async function fetchNutritionalInfo(ingredient) {
        const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
        let ingredientSearch = uriAPI + ingredient;
        return fetch(ingredientSearch);
    }

    async function collectAllData(ingredients) {
        try {
            let allFetches = ingredients.map(ingredient => fetchNutritionalInfo(ingredient))

            let allResponses = await Promise.all(allFetches);

            let allResults = allResponses.map(response => {
                if (!response.ok) throw new Error(`Failed to Fetch nutrients for query - ${response.url}`);
                return response.json();
            })

            let allData = await Promise.all(allResults);
            setNutritionalInfo(allData)
        } catch (error) {
            setErrorOccurred(error.message)
        } finally {
            setIsLoading(false);
        }
    }
    
    // Change this to async and await for simplicity sake
    useEffect(() => {
        if (apiKey == '') {
            setIsLoading(false);
            setErrorOccurred('Invalid API Key');
        } else {
            collectAllData(ingredientsArray)
        }
    }, [ingredientsArray])

    return {errorOccurred, isLoading, nutritionalInfo};
}
