// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login');
  
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting the default way
  
        const adminID = document.getElementById('adminID').value.trim();
        const password = document.getElementById('password').value.trim();
  
        // Check if adminID or password is empty
        if (adminID === '' || password === '') {
            alert('Please enter Admin ID and Password.');
            return;
        }
  
        // Reference to the database
        const dbRef = ref(database, 'Admin Login/' + adminID);
  
        console.log('Admin ID:', adminID);  // Debugging statement
        console.log('Password:', password);  // Debugging statement
  
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const adminData = snapshot.val();
                console.log('Admin Data:', adminData);  // Debugging statement
  
                if (adminData['Admin Password'] === password) {
                    // Password matches, update last login time and redirect to admin page
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: 'Asia/Kuala_Lumpur',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    });
                    const lastLoginTime = formatter.format(new Date());
  
                    const updates = {};
                    updates['LastLoginTime'] = lastLoginTime;
                    
                    update(dbRef, updates).then(() => {
                        window.location.href = "adminpagemidkea.html";
                    }).catch((error) => {
                        console.error('Error updating last login time:', error);
                        alert('Failed to update last login time.');
                    });
                } else {
                    alert('Invalid password.');
                }
            } else {
                alert('Admin ID does not exist.');
            }
        }).catch((error) => {
            console.error('Error fetching admin data:', error);
        });
    });
  });
