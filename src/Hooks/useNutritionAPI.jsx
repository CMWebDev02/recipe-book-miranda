import React, { useEffect, useState } from 'react';

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect(() => {
        if (apiKey == '') {
            setErrorOccurred('Invalid API Key');
            setIsLoading(false);
        } else {
            const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
            setIsLoading(true);
    
            let allFetches = ingredientsArray.map(ingredient => {
                let ingredientSearch = uriAPI + ingredient;
                return fetch(ingredientSearch, {method: 'GET'})
                .then(response => {
                    if (!response.ok) throw new Error('Nutritional Info Not Found');
                    return response.json();
                })
                .catch(error => {
                    setErrorOccurred(error.message);
                    setIsLoading(false);
                });
            });
    
            Promise.all(allFetches)
            .then(responses => {
                if (!responses.ok) throw new Error('Nutritional Info Not Found')
                setNutritionalInfo(responses);
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
