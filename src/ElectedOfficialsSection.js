import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './ElectedOfficialsSection.css';

const ElectedOfficialsSection = () => {
  // State for current user input
  const [currentInput, setCurrentInput] = useState('');
  
  // State for officials data
  const [electedOfficials, setElectedOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for already correctly entered officials
  const [correctAnswers, setCorrectAnswers] = useState([]);
  
  // State for feedback
  const [feedback, setFeedback] = useState({
    show: false,
    correct: false,
    message: ''
  });
  
  // State for reveal answers
  const [revealAnswers, setRevealAnswers] = useState(false);

  // Fetch elected officials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app with file access API, you would use:
        // const response = await window.fs.readFile('sf-political-map-data.csv');
        // const text = new TextDecoder().decode(response);
        
        // For our simplified app, we'll use fetch to get the file from the public folder
        const response = await fetch(`${process.env.PUBLIC_URL}/data/sf-political-map-data.csv`);
        const text = await response.text();
        
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Filter for only the "Elected" type entries
            const officials = results.data.filter(row => row.Type === 'Elected');
            setElectedOfficials(officials);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        setLoading(false);
        
        // Fallback data in case file can't be loaded
        setElectedOfficials([
          { Name: 'Mayor', Type: 'Elected' },
          { Name: 'Board of Supervisors', Type: 'Elected' },
          { Name: 'District Attorney', Type: 'Elected' },
          { Name: 'City Attorney', Type: 'Elected' },
          { Name: 'Sheriff', Type: 'Elected' },
          { Name: 'Treasurer', Type: 'Elected' },
          { Name: 'Assessor-Recorder', Type: 'Elected' },
          { Name: 'Public Defender', Type: 'Elected' },
          { Name: 'SFUSD Board of Education', Type: 'Elected' },
          { Name: 'Community College Board', Type: 'Elected' }
        ]);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (value) => {
    setCurrentInput(value);
    
    // Clear feedback when typing
    setFeedback({
      show: false,
      correct: false,
      message: ''
    });
  };

  // Check current answer
  const checkAnswer = () => {
    const userInput = currentInput.trim().toLowerCase();
    
    // If empty input, show error
    if (!userInput) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please enter an official's name."
      });
      return;
    }
    
    // Check if the user input matches any of the elected officials
    const matchedOfficial = electedOfficials.find(
      official => official.Name.toLowerCase() === userInput
    );
    
    // Check if this official has already been correctly entered
    const alreadyEntered = correctAnswers.some(
      answer => answer.Name.toLowerCase() === userInput
    );
    
    if (matchedOfficial && !alreadyEntered) {
      // Correct and not previously entered
      setFeedback({
        show: true,
        correct: true,
        message: `Correct! "${matchedOfficial.Name}" added.`
      });
      
      // Add to correct answers
      setCorrectAnswers([...correctAnswers, matchedOfficial]);
      
      // Clear input field
      setCurrentInput('');
    } else if (alreadyEntered) {
      // Already entered this official
      setFeedback({
        show: true,
        correct: false,
        message: "You've already entered this official."
      });
    } else {
      // Incorrect - not a match
      setFeedback({
        show: true,
        correct: false,
        message: "Incorrect. Try again."
      });
    }
  };

  // Handle key press (Enter key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // Toggle reveal all answers
  const toggleRevealAnswers = () => {
    setRevealAnswers(!revealAnswers);
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentInput('');
    setCorrectAnswers([]);
    setFeedback({
      show: false,
      correct: false,
      message: ''
    });
    setRevealAnswers(false);
  };

  // Render loading state
  if (loading) {
    return <div className="loading">Loading elected officials data...</div>;
  }

  // Calculate remaining officials
  const remainingCount = electedOfficials.length - correctAnswers.length;
  const isComplete = remainingCount === 0;

  return (
    <div className="container">
      <h1 className="title">Elected Officials</h1>
      
      <div className="intro">
        <p className="instructions">
          Enter the names of the {electedOfficials.length} elected officials or bodies in San Francisco government, one at a time:
        </p>
        <p className="progress">
          {isComplete 
            ? `Congratulations! You've identified all ${electedOfficials.length} elected officials.` 
            : `${correctAnswers.length} of ${electedOfficials.length} found. ${remainingCount} remaining.`}
        </p>
      </div>
      
      {!isComplete && (
        <div className="input-section">
          <div className="input-row">
            <input
              type="text"
              className="text-input"
              value={currentInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter name of elected official or body"
              disabled={isComplete}
            />
            
            <button
              className="check-btn"
              onClick={checkAnswer}
              disabled={isComplete}
            >
              Check Answer
            </button>
          </div>
          
          {feedback.show && (
            <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}
      
      {/* Buttons */}
      <div className="buttons-group">
        <button
          className="reveal-btn"
          onClick={toggleRevealAnswers}
        >
          {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </button>
        
        {correctAnswers.length > 0 && (
          <button
            className="reset-btn"
            onClick={resetQuiz}
          >
            Reset Quiz
          </button>
        )}
      </div>
      
      {/* Correct Answers List */}
      <div className="answers-section">
        <h3 className="section-subtitle">Your Correct Answers:</h3>
        {correctAnswers.length > 0 ? (
          <ul className="answers-list">
            {correctAnswers.map((official, index) => (
              <li key={index} className="answer-item">{official.Name}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">None yet</p>
        )}
      </div>
      
      {/* Reveal All Answers */}
      {revealAnswers && (
        <div className="revealed-answers">
          <h3 className="section-subtitle">All Elected Officials:</h3>
          <ul className="answers-list">
            {electedOfficials.map((official, index) => (
              <li 
                key={index} 
                className={`answer-item ${correctAnswers.some(a => a.Name === official.Name) ? 'found' : ''}`}
              >
                {official.Name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ElectedOfficialsSection;
