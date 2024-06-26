import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];

// Search for an item by Item ID
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const itemId = searchItemId.value;
  const dbRef = ref(database);
  get(ref(dbRef, `Inventory Info/Item ID: ${itemId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      resultTable.innerHTML = `
        <tr>
          <td>${data['Item ID']}</td>
          <td>${data.Name}</td>
          <td>${data.Category}</td>
          <td>${data.Price}</td>
        </tr>
      `;
      // Fill the update form with the existing data
      document.getElementById('update_item_id').value = data['Item ID'];
      document.getElementById('update_name').value = data.Name;
      document.getElementById('update_category').value = data.Category;
      document.getElementById('update_price').value = data.Price;
    } else {
      resultTable.innerHTML = '<tr><td colspan="4">No record found</td></tr>';
    }
  }).catch((error) => {
    console.error('Error fetching item data:', error);
    resultTable.innerHTML = '<tr><td colspan="4">Error fetching data</td></tr>';
  });
});

const updateForm = document.getElementById('update-record-form');

// Update item details
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemId = document.getElementById('update_item_id').value;
  const name = document.getElementById('update_name').value;
  const category = document.getElementById('update_category').value;
  const price = document.getElementById('update_price').value;

  update(ref(database, `Inventory Info/Item ID: ${itemId}`), {
    'ItemID': itemId,
    'Name': name,
    'Category': category,
    'Price': price
  })
  .then(() => {
    alert('Record updated successfully!');
    // Clear the search and update forms
    searchItemId.value = '';
    resultTable.innerHTML = '<tr><td colspan="4">No record found</td></tr>';
    updateForm.reset();
  })
  .catch((error) => {
    console.error('Error updating record:', error);
  });
});
