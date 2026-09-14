# API Integration Guide

This guide explains how to connect your EDU Quiz Site with your external data provider.

## Overview

The site is designed to fetch daily quiz questions, images, and answers from an external API. Currently, it uses mock data, but you can easily connect it to your actual data provider.

## Step 1: Identify Your API Endpoint

Your data provider should have an API endpoint that returns daily quiz data. The endpoint should return data in the following JSON format:

```json
{
  "question": "What is the capital of France?",
  "imageUrl": "https://example.com/image.jpg",
  "answers": [
    "Paris",
    "Lyon",
    "Marseille",
    "Nice"
  ],
  "correctAnswer": 0
}
```

### Required Fields:
- **question** (string): The quiz question
- **imageUrl** (string): URL to the quiz image (must be CORS-enabled)
- **answers** (array): Array of 3-4 answer options
- **correctAnswer** (integer): Index of the correct answer (0-3)

## Step 2: Update the Configuration

Edit `quiz-script.js` and update the `CONFIG` object:

```javascript
const CONFIG = {
    QUIZ_API_URL: 'https://your-api-endpoint.com/api/daily-quiz'
};
```

## Step 3: Implement the fetchQuizData Function

In `quiz-script.js`, find the `fetchQuizData()` function and uncomment/modify the API call:

```javascript
async function fetchQuizData() {
    const response = await fetch(CONFIG.QUIZ_API_URL);
    const data = await response.json();
    return data;
}
```

## Step 4: Handle CORS Issues

If you get CORS (Cross-Origin Resource Sharing) errors:

1. **If you control the API**: Add CORS headers to your backend:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST
   Access-Control-Allow-Headers: Content-Type
   ```

2. **If you don't control the API**: Use a CORS proxy:
   ```javascript
   const response = await fetch('https://cors-anywhere.herokuapp.com/' + CONFIG.QUIZ_API_URL);
   ```

## Step 5: Test Your Integration

1. Open `quiz.html` in your browser
2. Go through registration with an ID starting with "edu"
3. Check the browser console (F12 → Console) for any errors
4. Verify that your quiz data appears correctly

## API Call Examples

### Example 1: Simple GET request
```javascript
async function fetchQuizData() {
    const response = await fetch(CONFIG.QUIZ_API_URL);
    const data = await response.json();
    return data;
}
```

### Example 2: With date parameter (for daily rotation)
```javascript
async function fetchQuizData() {
    const today = new Date().toISOString().split('T')[0];
    const url = `${CONFIG.QUIZ_API_URL}?date=${today}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
```

### Example 3: With authentication header
```javascript
async function fetchQuizData() {
    const response = await fetch(CONFIG.QUIZ_API_URL, {
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
```

## Submitting Answers to Your Backend

To save user answers, uncomment and modify the `sendAnswerToBackend()` function in `quiz-script.js`:

```javascript
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
```

Then call it in the `submitQuiz()` function:

```javascript
function submitQuiz() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer before submitting');
        return;
    }
    
    const answerData = {
        userId: localStorage.getItem('userId'),
        answer: selectedAnswer.value,
        timestamp: new Date().toISOString()
    };
    
    // Send to your backend
    sendAnswerToBackend(answerData);
    
    // Redirect to thank you page
    window.location.href = 'thank-you.html';
}
```

## Troubleshooting

### Issue: "Failed to fetch quiz data"
- Check the API URL in CONFIG
- Verify your internet connection
- Open browser console (F12) to see detailed error messages
- Check if the API endpoint is returning valid JSON

### Issue: Image not loading
- Ensure the image URL is publicly accessible
- Check if the image URL has CORS headers enabled
- Try a different image URL from your API provider

### Issue: Answers not displaying correctly
- Verify that the `answers` array in your API response has 3-4 items
- Check that the `correctAnswer` index is within the array bounds

## File Structure

- `index.html` - Registration page
- `quiz.html` - Daily quiz page
- `thank-you.html` - Thank you page
- `quiz-script.js` - Contains the API integration logic
- `script.js` - Registration validation
- `thank-you-script.js` - Thank you page logic
- `styles.css` - All styling

## Need Help?

If you encounter issues during integration:
1. Check the browser console for error messages
2. Verify your API endpoint returns valid JSON
3. Test your API endpoint with Postman or curl
4. Ensure CORS is properly configured
