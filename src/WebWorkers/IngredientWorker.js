const APIKey = 'DEMO_KEY'

const uriAPI = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${APIKey}&query=`

// TODO: 
// - Limit the results per page to just 1 since I am after only one result and limit pages returned to 1.
// - Set more query parameters to thing like generic foods
// - Only take the food nutritional info from the result and log only a couple of them to screen
    // Likely only the most important like macro nutrients and maybe sodium.
// - Set it up to have promise.all() or promise.any() post the final message
// Change from .then() statements to async and await method.

addEventListener('message', ({data}) => {
    if (data.command == 'collectAll') {
        getAllIngredients(data.ingredientsList);
    }
})

function getAllIngredients(list) {
    let ingredientsArray = list.split('|');

    // generateRequests(ingredientsArray)


    // postMessage(ingredientsArray);
}

function convertIngredientString(ingredient) {
    let regexPattern = /\W+/g;
    return ingredient.replace(regexPattern, '%20')
}

function generateRequests(ingredients) {
    let allPromises = [];

    ingredients.forEach(ingredient => {
        let ingredientString = convertIngredientString(ingredient);
        let ingredientSearch = uriAPI + ingredientString;
        let newRequest = new Request(ingredientSearch, {
            method: 'GET',
        })
        allPromises.push(newRequest); 
    })

    console.log(allPromises)

    fetch(allPromises[0])
    .then(response => {
        if (!response.ok) throw new Error(`Fetch Failed for Ingredient: ${response.status}`);
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(console.error);

    // return ingredient
}

