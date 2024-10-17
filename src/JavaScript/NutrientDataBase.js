export class NutritionalDB {
    constructor() {
        this._dbName = 'NutritionalAPI';

        this._dbIngredientStore = 'Ingredients';
        this._dbIngredientKeyPath = 'ingredientQuery';
        this._dbIngredientMainIndex = 'Ingredient Queries';
        this._dbIngredientSecondaryIndexName = 'FDC ID';
        this._dbIngredientSecondaryIndex = 'fdcId';

        this._dbNutritionStore = 'Nutrients';
        this._dbNutrientsKeyPath = 'fdcId';
        this._dbNutrientsIndex = 'FDC ID';

        this._dbConnection = null;
    }

    getNutrients(fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.newTransaction(this._dbNutritionStore, 'readonly');

            let storedNutrients = objectStorage.get(fdcId);

            storedNutrients.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            storedNutrients.onsuccess = () => {
                if (storedNutrients.result) {
                    resolve({ok: true, result: storedNutrients.result})
                } else {
                    resolve({ok: false, result: fdcId})
                }
            }
        })
    }

    addFoodNutrients(fdcId, nutrients) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.newTransaction(this._dbNutritionStore, 'readwrite');

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

    getIngredientQuery(ingredient) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.newTransaction(this._dbIngredientStore, 'readonly');

            let storedIngredient = objectStorage.get(ingredient);

            storedIngredient.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            storedIngredient.onsuccess = () => {
                if (storedIngredient.result) {
                    resolve({ok: true, result: storedIngredient.result.fdcId})
                } else {
                    resolve({ok: false, ingredient})
                }
            }
        })
    }

    addIngredientQuery(ingredient, fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.newTransaction(this._dbIngredientStore, 'readwrite');

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

    newTransaction(objectStoreName, mode) {
        let newTransaction = this._dbConnection.transaction([objectStoreName], mode);
        return newTransaction.objectStore(objectStoreName);
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
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject({ok: false, error: 'Database Not Connected!'});
            this._dbConnection.close();

            let deleteObj = indexedDB.deleteDatabase(this._dbName);
            console.log(deleteObj)
        })
    }
}