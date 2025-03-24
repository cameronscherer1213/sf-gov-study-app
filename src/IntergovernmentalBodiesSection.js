import React, { useState } from 'react';
import './IntergovernmentalBodiesSection.css';

const IntergovernmentalBodiesSection = () => {
  // State for user inputs
  const [federalDriver1, setFederalDriver1] = useState('');
  const [federalDriver2, setFederalDriver2] = useState('');
  const [stateDriver1, setStateDriver1] = useState('');
  const [stateDriver2, setStateDriver2] = useState('');
  const [regionalDriver1, setRegionalDriver1] = useState('');
  const [regionalDriver2, setRegionalDriver2] = useState('');
  
  // State for feedback
  const [federalFeedback, setFederalFeedback] = useState({ show: false, correct: false, message: '' });
  const [stateFeedback, setStateFeedback] = useState({ show: false, correct: false, message: '' });
  const [regionalFeedback, setRegionalFeedback] = useState({ show: false, correct: false, message: '' });
  
  // State for revealed answers
  const [revealFederal, setRevealFederal] = useState(false);
  const [revealState, setRevealState] = useState(false);
  const [revealRegional, setRevealRegional] = useState(false);
  
  // Correct answers
  const correctAnswers = {
    federal: ["SCOTUS Opinions", "Block Grants"],
    state: ["Preemption", "Consolidation"],
    regional: ["ABAG", "BART"]
  };
  
  // Helper function to normalize answers for comparison
  const normalizeAnswer = (answer) => {
    return answer.trim().toLowerCase();
  };
  
  // Check federal drivers
  const checkFederalDrivers = () => {
    // Get normalized user inputs
    const input1 = normalizeAnswer(federalDriver1);
    const input2 = normalizeAnswer(federalDriver2);
    
    // Get normalized correct answers
    const correct1 = normalizeAnswer(correctAnswers.federal[0]);
    const correct2 = normalizeAnswer(correctAnswers.federal[1]);
    
    // Check if inputs match correct answers (in any order)
    const isCorrect = (input1 === correct1 && input2 === correct2) || 
                      (input1 === correct2 && input2 === correct1);
    
    setFederalFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Incorrect. Try again."
    });
  };
  
  // Check state drivers
  const checkStateDrivers = () => {
    // Get normalized user inputs
    const input1 = normalizeAnswer(stateDriver1);
    const input2 = normalizeAnswer(stateDriver2);
    
    // Get normalized correct answers
    const correct1 = normalizeAnswer(correctAnswers.state[0]);
    const correct2 = normalizeAnswer(correctAnswers.state[1]);
    
    // Check if inputs match correct answers (in any order)
    const isCorrect = (input1 === correct1 && input2 === correct2) || 
                      (input1 === correct2 && input2 === correct1);
    
    setStateFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Incorrect. Try again."
    });
  };
  
  // Check regional drivers
  const checkRegionalDrivers = () => {
    // Get normalized user inputs
    const input1 = normalizeAnswer(regionalDriver1);
    const input2 = normalizeAnswer(regionalDriver2);
    
    // Get normalized correct answers
    const correct1 = normalizeAnswer(correctAnswers.regional[0]);
    const correct2 = normalizeAnswer(correctAnswers.regional[1]);
    
    // Check if inputs match correct answers (in any order)
    const isCorrect = (input1 === correct1 && input2 === correct2) || 
                      (input1 === correct2 && input2 === correct1);
    
    setRegionalFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Incorrect. Try again."
    });
  };
  
  // Toggle reveal federal answers
  const toggleRevealFederal = () => {
    if (!revealFederal) {
      setFederalDriver1(correctAnswers.federal[0]);
      setFederalDriver2(correctAnswers.federal[1]);
    }
    setRevealFederal(!revealFederal);
  };
  
  // Toggle reveal state answers
  const toggleRevealState = () => {
    if (!revealState) {
      setStateDriver1(correctAnswers.state[0]);
      setStateDriver2(correctAnswers.state[1]);
    }
    setRevealState(!revealState);
  };
  
  // Toggle reveal regional answers
  const toggleRevealRegional = () => {
    if (!revealRegional) {
      setRegionalDriver1(correctAnswers.regional[0]);
      setRegionalDriver2(correctAnswers.regional[1]);
    }
    setRevealRegional(!revealRegional);
  };

  return (
    <div className="container">
      <h1 className="title">Intergovernmental Bodies</h1>
      <h2 className="subtitle">For each level of intergovernmental bodies, provide the two key drivers of local government we discussed in class.</h2>
      
      {/* Federal Section */}
      <div className="level-section">
        <h2 className="level-title">Federal</h2>
        <div className="input-grid">
          <div className="input-field">
            <label className="label">Driver 1:</label>
            <input
              type="text"
              className="text-input"
              value={federalDriver1}
              onChange={(e) => setFederalDriver1(e.target.value)}
              placeholder="Enter first federal driver"
            />
          </div>
          
          <div className="input-field">
            <label className="label">Driver 2:</label>
            <input
              type="text"
              className="text-input"
              value={federalDriver2}
              onChange={(e) => setFederalDriver2(e.target.value)}
              placeholder="Enter second federal driver"
            />
          </div>
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkFederalDrivers}
          >
            Check Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealFederal}
          >
            {revealFederal ? 'Hide Answers' : 'Reveal Answers'}
          </button>
        </div>
        
        {federalFeedback.show && (
          <div className={`feedback ${federalFeedback.correct ? 'correct' : 'incorrect'}`}>
            {federalFeedback.message}
          </div>
        )}
      </div>
      
      {/* State Section */}
      <div className="level-section">
        <h2 className="level-title">State</h2>
        <div className="input-grid">
          <div className="input-field">
            <label className="label">Driver 1:</label>
            <input
              type="text"
              className="text-input"
              value={stateDriver1}
              onChange={(e) => setStateDriver1(e.target.value)}
              placeholder="Enter first state driver"
            />
          </div>
          
          <div className="input-field">
            <label className="label">Driver 2:</label>
            <input
              type="text"
              className="text-input"
              value={stateDriver2}
              onChange={(e) => setStateDriver2(e.target.value)}
              placeholder="Enter second state driver"
            />
          </div>
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkStateDrivers}
          >
            Check Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealState}
          >
            {revealState ? 'Hide Answers' : 'Reveal Answers'}
          </button>
        </div>
        
        {stateFeedback.show && (
          <div className={`feedback ${stateFeedback.correct ? 'correct' : 'incorrect'}`}>
            {stateFeedback.message}
          </div>
        )}
      </div>
      
      {/* Regional Section */}
      <div className="level-section">
        <h2 className="level-title">Regional</h2>
        <div className="input-grid">
          <div className="input-field">
            <label className="label">Driver 1:</label>
            <input
              type="text"
              className="text-input"
              value={regionalDriver1}
              onChange={(e) => setRegionalDriver1(e.target.value)}
              placeholder="Enter first regional driver"
            />
          </div>
          
          <div className="input-field">
            <label className="label">Driver 2:</label>
            <input
              type="text"
              className="text-input"
              value={regionalDriver2}
              onChange={(e) => setRegionalDriver2(e.target.value)}
              placeholder="Enter second regional driver"
            />
          </div>
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkRegionalDrivers}
          >
            Check Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealRegional}
          >
            {revealRegional ? 'Hide Answers' : 'Reveal Answers'}
          </button>
        </div>
        
        {regionalFeedback.show && (
          <div className={`feedback ${regionalFeedback.correct ? 'correct' : 'incorrect'}`}>
            {regionalFeedback.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntergovernmentalBodiesSection;