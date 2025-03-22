import React, { useState } from 'react';
import './AdministrativeDepartmentsSection.css';

const AdministrativeDepartmentsSection = () => {
  // State for user inputs
  const [departmentOne, setDepartmentOne] = useState('');
  const [departmentTwo, setDepartmentTwo] = useState('');
  
  // State for feedback
  const [feedbackOne, setFeedbackOne] = useState({ show: false, correct: false, message: '' });
  const [feedbackTwo, setFeedbackTwo] = useState({ show: false, correct: false, message: '' });
  
  // State for revealed answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // Correct answers
  const correctAnswers = [
    "Office of the City Administrator",
    "Controller's Office"
  ];
  
  // Check answers individually
  const checkAnswer = (answer, index) => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const correctAnswer = correctAnswers[index].toLowerCase();
    
    const isCorrect = normalizedAnswer === correctAnswer;
    
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
    checkAnswer(departmentOne, 0);
    checkAnswer(departmentTwo, 1);
  };
  
  // Toggle reveal answers
  const toggleRevealAnswers = () => {
    setRevealAnswers(!revealAnswers);
  };
  
  // Reset the activity
  const resetActivity = () => {
    setDepartmentOne('');
    setDepartmentTwo('');
    setFeedbackOne({ show: false, correct: false, message: '' });
    setFeedbackTwo({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
  };
  
  // Check if both answers are correct
  const areAllCorrect = feedbackOne.correct && feedbackTwo.correct;
  
  return (
    <div className="container">
      <h1 className="title">Administrative Departments</h1>
      <h2 className="subtitle">Please name the two departments we discussed in class that report directly to the Mayor that do not have an oversight commission. Note that the third is the Office of Economic and Workforce Development.</h2>
      
      <div className="department-section">
        <div className="department-field">
          <label className="label">First department:</label>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={departmentOne}
              onChange={(e) => setDepartmentOne(e.target.value)}
              placeholder="Enter department name"
            />
            <button
              className="check-btn"
              onClick={() => checkAnswer(departmentOne, 0)}
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
        
        <div className="department-field">
          <label className="label">Second department:</label>
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={departmentTwo}
              onChange={(e) => setDepartmentTwo(e.target.value)}
              placeholder="Enter department name"
            />
            <button
              className="check-btn"
              onClick={() => checkAnswer(departmentTwo, 1)}
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
              className="reset-btn"
              onClick={resetActivity}
            >
              Reset
            </button>
          )}
        </div>
        
        {areAllCorrect && (
          <div className="success-message">
            Congratulations! You've correctly identified both administrative departments.
          </div>
        )}
        
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

export default AdministrativeDepartmentsSection;
