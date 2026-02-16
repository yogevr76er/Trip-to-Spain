// Firebase Configuration
// הגדרות Firebase - אל תשתף את זה בפומבי!

const firebaseConfig = {
  apiKey: "AIzaSyBO5g1epwnUj_biMD5tyPbo381nffJKp9Y",
  authDomain: "spain-trip-2026.firebaseapp.com",
  projectId: "spain-trip-2026",
  storageBucket: "spain-trip-2026.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://spain-trip-2026-default-rtdb.firebaseio.com"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, push, onValue, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export functions
export { database, ref, set, push, onValue, update };