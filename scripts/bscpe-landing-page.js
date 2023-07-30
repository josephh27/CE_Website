// PUP Landing Page Header Script starts here
let searchBtn = document.querySelector(".search-btn");
let closeBtn = document.querySelector(".close-btn");
let searchBox = document.querySelector(".search-box");
let logo = document.querySelector(".logo");
let navbarItem = document.querySelector(".navbar-item");
let menuToggle = document.querySelector(".menu-toggle");
let header = document.querySelector("header");

// Enable search
searchBtn.onclick = function () {
	// Show search box and close button
	searchBox.classList.add("active");
	closeBtn.classList.add("active");
	searchBtn.classList.add("active");
	// Hide logo
	logo.classList.add("hidden");
	// Hide menu icon and menu bar
	menuToggle.classList.add("hidden");
	header.classList.remove("open");
};

// Disable search
closeBtn.onclick = function () {
	// Hides search box and close button
	searchBox.classList.remove("active");
	closeBtn.classList.remove("active");
	searchBtn.classList.remove("active");
	// Show logo
	logo.classList.remove("hidden");
	// Show menu bar
	menuToggle.classList.remove("hidden");
};

// Show menu on small screens
menuToggle.onclick = function () {
	header.classList.toggle("open");
	console.log("okay");
	// Hides search box and close button
	searchBox.classList.remove("active");
	closeBtn.classList.remove("active");
	searchBtn.classList.remove("active");
	// Show logo
	logo.classList.remove("hidden");
};
// PUP Landing Page Header Script ends here

// Start of events and announcements carousel

$(document).ready(function () {
	$("#owl-carousel-2, #owl-carousel-1").owlCarousel({
		autoplayHoverPause: true,
		dots: false,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			1000: { items: 3 },
		},
		loop: false,
		rewind: true,
	});

	// Go to the next item
	$(".owl-next-btn").click(function () {
		$(this)
			.closest(".announcement-contents")
			.find(".owl-carousel")
			.trigger("next.owl.carousel");
	});
	// Go to the previous item
	$(".owl-prev-btn").click(function () {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		$(this)
			.closest(".announcement-contents")
			.find(".owl-carousel")
			.trigger("prev.owl.carousel");
	});
});
// End of events and announcements carousel

// Start of department list home page

const wideDeptButton = document.querySelectorAll(".department-button");
const wideDeptTitle = document.querySelector(".home-department-title");
const wideDeptDescription = document.querySelector(
	".home-department-description"
);
const fetchDeptNameDesc = async (department) => {
	const response = await fetch(`assets/data/departments.json`);
	const data = await response.json();
	wideDeptDescription.innerText = data[department]["description"];
	wideDeptTitle.innerText = data[department]["name"];
};
wideDeptButton.forEach((elem) => {
	elem.addEventListener("mouseover", (e) => {
		fetchDeptNameDesc(e.currentTarget.id);
	});
});

const deptAccordions = document.querySelectorAll(".accordion");
const fetchDeptContent = async (department, contentBox) => {
	const response = await fetch(`assets/data/departments.json`);
	const data = await response.json();
	contentBox.innerText = data[department]["description"];
};
deptAccordions.forEach((elem) => {
	const accordionContextBox = elem.querySelector(".content > p:first-child");
	fetchDeptContent(elem.id, accordionContextBox);
});

// End of department list in home page

// Home panel 5 carousel starts here
$(document).ready(function () {
	$(".message--list").owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		// autoplay: true,
		autoplaySpeed: 1500,
		autoplayTimeout: 6000,
		smartSpeed: 1500,
	});
});
// Home panel 5 carousel ends here
