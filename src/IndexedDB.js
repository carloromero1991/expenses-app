export default function IndexedDB() {
  if (!window.indexedDB) {
    alert(
      "Your browser doesn't support a stable version of IndexedDB. Items cannot be stored in local database."
    );
    return;
  }

  function open(dbName, storeName, dbVersion = 1) {
    const promise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, dbVersion);
      let db;
      request.onerror = function (event) {
        reject("Error opening IDB:", request.errorCode);
      };

      request.onupgradeneeded = function (event) {
        console.log("onupgradeneeded");

        // Save the IDBDatabase interface
        db = event.target.result;

        // Create an objectStore for this database
        const store = db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: false,
        });

        store.createIndex("title", "title", { unique: false });
        store.createIndex("amount", "amount", { unique: false });
        store.createIndex("date", "date", { unique: false });
        setTimeout(() => {
          resolve(db);          
        }, 1000);
      };

      request.onsuccess = function (event) {
        db = event.target.result;
      };
    });

    return promise;
  }

  function getData(dbName, storeName, dbVersion) {
    const promise = new Promise((resolve, reject) => {
      open(dbName, storeName, dbVersion)
        .then((db) => {
          const transaction = db.transaction([storeName]),
            objectStore = transaction.objectStore(storeName),
            request = objectStore.openCursor();

          request.onerror = function (event) {
            reject(event);
          };

          request.onsuccess = function (event) {
            let data = [];
            let cursor = event.target.result;

            if (cursor) {
              data.push(cursor.value);
              cursor.continue();
            }
            resolve(data);
          };
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  async function GetDataAsync(dbName, storeName, dbVersion) {
    // console.log("Opening IndexedDB...");
    const result = await getData(dbName, storeName, dbVersion);
    // console.log(result);
    return result;
  }

  return {
    GetData: GetDataAsync,
  };
}
