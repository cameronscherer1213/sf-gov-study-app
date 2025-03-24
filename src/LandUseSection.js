import React, { useState } from 'react';
import './LandUseSection.css';

const LandUseSection = () => {
  // State for user inputs
  const [documentOne, setDocumentOne] = useState('');
  const [documentTwo, setDocumentTwo] = useState('');
  
  // State for feedback
  const [feedbackOne, setFeedbackOne] = useState({ show: false, correct: false, message: '' });
  const [feedbackTwo, setFeedbackTwo] = useState({ show: false, correct: false, message: '' });
  
  // State for revealed answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // Correct answers (can be entered in either order)
  const correctAnswers = [
    "General Plan",
    "Planning Code"
  ];
  
  // Check answers individually
  const checkAnswer = (answer, index) => {
    const normalizedAnswer = answer.trim().toLowerCase();
    
    // Check if the answer matches any of the correct answers
    const isCorrect = correctAnswers.some(correctAnswer => 
      normalizedAnswer === correctAnswer.toLowerCase()
    );
    
    // Check if the answer is the same as the other input
    const otherAnswer = index === 0 ? documentTwo : documentOne;
    const isDuplicate = normalizedAnswer === otherAnswer.trim().toLowerCase() && normalizedAnswer !== '';
    
    if (isDuplicate) {
      if (index === 0) {
        setFeedbackOne({
          show: true,
          correct: false,
          message: "You've entered the same document twice. Please enter two different documents."
        });
      } else {
        setFeedbackTwo({
          show: true,
          correct: false,
          message: "You've entered the same document twice. Please enter two different documents."
        });
      }
      return;
    }
    
    if (index === 0) {
      setFeedbackOne({
        show: true,
        correct: isCorrect,
        message: isCorrect ? "Correct!" : "Incorrect. Try again."
      });
    } else {
      setFeedbackTwo({
        show: true,
        correct: isCorrect,
        message: isCorrect ? "Correct!" : "Incorrect. Try again."
      });
    }
  };
  
  // Check both answers
  const checkAllAnswers = () => {
    // First check for duplicates
    const normalizedOne = documentOne.trim().toLowerCase();
    const normalizedTwo = documentTwo.trim().toLowerCase();
    
    if (normalizedOne === normalizedTwo && normalizedOne !== '') {
      setFeedbackOne({
        show: true,
        correct: false,
        message: "You've entered the same document twice. Please enter two different documents."
      });
      setFeedbackTwo({
        show: true,
        correct: false,
        message: "You've entered the same document twice. Please enter two different documents."
      });
      return;
    }
    
    // Then check each answer
    checkAnswer(documentOne, 0);
    checkAnswer(documentTwo, 1);
    
    // Check if both answers are correct (regardless of order)
    const docOneCorrect = correctAnswers.some(answer => 
      normalizedOne === answer.toLowerCase()
    );
    const docTwoCorrect = correctAnswers.some(answer => 
      normalizedTwo === answer.toLowerCase()
    );
    
    // Check if all correct answers are included
    const hasGeneralPlan = normalizedOne === 'general plan' || normalizedTwo === 'general plan';
    const hasPlanningCode = normalizedOne === 'planning code' || normalizedTwo === 'planning code';
    
    if (docOneCorrect && docTwoCorrect && hasGeneralPlan && hasPlanningCode) {
      setFeedbackOne({
        show: true,
        correct: true,
        message: "Correct!"
      });
      setFeedbackTwo({
        show: true,
        correct: true,
        message: "Correct!"
      });
    }
  };
  
  // Toggle reveal answers
  const toggleRevealAnswers = () => {
    setRevealAnswers(!revealAnswers);
    
    if (!revealAnswers) {
      setDocumentOne('General Plan');
      setDocumentTwo('Planning Code');
      setFeedbackOne({
        show: true,
        correct: true,
        message: "Answer revealed."
      });
      setFeedbackTwo({
        show: true,
        correct: true,
        message: "Answer revealed."
      });
    }
  };
  
  // Reset the quiz
  const resetQuiz = () => {
    setDocumentOne('');
    setDocumentTwo('');
    setFeedbackOne({ show: false, correct: false, message: '' });
    setFeedbackTwo({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
  };
  
  return (
    <div className="container">
      <h1 className="title">Land Use</h1>
      <h2 className="subtitle">Please enter the name of the two primary documents that dictate San Francisco's land use policy.</h2>
      
      <div className="document-section">
        <div className="document-field">
          <label className="label">First document:</label>
          <input
            type="text"
            className="text-input"
            value={documentOne}
            onChange={(e) => setDocumentOne(e.target.value)}
            placeholder="Enter document name"
          />
          
          {feedbackOne.show && (
            <div className={`feedback ${feedbackOne.correct ? 'correct' : 'incorrect'}`}>
              {feedbackOne.message}
            </div>
          )}
        </div>
        
        <div className="document-field">
          <label className="label">Second document:</label>
          <input
            type="text"
            className="text-input"
            value={documentTwo}
            onChange={(e) => setDocumentTwo(e.target.value)}
            placeholder="Enter document name"
          />
          
          {feedbackTwo.show && (
            <div className={`feedback ${feedbackTwo.correct ? 'correct' : 'incorrect'}`}>
              {feedbackTwo.message}
            </div>
          )}
        </div>
        
        <div className="buttons-group">
          <button
            className="check-all-btn"
            onClick={checkAllAnswers}
          >
            Check Both Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
          </button>
          
          {(feedbackOne.show || feedbackTwo.show) && (
            <button
              className="reset-btn"
              onClick={resetQuiz}
            >
              Reset
            </button>
          )}
        </div>
        
        {revealAnswers && (
          <div className="revealed-answers">
            <p><strong>Correct answers:</strong></p>
            <ol className="answers-list">
              <li>{correctAnswers[0]}</li>
              <li>{correctAnswers[1]}</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandUseSection;