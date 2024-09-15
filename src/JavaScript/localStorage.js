export class SavedRecipes {
    static checkIfSaved(recipe) {
        let newRecipeString = JSON.stringify(recipe);

        let tempRecipeBook = this.getRecipeBook();
        
        for (let savedRecipe of tempRecipeBook) {
            delete savedRecipe.id;
            delete savedRecipe['id'];
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

        // Checks the result of the checkIfSaved method call
        if (result) {
            // If true, the item is not in the list and it needs to be added,

            // The recipe book is again pulled from store to preserve the id for each recipe, since the above method removes the ones last pulled from storage.
            let currentRecipeBook = this.getRecipeBook();
            // A shallow copy of the passed in newRecipe object is declared in a new variable.
            // // The passed in object is persistent through the whole project, by adding the id property the object will contain it until the page reloads, so when attempting to add it again,
            // // the id property was remaining and allowing the item to be added multiple times. Shallow copying allows the id property to be added to a recipeObj without having it persist
            // // through the passed in object.
            // // // From here on note that passing objects or other variables through different files still maintains the object or variables same place in memory, so any altering made in another file
            // // // will still apply even when returning to the original file, so in my case the object on the recipe list page would have the id property added to the recipe object until the page reloaded
            // // // which is why the item could be added continuously since the comparison requires comparing the recipes' stringified components to see if they are identical, and if it had the unaccounted for
            // // // id property then it would allow it to be added repeatedly.
            let recipeToAdd = {...newRecipe};
            // Add a new id property with a randomized id value to the recipeToAdd Object.
            recipeToAdd.id = newID;
            // Pushes the recipeToAdd object to the recipe book array and then calls the method to store the array in localStorage
            currentRecipeBook.push(recipeToAdd);
            this.setRecipeBook(currentRecipeBook);
            // Alert the user the item was added successfully
            alert('Item Added')
        } else {
            // If false, the item is already stored in the list so the user is alerted that the item is not added.
            alert('Item Already Saved...')
        }        
    }

    static removeRecipe(recipeID) {
        let currentRecipeBook = this.getRecipeBook();

        for (const index in currentRecipeBook) {
            if (currentRecipeBook[index].id == recipeID) {
                currentRecipeBook.splice(index, 1);
                this.setRecipeBook(currentRecipeBook);
                alert('Recipe Removed')
                return;
            }
        }

        alert('Recipe Removal Failed...')
    }

    static getRecipeBook() {
        return JSON.parse(localStorage.getItem('recipe-book')) || [];
    }

    static setRecipeBook(allRecipes) {
        localStorage.setItem('recipe-book', JSON.stringify(allRecipes))
    }
}