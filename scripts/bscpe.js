import { collection, getDoc, onSnapshot, doc} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "../admin_scripts/main.js";


// Header starts here

let searchBtn = document.querySelector('.search-btn');
let closeBtn = document.querySelector('.close-btn');
let searchBox = document.querySelector('.search-box');
let logo = document.querySelector('.logo');
let navbarItem = document.querySelector('.navbar-item');
let menuToggle = document.querySelector('.menu-toggle');
let header = document.querySelector('header');

// Enable search
searchBtn.onclick = function() {
  searchBox.classList.add('active');
  closeBtn.classList.add('active');
  searchBtn.classList.add('active');
  logo.classList.add('hidden');
  menuToggle.classList.add('hidden');
  header.classList.remove('open');  
}

// Disable the search function
closeBtn.onclick = function() {
  searchBox.classList.remove('active');
  closeBtn.classList.remove('active');
  searchBtn.classList.remove('active');
  logo.classList.remove('hidden');
  menuToggle.classList.remove('hidden');
}

// Toggle menu in small screens
menuToggle.onclick = function() {
  header.classList.toggle('open');
  searchBox.classList.remove('active');
  closeBtn.classList.remove('active');
  searchBtn.classList.remove('active');
  logo.classList.remove('hidden');
}

// Header ends here 


// Filling webpage with dynamic content 

// const guideContentIds = ['programDesc', 'curriculumDesc1', 'curriculumDesc2', 'curriculumDesc3', 'specializationFields1',
//   'specializationFields2', 'programEducationalObjectives'];

const fillContent = async () => {
    const docRef = doc(firestoreDb, "College Of Engineering", "bscpe");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    Object.keys(data).forEach((id) => {
      if (docSnap.exists()) {
        const element = document.querySelector(`#${id}`)
        element.textContent = data[id]
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    })

    // Peo List Reference
    const docRefPEO = doc(firestoreDb, "College Of Engineering", "bscpePEO");
    const docSnapPEO = await getDoc(docRefPEO);
    const dataPEO = docSnapPEO.data();

    // Program Educational Objectives List
    const programEducationalObjectivesList = document.querySelector('.level-list');
    const peoList = [];

    Object.keys(dataPEO).forEach((id) => {
      if (docSnapPEO.exists()) {
        peoList.push(id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
    })
    peoList.sort()
    console.log(peoList)
    peoList.forEach((key) => {
      const listItem = document.createElement('li');
      const listCaption = document.createElement('b');
      const listDescription = document.createElement('span');
      listCaption.innerText = dataPEO[key]['peoCapt'];
      listDescription.innerText = dataPEO[key]['peoDesc'];
      listItem.appendChild(listCaption);
      listItem.appendChild(listDescription);
      programEducationalObjectivesList.appendChild(listItem);
    })
    // End of Program Educational Objectives List
}

fillContent()