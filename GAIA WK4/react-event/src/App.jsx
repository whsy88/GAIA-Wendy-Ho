// import InteractiveButton from './InteractiveButton';

// function App() {
//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
//       <h2>Example 1: Interactive Button Component</h2>
//       <InteractiveButton />
//     </div>
//   );
// }

// export default App; 

import KeyboardDemo from './KeyboardDemo.jsx';

// function App() {
//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
//       <h2>Example 2 - Keyboard Event Handling</h2>
//       <KeyboardDemo />
//     </div>
//   );
// }

// export default App;

// import ContactForm from './ContactForm.jsx';

// function App() {
//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
//       <h2>Example 3 - Form Handling with Validation</h2>
//       <ContactForm />
//     </div>
//   );
// }

// export default App;

// import DynamicList from './DynamicList.jsx';

// function App() {
//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
//       <h2>Example 4 - Event Delegation & Dynamic List</h2>
//       <DynamicList />
//     </div>
//   );
// }

// export default App;

// import ImageGallery from './ImageGallery';

// function App() {
//   return (
//     <div>
//       <ImageGallery />
//     </div>
//   );
// }

// export default App;

// import SearchFilterExercise from './SearchFilter.jsx';

// function App() {
//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
//       <SearchFilterExercise />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from 'react';

export default function QuizApp() {
  // State management from slide starter structure
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300s)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form validation state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Sample questions dataset
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      id: 3,
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useReducer", "useEffect", "useMemo"],
      correct: 2
    },
    {
      id: 4,
      question: "What language is React built with?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: 1
    }
  ];

  // Submit quiz function
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  // Timer functionality with useEffect
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, timeLeft, handleSubmit]);

  // handleAnswerSelect
  const handleAnswerSelect = useCallback(
    (optionIndex) => {
      if (isSubmitted) return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion]: optionIndex
      }));
    },
    [currentQuestion, isSubmitted]
  );

  // handleKeyDown for keyboard navigation (1-4 keys)
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const handleKeyDown = (e) => {
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 4) {
        handleAnswerSelect(keyNum - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isSubmitted, handleAnswerSelect]);

  // handleSubmit with validation before quiz start
  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!userEmail.trim() || !userEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    setValidationError('');
    setIsStarted(true);
  };

  // Results calculation
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  // Format time display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Progress Bar calculation
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // --- SCREEN 1: User Details Form with Validation ---
  if (!isStarted) {
    return (
      <div style={containerStyle}>
        <h2>Interactive Quiz Application</h2>
        <form onSubmit={handleStartQuiz} style={{ marginTop: '20px' }}>
          {validationError && <p style={{ color: '#ff6b6b' }}>{validationError}</p>}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label>Email:</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
            />
          </div>
          <button type="submit" style={btnStyle}>Start Quiz</button>
        </form>
      </div>
    );
  }

  // --- SCREEN 3: Results Display and Review ---
  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div style={containerStyle}>
        <h2>Quiz Results</h2>
        <p>Participant: <strong>{userName}</strong> ({userEmail})</p>
        <h3>
          Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </h3>

        <h4 style={{ marginTop: '20px', textAlign: 'left' }}>Answer Review:</h4>
        <div style={{ textAlign: 'left' }}>
          {questions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice === q.correct;
            return (
              <div key={q.id} style={{ marginBottom: '12px', padding: '10px', border: '1px solid #444', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 5px 0' }}><strong>Q{idx + 1}: {q.question}</strong></p>
                <p style={{ margin: 0, color: isCorrect ? '#51cf66' : '#ff6b6b' }}>
                  Your answer: {userChoice !== undefined ? q.options[userChoice] : 'Not answered'} {isCorrect ? '✅' : '❌'}
                </p>
                {!isCorrect && (
                  <p style={{ margin: '3px 0 0 0', color: '#51cf66' }}>
                    Correct answer: {q.options[q.correct]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- SCREEN 2: Active Quiz Interface ---
  const q = questions[currentQuestion];

  return (
    <div style={containerStyle}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span style={{ color: timeLeft <= 30 ? '#ff6b6b' : '#fff', fontWeight: 'bold' }}>
          ⏳ Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', backgroundColor: '#444', height: '10px', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ width: `${progressPercent}%`, backgroundColor: '#007bff', height: '100%', borderRadius: '5px', transition: 'width 0.3s' }}></div>
      </div>

      {/* Question */}
      <h3>{q.question}</h3>
      <p style={{ fontSize: '13px', color: '#aaa' }}>Tip: Press keys 1-4 on your keyboard or click options below.</p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
        {q.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestion] === index;
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={{
                padding: '12px',
                textAlign: 'left',
                borderRadius: '6px',
                border: isSelected ? '2px solid #007bff' : '1px solid #555',
                backgroundColor: isSelected ? '#1c3d5a' : '#222',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <strong>[{index + 1}]</strong> {option}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
          disabled={currentQuestion === 0}
          style={{ ...btnStyle, opacity: currentQuestion === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            style={btnStyle}
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} style={{ ...btnStyle, backgroundColor: '#28a745' }}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

// Inline Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '25px',
  backgroundColor: '#1e1e1e',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
  textAlign: 'center',
  fontFamily: 'sans-serif'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #555',
  boxSizing: 'border-box'
};

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};