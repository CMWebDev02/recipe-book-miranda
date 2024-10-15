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

export class RecipeSearchDB extends DataBase {
    constructor() {
        super('Recipe API', 'Recipe Search Queries', 'searchQuery', 'URL');
    }

    getSearchQuery(url) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStorage = this.accessObjectStore('readonly');

            let searchURL = objectStorage.get(url);

            searchURL.onerror = () => {
                reject('Failed To Get Specific Recipe');
            }

            searchURL.onsuccess = () => {
                if (searchURL.result) {
                    resolve(searchURL.result.queryResults)
                } else {
                    resolve(false)
                }
            }
        })
    }

    addSearchQuery(url, queryResults) {
        return new Promise((resolve, reject) => {
            if (!this._dbConnection) reject('DataBase Not Connected');
            let objectStore = this.accessObjectStore('readwrite');

            let newItem = objectStore.add({searchQuery: url, queryResults});

            newItem.onerror = () => {
                reject('Failed To Add Search Query')
            }

            newItem.onerror = () => {
                resolve(true);
            }
        })
    }
}