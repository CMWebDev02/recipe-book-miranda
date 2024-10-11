import React, { useEffect, useState } from 'react';

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)

    async function fetchNutritionalInfo(ingredient) {
        const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
        let ingredientSearch = uriAPI + ingredient;
        return await fetch(ingredientSearch);
    }

    async function collectAllData(dataArray) {
        try {
            let allData = await Promise.all(dataArray);
            setNutritionalInfo(allData)
        } catch (error) {
            setErrorOccurred(error.message)
        }
    }
    
    // Change this to async and await for simplicity sake
    useEffect(() => {
        if (apiKey == '') {
            setIsLoading(false);
            setErrorOccurred('Invalid API Key');
        } else {
            Promise.all(ingredientsArray.map(ingredient => fetchNutritionalInfo(ingredient)))
            .then(responses => {
                let jsonData = [];
                responses.forEach((response) => {
                    if (!response.ok) throw new Error('Failed to fetch nutritional info.')
                    jsonData.push(response.json());
                })
                collectAllData(jsonData);
            })
            .catch(error => {
                setErrorOccurred(error.message);  
            })
            .finally(() => {
                setIsLoading(false);
            })
        }
    }, [ingredientsArray])

    return {errorOccurred, isLoading, nutritionalInfo};
}
