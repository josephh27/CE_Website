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
    // Refresh list items in order
    removePeoItems();
    removePoItems();
    removeEmlItems();
    removeAdvItems();
    removeAdmissionItems();
    removeRetentionItems();
    removeGraduationItems();

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
    // Setting Advanced Level Positions list items
    const newDocADV = {};
    advList.sort();
    advList.forEach((key, index) => {
      newDocADV[key] = 
    {
      advDesc: bscpeForm['advListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpeAdvanced"), 
    newDocADV).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });

    // Setting Admission Requirements list items
    const newDocAdmission = {};
    admissionList.sort();
    admissionList.forEach((key, index) => {
      newDocAdmission[key] = 
    {
      admissionDesc: bscpeForm['admissionListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpeAdmission"), 
    newDocAdmission).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });

    // Setting Retention Requirements list items
    const newDocRetention = {};
    retentionList.sort();
    retentionList.forEach((key, index) => {
      newDocRetention[key] = 
    {
      retentionDesc: bscpeForm['retentionListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpeRetention"), 
    newDocRetention).then(() => {
        console.log('success');
      }).catch(err => {
        console.log(err.message);
    });

    // Setting Graduation Requirements list items
    const newDocGraduation = {};
    graduationList.sort();
    graduationList.forEach((key, index) => {
      newDocGraduation[key] = 
    {
      graduationDesc: bscpeForm['graduationListItemDesc' + (index+1).toString()].value.trim()
    }
    })
    setDoc(doc(firestoreDb, "College Of Engineering", "bscpeGraduation"), 
    newDocGraduation).then(() => {
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
  descriptionTextArea.setAttribute('rows', 1);
  descriptionTextArea.id = `emlListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ENTRY-MID LEVEL POSITION';
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
  descriptionTextArea.setAttribute('rows', 1);
  descriptionTextArea.id = `emlListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ENTRY-MID LEVEL POSITION';
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

// Making advanced level positions dynamic
// Fetch current data 
const docRefAdv = doc(firestoreDb, "College Of Engineering", "bscpeAdvanced");
const docSnapAdv = await getDoc(docRefAdv);
const dataAdv = docSnapAdv.data();

// Program Educational Objectives List
const bscpeAdvancedList = document.querySelector('#advanced-level');
const advList = [];

Object.keys(dataAdv).forEach((id) => {
  if (docSnap.exists()) {
    advList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted
advList.sort();
advList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('advListItem')
  listItem.id = id;

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 1);
  descriptionTextArea.id = `advListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ADVANCED LEVEL POSITION';
  removeButton.classList.add('remove-adv-button');

  // Setting values
  descriptionTextArea.textContent = dataAdv[id].advDesc;
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeAdvancedList.appendChild(listItem);
})

// Add another Program Educational Objective
const addAdvButton = document.querySelector('#add-adv-button');
addAdvButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = advList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('advListItem')
  listItem.id = 'advListItem' + (latestIndex).toString();

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 1);
  descriptionTextArea.id = `advListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ADVANCED LEVEL POSITION';
  removeButton.classList.add('remove-adv-button');

  // Setting values
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeAdvancedList.appendChild(listItem);
  advList.push('peoListItemCapt' + (latestIndex).toString());
  addRemoveAdvButton();
})

// Remove A Program Educational Objective

// Adding an event listener to the newly added remove button
const addRemoveAdvButton = () => {
  const removeAdvButton = document.querySelectorAll('.remove-adv-button');
  removeAdvButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = advList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        advList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removeAdvItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('#advanced-level').children;
  advList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'advListItem' + (index + 1).toString();
    const advDesc = item.querySelector('textarea:first-child');
    advDesc.id = `advListItemDesc${index + 1}`;
    advList.push(`advListItem${index + 1}`);
  })
}
addRemoveAdvButton();
// End of Program Advanced level positions

// Making admission requirements list dynamic
// Fetch current data 
const docRefAdmission = doc(firestoreDb, "College Of Engineering", "bscpeAdmission");
const docSnapAdmission = await getDoc(docRefAdmission);
const dataAdmission = docSnapAdmission.data();

// Admission Requirements List
const bscpeAdmissionList = document.querySelector('#admission-req-list');
const admissionList = [];

Object.keys(dataAdmission).forEach((id) => {
  if (docSnap.exists()) {
    admissionList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted
admissionList.sort();
admissionList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('admissionListItem')
  listItem.id = id;

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 2);
  descriptionTextArea.id = `admissionListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ADMISSION REQUIREMENT';
  removeButton.classList.add('remove-admission-button');

  // Setting values
  descriptionTextArea.textContent = dataAdmission[id].admissionDesc;
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeAdmissionList.appendChild(listItem);
})

// Add another Admission Requirement
const addAdmissionButton = document.querySelector('#add-admission-button');
addAdmissionButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = admissionList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('admissionListItem')
  listItem.id = 'admissionListItem' + (latestIndex).toString();

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 1);
  descriptionTextArea.id = `admissionListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE ADMISSION REQUIREMENT';
  removeButton.classList.add('remove-admission-button');

  // Setting values
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeAdmissionList.appendChild(listItem);
  admissionList.push('admissionListItemCapt' + (latestIndex).toString());
  addRemoveAdmissionButton();
})

// Remove An Admission Requirement

// Adding an event listener to the newly added remove button
const addRemoveAdmissionButton = () => {
  const removeAdmissionButton = document.querySelectorAll('.remove-admission-button');
  removeAdmissionButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = admissionList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        admissionList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removeAdmissionItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('#admission-req-list').children;
  admissionList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'admissionListItem' + (index + 1).toString();
    const admissionDesc = item.querySelector('textarea:first-child');
    admissionDesc.id = `admissionListItemDesc${index + 1}`;
    admissionList.push(`admissionListItem${index + 1}`);
  })
}
addRemoveAdmissionButton();
// End of admission requirements

// Making admission requirements list dynamic
// Fetch current data 
const docRefRetention = doc(firestoreDb, "College Of Engineering", "bscpeRetention");
const docSnapRetention = await getDoc(docRefRetention);
const dataRetention = docSnapRetention.data();

// Admission Requirements List
const bscpeRetentionList = document.querySelector('#retention-steps');
const retentionList = [];

Object.keys(dataRetention).forEach((id) => {
  if (docSnap.exists()) {
    retentionList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted
retentionList.sort();
retentionList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('retentionListItem')
  listItem.id = id;

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 2);
  descriptionTextArea.id = `retentionListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE RETENTION REQUIREMENT';
  removeButton.classList.add('remove-retention-button');

  // Setting values
  descriptionTextArea.textContent = dataRetention[id].retentionDesc;
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeRetentionList.appendChild(listItem);
})

// Add another Admission Requirement
const addRetentionButton = document.querySelector('#add-retention-button');
addRetentionButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = retentionList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('retentionListItem')
  listItem.id = 'retentionListItem' + (latestIndex).toString();

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 2);
  descriptionTextArea.id = `retentionListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE RETENTION REQUIREMENT';
  removeButton.classList.add('remove-retention-button');

  // Setting values
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeRetentionList.appendChild(listItem);
  retentionList.push('retentionListItemCapt' + (latestIndex).toString());
  addRemoveRetentionButton();
})

// Remove An Admission Requirement

// Adding an event listener to the newly added remove button
const addRemoveRetentionButton = () => {
  const addRemoveRetentionButton = document.querySelectorAll('.remove-retention-button');
  addRemoveRetentionButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = retentionList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        retentionList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removeRetentionItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('#retention-steps').children;
  retentionList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'retentionListItem' + (index + 1).toString();
    const retentionDesc = item.querySelector('textarea:first-child');
    retentionDesc.id = `retentionListItemDesc${index + 1}`;
    retentionList.push(`retentionListItem${index + 1}`);
  })
}
addRemoveRetentionButton();


// Making graduation requirements list dynamic
// Fetch current data 
const docRefGraduation = doc(firestoreDb, "College Of Engineering", "bscpeGraduation");
const docSnapGraduation = await getDoc(docRefGraduation);
const dataGraduation = docSnapGraduation.data();

// Admission Requirements List
const bscpeGraduationList = document.querySelector('#grad-reqs');
const graduationList = [];

Object.keys(dataGraduation).forEach((id) => {
  if (docSnap.exists()) {
    graduationList.push(id);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
})
// Putting in a list so it can be sorted
graduationList.sort();
graduationList.forEach((id, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('graduationListItem')
  listItem.id = id;

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 4);
  descriptionTextArea.id = `graduationListItemDesc${index+1}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE GRADUATION REQUIREMENT';
  removeButton.classList.add('remove-graduation-button');

  // Setting values
  descriptionTextArea.textContent = dataGraduation[id].graduationDesc;
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeGraduationList.appendChild(listItem);
})

// Add another Admission Requirement
const addGraduationButton = document.querySelector('#add-graduation-button');
addGraduationButton.addEventListener('click', (e) => {
  e.preventDefault();
  const latestIndex = graduationList.length + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('graduationListItem')
  listItem.id = 'graduationListItem' + (latestIndex).toString();

  // Create description textarea
  const descriptionTextArea = document.createElement('textarea');
  descriptionTextArea.setAttribute('cols', 30);
  descriptionTextArea.setAttribute('rows', 4);
  descriptionTextArea.id = `graduationListItemDesc${latestIndex}` 

  //Create remove button 
  const removeButton = document.createElement('button');
  removeButton.textContent = 'REMOVE GRADUATION REQUIREMENT';
  removeButton.classList.add('remove-graduation-button');

  // Setting values
  listItem.appendChild(descriptionTextArea);
  listItem.appendChild(removeButton);
  bscpeGraduationList.appendChild(listItem);
  graduationList.push('graduationListItemCapt' + (latestIndex).toString());
  addRemoveGraduationButton();
})

// Remove An Admission Requirement

// Adding an event listener to the newly added remove button
const addRemoveGraduationButton = () => {
  const addRemoveGraduationButton = document.querySelectorAll('.remove-graduation-button');
  addRemoveGraduationButton.forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const index = graduationList.indexOf(e.currentTarget.parentElement.id);
      if (index > -1) { // only splice array when item is found
        graduationList.splice(index, 1); // 2nd parameter means remove one item only
      }
      e.currentTarget.parentElement.remove()
    })
  })
}

const removeGraduationItems = () => {
  // Refresh Program Educational Objectives list order
  const listItems = document.querySelector('#grad-reqs').children;
  graduationList.length = 0;
  const listArray = [...listItems];
  listArray.forEach((item, index) => {
    item.id = 'graduationListItem' + (index + 1).toString();
    const graduationDesc = item.querySelector('textarea:first-child');
    graduationDesc.id = `graduationListItemDesc${index + 1}`;
    graduationList.push(`graduationListItem${index + 1}`);
  })
}
addRemoveGraduationButton();

