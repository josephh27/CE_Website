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