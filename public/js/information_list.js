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

document.getElementById('listInfoBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const dbRef = ref(database);
    get(child(dbRef, 'Inventory Info')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            localStorage.setItem('inventoryData', JSON.stringify(data));
            window.location.href = 'info_list.html';
        } else {
            alert('No data available');
        }
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
});



