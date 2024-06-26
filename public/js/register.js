// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgZwA1oGjJnfGRgjWkIICfWhFELj8dxmU",
  authDomain: "midkea-571f4.firebaseapp.com",
  databaseURL: "https://midkea-571f4-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "midkea-571f4",
  storageBucket: "midkea-571f4.appspot.com",
  messagingSenderId: "371876454277",
  appId: "1:371876454277:web:19b7e9ce993cfec2792eec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the form element
const form = document.getElementById('add-record-form');

// Add submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const itemId = document.getElementById('item_id').value;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;

  // Create a new record in the database
  set(ref(database, 'Inventory Info/' + itemId), {
    ItemID: itemId,
    Name: name,
    Category: category,
    Price: price
  })
  .then(() => {
    alert('Record added successfully!');
    // Clear the form
    form.reset();
  })
  .catch((error) => {
    console.error('Error adding record: ', error);
  });
});
