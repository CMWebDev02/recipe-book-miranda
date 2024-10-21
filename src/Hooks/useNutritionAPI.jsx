import React, { useEffect, useState } from 'react';
import { NutritionalDB } from '../JavaScript/NutrientDataBase.js';

/**
 * @hook Makes multiple fetch calls to the FoodData Center API to obtain the nutritional info for each of the elements contained within the ingredientsArray. All elements in the ingredients array
 * need to be valid url parameters meaning that certain characters must be encoded instead of typed. 
 * @param {string} ingredientsArray - All ingredients that a fetch call will be generated for and passed to the API.
 * @param {string} apiKey - API key used to provide credentials to the FoodData Center API.
 */
export function UseNutritionAPI(ingredientsArray, apiKey) {
    const [ nutritionalInfo, setNutritionalInfo ] = useState([]);
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);

    /**
     * @function Initiates and checks the connection to the indexDB used to cache any nutritional info made to the API. If the connection fails an error is returned, otherwise 'null' is returned.
     * @param {object} NutrientAPIStorage - Newly initialized object that houses the various methods and attributes needed to access the browser's indexDB for storing nutritional info.
     */
    async function connectToDataBases(NutrientAPIStorage) {
        try {
            let isConnect = await NutrientAPIStorage.openDataBaseConnection();
            if (!isConnect) throw new Error('Failed to connect to DataBases')
            return null;
        } catch (error) {
            return error;
        }
    }

    /**
     * @function Adds the information returned by the API to nutritional database stored in the browser. This function returns a promise so that its results can be handled in parallel with other
     * fetch calls made to either the API or database. The returned promise either passes an object containing the nutrient info for the ingredient or an object containing the error that occurred.
     * The ok property is used within both objects to signify if the promise resolved or rejected.
     * Also, if no information is obtained from the API call, then empty or null values are returned and saved to denote that no value exists for the ingredient.
    * @param {object} NutrientAPIStorage - Newly initialized object that houses the various methods and attributes needed to access the browser's indexDB for storing nutritional info.
    * @param {string} ingredientQueryString - Ingredient query that was used to make the fetch call to obtain the information for the ingredient.
    * @param {object} nutritionalData - Contains all of the ingredient's nutritional info and identification number.
     */
    async function addToDataBases(NutrientAPIStorage, ingredientQueryString, nutritionalData) {
        return new Promise((resolve, reject) =>  {
            try {
                let fdcId;
                let nutrientsArray;
                if (nutritionalData.foods[0]) {
                    fdcId = nutritionalData.foods[0].fdcId;
                    nutrientsArray = nutritionalData.foods[0].foodNutrients;
                } else {
                    fdcId = 0;
                    nutrientsArray = [];
                }
    
                NutrientAPIStorage.addIngredientQuery(ingredientQueryString, fdcId);
                NutrientAPIStorage.addFoodNutrients(fdcId, nutrientsArray);
    
                resolve({ok: true, result: {fdcId, nutrientsArray}})
            } catch (error) {
                reject({ok: false, error});
            }
        })
    }

    // Rerun each time the ingredientsArray or apiKey changes.
    // Performs the various fetch calls for all ingredients and handles the responses obtained from them.
    // A initial check is made to ensure that the user has attempted to enter a valid apiKey to avoid making unnecessary fetch calls.
    useEffect(() => {
        if (apiKey == '') {
            setIsLoading(false);
            setErrorOccurred('Invalid API Key');
        } else {
            const controller = new AbortController();
            const signal = controller.signal;
            let NutrientAPIStorage = new NutritionalDB();
            // The two functions are initialized within the useEffect callback to provide easier accessibility to the AbortController and NutrientAPIStorage object.

            /**
             * @function Attempts to obtain nutritional information for the passed in ingredientQuery from the database but if the data is not present, the fetch call is made to obtain
             * the nutritional information from the FoodData Center API. The response is then passed to the addToDataBases function. 
             * Either way the information is obtained, a promise is returned from this function.
             * @param {string} ingredientQuery - Ingredient query that will be used to make the fetch call to obtain the information for the ingredient.
             */
            const fetchNutritionalInfo = async (ingredientQuery) => {
                let response = await NutrientAPIStorage.getIngredientQuery(ingredientQuery);
                if (response.ok) {
                    return NutrientAPIStorage.getNutrients(response.result);
                } else {
                    const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&dataType=Foundation&pageSize=1&pageNumber=1&query=`;
                    let ingredientSearch = uriAPI + ingredientQuery;
                    let response = await fetch(ingredientSearch, {signal});
                    if (!response.ok) return {ok: false, error: {message: `Fetch Call Failed with a status of ${response.status}`}};
                    let nutritionalData = await response.json();
                    return addToDataBases(NutrientAPIStorage, ingredientQuery, nutritionalData);
                }
            }

            /**
             * @function Obtains and collects all nutritional data for each element within the ingredientQueriesArray. This information is obtained by either accessing it from the database
             * or by obtaining it from the FoodData Center API.
             * Promise.all() is used to handle all promises returned by the fetchNutritionalInfo call so that the information as a whole will be handled at once.
             * @param {array} ingredientQueriesArray - Contains all ingredientQueries that will be used to gather their respective ingredient's nutritional info.
             */
            const collectAllData = async (ingredientQueriesArray) => {
                try {
                    let error = await connectToDataBases(NutrientAPIStorage)
                    if (error) throw new Error(error);
                    let allResponses = ingredientQueriesArray.map(ingredient => fetchNutritionalInfo(ingredient));
                    
                    let allResults = await Promise.all(allResponses);
                    let allData = allResults.map((response, index) => {
                        if (!response.ok) {
                            // If the promise contains a DeSync error, then the issue will persist indifferently due to one of the database objectStores being out of sync with the other.
                            // In this case the best thing to do is to clear the database and to reload the page to clear all other potential DeSynchronized errors.
                            if (response.error.errorType == 'DeSync') {
                                NutrientAPIStorage.clearDataBase();
                                window.location.reload();
                            }
                            // If it is not a desync error then the user can be alerted towards the error.
                            throw new Error(response.error.message);
                        }    
                        // To simplify the returned object, all gathered information is returned in the same format regardless of if it was obtained from the database or a new fetch call.
                        return {searchQuery: ingredientQueriesArray[index], ...response.result}
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
