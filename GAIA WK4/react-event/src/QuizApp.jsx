function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    }
    // Add more questions
  ];

  // Students implement:
  // - handleAnswerSelect
  // - handleKeyDown for keyboard navigation
  // - handleSubmit with validation
  // - Timer functionality with useEffect
  // - Results calculation and display

  return (
    <div>
      {/* Quiz interface */}
    </div>
  );
}