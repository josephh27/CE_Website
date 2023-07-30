import { getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "./main.js";

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const wideDepartmentContainer = document.querySelector(".wide-department-buttons-container");
const loginSection = document.querySelector('.login-section');

export const setupUI = (user) => {
    if (user) { 
        wideDepartmentContainer.style.display = 'flex';
        loginSection.style.display = 'none';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        wideDepartmentContainer.style.display = 'none';
        loginSection.style.display = 'flex';

        // Get the show password button
        let eyeIcon = document.getElementById('eye-icon');
        // Get the password input box
        let password = document.getElementById('password');

        // Show password function
        eyeIcon.onclick = function() {
            // If the current password type is password
            if (password.type == "password") {
                // Convert password type to text to show it
                password.type = "text";
                // Make the icon solid
                eyeIcon.classList.remove("fa-regular");
                eyeIcon.classList.add("fa-solid");
                eyeIcon.classList.add("active");
            } else {
                // Convert type back to password to hide it
                password.type = "password";
                // Make the icon solid
                eyeIcon.classList.add("fa-regular");
                eyeIcon.classList.remove("fa-solid");
                eyeIcon.classList.remove("active");
            }
        }
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}
