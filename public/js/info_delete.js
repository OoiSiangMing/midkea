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

const searchForm = document.getElementById('search-form');
const searchItemId = document.getElementById('search_item_id');
const tbody = document.querySelector('table tbody');

searchForm.addEventListener('submit', (e) => {
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
            // Clear the table body
            tbody.innerHTML = '';
            // Insert new row with fetched data
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data['Item ID']}</td>
                <td>${data.Name}</td>
                <td>${data.Category}</td>
                <td>${data.Price}</td>
            `;
            tbody.appendChild(newRow);
        } else {
            alert('Item ID not found');
            // Clear the table body if no data found
            tbody.innerHTML = '';
        }
    }).catch((error) => {
        console.error('Error fetching item data:', error);
    });
});
