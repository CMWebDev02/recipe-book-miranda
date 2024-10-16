import React, { useEffect, useState } from 'react';
import { IngredientDB, NutritionalInfoDB } from '../JavaScript/NutrientDataBase.js';


// TODO:
// Potential Issue, if only the query search database stores information and the nutrition api fails to, then it will result in a failed pull of the information every time. Add a backup function
// that will remake the api call to get the fdcID associated nutrient values to restore in the database.

// // This will prevent me from having to code for two different objects and doesn't require me to pass around objects with data I don't need.

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)

    async function connectToDataBases(ingredientsDB, nutritionDB) {
        try {
            let connectionOne = ingredientsDB.openDataBaseConnection();
            let connectionTwo = nutritionDB.openDataBaseConnection();

            let connectionResults = await Promise.all([connectionOne, connectionTwo]);
            connectionResults.forEach((isConnect) => {
                if (!isConnect) throw new Error('Failed to connect to DataBases')}
            );

            return null;
        } catch (error) {
            return error;
        }
    }

    async function addToDataBases(ingredientDB, nutrientDB, ingredient, data) {
        return new Promise((resolve, reject) =>  {
            try {
                let fdcId = data.foods[0].fdcId;
                let nutrientsArray = data.foods[0].foodNutrients;
    
                ingredientDB.addIngredientQuery(ingredient, fdcId);
                nutrientDB.addFoodNutrients(fdcId, nutrientsArray);
    
                resolve({fdcId, nutrientsArray})
            } catch (error) {
                reject(false)
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
            let IngredientStorage = new IngredientDB();
            let NutrientStorage = new NutritionalInfoDB();

            const fetchNutritionalInfo = async (ingredient) => {
                let result = await IngredientStorage.getIngredientQuery(ingredient);
                if (result) {
                    return NutrientStorage.getNutrients(result);
                } else {
                    const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
                    let ingredientSearch = uriAPI + ingredient;
                    let response = await fetch(ingredientSearch, {signal});
                    if (!response.ok) return [null, response.status];
                    let data = await response.json();
                    return addToDataBases(IngredientStorage, NutrientStorage, ingredient, data);
                }
            }

            const collectAllData = async (ingredients) => {
                try {
                    let error = await connectToDataBases(IngredientStorage, NutrientStorage)
                    if (error) throw new Error(error);
                    let allResponses = ingredients.map(ingredient => fetchNutritionalInfo(ingredient));
                    
                    let allResults = await Promise.all(allResponses);
                    let allData = allResults.map((response, index) => {
                        if (!response) throw new Error('Failed To Gather Nutrient Data');
                        return {searchQuery: ingredients[index], ...response}
                    })
                    setNutritionalInfo(allData)
                } catch (error) {
                    setErrorOccurred(error.message)
                } finally {
                    setIsLoading(false);
                }
            }

            collectAllData(ingredientsArray);

            return () => {
                controller.abort();
            }
        }
    }, [ingredientsArray])

    return {errorOccurred, isLoading, nutritionalInfo};
}
