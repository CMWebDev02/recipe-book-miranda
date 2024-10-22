/**
 * @class Provides access to the needed attributes and methods for accessing the indexDB used to store all nutritional information gathered from the FoodData Center API. This 
 * handles the initialization of the database in the user's browser, opening the connection to the database, and handling the data passed to and from the database. All public methods return promises 
 * to allow the database to be interacted with asynchronously.
 */
export class NutritionalDB {
    constructor() {
        // Various attributes are initialized in the constructor and while these values are constant, they are referenced throughout all methods so making them attributes helps to simplify
        // any changes the will need to be made.
        this._dbName = 'NutritionalAPI';

        this._dbIngredientStore = 'Ingredients';
        this._dbIngredientKeyPath = 'ingredientQuery';
        this._dbIngredientMainIndex = 'Ingredient Queries';
        this._dbIngredientSecondaryIndexName = 'FDC ID';
        this._dbIngredientSecondaryIndex = 'fdcId';

        this._dbNutritionStore = 'Nutrients';
        this._dbNutrientsKeyPath = 'fdcId';
        this._dbNutrientsIndex = 'FDC ID';

        // This attribute stores the connection made to the database, so upon initialization it is set to null to allow for checking that the connection is made.
        this._dbConnection = null;
    }

    /**
     * @method Private method used to open a transaction to provide the required access to the objectStore. The objectStore being accessed and the type of access or mode is specified by the arguments passed in.
     * An IDBObjectStore is returned by this method.
     * @param {string} objectStoreName - Specifies which objectStore to create a transaction with.
     * @param {string} mode - Specifies how the objectStore will be interacted with, can be readonly in which info can only be pull from the database or readwrite in which information can also be added to the database.
     */
    _newTransaction(objectStoreName, mode) {
        let newTransaction = this._dbConnection.transaction([objectStoreName], mode);
        return newTransaction.objectStore(objectStoreName);
    }

    /**
     * @method Pulls nutritional information associated with the fdcID passed in. A promise is returned by this method and it either resolves with the nutritional info pulled from the database
     * or resolves with an error to signify that the fdcID has no associated nutritional info. 
     * An object is returned for both resolve instances and both contain the ok property which is used to denote if the data was successfully pulled from the database or if the information was not found.
     * The promise rejects only if an error occurs with accessing the database.
     * An additional check is made at the start to ensure that an open database connection was made before attempting to pull info from the database. 
     * @param {type} fdcId - Index key that will be used to pull the associated nutritional info from the database.
     */
    getNutrients(fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this._newTransaction(this._dbNutritionStore, 'readonly');

            let storedNutrients = objectStorage.get(fdcId);

            storedNutrients.onerror = () => {
                reject('Failed To Get Specific Nutrients');
            }

            storedNutrients.onsuccess = () => {
                // Checks if the .get() method pulled a valid value from the data base.
                /* 
                    * Even if no info is pulled successfully from the database the promise is resolved.
                    * This is done to allow the database desync error to be handled properly by clearing the database 
                    * since this desync only occurs if information failed to be stored.
                */
                if (storedNutrients.result) {
                    resolve({ok: true, result: storedNutrients.result})
                } else {
                    resolve({ok: false, error: {message: `Failed to obtain associated nutrients!`, errorType: 'DeSync'}})
                }
            }
        })
    }

    /**
     * @method Add nutritional info acquired from the API fetch call to be cached in the database. This method resolves with an object to denote that the information was successfully saved or rejects
     * with an error in the case that the information failed to be saved to the database.
     * An additional check is made at the start to ensure that an open database connection was made before attempting to store info to the database. 
     * @param {number} fdcId - Index value that will be associated with the passed in nutrients array.
     * @param {array} nutrients - Nutritional info obtained from the API fetch call.
     */
    addFoodNutrients(fdcId, nutrients) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this._newTransaction(this._dbNutritionStore, 'readwrite');

            let newItem = objectStorage.add({fdcId, nutrientsArray: nutrients});

            newItem.onerror = ({target}) => {
                if (target.error.name == 'ConstraintError') return;
                reject('Failed To Add Ingredient Nutrients');
            }

            newItem.success = () => {
                resolve({ok: true});
            }
        })
    }

    /**
     * @method 
     * @param {type} variable - description .
     */
    getIngredientQuery(ingredient) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this._newTransaction(this._dbIngredientStore, 'readonly');

            let storedIngredient = objectStorage.get(ingredient);

            storedIngredient.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            storedIngredient.onsuccess = () => {
                if (storedIngredient.result) {
                    resolve({ok: true, result: storedIngredient.result.fdcId})
                } else {
                    resolve({ok: false})
                }
            }
        })
    }

    addIngredientQuery(ingredient, fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this._newTransaction(this._dbIngredientStore, 'readwrite');

            let newItem = objectStorage.add({ingredientQuery: ingredient, fdcId});

            newItem.onerror = ({target}) => {
                if (target.error.name == 'ConstraintError') return;
                reject('Failed To Add Ingredient Query')
            }

            newItem.onsuccess = () => {
                resolve({ok: true});
            }
        })
    }

    openDataBaseConnection() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this._dbName);

            request.onerror = () => {
                reject('Failed To Open DataBase Connection');
            }
    
            request.onupgradeneeded = () => {
                let db = request.result;
    
                if (!db.objectStoreNames.contains(this._dbIngredientStore) ) {
                    let ingredientStorage = db.createObjectStore(this._dbIngredientStore, {keyPath: this._dbIngredientKeyPath})
    
                    ingredientStorage.createIndex(this._dbIngredientMainIndex, this._dbIngredientKeyPath, {unique: true});
                    ingredientStorage.createIndex(this._dbIngredientSecondaryIndexName, this._dbIngredientSecondaryIndex, {unique: true});
                }

                if (!db.objectStoreNames.contains(this._dbNutritionStore) ) {
                    let nutritionStorage = db.createObjectStore(this._dbNutritionStore, {keyPath: this._dbNutrientsKeyPath})
    
                    nutritionStorage.createIndex(this._dbNutrientsIndex, this._dbNutrientsKeyPath, {unique: true});
                }
            }

            request.onsuccess = () => {
                this._dbConnection = request.result;
                resolve(true);
            }
        })
    }

    clearDataBase() {
        return new Promise((resolve) => {
            indexedDB.deleteDatabase(this._dbName);

            resolve({ok: true});
        })
    }
}