addEventListener('message', (({data}) => {
    if (data.message == 'collectNutrients') {
        filterNutrientArray(data.nutrientsArray);
    }
}))

function newNutrientsArray() {
    return {1093: {value: 0, nutrientName: 'Sodium, Na', unitName: 'MG'}, 
            1004: {value: 0, nutrientName: 'Total lipid (fat)', unitName: 'G'},
            1079: {value: 0, nutrientName: 'Fiber, total dietary', unitName: 'G'},
            1003: {value: 0, nutrientName: 'Protein', unitName: 'G'},
            2048: {value: 0, nutrientName: 'Energy (Atwater Specific Factors)', unitName: 'KCAL'},
            1050: {value: 0, nutrientName: 'Carbohydrate, by summation:', unitName: 'G'}};
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
        console.log(filteredNutrients)
        console.log(totalNutrients)

        let allNutrients = filteredNutrients.map(({nutrientName, value, unitName, nutrientId}) => {
            return {nutrientName, value, unitName, nutrientId}
        })
        allIngredients.push({searchQuery: title, nutritionalInfo: allNutrients})
    });


    postMessage({message: 'collectNutrients', allNutrients: allIngredients, totalNutritionalInfo: Object.values(totalNutrients)})
}