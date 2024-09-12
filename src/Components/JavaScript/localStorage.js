export class SavedRecipes {
    static storeRecipe(newRecipe) {
        let currentRecipeBook = JSON.parse(localStorage.getItem('recipe-book')) || [];

        // This will compare the string of the recipe object being passed in to the already present recipe objects in the recipe book, currently
        // this is the best I can come up with to ensure that no duplicates are added to the list but I should try and find a better method.
        for (const recipe of currentRecipeBook) {
            let oldRecipeString = JSON.stringify(recipe);
            let newRecipeString = JSON.stringify(newRecipe);
            if (oldRecipeString == newRecipeString) {
                return false;
            }
        }
        
        currentRecipeBook.push(newRecipe);
        localStorage.setItem('recipe-book', JSON.stringify(currentRecipeBook));
        return true;
    }

    static getRecipeBook() {
        return JSON.parse(localStorage.getItem('recipe-book')) || [];
    }
}