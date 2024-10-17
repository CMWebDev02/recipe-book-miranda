import React, { useEffect, useState } from 'react';
import { NutritionalDB } from '../JavaScript/NutrientDataBase.js';


// TODO:
// Potential Issue, if only the query search database stores information and the nutrition api fails to, then it will result in a failed pull of the information every time. Add a backup function
// that will remake the api call to get the fdcID associated nutrient values to restore in the database.

// // This will prevent me from having to code for two different objects and doesn't require me to pass around objects with data I don't need.

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);

    async function connectToDataBases(NutrientAPIStorage) {
        try {
            let isConnect = await NutrientAPIStorage.openDataBaseConnection();
            if (!isConnect) throw new Error('Failed to connect to DataBases')
            return null;
        } catch (error) {
            return error;
        }
    }

    async function addToDataBases(NutrientAPIStorage, ingredient, data) {
        return new Promise((resolve, reject) =>  {
            try {
                let fdcId;
                let nutrientsArray;
                if (data.foods[0]) {
                    fdcId = data.foods[0].fdcId;
                    nutrientsArray = data.foods[0].foodNutrients;
                } else {
                    fdcId = 0;
                    nutrientsArray = [];
                }
    
                NutrientAPIStorage.addIngredientQuery(ingredient, fdcId);
                NutrientAPIStorage.addFoodNutrients(fdcId, nutrientsArray);
    
                resolve({ok: true, result: {fdcId, nutrientsArray}})
            } catch (error) {
                reject({ok: false, error});
            }
        })
    }

    useEffect(() => {
        if (apiKey == '') {
            setIsLoading(false);
            setErrorOccurred('Invalid API Key');
        } else {
            const controller = new AbortController();
            const signal = controller.signal;
            let NutrientAPIStorage = new NutritionalDB();

            const fetchNutritionalInfo = async (ingredient) => {
                let response = await NutrientAPIStorage.getIngredientQuery(ingredient);
                if (response.ok) {
                    return NutrientAPIStorage.getNutrients(response.result);
                } else {
                    const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
                    let ingredientSearch = uriAPI + ingredient;
                    let response = await fetch(ingredientSearch, {signal});
                    if (!response.ok) return {ok: false, error: {message: `Fetch Call Failed with a status of ${response.status}`}};
                    let data = await response.json();
                    return addToDataBases(NutrientAPIStorage, ingredient, data);
                }
            }

            const collectAllData = async (ingredients) => {
                try {
                    let error = await connectToDataBases(NutrientAPIStorage)
                    if (error) throw new Error(error);
                    let allResponses = ingredients.map(ingredient => fetchNutritionalInfo(ingredient));
                    
                    let allResults = await Promise.all(allResponses);
                    let allData = allResults.map((response, index) => {
                        if (!response.ok) {
                            if (response.error.errorType == 'DeSync') {
                                NutrientAPIStorage.clearDataBase();
                                window.location.reload();
                            }
                            throw new Error(response.error.message);
                        }    
                        return {searchQuery: ingredients[index], ...response.result}
                    })
                    setNutritionalInfo(allData)
                } catch (error) {
                    setErrorOccurred(error.message);
                } finally {
                    setIsLoading(false);
                }
            }

            collectAllData(ingredientsArray);

            return () => {
                controller.abort();
            }
        }
    }, [ingredientsArray, apiKey])

    return {errorOccurred, isLoading, nutritionalInfo};
}
