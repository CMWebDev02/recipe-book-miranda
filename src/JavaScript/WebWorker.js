/* Initializes a global eventlistener to handle any messages that are posted to the worker.
The eventlistener is shared across all workers and the command property of the passed in data object is used to determine which function to execute. */
addEventListener('message', ({data}) => {
    /* All postMessage methods return an object that contains their executed data along with their associate command properties in case multiple
        workers are active, this way the eventlistener waiting for the message can check that the posted message is intended for them. */
    switch (data.command) {
        // Ingredient Related Cases
        case 'splitIngredientString': {
            let [ ingredientsArray, ingredientQueries ] = getAllIngredients(data.ingredientsString);
            postMessage({command: 'splitIngredientString', ingredientsArray, ingredientQueries});
            break;
        }
        case 'generateShoppingList' : {
            let groceryList = gatherIngredients(data.mealList);
            postMessage({command: 'generateShoppingList', groceryList})
            break;
        }
        // Nutrient Related Cases
        case 'collectNutrients': {
            let [ingredientNutrients, totalNutritionalInfo] = filterNutrientArray(data.nutrientsArray);
            postMessage({command: 'collectNutrients', ingredientNutrients, totalNutritionalInfo});
            break;
        }
        // Miscellaneous  
        case 'convertToTitle': {
            let imageTitle = convertToTitle(data.imageString, data.srcBool)
            postMessage({command: 'convertTitle', imageTitle});
            break;
        }
    }
})

//* Ingredient Related Worker Functions

/**
 * @function Converts a standard string to a valid URI by percent encoding certain characters.
 * In this case, all white space is replaced by %20 which denotes a space.
 * @param {string} ingredient - Ingredient that will be converted to a valid query parameter.
 */
function convertIngredientString(ingredient) {
    let regexPattern = /\W+/g;
    return ingredient.replace(regexPattern, '%20')
}

/**
 * @function Returns all ingredients and query parameter counterparts of the passed in string and these two arrays are returned in a singular array.
 * The ingredient for a recipe are all obtained in a singular string so this is function servers to convert the string to an array.
 * @param {string} allIngredients - String containing all ingredients separated by a "|".
 */
function getAllIngredients(allIngredients) {
    let ingredientsArray = allIngredients.split('|');
    let ingredientQueries = ingredientsArray.map(ingredient => convertIngredientString(ingredient));
    return [ingredientsArray, ingredientQueries]
}

/**
 * @function Converts all ingredient strings for each element in the ingredientsArray into their own arrays and creates a title for each meal based using the index value.
 * An array is returned that contains multiple arrays, within these arrays are the meal's title followed by an array of ingredients needed to prepare the meal.
 * @param {array} ingredientsArray - An array of strings that contain all ingredients required to prepare a recipe.
 */
function gatherIngredients(ingredientsArray) {
    let allIngredients = ingredientsArray.map(({ingredients}, index) => {
        return [`Meal #${index + 1}`, ingredients.split('|')]
    })

    return allIngredients;
}

//* Nutrient Related Functions

/**
 * @function Converts a query parameter valid string to a standard title. Percent encoded characters are reverted to their counterparts and '/' are inserted when necessary.
 * @param {string} queryParameter - Query parameter valid string that will be converted to a human readable title.
 */
function convertToNutrientTitle(queryParameter) {
    let titleString = queryParameter.replaceAll(/%20+/g, ' ')
    return titleString.replace(/(^\d )?(\d) (\d)/, '$1$2/$3')
}

/**
 * @function Returns a new object containing an entry for each nutrient that will be displayed for an ingredient.
 * Each macro and micro nutrient is accessed by their nutrientId.
 */
function newNutrientsArray() {
    return {1093: {value: 0, nutrientName: 'Sodium, Na', unitName: 'MG'}, 
            1004: {value: 0, nutrientName: 'Total lipid (fat)', unitName: 'G'},
            1079: {value: 0, nutrientName: 'Fiber, total dietary', unitName: 'G'},
            1003: {value: 0, nutrientName: 'Protein', unitName: 'G'},
            2048: {value: 0, nutrientName: 'Energy (Atwater Specific Factors)', unitName: 'KCAL'},
            1050: {value: 0, nutrientName: 'Carbohydrate, by summation', unitName: 'G'}};
}

/**
 * @function Filters the passed in nutrient object by returning true if the nutrientId is one contained within the list, this is done by returning true if it is within the list and false otherwise.
 * In addition, if the nutrient is within the list, the ingredient's value is added to the totalNutrientsObj to keep a tally of the total amounts of each nutrient specified.
 * @param {object} nutrientObj - Contains all information for a specific nutrient of an ingredient.
 * @param {object} totalNutrientsObj - Keeps a running total of each nutrient found in all ingredients within a recipe.
 */
function filterAndTally(nutrientObj, totalNutrientsObj) {
    switch (nutrientObj.nutrientId) {
        case 1093: {// Sodium
            totalNutrientsObj[1093].value += nutrientObj.value;
            return true;
        }
        case 1004: {// Fat
            totalNutrientsObj[1004].value += nutrientObj.value;
            return true;
        }
        case 1079: {// Fiber
            totalNutrientsObj[1079].value += nutrientObj.value;
            return true;
        }
        case 1003: {// Protein
            totalNutrientsObj[1003].value += nutrientObj.value;
            return true;
        }
        case 2048: {// Calories
            totalNutrientsObj[2048].value += nutrientObj.value;
            return true;
        }
        case 1050: {// Carbs
            totalNutrientsObj[1050].value += nutrientObj.value;
            return true;
        }
        default: {
            return false;
        }
    }
}
 
/**
 * @function Returns all nutritional info for each ingredient element in the array and an array containing the total values of each nutrient.
 * @param {array} ingredientsArr - Contains the result of the API call and houses all of the nutritional info for the ingredient passed to the API call.
 */
function filterNutrientArray(ingredientsArr) {
    // A new array is initialized that will store objects that contain the ingredients nutritional info and a display title.
    let allIngredients = [];
    // The newNutrientsArray function is used to create a shallow copy of the totalNutrient object to store a running total of each ingredient's nutrients.
    let totalNutrients = new newNutrientsArray()

    // Iterates through each ingredient in the passed in array to gather the necessary nutrients and a human readable title of said ingredient to display to the user.
    ingredientsArr.forEach(ingredient => {
        let title = convertToNutrientTitle(ingredient.searchQuery);
        let filteredNutrients = ingredient.nutrientsArray.filter(nutrient => filterAndTally(nutrient, totalNutrients));

        // After filtering the nutrients, only the information necessary to display to the user is saved from the nutrient object.
        let allNutrients = filteredNutrients.map(({nutrientName, value, unitName, nutrientId}) => {
            return {nutrientName, value, unitName, nutrientId}
        })

        // After gathering all of the necessary nutrients and nutrient info and creating a display title, this information is pushed into the array within a new object.
        allIngredients.push({searchQuery: title, nutritionalInfo: allNutrients})
    });

    // Once all of the ingredients nutritional info are gathered and their total values are tallied, an array is returned containing this information.
    // The first element is the nutritional objects and the second is an array of objects that contain the total nutritional values gathered for each micro and macro nutrients.
    return [allIngredients, Object.values(totalNutrients)]
}

//* Miscellaneous Functions

/**
 * @function Obtains a display title from a src image link. In cases where only a src of a recipe is provided, this will generate a recipe title by pulling the last describing word
 * from the passed in src.
 * @param {string} src - SRC string that will be used to generate a display title for the image it links to.
 */
function convertFromSRC(src) {
    // A substring is generated of the last full word within the src, all characters between the last '/' and last '.' are used.
    let describingWord = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    // From here any character that are not a digit are matched are saved into a new variable.
    let [ titleString ] = describingWord.match(/[\D|-]+/gi)
    // Finally, all '-'s are found and replaced with spaces before being returned.
    return titleString.replace(/[-]/gi, ' ')
}

/**
 * @function Converts the passed in string to a display title for the recipe.
 * If the srcFlag is true then the initialString is first converted to a recipe title before hand.
 * The display title will have a capital letter for each word in the title.
 * @param {string} initialString - Initial string that will be converted to a human readable title.
 * @param {boolean} srcFlag - Denotes that the initialString is an src link that will need to be converted to a recipe title.
 */
function convertToTitle(initialString, srcFlag) {
    let titleString = initialString;
    if (srcFlag) {
        titleString = convertFromSRC(titleString);
    }
    let titleStrings = titleString.split(' ')
    
    let finalTitle = titleStrings.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');

    return finalTitle;
}