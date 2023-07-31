const searchInput = document.getElementById('search');
const departments = document.querySelectorAll('.department');

// Function to filter sections based on search term
function filterSections(department, searchTerm) {
    const sections = department.querySelectorAll('.section');
    const hiddenSections = department.querySelectorAll('.hidden-section');

    let departmentHasVisibleSections = false;

    for (const section of sections) {
        const title = section.querySelector('.title').innerText.toLowerCase();
        const description = section.querySelector('.description').innerText.toLowerCase();

        const shouldDisplay = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
        section.style.display = shouldDisplay ? 'block' : 'none';

        if (shouldDisplay) {
            departmentHasVisibleSections = true;
        }
    }

    // Toggle Load More/Less button visibility based on search
    const toggleButton = department.querySelector('button');
    toggleButton.style.display = departmentHasVisibleSections && searchTerm === '' ? 'block' : 'none';
}

// Function to hide all hidden sections
function hideHiddenSections() {
    for (const department of departments) {
        const hiddenSections = department.querySelectorAll('.hidden-section');
        for (const section of hiddenSections) {
            section.style.display = 'none';
        }
    }
}

// Search Functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    for (const department of departments) {
        filterSections(department, searchTerm);
    }
    hideHiddenSections(); // Hide all hidden sections after searching
});

// Load More/Less Functionality
for (let i = 1; i <= departments.length; i++) {
    const department = departments[i - 1];
    const hiddenSections = department.querySelectorAll('.hidden-section');
    const toggleButton = department.querySelector(`#toggleButton${i}`);

    let areHiddenSectionsVisible = false;

    toggleButton.addEventListener('click', () => {
        for (const section of hiddenSections) {
            section.style.display = areHiddenSectionsVisible ? 'none' : 'block';
        }
        areHiddenSectionsVisible = !areHiddenSectionsVisible;
        toggleButton.textContent = areHiddenSectionsVisible ? 'LOAD LESS' : 'LOAD MORE';
    });
}