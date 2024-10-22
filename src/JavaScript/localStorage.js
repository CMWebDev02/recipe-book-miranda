/**
 * @class Base class containing all of the shared methods used to access the localStorage arrays via the itemKeys attribute.
 * @param {type} variable - description .
 */
class localStorageAccess {
    // This class contains the methods utilized to access both the meal planner and recipe list array housed within localStorage.
    // The class attribute of itemKey is used to specify the key needed to access the necessary array in localStorage.

    /**
     * @function 
     * @param {type} variable - description .
     */
    static checkIfSaved(recipe) {
        let newRecipeString = JSON.stringify(recipe);

        let tempRecipeBook = this.getList();
        
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
            let currentRecipeBook = this.getList();
            // A shallow copy of the passed in newRecipe object is declared in a new variable.
            // The passed in object is persistent through the whole project, by adding the id property the object will contain it until the page reloads, so when attempting to add it again,
            // the id property was remaining and allowing the item to be added multiple times. Shallow copying allows the id property to be added to a recipeObj without having it persist
            // through the passed in object.
            // From here on note that passing objects or other variables through different files still maintains the object or variables same place in memory, so any altering made in another file
            // will still apply even when returning to the original file, so in my case the object on the recipe list page would have the id property added to the recipe object until the page reloaded
            // which is why the item could be added continuously since the comparison requires comparing the recipes' stringified components to see if they are identical, and if it had the unaccounted for
            // id property then it would allow it to be added repeatedly.
            let recipeToAdd = {...newRecipe};
            // Add a new id property with a randomized id value to the recipeToAdd Object.
            recipeToAdd.id = newID;
            // Pushes the recipeToAdd object to the recipe book array and then calls the method to store the array in localStorage
            currentRecipeBook.push(recipeToAdd);
            this.setList(currentRecipeBook);
            // Alert the user the item was added successfully
            alert('Item Added')
        } else {
            // If false, the item is already stored in the list so the user is alerted that the item is not added.
            alert('Item Already Saved...')
        }        
    }

    static removeRecipe(recipeID) {
        let currentRecipeBook = this.getList();

        for (const index in currentRecipeBook) {
            if (currentRecipeBook[index].id == recipeID) {
                currentRecipeBook.splice(index, 1);
                this.setList(currentRecipeBook);
                alert('Recipe Removed')
                return;
            }
        }

        alert('Recipe Removal Failed...')
    }

    static getList() {
        return JSON.parse(localStorage.getItem(this.itemKey)) || [];
    }

    static setList(allRecipes) {
        localStorage.setItem(this.itemKey, JSON.stringify(allRecipes))
    }
}

/**
 * @class Provides access to the localStorage array associated with the recipe book.
 */
export class SavedRecipes extends localStorageAccess {
    // The itemKey is set when extending the base class.
    static itemKey = 'recipe-book';
}

/**
 * @class Provides access to the localStorage array associated with the meal planner.
 */
export class MealPlan extends localStorageAccess {
    // The itemKey is set when extending the base class.
    static itemKey = 'meal-plan';

    /**
     * @function Stores a recipe into the localStorage array. Duplicate recipes can be saved in case a user wants to have it on multiple days of the week. 
     * @param {object} newRecipe - Recipe object that will be saved in localStorage.
     */
    static storeRecipe(newRecipe) {
        let newID = 'id-' + (Math.random() * Date.now()).toString(16).substring(0, 16);

        let currentRecipeBook = this.getList();
        let recipeToAdd = {...newRecipe};
        recipeToAdd.id = newID;
        currentRecipeBook.push(recipeToAdd);
        this.setList(currentRecipeBook);
        alert('Item Added To Meal Planner');
    }

    /**
     * @function Either removes or adds a weekday property to the recipe specified by the passed in recipeID. If no recipe is found the function halts execution.
     * @param {string} action - Denotes what code block will execute.
     * @param {string} weekday - Specifies the value of the weekday property for the recipe.
     * @param {string} recipeID - Specifies the recipe that will be altered within localStorage.
     */
    static updateRecipe(action, weekday, recipeID) {
        // Gets the list of recipes from localStorage and initializes a variable to store the recipe matching the recipeID that is passed in.
        let currentRecipeBook = this.getList();

        let foundRecipe = this.findRecipe(recipeID)
        if (!foundRecipe) return;

        if (action == 'add') {
            foundRecipe['weekday'] = weekday;
            this.setList(currentRecipeBook)
            alert(`Recipe Added to ${weekday}`)
            return;
        } else if (action == 'remove') {
            // Removes both the weekday property value and the property key.
            delete foundRecipe.weekday;
            delete foundRecipe['weekday'];
            this.setList(currentRecipeBook)
            alert('Recipe Moved Back')
            return;
        }        
    }

    /**
     * @function Iterates through the array in localStorage and returns the recipe that contains the same matching recipeID argument. If no matching recipe is found then a null value is returned.
     * @param {string} recipeID - Identification value that signifies which recipe to obtain from localStorage.
     */
    static findRecipe(recipeID) {
        let currentRecipeBook = this.getList();

        for (const recipe of currentRecipeBook) {
            if (recipe.id == recipeID) {
                return recipe;
            }
        }

        return null;
    }
}