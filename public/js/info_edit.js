import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set, child, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const searchBtn = document.getElementById('searchBtn');
const searchItemId = document.getElementById('search_item_id');

// Search for an item by Item ID
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const itemId = searchItemId.value;
    const dbRef = ref(database);
    get(child(dbRef, `Inventory Info/Item ID: ${itemId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Fill the update form with the existing data
            document.getElementById('update_item_id').value = data['Item ID'];
            document.getElementById('update_name').value = data.Name;
            document.getElementById('update_category').value = data.Category;
            document.getElementById('update_price').value = data.Price;
        } else {
            alert('Item ID not found');
            searchItemId.reset();
        }
    }).catch((error) => {
        console.error('Error fetching item data:', error);
    });
});

const updateForm = document.getElementById('update-record-form');

// Update item details
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const itemId = document.getElementById('update_item_id').value.trim();
  const name = document.getElementById('update_name').value.trim();
  const category = document.getElementById('update_category').value.trim();
  const price = document.getElementById('update_price').value.replace('RM', '').trim();

  // Validate input fields
  if (itemId === '' || name === '' || category === '' || price === '') {
      alert('Please search the item ID first');
      updateForm.reset();// Clear the form
      return; // Stop the form submission
      
  }

  update(ref(database, `Inventory Info/Item ID: ${itemId}`), {
      'Item ID': itemId,
      'Name': name,
      'Category': category,
      'Price': price
  })
  .then(() => {
      alert('Record updated successfully!');
      // Clear the search and update forms
      searchItemId.value = '';
      updateForm.reset();
  })
  .catch((error) => {
      console.error('Error updating record:', error);
  });
});


// Restrict input to numbers and dot only
const priceInput = document.getElementById('update_price');

priceInput.addEventListener('input', () => {
    priceInput.value = priceInput.value.replace(/[^0-9.]/g, '');
});

// Restrict item ID input to a maximum of 4 digits
const updateItemIdInput = document.getElementById('search_item_id');

updateItemIdInput.addEventListener('input', () => {
    updateItemIdInput.value = updateItemIdInput.value.replace(/[^0-9]/g, '').slice(0, 4);
});