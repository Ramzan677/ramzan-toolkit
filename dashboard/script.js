// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const authData = JSON.parse(localStorage.getItem('ramzan_toolkit_auth'));
    if (!authData || !authData.key || !authData.mobile) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categories = document.querySelectorAll('.category');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        categories.forEach(category => {
            const title = category.querySelector('h3').textContent.toLowerCase();
            const resources = category.querySelectorAll('.resource-btn');
            let hasMatch = false;

            // Check if category title matches
            if (title.includes(searchTerm)) {
                hasMatch = true;
            }

            // Check if any resource in category matches
            resources.forEach(resource => {
                const resourceText = resource.textContent.toLowerCase();
                if (resourceText.includes(searchTerm)) {
                    hasMatch = true;
                }
            });

            // Show/hide category based on match
            category.style.display = hasMatch ? 'block' : 'none';
        });
    }

    // Search when button is clicked
    searchBtn.addEventListener('click', performSearch);

    // Search when Enter key is pressed
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('ramzan_toolkit_auth');
        window.location.href = '../index.html';
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
