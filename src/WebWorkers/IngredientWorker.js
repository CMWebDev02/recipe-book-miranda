// TODO:
// Take all Ingredients from and format them as a shopping list.
// // Have the worker take in multiple arrays from each recipe using a reducer callback and pass it to the worker for it to be formatted into a printable or page structure.

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