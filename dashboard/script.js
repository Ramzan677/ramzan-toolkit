// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const authData = JSON.parse(localStorage.getItem('ramzan_toolkit_auth'));
    
    if (!authData || !authData.key || !authData.mobile) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // Verify the key is still valid (in a real app, this would check with server)
    fetch('../keys/keys.json')
        .then(response => response.json())
        .then(keys => {
            const validKey = keys.find(k => k.key === authData.key && k.mobile === authData.mobile);
            
            if (!validKey) {
                localStorage.removeItem('ramzan_toolkit_auth');
                window.location.href = '../auth/login.html';
            }
        })
        .catch(error => {
            console.error('Error verifying key:', error);
        });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('ramzan_toolkit_auth');
        window.location.href = '../index.html';
    });
});
