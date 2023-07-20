// PUP Landing Page Header Script starts here
let searchBtn = document.querySelector('.search-btn');
let closeBtn = document.querySelector('.close-btn');
let searchBox = document.querySelector('.search-box');
let logo = document.querySelector('.logo');
let navbarItem = document.querySelector('.navbar-item');
let menuToggle = document.querySelector('.menu-toggle');
let header = document.querySelector('header');

// Enable search
searchBtn.onclick = function() {
  // Show search box and close button
  searchBox.classList.add('active');
  closeBtn.classList.add('active');
  searchBtn.classList.add('active');
  // Hide logo
  logo.classList.add('hidden');
  // Hide menu icon and menu bar
  menuToggle.classList.add('hidden');
  header.classList.remove('open');  
}

// Disable search
closeBtn.onclick = function() {
  // Hides search box and close button
  searchBox.classList.remove('active');
  closeBtn.classList.remove('active');
  searchBtn.classList.remove('active');
  // Show logo
  logo.classList.remove('hidden');
  // Show menu bar
  menuToggle.classList.remove('hidden');
}

// Show menu on small screens
menuToggle.onclick = function() {
  header.classList.toggle('open');
  // Hides search box and close button
  searchBox.classList.remove('active');
  closeBtn.classList.remove('active');
  searchBtn.classList.remove('active');
  // Show logo
  logo.classList.remove('hidden');
}
// PUP Landing Page Header Script ends here

// Start of departments carousel
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const gallery = document.querySelector('.gallery');

class Carousel {

    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
            el.classList.remove('gallery-item-7');
        })

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        })
    }

    setCurrentState(direction) {
        if (direction.className == 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }
    
    setControls() {
        this.carouselControls.forEach(control => {
            gallery.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        })
    }

    useControls() {
        const previousTrigger = document.querySelector('.gallery-controls-previous');
        const nextTrigger = document.querySelector('.gallery-controls-next');
        const triggers = [previousTrigger, nextTrigger];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            })
        })
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
// End of departments carousel

// Start of events and announcements carousel

$(document).ready(function () {
    $("#owl-carousel-2, #owl-carousel-1").owlCarousel({
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {items: 1},
            600: {items: 2},
            1000: {items: 3}
        },
        loop: false,
        rewind: true
    });

    // Go to the next item
    $('.owl-next-btn').click(function() {
        $(this).closest('.announcement-contents').find('.owl-carousel').trigger('next.owl.carousel');

    })
    // Go to the previous item
    $('.owl-prev-btn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        $(this).closest('.announcement-contents').find('.owl-carousel').trigger('prev.owl.carousel');
    })

});
// End of events and announcements carousel