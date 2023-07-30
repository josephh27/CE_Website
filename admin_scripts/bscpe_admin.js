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
let latestIndex = 0;
peoList.sort();
peoList.forEach((id, index) => {
  latestIndex += 1;
  const listItem = document.createElement('li');
  listItem.classList.add('peoListItem')
  listItem.id = id;

  // Create caption textarea
  const captionTextArea = document.createElement('textarea');
  captionTextArea.setAttribute('cols', 30);
  captionTextArea.setAttribute('rows', 1);
  captionTextArea.id = `peoListItemCapt${index+1}` 

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 10);
  descriptionTextArea.id = `peoListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM EDUCATIONAL OBJECTIVE';
  removeButton.classList.add('remove-peo-button');

  // Setting values
  captionTextArea.textContent = dataPEO[id].peoCapt;
  descriptionTextArea.textContent = dataPEO[id].peoDesc;
  listItem.appendChild(captionTextArea);
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
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
    removePeoItems();
    // Setting Program Educational Objectives list items
    const newDocPEO = {};
    peoList.sort();
    console.log(peoList);
    peoList.forEach((key, index) => {
    newDocPEO[key] = 
    {
      peoCapt: bscpeForm['peoListItemCapt' + (index+1).toString()].value.trim(),
      peoDesc: bscpeForm['peoListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpePEO"), 
          newDocPEO).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });
    alert('Saved Changes Successfully!');
})

// Add another Program Educational Objective
const addPeoButton = document.querySelector('#add-peo-button');
addPeoButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = peoList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('peoListItem')
  listItem.id = 'peoListItemCapt' + (latestIndex).toString();
  // Create caption textarea
  const captionTextArea = document.createElement('textarea');
  captionTextArea.setAttribute('cols', 30);
  captionTextArea.setAttribute('rows', 1);
  captionTextArea.id = `peoListItemCapt${latestIndex}` 
  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 10);
  descriptionTextArea.id = `peoListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM EDUCATIONAL OBJECTIVE';
  removeButton.classList.add('remove-peo-button');

  // Setting values
  listItem.appendChild(captionTextArea);
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  programEducationalObjectivesList.appendChild(listItem);
  peoList.push('peoListItemCapt' + (latestIndex).toString());
  addRemoveListener();
})

// Remove A Program Educational Objective

const addRemoveListener = () => {
  const removePeoButton = document.querySelectorAll('.remove-peo-button');
  removePeoButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = peoList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        peoList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removePeoItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('.level-list').children;
  peoList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'peoListItemCapt' + (index + 1).toString();
    const peoCapt = item.querySelector('textarea:first-child');
    const peoDesc = item.querySelector('textarea:nth-child(2)');
    peoCapt.id = `peoListItemCapt${index + 1}`;
    peoDesc.id = `peoListItemDesc${index + 1}`;
    peoList.push(`peoListItemCapt${index + 1}`);
  })
}
addRemoveListener();