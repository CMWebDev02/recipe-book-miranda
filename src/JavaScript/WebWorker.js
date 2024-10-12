addEventListener('message', ({data}) => {
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

// Ingredient Related Worker Functions

function convertIngredientString(ingredient) {
    let regexPattern = /\W+/g;
    return ingredient.replace(regexPattern, '%20')
}

function getAllIngredients(string) {
    let ingredientsArray = string.split('|');
    let ingredientQueries = ingredientsArray.map(ingredient => convertIngredientString(ingredient));
    return [ingredientsArray, ingredientQueries]
}

function gatherIngredients(list) {
    let allIngredients = list.map(({ingredients}, index) => {
        return [`Meal #${index + 1}`, ingredients.split('|')]
    })

    return allIngredients;
}

// Nutrient Related Functions
function newNutrientsArray() {
    return {1093: {value: 0, nutrientName: 'Sodium, Na', unitName: 'MG'}, 
            1004: {value: 0, nutrientName: 'Total lipid (fat)', unitName: 'G'},
            1079: {value: 0, nutrientName: 'Fiber, total dietary', unitName: 'G'},
            1003: {value: 0, nutrientName: 'Protein', unitName: 'G'},
            2048: {value: 0, nutrientName: 'Energy (Atwater Specific Factors)', unitName: 'KCAL'},
            1050: {value: 0, nutrientName: 'Carbohydrate, by summation', unitName: 'G'}};
}

function filterNutrientArray(arr) {
    let allIngredients = [];
    let totalNutrients = new newNutrientsArray()

    function filterAndTally(nutrient) {
        switch (nutrient.nutrientId) {
            case 1093: {// Sodium
                totalNutrients[1093].value += nutrient.value;
                return true;
            }
            case 1004: {// Fat
                totalNutrients[1004].value += nutrient.value;
                return true;
            }
            case 1079: {// Fiber
                totalNutrients[1079].value += nutrient.value;
                return true;
            }
            case 1003: {// Protein
                totalNutrients[1003].value += nutrient.value;
                return true;
            }
            case 2048: {// Calories
                totalNutrients[2048].value += nutrient.value;
                return true;
            }
            case 1050: {// Carbs
                totalNutrients[1050].value += nutrient.value;
                return true;
            }
            default: {
                return false;
            }
        }
    }

    arr.forEach(ingredient => {
        let title = ingredient.foodSearchCriteria.generalSearchInput;
        let filteredNutrients = ingredient.foods[0].foodNutrients.filter(nutrient => filterAndTally(nutrient));

        let allNutrients = filteredNutrients.map(({nutrientName, value, unitName, nutrientId}) => {
            return {nutrientName, value, unitName, nutrientId}
        })
        allIngredients.push({searchQuery: title, nutritionalInfo: allNutrients})
    });

    return [allIngredients, Object.values(totalNutrients)]
}

// Miscellaneous Functions
function convertFromSRC(src) {
    let titleString = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    titleString = titleString.match(/[\D|-]+/gi)
    titleString = titleString[0].replace(/[-]/gi, ' ')
    return titleString;
}

function convertToTitle(string, srcFlag) {
    let titleString = string;
    if (srcFlag) {
        titleString = convertFromSRC(titleString);
    }
    let titleStrings = titleString.split(' ')
    
    let finalTitle = titleStrings.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');

    return finalTitle;
}