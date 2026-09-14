// Check if user is logged in
window.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'index.html';
    }
});

// Go back to quiz page
function goBackToQuiz() {
    window.location.href = 'quiz.html';
}

// Logout function
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('registrationDate');
    window.location.href = 'index.html';
}