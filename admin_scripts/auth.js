import { auth, firestoreDb } from './main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, getDocs, addDoc, onSnapshot, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { setupUI } from './index.js';
import { logout } from './logout.js'
// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        logout();
        setupUI(user);
    } else {
        setupUI();
        // Login
        const loginForm = document.querySelector("#login-form");
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // get user info
            const email = loginForm['username'].value;
            const password = loginForm['password'].value;

            signInWithEmailAndPassword(auth, email, password).then((cred) => {
                window.location.href = "../admin/bscpe_admin.html";
            }).catch((err) => {
                alert(err.message);
            })
        })

        
    }
})


