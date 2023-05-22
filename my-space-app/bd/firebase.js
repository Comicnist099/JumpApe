// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAlA4461j5aKVon48hIl_d3SjyZW7LMwc",
  authDomain: "jumpape-6aa43.firebaseapp.com",
  projectId: "jumpape-6aa43",
  storageBucket: "jumpape-6aa43.appspot.com",
  messagingSenderId: "100907160689s9",
  appId: "1:1009071606899:web:f3f0afccb4f8be0ce9ee06",
  measurementId: "G-FFJMMP3J7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
export {
  database
};