addEventListener('message', ({data}) => {
    if (data.command == 'collectAll') {
        getAllIngredients(data.ingredientsList);
    }
})

function getAllIngredients(list) {
    let newArr = list.split('|');

    postMessage(newArr);
}