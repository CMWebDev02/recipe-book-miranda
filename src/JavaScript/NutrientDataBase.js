class DataBase {
    constructor(name, objectStore, keyPath, index) {
        this._dbName = name;
        this._dbObjectStore = objectStore;
        this._dbKeyPath = keyPath;
        this._dbIndex = index;

        this._dbConnection = null;
    }

    accessObjectStore(mode) {
        let newTransaction = this._dbConnection.transaction(this._dbObjectStore, mode);
        return newTransaction.objectStore(this._dbObjectStore);
    }

    openDataBaseConnection() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this._dbName);

            request.onerror = () => {
                reject('Failed To Open DataBase Connection');
            }
    
            request.onupgradeneeded = () => {
                let db = request.result;
    
                if (!db.objectStoreNames.contains(this._dbObjectStore)) {
                    console.log(this._dbObjectStore)
                    let recipeStorage = db.createObjectStore(this._dbObjectStore, {keyPath: this._dbKeyPath})
    
                    recipeStorage.createIndex(this._dbIndex, this._dbKeyPath, {unique: true});
                }
            }

            request.onsuccess = () => {
                this._dbConnection = request.result;
                resolve(true);
            }
        })
    }
}

export class IngredientDB extends DataBase {
    constructor() {
        super('Ingredients', 'Ingredient Search Queries', 'ingredientQuery', 'Ingredient Query');
    }

    getIngredientQuery(ingredient) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.accessObjectStore('readonly');

            let storedIngredient = objectStorage.get(ingredient);

            storedIngredient.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            storedIngredient.onsuccess = () => {
                if (storedIngredient.result) {
                    resolve(storedIngredient.result.fdcId)
                } else {
                    resolve(false)
                }
            }
        })
    }

    addIngredientQuery(ingredient, fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStore = this.accessObjectStore('readwrite');

            let newItem = objectStore.add({ingredientQuery: ingredient, fdcId});

            newItem.onerror = () => {
                reject('Failed To Add Ingredient Query')
            }

            newItem.onsuccess = () => {
                resolve(true);
            }
        })
    }
}

export class NutritionalInfoDB extends DataBase {
    constructor() {
        super('Nutritional API', 'Nutrients', 'fdcId', 'FDC ID');
    }

    getNutrients(fdcId) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.accessObjectStore('readonly');

            let storedNutrients = objectStorage.get(fdcId);

            storedNutrients.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            storedNutrients.onsuccess = () => {
                if (storedNutrients.result) {
                    resolve(storedNutrients.result)
                } else {
                    resolve(false)
                }
            }
        })
    }

    addFoodNutrients(fdcId, nutrients) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStore = this.accessObjectStore('readwrite');

            let newItem = objectStore.add({fdcId, nutrientsArray: nutrients});

            newItem.onerror = () => {
                reject('Failed To Add Ingredient Query')
            }

            newItem.success = () => {
                resolve(true);
            }
        })
    }
}