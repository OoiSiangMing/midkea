import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const deleteContainer = document.getElementById('deleteContainer');
const deleteBtn = document.getElementById('deleteBtn');

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

            // Show the delete button
            deleteContainer.classList.remove('hidden');
            deleteBtn.setAttribute('data-item-id', itemId);

        } else {
            alert('Item ID not found');
            searchItemId.reset();
            // Clear table if item not found
            tableBody.innerHTML = '';
            deleteContainer.classList.add('hidden');
            search-form
        }
    }).catch((error) => {
        console.error('Error fetching item data:', error);
    });
});

deleteBtn.addEventListener('click', () => {
    const confirmDelete = deleteBtn.getAttribute('data-item-id');
    if (confirm("Are you sure you want to delete this data?")) {
        deleteItemFromDatabase(confirmDelete);
    }
});

function deleteItemFromDatabase(itemId) {
    const dbRef = ref(database);
    const itemRef = child(dbRef, `Inventory Info/Item ID: ${itemId}`);

    remove(itemRef)
    .then(() => {
        alert('Item deleted successfully!');
        // Optionally clear the table or handle UI update
        tableBody.innerHTML = '';
        deleteContainer.classList.add('hidden');
    })
    .catch((error) => {
        console.error('Error deleting item:', error);
    });
}

// Restrict item ID input to a maximum of 4 digits
const updateItemIdInput = document.getElementById('search_item_id');

updateItemIdInput.addEventListener('input', () => {
    updateItemIdInput.value = updateItemIdInput.value.replace(/[^0-9]/g, '').slice(0, 4);
});
