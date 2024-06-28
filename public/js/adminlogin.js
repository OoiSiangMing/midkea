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

      if (!adminID || !password) {
          alert('Please enter both Admin ID and password.');
          return;
      }

      // Reference to the database
      const dbRef = ref(database, 'Admin Login');

      get(dbRef).then((snapshot) => {
          if (snapshot.exists()) {
              const adminLoginData = snapshot.val();
              let isValidUser = false;

              // Iterate through all admin entries
              for (const key in adminLoginData) {
                  if (adminLoginData[key]['Admin ID'] === adminID) {
                      if (adminLoginData[key]['Admin Password'] === password) {
                          isValidUser = true;
                          break;
                      } else {
                          alert('Invalid password.');
                          return;
                      }
                  }
              }

              if (isValidUser) {
                  // Password matches, redirect to admin page
                  window.location.href = "adminpagemidkea.html";
              } else {
                  alert('Admin ID does not exist.');
              }
          } else {
              alert('No admin data found.');
          }
      }).catch((error) => {
          console.error('Error fetching admin data:', error);
      });
  });
});
