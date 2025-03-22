import React, { useState } from 'react';
import './RecallableOfficialsSection.css';

const RecallableOfficialsSection = () => {
  // List of all officials to choose from
  const allOfficials = [
    'Mayor',
    'Supervisor',
    'Treasurer',
    'Controller',
    'City Administrator',
    'District Attorney',
    'Sheriff',
    'County Clerk',
    'Board of Education member',
    'Police Commissioner',
    'Chief of Police',
    'Ethics Commissioner',
    'Director of Planning'
  ];
  
  // Correct answers
  const correctAnswers = [
    'Mayor',
    'Supervisor',
    'Treasurer',
    'Controller',
    'City Administrator',
    'District Attorney',
    'Sheriff',
    'Board of Education member',
    'Ethics Commissioner'
  ];
  
  // State for selected officials
  const [selectedOfficials, setSelectedOfficials] = useState([]);
  
  // State for feedback
  const [feedback, setFeedback] = useState({
    show: false,
    correct: false,
    message: ''
  });
  
  // State for reveal answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // Handle checkbox change
  const handleOfficialToggle = (official) => {
    setFeedback({ show: false, correct: false, message: '' });
    
    if (selectedOfficials.includes(official)) {
      // Remove if already selected
      setSelectedOfficials(selectedOfficials.filter(item => item !== official));
    } else {
      // Add if not already selected
      setSelectedOfficials([...selectedOfficials, official]);
    }
  };
  
  // Check answers
  const checkAnswers = () => {
    // Check if all selected officials are correct
    const allSelectionsCorrect = selectedOfficials.every(
      official => correctAnswers.includes(official)
    );
    
    // Check if all correct officials are selected
    const allCorrectSelected = correctAnswers.every(
      official => selectedOfficials.includes(official)
    );
    
    if (allSelectionsCorrect && allCorrectSelected) {
      // Completely correct
      setFeedback({
        show: true,
        correct: true,
        message: "Correct! You've identified all recallable officials."
      });
    } else if (allSelectionsCorrect) {
      // All selections are correct but missing some
      const missingCount = correctAnswers.length - selectedOfficials.length;
      setFeedback({
        show: true,
        correct: false,
        message: `Your selections are correct, but you're missing ${missingCount} recallable ${missingCount === 1 ? 'official' : 'officials'}.`
      });
    } else {
      // Some selections are incorrect
      const incorrectSelections = selectedOfficials.filter(
        official => !correctAnswers.includes(official)
      );
      setFeedback({
        show: true,
        correct: false,
        message: `You have ${incorrectSelections.length} incorrect ${incorrectSelections.length === 1 ? 'selection' : 'selections'}.`
      });
    }
  };
  
  // Toggle reveal answers
  const toggleRevealAnswers = () => {
    setRevealAnswers(!revealAnswers);
    
    if (!revealAnswers) {
      // When revealing answers, set selected officials to correct answers
      setSelectedOfficials([...correctAnswers]);
      setFeedback({
        show: true,
        correct: true,
        message: "Answers revealed."
      });
    }
  };
  
  // Reset selections
  const resetSelections = () => {
    setSelectedOfficials([]);
    setFeedback({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
  };
  
  return (
    <div className="container">
      <h1 className="title">Recallable Officials</h1>
      
      <div className="instructions">
        <p>Which of the following elected officials can be recalled?</p>
      </div>
      
      <div className="officials-section">
        <div className="checkboxes-grid">
          {allOfficials.map((official, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                id={`official-${index}`}
                checked={selectedOfficials.includes(official)}
                onChange={() => handleOfficialToggle(official)}
                className="checkbox-input"
              />
              <label htmlFor={`official-${index}`} className="checkbox-label">
                {official}
              </label>
            </div>
          ))}
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkAnswers}
          >
            Check Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
          </button>
          
          {(selectedOfficials.length > 0) && (
            <button
              className="reveal-btn"
              onClick={resetSelections}
              style={{ backgroundColor: '#ef4444' }}
            >
              Reset
            </button>
          )}
        </div>
        
        {feedback.show && (
          <div className={`feedback ${feedback.correct ? 'correct' : feedback.message.includes("revealed") ? 'revealed' : 'incorrect'}`}>
            {feedback.message}
          </div>
        )}
        
        {revealAnswers && (
          <div className="revealed-answers">
            <h3 className="answers-title">Recallable Officials:</h3>
            <ul className="answers-list">
              {correctAnswers.map((official, index) => (
                <li key={index}>{official}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecallableOfficialsSection;
