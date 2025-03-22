import React, { useState } from 'react';
import './CitizenReviewSection.css';

const CitizenReviewSection = () => {
  // State for user inputs
  const [bodyOne, setBodyOne] = useState('');
  const [bodyTwo, setBodyTwo] = useState('');
  
  // State for feedback
  const [feedbackOne, setFeedbackOne] = useState({ show: false, correct: false, message: '' });
  const [feedbackTwo, setFeedbackTwo] = useState({ show: false, correct: false, message: '' });
  
  // State for revealed answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // Correct answers (can be entered in either order)
  const correctAnswers = [
    "Citizens' Advisory Committees",
    "Civil Grand Jury"
  ];
  
  // Check answers individually
  const checkAnswer = (answer, index) => {
    const normalizedAnswer = answer.trim().toLowerCase();
    
    // Check if the answer matches any of the correct answers
    const isCorrect = correctAnswers.some(correctAnswer => 
      normalizedAnswer === correctAnswer.toLowerCase()
    );
    
    // Check if the answer is the same as the other input
    const otherAnswer = index === 0 ? bodyTwo : bodyOne;
    const isDuplicate = normalizedAnswer === otherAnswer.trim().toLowerCase() && normalizedAnswer !== '';
    
    if (isDuplicate) {
      if (index === 0) {
        setFeedbackOne({
          show: true,
          correct: false,
          message: "You've entered the same body twice. Please enter two different bodies."
        });
      } else {
        setFeedbackTwo({
          show: true,
          correct: false,
          message: "You've entered the same body twice. Please enter two different bodies."
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
    const normalizedOne = bodyOne.trim().toLowerCase();
    const normalizedTwo = bodyTwo.trim().toLowerCase();
    
    if (normalizedOne === normalizedTwo && normalizedOne !== '') {
      setFeedbackOne({
        show: true,
        correct: false,
        message: "You've entered the same body twice. Please enter two different bodies."
      });
      setFeedbackTwo({
        show: true,
        correct: false,
        message: "You've entered the same body twice. Please enter two different bodies."
      });
      return;
    }
    
    // Then check each answer
    checkAnswer(bodyOne, 0);
    checkAnswer(bodyTwo, 1);
    
    // Check if both answers are correct (regardless of order)
    const bodyOneCorrect = correctAnswers.some(answer => 
      normalizedOne === answer.toLowerCase()
    );
    const bodyTwoCorrect = correctAnswers.some(answer => 
      normalizedTwo === answer.toLowerCase()
    );
    
    // Check if all correct answers are included
    const hasAdvisoryCommittees = normalizedOne === 'citizens\' advisory committees' || normalizedTwo === 'citizens\' advisory committees';
    const hasGrandJury = normalizedOne === 'civil grand jury' || normalizedTwo === 'civil grand jury';
    
    if (bodyOneCorrect && bodyTwoCorrect && hasAdvisoryCommittees && hasGrandJury) {
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
      setBodyOne('Citizens\' Advisory Committees');
      setBodyTwo('Civil Grand Jury');
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
    setBodyOne('');
    setBodyTwo('');
    setFeedbackOne({ show: false, correct: false, message: '' });
    setFeedbackTwo({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
  };
  
  return (
    <div className="container">
      <h1 className="title">Citizen Review</h1>
      <h2 className="subtitle">Please enter the name of the two bodies that allow private citizens to advocate on behalf of the public and hold government accountable.</h2>
      
      <div className="review-section">
        <div className="body-field">
          <label className="label">First body:</label>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={bodyOne}
              onChange={(e) => setBodyOne(e.target.value)}
              placeholder="Enter body name"
            />
            <button
              className="check-btn"
              onClick={() => checkAnswer(bodyOne, 0)}
            >
              Check Answer
            </button>
          </div>
          
          {feedbackOne.show && (
            <div className={`feedback ${feedbackOne.correct ? 'correct' : 'incorrect'}`}>
              {feedbackOne.message}
            </div>
          )}
        </div>
        
        <div className="body-field">
          <label className="label">Second body:</label>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={bodyTwo}
              onChange={(e) => setBodyTwo(e.target.value)}
              placeholder="Enter body name"
            />
            <button
              className="check-btn"
              onClick={() => checkAnswer(bodyTwo, 1)}
            >
              Check Answer
            </button>
          </div>
          
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
              className="reveal-btn"
              onClick={resetQuiz}
              style={{ backgroundColor: '#ef4444' }}
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

export default CitizenReviewSection;
