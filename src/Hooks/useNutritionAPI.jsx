import React, { useEffect, useState } from 'react';
import { IngredientDB, NutritionalInfoDB } from '../JavaScript/NutrientDataBase.js';

// TODO:
// Instead of passing back the entire object that contains all of the data from the fetch call,
// only return the nutrient array and the search input with it, ingredientQuery.
// From here, return an array of objects that contain only the necessary nutrient array and ingredientQuery.
// Then have the worker convert the search query to a title and have it filter the necessary nutrients out.

// // This will prevent me from having to code for two different objects and doesn't require me to pass around objects with data I don't need.

export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true)

    function getSimpleNutrientObject(nutrientObj) {
        let foodNutrients;
        let generalSearchInput;
        if (nutrientObj.ingredient) {
            foodNutrients = nutrientObj.data;
            generalSearchInput = nutrientObj.ingredient;
        } else {
            foodNutrients = nutrientObj.foods[0].foodNutrients;
            generalSearchInput = nutrientObj.foodSearchCriteria.generalSearchInput;
        }

        return {foodNutrients, generalSearchInput}
    }

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
            return error
        }
    }

    async function addToDataBases(ingredientDB, nutrientDB, ingredient, json) {
        try {
            let data = await json;
            let fdcId = data.foods[0].fdcId;
            let foodNutrients = data.foods[0].foodNutrients;

            await ingredientDB.addIngredientQuery(ingredient, fdcId)
            await nutrientDB.addFoodNutrients(fdcId, foodNutrients)
        } catch (error) {
            console.error(error)
        }
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
                try {
                    let result = await IngredientStorage.getIngredientQuery(ingredient);
                    // Have it pull the info from the second database that stores the nutritional info
                    if (result) {
                        let data = await NutrientStorage.getNutrients(result);
                        return [ {data, ingredient}, null ]
                    } else {
                        const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
                        let ingredientSearch = uriAPI + ingredient;
                        let response = await fetch(ingredientSearch, {signal});
                        if (!response.ok) return [null, response.status];
                        let data = response.json();
                        addToDataBases(IngredientStorage, NutrientStorage, ingredient, data)
                        return [ data, null, null ];
                    }
                } catch (error) {
                    return [null, null, error]
                }
            }

            const collectAllData = async (ingredients) => {
                try {
                    let error = await connectToDataBases(IngredientStorage, NutrientStorage)
                    if (error) throw new Error(error);
                    let allResponses = ingredients.map(ingredient => fetchNutritionalInfo(ingredient));
                    
                    let allResults = await Promise.all(allResponses);
                    let allData = allResults.map(([result, error]) => {
                        if (error) throw new Error(error);
                        return getSimpleNutrientObject(result)
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
