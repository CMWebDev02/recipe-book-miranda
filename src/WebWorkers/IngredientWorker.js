
// TODO: 
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
    let ingredientQueries = ingredientsArray.map(ingredient => convertIngredientString(ingredient));

    postMessage({ingredientsArray, ingredientQueries});
}

function convertIngredientString(ingredient) {
    let regexPattern = /\W+/g;
    return ingredient.replace(regexPattern, '%20')
}