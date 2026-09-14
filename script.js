document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value.trim();
    const termsCheckbox = document.getElementById('termsCheckbox').checked;
    const idError = document.getElementById('idError');
    const termsError = document.getElementById('termsError');
    
    // Clear previous errors
    idError.textContent = '';
    termsError.textContent = '';
    
    let isValid = true;
    
    // Validate Student ID starts with 'edu'
    if (!userId.toLowerCase().startsWith('edu')) {
        idError.textContent = 'Student ID must start with "edu"';
        isValid = false;
    }
    
    if (!userId) {
        idError.textContent = 'Student ID is required';
        isValid = false;
    }
    
    // Validate terms checkbox
    if (!termsCheckbox) {
        termsError.textContent = 'You must agree to the Terms of Service';
        isValid = false;
    }
    
    if (isValid) {
        // Save user data to localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('registrationDate', new Date().toISOString());
        
        // Redirect to quiz page
        window.location.href = 'quiz.html';
    }
});

// Real-time validation for Student ID
document.getElementById('userId').addEventListener('input', function() {
    const idError = document.getElementById('idError');
    const value = this.value.toLowerCase();
    
    if (value && !value.startsWith('edu')) {
        idError.textContent = 'Student ID must start with "edu"';
    } else {
        idError.textContent = '';
    }
});

// Real-time validation for Terms checkbox
document.getElementById('termsCheckbox').addEventListener('change', function() {
    const termsError = document.getElementById('termsError');
    if (this.checked) {
        termsError.textContent = '';
    }
});