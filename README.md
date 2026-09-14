# EDU Quiz Site

A modern 3-page web application for educational quizzes with daily content rotation.

## Features

✅ **Page 1 - Registration**
- Student ID registration (must start with "edu")
- Terms of Service acceptance required
- Cannot proceed without accepting terms
- Real-time validation

✅ **Page 2 - Daily Quiz**
- Daily quiz with image and 3-4 multiple choice answers
- Questions and images refresh daily (API-integrated)
- Clean, user-friendly interface
- Answer selection with visual feedback

✅ **Page 3 - Thank You**
- Confirmation page after quiz submission
- Option to go back or logout
- Success animation

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ovad23-cyber/edu-quiz-site.git
   cd edu-quiz-site
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No server or installation required for basic use

3. **Test the site**
   - Enter a Student ID starting with "edu" (e.g., "edu12345")
   - Check the Terms of Service checkbox
   - Complete the quiz

## API Integration

The site is designed to work with your external data provider API. See **API_INTEGRATION_GUIDE.md** for detailed instructions on connecting your quiz data.

### Current Setup
- Uses mock data for demonstration
- Configured for easy API connection
- Supports CORS-enabled endpoints

## Data Refresh

The quiz data automatically refreshes based on your API configuration:
- **Daily rotation**: Implement date-based API calls
- **Real-time updates**: Use your provider's endpoint
- **Custom scheduling**: Modify `fetchQuizData()` function

## File Structure

```
edu-quiz-site/
├── index.html                 # Registration page
├── quiz.html                  # Quiz page
├── thank-you.html             # Thank you page
├── styles.css                 # All styling
├── script.js                  # Registration logic
├── quiz-script.js             # Quiz & API integration logic
├── thank-you-script.js        # Thank you page logic
├── API_INTEGRATION_GUIDE.md   # API setup instructions
└── README.md                  # This file
```

## How to Connect Your API

1. Open `quiz-script.js`
2. Find the `CONFIG` object and update `QUIZ_API_URL`
3. Modify the `fetchQuizData()` function to use your API
4. Ensure your API returns data in the correct format (see API_INTEGRATION_GUIDE.md)

## Registration Validation

- ✅ Student ID must start with "edu"
- ✅ Student ID is required
- ✅ Terms of Service must be accepted
- ✅ Cannot proceed to quiz without valid registration

## User Flow

1. User lands on registration page
2. Enters Student ID (must start with "edu")
3. Accepts Terms of Service (mandatory)
4. Proceeds to daily quiz
5. Views image and question
6. Selects one of 3-4 answers
7. Submits answer
8. Sees thank you confirmation
9. Can logout or attempt quiz again tomorrow

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (no frameworks)
- LocalStorage for session management
- Fetch API for data retrieval

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (responsive design)

## Customization

### Colors
Edit `styles.css` to change the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Terms of Service
Edit the terms section in `index.html` to customize your T&C.

### Quiz Styling
Modify question and answer styles in `styles.css` under the "Quiz Page Styles" section.

## Security Notes

- User data is stored in browser's localStorage
- For production, implement proper backend authentication
- Validate all user inputs on the server side
- Use HTTPS for all API communications
- Implement rate limiting to prevent abuse

## Next Steps

1. Review the **API_INTEGRATION_GUIDE.md** for your specific data provider
2. Update the `QUIZ_API_URL` in `quiz-script.js`
3. Test the integration in development
4. Deploy to your hosting platform
5. Implement backend storage for user answers (optional)

## Support

For issues or questions about integration:
1. Check the browser console (F12) for error messages
2. Review the API_INTEGRATION_GUIDE.md
3. Verify your API endpoint returns valid JSON
4. Test your endpoint with Postman or similar tools

## License

MIT License - Feel free to use and modify as needed.

---

**Ready to integrate your API?** Start with the **API_INTEGRATION_GUIDE.md**!
