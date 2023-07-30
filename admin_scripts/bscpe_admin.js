import { getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "./main.js";
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

// Fetch current data 
// const guideContentIds = ['programDesc', 'curriculumDesc1', 'curriculumDesc2', 'curriculumDesc3', 'specializationFields1',
//   'specializationFields2', 'programEducationalObjectives'];
const docRef = doc(firestoreDb, "College Of Engineering", "bscpe");
const docSnap = await getDoc(docRef);
const data = docSnap.data();

// Peo List Reference
const docRefPEO = doc(firestoreDb, "College Of Engineering", "bscpePEO");
const docSnapPEO = await getDoc(docRefPEO);
const dataPEO = docSnapPEO.data();

// Program Educational Objectives List
const programEducationalObjectivesList = document.querySelector('.level-list');
const peoList = [];

Object.keys(dataPEO).forEach((id) => {
  if (docSnap.exists()) {
    peoList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted

peoList.sort();
peoList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('peoListItem')
  listItem.id = id;
  // Create caption textarea
  const captionTextArea = document.createElement('textarea');
  captionTextArea.setAttribute('cols', 30);
  captionTextArea.setAttribute('rows', 1);
  captionTextArea.id = `peoListItemCapt${index}` 
  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 10);
  descriptionTextArea.id = `peoListItemDesc${index}` 
  // Setting values
  captionTextArea.textContent = dataPEO[id].peoCapt;
  descriptionTextArea.textContent = dataPEO[id].peoDesc;
  listItem.appendChild(captionTextArea);
  listItem.appendChild(descriptionTextArea);
  programEducationalObjectivesList.appendChild(listItem);
})
// End of Program Educational Objectives List


// Start of setting each paragraph content
Object.keys(data).forEach((id) => {
  if (docSnap.exists()) {
    const element = document.querySelector(`#${id}`)
    element.textContent = data[id]
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})

// Write data
const bscpeForm = document.querySelector('#bscpe-form');
bscpeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newDoc = {};
    Object.keys(data).forEach((key) => {
      newDoc[key] = bscpeForm[key].value.trim()
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpe"), 
          newDoc).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });

    // Setting Program Educational Objectives list items
    const newDocPEO = {};
    Object.keys(dataPEO).forEach((key, index) => {
      newDocPEO[key] = 
      {
        peoCapt: bscpeForm['peoListItemCapt' + index].value.trim(),
        peoDesc: bscpeForm['peoListItemDesc' + index].value.trim()
      }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpePEO"), 
          newDocPEO).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });
})

