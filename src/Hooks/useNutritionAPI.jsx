import React, { useEffect, useState } from 'react';


export function useNutritionAPI(ingredientsArray) {
    // const APIKey = 'DEMO_KEY'
    const APIKey = '';
    const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${APIKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;

    const [ allPromises, setAllPromises ] = useState([]);
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        let allFetches = ingredientsArray.map(ingredient => {
            let ingredientSearch = uriAPI + ingredient;
            return fetch(ingredientSearch, {method: 'GET'})
            .then(response => {
                if (!response.ok) throw new Error('Nutritional Info Not Found');
                return response.json();
            })
            .catch(error => setErrorOccurred(error.message));
        });

        setIsLoading(true);
        setAllPromises(allFetches);
    }, [ingredientsArray])

    useEffect(() => {
        async () => {
            let responses = await Promise.all(allPromises);
            setIsLoading(false);
            setNutritionalInfo(responses);
        }
    }, [allPromises])

    return {errorOccurred, isLoading, nutritionalInfo}
}
