/**
 * @class Base class containing all of the shared methods used to access the localStorage arrays via the itemKeys attribute.
 * @param {type} variable - description .
 */
class localStorageAccess {
    // This class contains the methods utilized to access both the meal planner and recipe list arrays housed within localStorage.
    // The class attribute of itemKey is used to specify the key needed to access the associated array in localStorage.

    /**
     * @method Crosschecks the passed in recipe object against all other recipes currently saved in localStorage. If any of the recipes are flagged as being equal then false is returned to denote
     * that the recipe is already saved, else true is returned. All recipe elements from localStorage are temporarily altered to remove their id property and key before being stringified and compared
     * to the passed in stringified recipe.
     * @param {object} recipe - Recipe object that is being compared against all other recipes in the array to see if it is unique.
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

    /**
     * @method Saves the passed in recipe object to the associated localStorage array under the condition that the recipe is not already present on the list. This also provides the recipeObj
     * with a id property and an unique value for it that is calculated using a number randomizer and the current date.
     * @param {object} newRecipe - The new recipe that will be added to the localStorage array.
     */
    static storeRecipe(newRecipe) {
        let newID = 'id-' + (Math.random() * Date.now()).toString(16).substring(0, 16);

        let result = this.checkIfSaved(newRecipe)

        // Checks the result of the checkIfSaved method call
        if (result) {
            // If true, the item is not in the list and it needs to be added,

            // The recipe book is again pulled from store to preserve the id for each recipe, since the above method removes the ones last pulled from storage.
            let currentRecipeBook = this.getList();
            // A shallow copy of the passed in newRecipe object is declared in a new variable.
            //* The passed in object is persistent through the whole project, by adding the id property the object will contain it until the page reloads, so when attempting to add it again,
            //* the id property was remaining and allowing the item to be added multiple times. Shallow copying allows the id property to be added to a recipeObj without having it persist
            //* through the passed in object.
            
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

    /**
     * @method Removes the recipe associated with the passed in ID value from the localStorage array. A loop iterates through comparing all recipe IDs to the passed in argument and once the associated
     * recipe is found, the splice method is used to mutate the array and another class method is used to save the mutated array. If for any reason the recipe was not found within the localStorage array,
     * an alert is made to the user.
     * @param {string} recipeID - Recipe ID associated with the recipe object element that will be removed from the localStorage array.
     */
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

    /**
     * @method Returns the array associated with the class's itemKey attribute or if no array exists in localStorage, an empty array is returned.
     */
    static getList() {
        return JSON.parse(localStorage.getItem(this.itemKey)) || [];
    }

    /**
     * @method Stores the passed in array in localStorage and associates it with the class's itemKey attribute.
     * @param {array} allRecipes - Array of recipe objects that will be saved and accessed via the class's itemKey attribute.
     */
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
     * @method Stores a recipe into the localStorage array. Duplicate recipes can be saved in case a user wants to have it on multiple days of the week. 
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
     * @method Either removes or adds a weekday property to the recipe specified by the passed in recipeID. If no recipe is found the function halts execution.
     * @param {string} action - Denotes what code block will execute.
     * @param {string} weekday - Specifies the value of the weekday property for the recipe.
     * @param {string} recipeID - Specifies the recipe that will be altered within localStorage.
     */
    static updateRecipe(action, weekday, recipeID) {
        // Gets the list of recipes from localStorage and initializes a variable to store the recipe matching the recipeID that is passed in.
        let currentRecipeBook = this.getList();

        let foundIndex = this.findRecipe(recipeID, currentRecipeBook)
        if (!foundIndex) return;

        if (action == 'add') {
            currentRecipeBook[foundIndex]['weekday'] = weekday;
            this.setList(currentRecipeBook)
            alert(`Recipe Added to ${weekday}`)
            return;
        } else if (action == 'remove') {
            // Removes both the weekday property value and the property key.
            delete currentRecipeBook[foundIndex].weekday;
            delete currentRecipeBook[foundIndex]['weekday'];
            this.setList(currentRecipeBook)
            alert('Recipe Moved Back')
            return;
        }        
    }

    /**
     * @method Iterates through the array in localStorage and returns the index location of the recipe that contains the same matching recipeID argument. If no matching recipe is found then a null value is returned.
     * @param {string} recipeID - Identification value that signifies which recipe to obtain from localStorage.
     * @param {array} currentRecipeBook - Array of recipe objects that will be iterated through until a recipe with a matching recipeID property is found.
     */
    static findRecipe(recipeID, currentRecipeBook) {

        for (const index in currentRecipeBook) {
            if (currentRecipeBook[index].id == recipeID) {
                return index;
            }
        }

        return null;
    }
}