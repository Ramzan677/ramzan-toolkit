document.getElementById('keyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const accessKey = document.getElementById('accessKey').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const messageElement = document.getElementById('message');
    
    // Simple validation
    if (!accessKey || !mobileNumber) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Check if mobile number is valid (simple check)
    if (!/^\d+$/.test(mobileNumber)) {
        showMessage('Please enter a valid mobile number', 'error');
        return;
    }
    
    // Fetch keys from server (in a real app, this would be an API call)
    fetch('../keys/keys.json')
        .then(response => response.json())
        .then(keys => {
            const foundKey = keys.find(k => k.key === accessKey);
            
            if (foundKey) {
                if (foundKey.used) {
                    if (foundKey.mobile === mobileNumber) {
                        // Key matches the mobile number - allow access
                        localStorage.setItem('ramzan_toolkit_auth', JSON.stringify({
                            key: accessKey,
                            mobile: mobileNumber,
                            timestamp: new Date().getTime()
                        }));
                        window.location.href = '../dashboard/index.html';
                    } else {
                        showMessage('This key is already registered to another mobile number', 'error');
                    }
                } else {
                    // First time use - register the mobile number
                    foundKey.used = true;
                    foundKey.mobile = mobileNumber;
                    
                    // In a real app, you would send this update to the server
                    console.log('Key activated for mobile:', mobileNumber);
                    
                    localStorage.setItem('ramzan_toolkit_auth', JSON.stringify({
                        key: accessKey,
                        mobile: mobileNumber,
                        timestamp: new Date().getTime()
                    }));
                    window.location.href = '../dashboard/index.html';
                }
            } else {
                showMessage('Invalid access key', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        });
});

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = 'message ' + type;
    
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 5000);
}
