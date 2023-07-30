import { auth, firestoreDb } from './main.js';
import { setupUI } from './index.js';

export const logout = () => {
    const logoutButton = document.querySelector('button[type="logout"]');
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut()
    })
}
