// Configuration for external API
const CONFIG = {
    // Replace this with your actual API endpoint that provides daily quiz data
    QUIZ_API_URL: 'https://your-api-endpoint.com/api/daily-quiz',
    // If using a different endpoint format, adjust the URL structure
    // Example formats:
    // 'https://api.example.com/quiz?date=YYYY-MM-DD'
    // 'https://api.example.com/daily?id=1'
};

// Mock data - Replace this with actual API call
const MOCK_QUIZ_DATA = {
    question: "What is the capital of France?",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop", // Eiffel Tower
    answers: [
        "Paris",
        "Lyon",
        "Marseille",
        "Nice"
    ],
    correctAnswer: 0
};

// Check if user is logged in
window.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('userId').textContent = `Welcome, ${userId}`;
    loadDailyQuiz();
});

// Load daily quiz from API or mock data
async function loadDailyQuiz() {
    const quizContent = document.getElementById('quizContent');
    
    try {
        let quizData = await fetchQuizData();
        displayQuiz(quizData);
    } catch (error) {
        console.error('Error loading quiz:', error);
        // Fall back to mock data
        displayQuiz(MOCK_QUIZ_DATA);
    }
}

// Fetch quiz data from your API
// MODIFY THIS FUNCTION to connect with your actual data provider
async function fetchQuizData() {
    // Example: Fetch from your API endpoint
    // const response = await fetch(CONFIG.QUIZ_API_URL);
    // const data = await response.json();
    // return data;
    
    // For now, return mock data
    return MOCK_QUIZ_DATA;
    
    // When you're ready to connect to your API, uncomment the above and adjust:
    // 1. Set QUIZ_API_URL to your actual endpoint
    // 2. Ensure your API returns data in this format:
    // {
    //     question: "string",
    //     imageUrl: "string (must be CORS-enabled)",
    //     answers: ["answer1", "answer2", "answer3", "answer4"],
    //     correctAnswer: 0  // index of correct answer
    // }
}

// Display quiz on the page
function displayQuiz(data) {
    const quizContent = document.getElementById('quizContent');
    
    let answersHTML = data.answers.map((answer, index) => `
        <label class="answer-option">
            <input type="radio" name="answer" value="${index}" onchange="selectAnswer(${index})">
            <span>${answer}</span>
        </label>
    `).join('');
    
    quizContent.innerHTML = `
        <img src="${data.imageUrl}" alt="Quiz Image" class="quiz-image">
        <div class="question">${data.question}</div>
        <div class="answers">
            ${answersHTML}
        </div>
    `;
    
    document.getElementById('submitBtn').style.display = 'inline-block';
}

// Handle answer selection
function selectAnswer(index) {
    document.querySelectorAll('.answer-option').forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Submit quiz answer
function submitQuiz() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer before submitting');
        return;
    }
    
    // Save answer data
    const answerData = {
        userId: localStorage.getItem('userId'),
        answer: selectedAnswer.value,
        timestamp: new Date().toISOString()
    };
    
    // Here you can send the answer to your backend
    // Example: sendAnswerToBackend(answerData);
    
    console.log('Answer submitted:', answerData);
    
    // Redirect to thank you page
    window.location.href = 'thank-you.html';
}

// Logout function
function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('registrationDate');
    window.location.href = 'index.html';
}

// Optional: Function to send answer to your backend API
// Uncomment and modify when ready to connect to your backend
/*
async function sendAnswerToBackend(answerData) {
    try {
        const response = await fetch('https://your-backend-api.com/api/submit-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answerData)
        });
        const result = await response.json();
        console.log('Answer submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
}
*/