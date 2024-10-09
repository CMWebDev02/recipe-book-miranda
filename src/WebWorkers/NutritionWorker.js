// TODO:
// Create this worker to take all nutritional info passed into it and have it display totals based on the nutrient passed in and based on the amount of ingredients passed in.
addEventListener('message', (({data}) => {
    if (data.message == 'collectTotal') {
        tallyNutrients(data.nutrientsArray);
    } else if (data.message == 'filterNutrients') {
        filterNutrientArray(data.nutrientsArray);
    } 
}))

function tallyNutrients(arr) {
    let totalSodium = 0, totalFats = 0, totalFiber = 0, totalProtein = 0, totalCalories = 0, totalCarbs = 0;

    // Maybe find a better way to do this.
    arr.map(({nutritionalInfo}) => {
        nutritionalInfo.map(({nutrientId, value}) => {
            switch (nutrientId) {
                case 1093:
                    totalSodium += value;
                    break;
                case 1004:
                    totalFats += value;
                    break;
                case 1079:
                    totalFiber += value;
                    break;
                case 1003:
                    totalProtein += value;
                    break;
                case 2048:
                    totalCalories += value;
                    break;
                case 1050:
                    totalCarbs += value;
                    break;
            }
        })
    })

    let totalNutrients = [{value: totalSodium, nutrientName: 'Sodium, Na', unitName: 'MG'}, 
                            {value: totalFats, nutrientName: 'Total lipid (fat)', unitName: 'G'},
                            {value: totalFiber, nutrientName: 'Fiber, total dietary', unitName: 'G'},
                            {value: totalProtein, nutrientName: 'Protein', unitName: 'G'},
                            {value: totalCalories, nutrientName: 'Energy (Atwater Specific Factors)', unitName: 'KCAL'},
                            {value: totalCarbs, nutrientName: 'Carbohydrate, by summation:', unitName: 'G'}];

    postMessage({message: 'collectTotal', nutritionalTotal: totalNutrients})
}

function filterNutrientArray(arr) {
    let allIngredients = [];
    arr.forEach(ingredient => {
        let title = ingredient.foodSearchCriteria.generalSearchInput;
        let filteredNutrients = ingredient.foods[0].foodNutrients.filter(nutrient => nutrientFilter(nutrient.nutrientId));

        let allNutrients = filteredNutrients.map(({nutrientName, value, unitName, nutrientId}) => {
            return {nutrientName, value, unitName, nutrientId}
        })
        allIngredients.push({searchQuery: title, nutritionalInfo: allNutrients})
    });

    postMessage({message: 'filterNutrients', allNutrients: allIngredients})
}

function nutrientFilter(nutrient) {
    switch (nutrient) {
        case 1093: // Sodium
        case 1004: // Fat
        case 1079: // Fiber
        case 1003: // Protein
        case 2048: // Calories
        case 1050: // Carbs
            return true;
            break;
    }
}