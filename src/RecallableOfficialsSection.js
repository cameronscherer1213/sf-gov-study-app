import React, { useState } from 'react';
import './RecallableOfficialsSection.css';
import AppFooter from './AppFooter';

const RecallableOfficialsSection = ({ navigateTo }) => {
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
  
  // State to track which answers were checked
  const [checkedAnswers, setCheckedAnswers] = useState(false);
  
  // State to track when hint is shown
  const [hintShown, setHintShown] = useState(false);
  
  // Handle checkbox change
  const handleOfficialToggle = (official) => {
    setFeedback({ show: false, correct: false, message: '' });
    setCheckedAnswers(false);
    
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
    // Set checkedAnswers to true to enable highlighting
    setCheckedAnswers(true);
    
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
      setCheckedAnswers(true);
      setFeedback({
        show: true,
        correct: true,
        message: "Answers revealed."
      });
    } else {
      // When hiding answers, reset checked state
      setCheckedAnswers(false);
    }
  };
  
  // Reset selections
  const resetSelections = () => {
    setSelectedOfficials([]);
    setFeedback({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
    setCheckedAnswers(false);
    setHintShown(false);
  };
  
  // Show hint
  const showHint = () => {
    setHintShown(true);
    setFeedback({
      show: true,
      correct: false,
      message: `Hint: There are ${correctAnswers.length} officials that can be recalled.`
    });
  };
  
  // Determine checkbox styling based on selection and correctness
  const getCheckboxItemClass = (official) => {
    if (!checkedAnswers) return "checkbox-item";
    
    const isSelected = selectedOfficials.includes(official);
    const isCorrect = correctAnswers.includes(official);
    
    if (isSelected && isCorrect) return "checkbox-item correct-selected";
    if (isSelected && !isCorrect) return "checkbox-item incorrect-selected";
    if (!isSelected && isCorrect && revealAnswers) return "checkbox-item correct-not-selected";
    
    return "checkbox-item";
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
            <div key={index} className={getCheckboxItemClass(official)}>
              <input
                type="checkbox"
                id={`official-${index}`}
                checked={selectedOfficials.includes(official)}
                onChange={() => handleOfficialToggle(official)}
                className="checkbox-input"
                disabled={revealAnswers}
              />
              <label htmlFor={`official-${index}`} className="checkbox-label">
                {official}
              </label>
            </div>
          ))}
        </div>
        
        <div className="buttons-group">
          <button
            className="app-button check-button"
            onClick={checkAnswers}
            disabled={revealAnswers}
          >
            Check Answers
          </button>
          
          <button
            className="app-button hint-button"
            onClick={showHint}
            disabled={hintShown || revealAnswers}
          >
            Hint
          </button>
          
          <button
            className="app-button reveal-button"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
          </button>
          
          {(selectedOfficials.length > 0 || hintShown) && (
            <button
              className="app-button reset-button"
              onClick={resetSelections}
            >
              Reset
            </button>
          )}
        </div>
        
        {feedback.show && (
          <div className={`feedback ${feedback.correct ? 'correct' : feedback.message.includes("revealed") ? 'revealed' : feedback.message.includes("Hint") ? 'hint' : 'incorrect'}`}>
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
      
      {/* App Footer */}
      <AppFooter currentSection="recallable" navigateTo={navigateTo} />
    </div>
  );
};

export default RecallableOfficialsSection;