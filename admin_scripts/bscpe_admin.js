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
peoList.sort();
peoList.forEach((id, index) => {
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
    removePoItems();
    removeEmlItems();
    // Setting Program Educational Objectives list items
    const newDocPEO = {};
    peoList.sort();
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
    // Setting Program Educational Objectives list items
    const newDocPO = {};
    poList.sort();
    poList.forEach((key, index) => {
    newDocPO[key] = 
    {
      poDesc: bscpeForm['poListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpePO"), 
      newDocPO).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });
    // Setting Entry-Mid Level Positions list items
    const newDocEML = {};
    emlList.sort();
    emlList.forEach((key, index) => {
      newDocEML[key] = 
    {
      emlDesc: bscpeForm['emlListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpeEntryMidLevel"), 
    newDocEML).then(() => {
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
  addRemovePeoButton();
})

// Remove A Program Educational Objective

// Adding an event listener to the newly added remove button
const addRemovePeoButton = () => {
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
addRemovePeoButton();
// End of Program Educational Objectives List


// Program Outcome Dynamism
// Po List Reference
const docRefPO = doc(firestoreDb, "College Of Engineering", "bscpePO");
const docSnapPO = await getDoc(docRefPO);
const dataPO = docSnapPO.data();

// Program Outcomes List
 const programOutcomesList = document.querySelector('.outcomes');
 const poList = [];

 Object.keys(dataPO).forEach((id) => {
  if (docSnap.exists()) {
    poList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})

// Putting in a list so it can be sorted
poList.sort();
poList.forEach((id, index) => {
  const outcomeDiv = document.createElement('div');
  outcomeDiv.classList.add('poListItem');
  outcomeDiv.classList.add('outcome')
  outcomeDiv.id = id;

  // Create description textarea
  const programOutcomeTextArea = document.createElement('textarea');
  const outcomeNum = document.createElement('p');
  outcomeNum.textContent = index+1;
  outcomeNum.classList.add('outcome-num');

  programOutcomeTextArea.setAttribute('cols', 30);
  programOutcomeTextArea.setAttribute('rows', 4);
  programOutcomeTextArea.id = `poListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM OUTCOME';
  removeButton.classList.add('remove-po-button');

  // Setting values
  programOutcomeTextArea.textContent = dataPO[id].poDesc;
  outcomeDiv.appendChild(outcomeNum);
  outcomeDiv.appendChild(programOutcomeTextArea);
  outcomeDiv.appendChild(removeButton);
  programOutcomesList.appendChild(outcomeDiv);
})

// Add another Program Outcome
const addPoButton = document.querySelector('#add-po-button');
addPoButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = poList.length + 1;
  const outcomeDiv = document.createElement('div');
  outcomeDiv.classList.add('poListItem');
  outcomeDiv.classList.add('outcome');
  outcomeDiv.id = 'poListItem' + (latestIndex).toString();
  
  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 4);
  descriptionTextArea.id = `poListItemDesc${latestIndex}` 

  const outcomeNum = document.createElement('p');
  outcomeNum.textContent = latestIndex;
  outcomeNum.classList.add('outcome-num');

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM OUTCOME';
  removeButton.classList.add('remove-po-button');

  // Setting values
  outcomeDiv.appendChild(outcomeNum);
  outcomeDiv.appendChild(descriptionTextArea);
  outcomeDiv.appendChild(removeButton);
  programOutcomesList.appendChild(outcomeDiv);
  poList.push('peListItem' + (latestIndex).toString());
  addRemovePoButton();
})


// Remove A Program Educational Objective
// Adding an event listener to the newly added remove button
const addRemovePoButton = () => {
  const removePoButton = document.querySelectorAll('.remove-po-button');
  removePoButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = poList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        poList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removePoItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('.outcomes').children;
  poList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'poListItem' + (index + 1).toString();
    const poDesc = item.querySelector('textarea:nth-child(2)');
    poDesc.id = `poListItem${index + 1}`;
    poDesc.id = `poListItemDesc${index + 1}`;
    poList.push(`poListItem${index + 1}`);
  })
}
addRemovePoButton();

// Creating functions for making lists dynamic
// Fetch current data 
const docRefEML = doc(firestoreDb, "College Of Engineering", "bscpeEntryMidLevel");
const docSnapEML = await getDoc(docRefEML);
const dataEML = docSnapEML.data();

// Program Educational Objectives List
const bscpeEntryMidLevelList = document.querySelector('#entry-mid-level');
const emlList = [];

Object.keys(dataEML).forEach((id) => {
  if (docSnap.exists()) {
    emlList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted
emlList.sort();
emlList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('emlListItem')
  listItem.id = id;

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 2);
  descriptionTextArea.id = `emlListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM ENTRY-MID LEVEL POSITION';
  removeButton.classList.add('remove-eml-button');

  // Setting values
  descriptionTextArea.textContent = dataEML[id].emlDesc;
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeEntryMidLevelList.appendChild(listItem);
})

// Add another Program Educational Objective
const addEmlButton = document.querySelector('#add-eml-button');
addEmlButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = emlList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('emlListItem')
  listItem.id = 'emlListItem' + (latestIndex).toString();

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 2);
  descriptionTextArea.id = `emlListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE PROGRAM ENTRY-MID LEVEL POSITION';
  removeButton.classList.add('remove-eml-button');

  // Setting values
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeEntryMidLevelList.appendChild(listItem);
  emlList.push('peoListItemCapt' + (latestIndex).toString());
  addRemoveEmlButton();
})

// Remove A Program Educational Objective

// Adding an event listener to the newly added remove button
const addRemoveEmlButton = () => {
  const removePeoButton = document.querySelectorAll('.remove-eml-button');
  removePeoButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = emlList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        emlList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removeEmlItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('#entry-mid-level').children;
  emlList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'emlListItem' + (index + 1).toString();
    const emlDesc = item.querySelector('textarea:first-child');
    emlDesc.id = `emlListItemDesc${index + 1}`;
    emlList.push(`emlListItem${index + 1}`);
  })
}
addRemoveEmlButton();
// End of Program Entry-Mid level positions
