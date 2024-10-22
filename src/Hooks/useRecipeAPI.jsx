import React, { useEffect, useState } from "react";

/**
 * @hook Fetches an array of recipes based on the recipeParameter passed in. After the search is completed via making the fetchAPI call, the array of 10 items is returned.
 * The pageParam is used to offset the number of recipes returned in cases where more than ten recipes are available from the recipe API.
 * @param {string} recipeParam - Recipe query that will be passed to the fetch call to provide the user with results matching their search term.
 * @param {number} pageParam - Page query that will offset the number of recipes returned in cases where more than 10 recipes are available.
 * @param {string} APIKey - API key used to provide credentials when making the fetch call to the recipe API.
 */
export function UseRecipeAPI({recipeParam, pageParam, APIKey}) {
    // This is the base url for the fetch call to make it easier to add the user's search term and the page offset.
    const uriAPI = 'https://api.api-ninjas.com/v1/recipe?query=';
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    // Reruns every time the 
    useEffect(() => {
      const controller = new AbortController;
      const signal = controller.signal;

      const uriHeaders = new Headers({
        'x-api-key': APIKey
      });
      let search = uriAPI + recipeParam + '&offset=' + (pageParam * 10);

      const request = new Request(search, {
        method: 'GET',
        headers: uriHeaders,
        signal
      })

      if (APIKey == '') {
        setErrorOccurred('API Key not valid... Request Canceled');
        setIsLoading(false);
      } else {
        fetch(request)
        .then(response => {
              if (!response.ok) throw new Error(`Fetch request failed with a status code of ${response.status}`);
              return response.json();
          })
          .then(recipes => {
            if (recipes.length == 0) throw new Error(`No Recipes Found!`);
            setAllRecipes(recipes);
            setErrorOccurred(null);
          })
          .catch(error => {
            if (error.name != 'AbortError') {
              setErrorOccurred(error.message);
            }
          }) 
          .finally(() => {
              setIsLoading(false);
          })
      };

      return () => {
        controller.abort();
      }
    }, [recipeParam, pageParam, APIKey])

    return { errorOccurred, allRecipes, isLoading };
}