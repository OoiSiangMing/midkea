// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Add a console log to confirm the script is running
console.log('Script loaded');

// Add submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Form submitted');

  // Get form values
  const itemId = document.getElementById('item_id').value.trim();
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const price = document.getElementById('price').value.trim();

  // Validate Item ID to be exactly 4 digits and numeric only
  if (!/^\d{4}$/.test(itemId)) {
    alert('Error: Item ID must be exactly 4 digits.');
    return; // Stop the form submission
  }

  console.log(`Item ID: ${itemId}, Name: ${name}, Category: ${category}, Price: ${price}`);

  const dbRef = ref(database);

  // Check if the Item ID already exists
  get(child(dbRef, `Stock Info/Item ID: ${itemId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      // Item ID already exists
      alert('Error: Item ID already exists. Please use a different Item ID.');
    } else {
      // Item ID does not exist, create a new record
      set(ref(database, 'Stock Info/Item ID: ' + itemId), {
        'Item ID': itemId,
        'Name': name,
        'Category': category,
        'Price': price
      })
      .then(() => {
        alert('Record added successfully!');
        // Clear the form
        form.reset();
      })
      .catch((error) => {
        console.error('Error adding record: ', error);
      });
    }
  }).catch((error) => {
    console.error('Error checking Item ID: ', error);
  });
});

// Ensure Item ID input allows only numbers and is exactly 4 digits
const itemIdInput = document.getElementById('item_id');

itemIdInput.addEventListener('input', () => {
  itemIdInput.value = itemIdInput.value.replace(/[^0-9]/g, '').slice(0, 4);
});

// Restrict input to numbers and dot only
const priceInput = document.getElementById('price');

priceInput.addEventListener('input', () => {
    priceInput.value = priceInput.value.replace(/[^0-9.]/g, '');
});