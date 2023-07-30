        // Function to show/hide load more buttons
        function toggleLoadMoreButtons(show) {
            const loadMoreButtons = document.querySelectorAll('.btn-area');
            loadMoreButtons.forEach(button => {
                button.style.display = show ? 'flex' : 'none';
            });
        }
    
        // Function to perform the search
        function performSearch() {
            const searchInput = document.getElementById('search-input').value.toLowerCase();
            const facultySections = document.querySelectorAll('.section');
    
            // Hide load more buttons when searching
            toggleLoadMoreButtons(false);
    
            facultySections.forEach(section => {
                const facultyName = section.querySelector('.title').textContent.toLowerCase();
                const facultyDescription = section.querySelector('.description').textContent.toLowerCase();
                const isVisible = facultyName.includes(searchInput) || facultyDescription.includes(searchInput);
                section.style.display = isVisible ? 'block' : 'none';
            });
    
            // Show load more buttons when not searching
            if (searchInput === '') {
                toggleLoadMoreButtons(true);
            }
        }
    
        // Event listener to trigger search on input change
        document.getElementById('search-input').addEventListener('input', performSearch);