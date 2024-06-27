import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const tableBody = document.getElementById('tableBody');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const itemId = searchItemId.value.trim();
    
    if (itemId === '') {
        alert('Please enter an Item ID');
        return;
    }
    
    const dbRef = ref(database);
    get(child(dbRef, `Inventory Info/Item ID: ${itemId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Clear previous table rows
            tableBody.innerHTML = '';
            // Create new row with fetched data
            const newRow = document.createElement('tr');
            newRow.classList.add('table-row'); // Add the CSS class for white background
            newRow.innerHTML = `
                <td>${data['Item ID']}</td>
                <td>${data.Name}</td>
                <td>${data.Category}</td>
                <td>${data.Price}</td>
            `;
            tableBody.appendChild(newRow);
        } else {
            alert('Item ID not found');
            // Clear table if item not found
            tableBody.innerHTML = '';
        }
    }).catch((error) => {
        console.error('Error fetching item data:', error);
    });
});

// Restrict item ID input to a maximum of 4 digits
const updateItemIdInput = document.getElementById('search_item_id');

updateItemIdInput.addEventListener('input', () => {
    updateItemIdInput.value = updateItemIdInput.value.replace(/[^0-9]/g, '').slice(0, 4);
});