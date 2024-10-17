import React, { useEffect, useState } from "react";



export function UseRecipeAPI({recipeParam, pageParam, APIKey}) {
    const uriAPI = 'https://api.api-ninjas.com/v1/recipe?query=';
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    // Add Abort Controller and include it in the effect's return statement.
    
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