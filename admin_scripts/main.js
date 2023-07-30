// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, initializeFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4TjdE7uaUm1Y2hM_KjNxNUkvdCYcUWt0",
    authDomain: "collegeofengineering-55674.firebaseapp.com",
    projectId: "collegeofengineering-55674",
    storageBucket: "collegeofengineering-55674.appspot.com",
    messagingSenderId: "23561844748",
    appId: "1:23561844748:web:fff6c1f78c141904301629"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Reference to authorization service
export const auth = getAuth();
// Initializes a firestore connection
export const firestoreDb = initializeFirestore(app, { timestampsInSnapshots: true })