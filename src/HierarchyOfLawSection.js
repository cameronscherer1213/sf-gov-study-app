import React, { useState } from 'react';
import './HierarchyOfLawSection.css';

const HierarchyOfLawSection = () => {
  // State for user inputs
  const [federalInput, setFederalInput] = useState('');
  const [federalAmendment, setFederalAmendment] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [stateArticle, setStateArticle] = useState('');
  const [localInput, setLocalInput] = useState('');
  
  // State for feedback messages
  const [federalFeedback, setFederalFeedback] = useState({ show: false, correct: false });
  const [stateFeedback, setStateFeedback] = useState({ show: false, correct: false });
  const [localFeedback, setLocalFeedback] = useState({ show: false, correct: false });
  
  // State for revealed answers
  const [revealFederal, setRevealFederal] = useState(false);
  const [revealState, setRevealState] = useState(false);
  const [revealLocal, setRevealLocal] = useState(false);
  
  // Generate options for amendments
  const generateAmendmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 27; i++) {
      let suffix;
      if (i === 1) suffix = "st";
      else if (i === 2) suffix = "nd";
      else if (i === 3) suffix = "rd";
      else suffix = "th";
      
      options.push(
        <option key={i} value={`${i}${suffix} Amendment`}>{`${i}${suffix} Amendment`}</option>
      );
    }
    return options;
  };
  
  // Generate options for articles
  const generateArticleOptions = () => {
    const options = [];
    for (let i = 1; i <= 35; i++) {
      options.push(
        <option key={i} value={`Article ${i}`}>{`Article ${i}`}</option>
      );
    }
    return options;
  };
  
  // Check federal answers
  const checkFederalAnswer = () => {
    const isInputCorrect = federalInput.toLowerCase() === 'u.s. constitution';
    const isAmendmentCorrect = federalAmendment === '10th Amendment';
    const isCorrect = isInputCorrect && isAmendmentCorrect;
    
    setFederalFeedback({ 
      show: true, 
      correct: isCorrect,
      message: isCorrect ? "Correct!" : 
        !isInputCorrect ? "Check your Federal level answer" : 
        "Check your Amendment selection"
    });
  };
  
  // Check state answers
  const checkStateAnswer = () => {
    const isInputCorrect = stateInput.toLowerCase() === 'california constitution';
    const isArticleCorrect = stateArticle === 'Article 11';
    const isCorrect = isInputCorrect && isArticleCorrect;
    
    setStateFeedback({ 
      show: true, 
      correct: isCorrect,
      message: isCorrect ? "Correct!" : 
        !isInputCorrect ? "Check your State level answer" : 
        "Check your Article selection"
    });
  };
  
  // Check local answer
  const checkLocalAnswer = () => {
    const isCorrect = localInput.toLowerCase() === 'charter';
    
    setLocalFeedback({ 
      show: true, 
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Check your Local level answer"
    });
  };
  
  return (
    <div className="container">
      <h1 className="title">Hierarchy of Law</h1>
      
      {/* Federal Level */}
      <div className="section-block">
        <h2 className="section-title">Federal</h2>
        <div className="input-group">
          <div className="input-field">
            <label className="label">
              Enter the highest law at the Federal level:
            </label>
            <input
              type="text"
              className="text-input"
              value={federalInput}
              onChange={(e) => setFederalInput(e.target.value)}
              placeholder="Enter federal law..."
            />
          </div>
          <div className="input-field">
            <label className="label">
              Which amendment grants powers to states?
            </label>
            <select
              className="select-input"
              value={federalAmendment}
              onChange={(e) => setFederalAmendment(e.target.value)}
            >
              <option value="">Select an amendment</option>
              {generateAmendmentOptions()}
            </select>
          </div>
        </div>
        
        {federalFeedback.show && (
          <div className={`feedback ${federalFeedback.correct ? 'correct' : 'incorrect'}`}>
            {federalFeedback.message}
          </div>
        )}
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkFederalAnswer}
          >
            Check Answer
          </button>
          
          <button
            className="reveal-btn"
            onClick={() => setRevealFederal(!revealFederal)}
          >
            {revealFederal ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>
        
        {revealFederal && (
          <div className="revealed-answer">
            <p><strong>Federal level:</strong> U.S. Constitution</p>
            <p><strong>Amendment:</strong> 10th Amendment</p>
          </div>
        )}
      </div>
      
      {/* State Level */}
      <div className="section-block">
        <h2 className="section-title">State</h2>
        <div className="input-group">
          <div className="input-field">
            <label className="label">
              Enter the highest law at the State level:
            </label>
            <input
              type="text"
              className="text-input"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
              placeholder="Enter state law..."
            />
          </div>
          <div className="input-field">
            <label className="label">
              Which article covers local government?
            </label>
            <select
              className="select-input"
              value={stateArticle}
              onChange={(e) => setStateArticle(e.target.value)}
            >
              <option value="">Select an article</option>
              {generateArticleOptions()}
            </select>
          </div>
        </div>
        
        {stateFeedback.show && (
          <div className={`feedback ${stateFeedback.correct ? 'correct' : 'incorrect'}`}>
            {stateFeedback.message}
          </div>
        )}
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkStateAnswer}
          >
            Check Answer
          </button>
          
          <button
            className="reveal-btn"
            onClick={() => setRevealState(!revealState)}
          >
            {revealState ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>
        
        {revealState && (
          <div className="revealed-answer">
            <p><strong>State level:</strong> California Constitution</p>
            <p><strong>Article:</strong> Article 11</p>
          </div>
        )}
      </div>
      
      {/* Local Level */}
      <div className="section-block">
        <h2 className="section-title">Local</h2>
        <div className="input-field">
          <label className="label">
            Enter the document that establishes San Francisco's government:
          </label>
          <input
            type="text"
            className="text-input"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Enter local law document (single word)..."
          />
        </div>
        
        {localFeedback.show && (
          <div className={`feedback ${localFeedback.correct ? 'correct' : 'incorrect'}`}>
            {localFeedback.message}
          </div>
        )}
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkLocalAnswer}
          >
            Check Answer
          </button>
          
          <button
            className="reveal-btn"
            onClick={() => setRevealLocal(!revealLocal)}
          >
            {revealLocal ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>
        
        {revealLocal && (
          <div className="revealed-answer">
            <p><strong>Local level:</strong> Charter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HierarchyOfLawSection;
