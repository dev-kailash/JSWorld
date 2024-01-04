

/*
  let db;

      let name = document.querySelector("#name");
      let address = document.querySelector("#add");
      let phone = document.querySelector("#ph");
      let btn = document.querySelector("button");
      let request = indexedDB.open("employees", 1);

      request.onsuccess = function (e) {
        db = request.result;
      };

      request.onerror = function (e) {
        console.log(e);
      };

      request.onupgradeneeded = function (e) {
        db = request.result;
        db.createObjectStore("employee", { keyPath: "eId" });
      };

      btn.addEventListener("click", function () {
        addEmployee();
      });
      function addEmployee() {
        let tx = db.transaction("employee", "readwrite");

        let store = tx.objectStore("employee");
        store.add({
          eId: Date.now(),
          name: name.value,
          address: address.value,
          phone: phone.value,
        });
      }
*/

// /*

class IndexedDB {

    constructor() {
        this.db = null;
        this.request = null;
        this.name = document.querySelector("#name");
        this.address = document.querySelector("#add");
        this.phone = document.querySelector("#ph");
        this.btn = document.querySelector("button");
        this.openDB();
        this.bindEvents();
    }

    openDB() {
        this.request = indexedDB.open("employees", 1);
        console.log(this.request);
        this.request.onupgradeneeded = this.onupgradeneeded;
        this.request.onerror = this.onerror;
        this.request.onsuccess = this.onsuccess;
    }

    bindEvents() {
        this.btn.addEventListener('click', (event) => {
            this.storeIntoDB();
        });
    }

    onupgradeneeded() {
       this.db = this.result;
       if (!this.db.objectStoreNames.contains('employees')) { 
           this.db.createObjectStore('employee', { keyPath: 'eId' }); 
   
       } 
   };
   
   onerror() {
       console.error("Error", this.request.error);
   };
   
   onsuccess() {
       this.db = this.result;
       // continue working with database using db object
   };

   storeIntoDB() {
    // I want to use this.db instead of this.request.db
    console.log(this.db) // it is coming null
    const transaction = this.request.db.transaction("employee", "readwrite"); 
    const employee = transaction.objectStore("employee");
    employee.add(this.createDataToStore());
    this.clearForm();
   }

   createDataToStore() {
     const name = this.name.value;
     const address = this.address.value;
     const phone = this.phone.value;

     return { address, name, phone, eId: Date.now()};
   }

   clearForm() {
      this.name.value = '';
      this.address.value = '';
      this.phone.value = '';
   }
   
}

new IndexedDB();

// */

