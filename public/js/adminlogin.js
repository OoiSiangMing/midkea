// Import the functions you need from the SDKs you need
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

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login');
  
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form from submitting the default way

      const adminID = document.getElementById('adminID').value.trim();
      const password = document.getElementById('password').value.trim();

      // Reference to the database
      const dbRef = ref(database, 'Admin Login/' + adminID);

      get(dbRef).then((snapshot) => {
          if (snapshot.exists()) {
              const adminData = snapshot.val();
              if (adminData['Admin Password'] === password) {
                  // Password matches, redirect to admin page
                  window.location.href = "adminpagemidkea.html";
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
