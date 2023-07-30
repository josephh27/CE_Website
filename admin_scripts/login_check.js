import { auth, firestoreDb } from './main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { logout } from './logout.js'

// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        logout();
    } else {
        window.location.href = '../admin/login.html'
    }
})