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

    // Program Outcomes List
    const programOutcomesList = document.querySelector('.outcomes');
    const poList = [];

    Object.keys(dataPEO).forEach((id) => {
      if (docSnapPEO.exists()) {
        peoList.push(id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
    })
    peoList.sort()
    peoList.forEach((key) => {
      const listItem = document.createElement('li');
      const listCaption = document.createElement('b');
      const listDescription = document.createElement('span');
      listCaption.innerText = dataPEO[key]['peoCapt'];
      listDescription.innerText = dataPEO[key]['peoDesc'];
      listItem.appendChild(listCaption);
      listItem.appendChild(document.createTextNode("\u00A0"));
      listItem.appendChild(listDescription);
      programEducationalObjectivesList.appendChild(listItem);
    })
    // End of Program Educational Objectives List

    // Peo List Reference
    const docRefPO = doc(firestoreDb, "College Of Engineering", "bscpePO");
    const docSnapPO = await getDoc(docRefPO);
    const dataPO = docSnapPO.data();


    Object.keys(dataPO).forEach((id) => {
      if (docSnapPEO.exists()) {
        poList.push(id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
    })
    poList.sort()
    poList.forEach((key, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('outcome');
      const outcomeNum = document.createElement('p');
      outcomeNum.classList.add('outcome-num')
      outcomeNum.innerText = index + 1;
      const outcomeDesc = document.createElement('p');
      outcomeDesc.classList.add('outcome-desc')
      outcomeDesc.innerText = dataPO[key]['poDesc'];
      listItem.appendChild(outcomeNum);
      listItem.appendChild(outcomeDesc);
      programOutcomesList.appendChild(listItem);
    })
    // End of Program Outcomes List


    // EML Positions List
    const entryMidLevelList = document.querySelector('#entry-mid-level');
    const emlList = [];

    // EML List Reference
    const docRefEML = doc(firestoreDb, "College Of Engineering", "bscpeEntryMidLevel");
    const docSnapEML = await getDoc(docRefEML);
    const dataEML = docSnapEML.data();


    Object.keys(dataEML).forEach((id) => {
      if (docSnapEML.exists()) {
        emlList.push(id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
    })
    emlList.sort()
    emlList.forEach((key, index) => {
      const listItem = document.createElement('li');
      listItem.innerText = dataEML[key]['emlDesc'];
      entryMidLevelList.appendChild(listItem);
    })
    // End of Entry-Mid Level Positions List


    // EML Positions List
    const advancedLevelList = document.querySelector('#advanced-level');
    const advList = [];

    // EML List Reference
    const docRefAdv = doc(firestoreDb, "College Of Engineering", "bscpeAdvanced");
    const docSnapAdv = await getDoc(docRefAdv);
    const dataAdv = docSnapAdv.data();


    Object.keys(dataAdv).forEach((id) => {
      if (docSnapAdv.exists()) {
        advList.push(id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    
    })
    advList.sort()
    advList.forEach((key, index) => {
      const listItem = document.createElement('li');
      listItem.innerText = dataAdv[key]['advDesc'];
      advancedLevelList.appendChild(listItem);
    })
    // End of Advanced Level Positions List

     // Admission Requirements List
     const bscpeAdmissionList = document.querySelector('#admission-req-list');
     const admissionList = [];
 
     // EML List Reference
     const docRefAdmission = doc(firestoreDb, "College Of Engineering", "bscpeAdmission");
     const docSnapAdmission = await getDoc(docRefAdmission);
     const dataAdmission = docSnapAdmission.data();
 
 
     Object.keys(dataAdmission).forEach((id) => {
       if (docSnapAdmission.exists()) {
         admissionList.push(id);
       } else {
         // docSnap.data() will be undefined in this case
         console.log("No such document!");
       }
     
     })
     admissionList.sort()
     admissionList.forEach((key, index) => {
       const listItem = document.createElement('li');
       listItem.innerText = dataAdmission[key]['admissionDesc'];
       bscpeAdmissionList.appendChild(listItem);
     })
     // End of Admission Requirements List


     // Retention Requirements List
     const bscpeRetention = document.querySelector('#retention-steps');
     const retentionList = [];
 
     // EML List Reference
     const docRefRetention = doc(firestoreDb, "College Of Engineering", "bscpeRetention");
     const docSnapRetention = await getDoc(docRefRetention);
     const dataRetention = docSnapRetention.data();
 
 
     Object.keys(dataRetention).forEach((id) => {
       if (docSnapRetention.exists()) {
         retentionList.push(id);
       } else {
         // docSnap.data() will be undefined in this case
         console.log("No such document!");
       }
     
     })
     retentionList.sort()
     retentionList.forEach((key, index) => {
       const listItem = document.createElement('li');
       listItem.innerText = dataRetention[key]['retentionDesc'];
       bscpeRetention.appendChild(listItem);
     })
     // End of Retention Requirements List


     // Graduation Requirements List
     const bscpeGraduation = document.querySelector('#grad-reqs');
     const graduationList = [];
 
     // EML List Reference
     const docRefGraduation = doc(firestoreDb, "College Of Engineering", "bscpeGraduation");
     const docSnapGraduation = await getDoc(docRefGraduation);
     const dataGraduation = docSnapGraduation.data();
 
 
     Object.keys(dataGraduation).forEach((id) => {
       if (docSnapGraduation.exists()) {
         graduationList.push(id);
       } else {
         // docSnap.data() will be undefined in this case
         console.log("No such document!");
       }
     
     })
     graduationList.sort()
     graduationList.forEach((key, index) => {
       const listItem = document.createElement('li');
       listItem.innerText = dataGraduation[key]['graduationDesc'];
       bscpeGraduation.appendChild(listItem);
     })
     // End of Retention Requirements List

}

fillContent()