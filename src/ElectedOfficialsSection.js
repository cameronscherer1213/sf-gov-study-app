import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './ElectedOfficialsSection.css';
import AppFooter from './AppFooter';

const ElectedOfficialsSection = ({ navigateTo }) => {
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

  // State for hint
  const [hint, setHint] = useState({
    show: false,
    description: '',
    forOfficial: '' // Track which official this hint is for
  });

  // Hardcoded elected officials data for fallback
  const hardcodedOfficials = [
    {
      Name: "Mayor",
      Type: "Elected",
      Description: "Serves as the head of the executive branch, responsible for enforcing city laws, overseeing city departments, setting policies, and preparing the city budget."
    },
    {
      Name: "Board of Supervisors",
      Type: "Elected",
      Description: "The legislative body consisting of 11 members elected from single-member districts, responsible for passing laws and budgets."
    },
    {
      Name: "Assessor-Recorder",
      Type: "Elected",
      Description: "Responsible for assessing property values for taxation purposes and maintaining public records, including property ownership documents."
    },
    {
      Name: "City Attorney",
      Type: "Elected",
      Description: "Provides legal counsel to the city and county government, representing San Francisco in legal matters and ensuring compliance with laws."
    },
    {
      Name: "District Attorney",
      Type: "Elected",
      Description: "Prosecutes criminal cases on behalf of the public, representing the government in the enforcement of criminal laws."
    },
    {
      Name: "Public Defender",
      Type: "Elected",
      Description: "Provides legal representation to individuals accused of crimes who cannot afford private counsel, ensuring the right to a fair trial."
    },
    {
      Name: "Sheriff",
      Type: "Elected",
      Description: "Oversees the county jail system, provides security for courts, and enforces civil judgments."
    },
    {
      Name: "Treasurer",
      Type: "Elected",
      Description: "Manages the city's finances, including the collection of taxes, fees, and other revenue, and oversees the investment of city funds."
    },
    {
      Name: "Board of Education",
      Type: "Elected",
      Description: "Governs the San Francisco Unified School District, setting policies and overseeing the administration of public schools."
    },
    {
      Name: "City College of San Francisco Board of Trustees",
      Type: "Elected",
      Description: "Oversees the administration of the City College of San Francisco, ensuring the institution meets educational standards and serves the community's needs."
    }
  ];

  // Fetch elected officials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile('SF Political Map Information.csv');
        const text = new TextDecoder().decode(response);
        
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
            // Fallback to hardcoded data if CSV parsing fails
            setElectedOfficials(hardcodedOfficials);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        // Fallback to hardcoded data if file reading fails
        setElectedOfficials(hardcodedOfficials);
        setLoading(false);
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
    
    // We no longer clear the hint when typing
    // This allows the hint to persist while the user types
  };

  // Check current answer
  const checkAnswer = () => {
    const userInput = currentInput.trim().toLowerCase();
    
    // If empty input, show error
    if (!userInput) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please enter an official's title."
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
      // If there's an active hint, check if the answer matches the hint's official
      if (hint.show && hint.forOfficial && hint.forOfficial.toLowerCase() !== userInput) {
        setFeedback({
          show: true,
          correct: false,
          message: `This doesn't match the current hint. Try guessing the official described in the hint.`
        });
        return;
      }
      
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
      
      // Clear hint
      setHint({
        show: false,
        description: '',
        forOfficial: ''
      });
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
    setHint({
      show: false,
      description: '',
      forOfficial: ''
    });
  };

  // Provide a hint
  const provideHint = () => {
    // Clear any existing hint
    setHint({
      show: false,
      description: '',
      forOfficial: ''
    });
    
    // If the current input is not empty, check if it matches any unguessed official
    if (currentInput.trim() !== '') {
      const userInput = currentInput.trim().toLowerCase();
      const matchedOfficial = electedOfficials.find(
        official => official.Name.toLowerCase() === userInput && 
                  !correctAnswers.some(answer => answer.Name.toLowerCase() === userInput)
      );
      
      if (matchedOfficial) {
        // Show hint for the specified official
        setHint({
          show: true,
          description: matchedOfficial.Description,
          forOfficial: matchedOfficial.Name
        });
        return;
      } else {
        // No matching unguessed official found
        setFeedback({
          show: true,
          correct: false,
          message: "Please enter a valid official title or clear the field for a random hint."
        });
        return;
      }
    }
    
    // If input is empty or no match found, provide a random hint for an unguessed official
    const remaining = electedOfficials.filter(
      official => !correctAnswers.some(answer => answer.Name === official.Name)
    );
    
    if (remaining.length > 0) {
      // Select a random unguessed official
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const randomOfficial = remaining[randomIndex];
      
      setHint({
        show: true,
        description: randomOfficial.Description,
        forOfficial: randomOfficial.Name
      });
    } else {
      // All officials have been guessed
      setFeedback({
        show: true,
        correct: true,
        message: "You've found all the officials! No hints available."
      });
    }
  };
  
  // Reveal a single answer
  const revealOneAnswer = () => {
    // Find officials that haven't been identified yet
    const remaining = electedOfficials.filter(
      official => !correctAnswers.some(answer => answer.Name === official.Name)
    );
    
    if (remaining.length > 0) {
      // Select the first unguessed official
      const officialToReveal = remaining[0];
      
      // Add to correct answers
      setCorrectAnswers([...correctAnswers, officialToReveal]);
      
      // Show feedback
      setFeedback({
        show: true,
        correct: true,
        message: `Revealed: "${officialToReveal.Name}"`
      });
      
      // Clear input field
      setCurrentInput('');
      
      // Clear hint
      setHint({
        show: false,
        description: '',
        forOfficial: ''
      });
    } else {
      // All officials have been guessed
      setFeedback({
        show: true,
        correct: true,
        message: "All officials have already been revealed."
      });
    }
  };

  // Calculate remaining officials
  const remainingCount = electedOfficials.length - correctAnswers.length;
  const isComplete = remainingCount === 0;

  // Render loading state
  if (loading) {
    return <div className="loading">Loading elected officials data...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Elected Officials</h1>
      
      <div className="intro">
        <p className="instructions">
          Enter the names of the {electedOfficials.length} elected officials or bodies in San Francisco government, one at a time:
        </p>
      </div>
      
      <div className="input-section">
        {/* Progress counter inside the white box */}
        <p className="progress mb-4">
          {isComplete 
            ? `Congratulations! You've identified all ${electedOfficials.length} elected officials.` 
            : correctAnswers.length === 0
              ? `0 of ${electedOfficials.length} found. ${remainingCount} remaining.`
              : `${correctAnswers.length} of ${electedOfficials.length} found. ${remainingCount} remaining.`}
        </p>
        
        {!isComplete && (
          <div>
            <div className="input-row">
              <input
                type="text"
                className="text-input"
                value={currentInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter elected official title or body"
                disabled={isComplete}
              />
              
              <button
                type="button" 
                className="app-button check-button"
                onClick={checkAnswer}
                disabled={isComplete}
              >
                Check Answer
              </button>
              
              <button
                type="button"
                className="app-button hint-button"
                onClick={provideHint}
                disabled={isComplete}
              >
                Provide Hint
              </button>
              
              <button
                type="button"
                className="app-button reveal-button"
                onClick={revealOneAnswer}
                disabled={isComplete}
              >
                Reveal Answer
              </button>
            </div>
            
            {feedback.show && (
              <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
                {feedback.message}
              </div>
            )}
            
            {hint.show && (
              <div className="hint">
                <strong>Hint:</strong> {hint.description}
                <p className="hint-instruction">
                  (Enter the name of the official described above)
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Correct Answers List - moved inside the input-section */}
        <div className="answers-section">
          <h3 className="section-subtitle">Your Correct Answers:</h3>
          {correctAnswers.length > 0 ? (
            <ul className="answers-list">
              {correctAnswers.map((official, index) => (
                <li key={index} className="answer-item">
                  <div className="font-medium">{official.Name}</div>
                  <div className="text-sm">{official.Description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">None yet</p>
          )}
        </div>
        
        {/* Buttons moved into their own div but still inside input-section */}
        <div className="buttons-group">
          <button
            type="button"
            className="app-button reveal-button"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide All Answers' : 'Reveal All Answers'}
          </button>
          
          {(correctAnswers.length > 0 || hint.show) && (
            <button
              type="button"
              className="app-button reset-button"
              onClick={resetQuiz}
            >
              Reset Quiz
            </button>
          )}
        </div>
      </div>
      
      {/* Reveal All Answers - keep outside the main input section */}
      {revealAnswers && (
        <div className="revealed-answers">
          <h3 className="section-subtitle">All Elected Officials:</h3>
          <ul className="answers-list">
            {electedOfficials.map((official, index) => (
              <li key={index} className={`answer-item ${correctAnswers.some(a => a.Name === official.Name) ? "found" : ""}`}>
                <div className="font-medium">{official.Name}</div>
                <div className="text-sm">{official.Description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* App Footer */}
      <AppFooter currentSection="elected" navigateTo={navigateTo} />
    </div>
  );
};

export default ElectedOfficialsSection;