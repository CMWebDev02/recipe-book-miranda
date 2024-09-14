export class SavedRecipes {
    static checkIfSaved(recipe) {
        let newRecipeString = JSON.stringify(recipe);

        let tempRecipeBook = JSON.parse(localStorage.getItem('recipe-book')) || [];
        
        // Double check this method, so far, it removes the id property and then stringifies the object and compares the string data to check if the two objects are the same.
        for (let savedRecipe of tempRecipeBook) {
            delete savedRecipe['id'];
            delete savedRecipe.id;
            console.log(savedRecipe)
            let oldRecipeString = JSON.stringify(savedRecipe);
            if (oldRecipeString == newRecipeString) {
                return false;
            }
        }

        return true;
    }

    static storeRecipe(newRecipe) {
        let newID = 'id-' + (Math.random() * Date.now()).toString(16).substring(0, 16);

        let result = this.checkIfSaved(newRecipe)
        if (result) {
            let currentRecipeBook = JSON.parse(localStorage.getItem('recipe-book')) || [];
            newRecipe.id = newID;
            currentRecipeBook.push(newRecipe);
            localStorage.setItem('recipe-book', JSON.stringify(currentRecipeBook));
            return true;
        } else {
            return false
        }        
    }

    static getRecipeBook() {
        return JSON.parse(localStorage.getItem('recipe-book')) || [];
    }
}