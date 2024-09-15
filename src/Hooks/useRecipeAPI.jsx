import React, { useEffect, useState } from "react";
import { apiKey } from "../JavaScript/userKeyChange";

const tempRecipes = [
    {
      "title": "Stracciatella (Italian Wedding Soup)",
      "ingredients": "3 1/2 c Chicken broth; homemade|1 lb Fresh spinach; wash/trim/chop|1 Egg|1 c Grated parmesan cheese; --or--|1 c Romano cheese; freshly grated|Salt and pepper; to taste",
      "servings": "4 servings",
      "instructions": "Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into 'rags.' Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese. NOTES: Someone asked for this recipe a while back. I believe this soup, known as 'Stracciatella' is synonymous with Italian Wedding Soup, however, I seem to remember from I-don't-know-where that Italian Wedding Soup is the same as this but with the addition of tiny meatballs.",
    },
    {
      "title": "Italian Wedding Soup",
      "ingredients": "1/2 lb Ground beef|1/2 lb Ground veal|1/4 c Italian seasoned bread crumb|1 Egg|1 tb Parsley|Salt and pepper to taste|4 c Chicken broth|2 c Spinach leaves cut into piec|1/4 c Grated Pecorino Romano chees",
      "servings": "1 Servings",
      "instructions": "Combine the ground meat, bread crumbs, egg, parsley, salt and pepper in a bowl. Mix well and form into tiny meat balls. Bake on a cookie sheet for 30 minutes at 350F. Meanwhile, bring broth to a boil and add spinach. Cover and boil for 5 minutes. Add the meatballs to the hot broth, bring to a simmer. Stir in the cheese and serve immediately. Rita in Scottsdale 01/02/92 01:41 am"
    },
    {
      "title": "Stracciatella (Italian Wedding Soup)",
      "ingredients": "1 lb Fresh spinach, washed and chopped|1 Egg|1 c Parmesan cheese, * see note|Salt, to taste|Pepper, to taste",
      "servings": "6 Servings",
      "instructions": "Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into 'rags.' Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese."
    },
    {
      "title": "Italian Wedding Soup",
      "ingredients": "2 qt Chicken stock|1 Chopped carrot|1/2 Chopped onion|1 Chopped celery|2 oz Ground meat; (or ground vegieburger can be used)|1 Egg|1 Sprig of chopped parsely",
      "servings": "4 - 6 servin",
      "instructions": "Bring chicken stock to a boil add the chopped carrot,celery and onion and lower heat. Combine ground meat or vegieburger, egg, and parsely, the consistancy of the mixture is kinda loose. Drop in small pieces of the meat mixture, not much larger than a Tablespoon. (making tiny meatballs.) Turn up the heat and bring to a boil,5 -7 minutes, it is ready when the little meatballs float to the surface."
    }
];

const uriAPI = 'https://api.api-ninjas.com/v1/recipe?query=';


export function useRecipeAPI(searchParameter) {
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ allRecipes, setAllRecipes ] = useState(tempRecipes);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        const uriHeaders = new Headers({
          'x-api-key': apiKey
        });
        
        let search = uriAPI + searchParameter;
        
        const request = new Request(search, {
          method: 'GET',
          headers: uriHeaders,
        })

        if (apiKey == '') {
          setErrorOccurred('API Key not valid... Request Canceled');
          setIsLoading(false);
        } else {
          fetch(request)
          .then(response => {
                if (!response.ok) throw new Error(`Fetch request failed with a status code of ${response.status}`);
                return response.json();
            })
            .then(recipes => {
                setAllRecipes(recipes);
                setErrorOccurred(null);
            })
            .catch(error => {
                setErrorOccurred(error.message);
                console.log(error.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
        };
    }, [searchParameter])

    return { errorOccurred, allRecipes, isLoading };
}