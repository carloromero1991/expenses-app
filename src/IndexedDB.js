/**
 * Asynchronous IndexedDB implementation using advantage of 'Promise' and 'async/await' specifications.
 */
export default (function IndexedDB() {
  if (!window.indexedDB) {
    alert(
      "Your browser doesn't support a stable version of IndexedDB. Items cannot be stored in local database."
    );
    return;
  }

  function openConnection(idbConfig) {
    const dbVersion = idbConfig.dbVersion || 1;

    const promise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(idbConfig.dbName, dbVersion);

      // Declare handlers:
      request.onupgradeneeded = function (event) {
        // console.log("onupgradeneeded...");

        // Save the IDBDatabase interface:
        const db = event.target.result;

        // Create an objectStore for this database:
        if (idbConfig.indexes) {
          const store = db.createObjectStore(idbConfig.storeName, {
            keyPath: idbConfig.indexes[0] || "id",
            autoIncrement: false,
          });

          for (let index = 0; index < idbConfig.indexes.length; index++) {
            const storeIndex = idbConfig.indexes[index];

            // console.log("Creating index:", storeIndex);
            store.createIndex(storeIndex, storeIndex);

            // Resolve promise when iteration ends:
            if (index === idbConfig.indexes.length) {
              resolve(db);
            }
          }
        }
      };

      request.onsuccess = function (event) {
        // console.log("Open success");
        resolve(event.target.result);
      };

      request.onerror = function (event) {
        reject("Error opening IDB:", request.errorCode);
      };
    });

    return promise;
  }

  function getData(idbConfig) {
    const promise = new Promise((resolve, reject) => {
      // Open asynchronous database connection:
      // console.log("Opening asynchronous database connection...");
      openConnection(idbConfig)
        .then((db) => {
          var data = [];
          const transaction = db.transaction([idbConfig.storeName]),
            store = transaction.objectStore(idbConfig.storeName),
            cursorRequest = store.openCursor();

          // Declare handlers:
          cursorRequest.onerror = function (event) {
            reject(event);
          };

          cursorRequest.onsuccess = function (event) {
            const cursor = event.target.result;

            // Read data from cursor:
            if (cursor) {
              // console.log("Reading data from cursor:", cursor.value);
              data.push(cursor.value);
              cursor.continue();
            }
          };

          transaction.oncomplete = function (event) {
            // console.log("data:", data);
            resolve(data);
          };
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  function saveData(idbConfig, data) {
    const promise = new Promise((resolve, reject) => {
      openConnection(idbConfig).then((db) => {
        try {
          const transaction = db.transaction(idbConfig.storeName, "readwrite"),
            store = transaction.objectStore(idbConfig.storeName, "readwrite");

          const request = store.add(data);

          transaction.oncomplete = function (event) {
            // console.log("Insertion in DB complete", request);
            resolve(event);
          };

          request.onsuccess = function (event) {
            // console.log("Insertion in DB successful", request);
          };

          request.onerror = function (event) {
            reject("saveData error:", this.error);
          };
        } catch (e) {
          reject(e);
        }
      });
    });
    return promise;
  }

  // TODO: delete items from storage
  function deleteData(idbConfig, key) {
    console.log("deleteData:", key);
    const promise = new Promise((resolve, reject) => {
      openConnection(idbConfig).then((db) => {
        try {
          const transaction = db.transaction([idbConfig.storeName]),
            store = transaction.objectStore(idbConfig.storeName, "readwrite");

          // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
          // the result of the Object Store Deletion Operation algorithm is
          // undefined, so it's not possible to know if some records were actually
          // deleted by looking at the request result.
          var request = store.get(key);

          request.onsuccess = function (event) {
            var record = event.target.result;
            console.log("record:", record);

            if (typeof record == "undefined") {
              reject("No matching record found");
              return;
            }
            // Warning: The exact same key used for creation needs to be passed for
            // the deletion. If the key was a Number for creation, then it needs to
            // be a Number for deletion.
            var deleteRequest = store.delete(key);

            deleteRequest.onsuccess = function (event) {
              console.log("evt:", event);
              console.log("evt.target:", event.target);
              console.log("evt.target.result:", event.target.result);
              console.log("delete successful");
              resolve(event.target.result);
            };

            deleteRequest.onerror = function (event) {
              reject(event.target.errorCode);
            };
          };

          request.onerror = function (event) {
            reject(event.target.errorCode);
          };
        } catch (e) {
          reject(e);
        }
      });
    });
    return promise;
  }

  /**
   * Retrieve data from specified IndexedDB storage
   * @param {JSON} idbConfig { dbName: string, storeName: string, indexes: string[]  }
   * @returns Array: stored data, empty array if none.
   */
  async function GetDataAsync(idbConfig) {
    // console.log("GetDataAsync retrieving data...");
    const result = await getData(idbConfig);
    // console.log("GetDataAsync finished");
    return result;
  }

  /**
   * Save data into specified IndexedDB storage
   * @param {JSON} idbConfig { dbName: string, storeName: string, indexes: string[]  }
   * @param {JSON} data Object to store.
   * @returns result.
   */
  async function SaveDataAsync(idbConfig, data) {
    // console.log("SaveDataAsync storing data...");
    const result = await saveData(idbConfig, data);
    // console.log("SaveDataAsync finished");
    return result;
  }

  /**
   * Delete data from specified IndexedDB storage
   * @param {JSON} idbConfig { dbName: string, storeName: string, indexes: string[]  }
   * @param {JSON} key Identifier of object to delete.
   * @returns result.
   */
  async function DeleteDataAsync(idbConfig, key) {
    // console.log("DeleteDataAsync erasing data...");
    const result = await deleteData(idbConfig, key);
    // console.log("DeleteDataAsync finished");
    return result;
  }

  return {
    GetDataAsync,
    SaveDataAsync,
    DeleteDataAsync,
  };
})();
