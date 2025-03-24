import React, { useState } from 'react';
import './BudgetSection.css';

const BudgetSection = () => {
  // San Francisco Budget state
  const [totalBudget, setTotalBudget] = useState('');
  const [totalBudgetComplete, setTotalBudgetComplete] = useState(false);
  const [totalBudgetMessage, setTotalBudgetMessage] = useState('');

  const [budgetComponent1, setBudgetComponent1] = useState('');
  const [budgetAmount1, setBudgetAmount1] = useState('');
  const [budgetComponent2, setBudgetComponent2] = useState('');
  const [budgetAmount2, setBudgetAmount2] = useState('');
  const [budgetComponentsComplete, setBudgetComponentsComplete] = useState(false);
  const [budgetComponentsMessage, setBudgetComponentsMessage] = useState('');

  const [budgetComplete, setBudgetComplete] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);

  // San Francisco Budget handlers
  function checkTotalBudget() {
    if (totalBudget.trim() === '$15.9B') {
      setTotalBudgetMessage("Correct!");
      setTotalBudgetComplete(true);
      checkBudgetComplete();
    } else {
      setTotalBudgetMessage("Incorrect. Try again.");
    }
  }

  function revealTotalBudget() {
    setTotalBudget('$15.9B');
    setTotalBudgetMessage("Revealed: $15.9B");
    setTotalBudgetComplete(true);
    checkBudgetComplete();
  }

  function checkBudgetComponents() {
    const pair1Valid = (budgetComponent1 === 'Enterprise Departments' && budgetAmount1 === '$9.0B') ||
                      (budgetComponent1 === 'General Fund' && budgetAmount1 === '$6.9B');
    
    const pair2Valid = (budgetComponent2 === 'Enterprise Departments' && budgetAmount2 === '$9.0B') ||
                      (budgetComponent2 === 'General Fund' && budgetAmount2 === '$6.9B');
    
    const bothPairsValid = pair1Valid && pair2Valid;
    
    const enterpriseIncluded = (budgetComponent1 === 'Enterprise Departments' && budgetAmount1 === '$9.0B') ||
                              (budgetComponent2 === 'Enterprise Departments' && budgetAmount2 === '$9.0B');
    
    const generalFundIncluded = (budgetComponent1 === 'General Fund' && budgetAmount1 === '$6.9B') ||
                               (budgetComponent2 === 'General Fund' && budgetAmount2 === '$6.9B');
    
    const allComponentsIncluded = enterpriseIncluded && generalFundIncluded;
    
    if (bothPairsValid && allComponentsIncluded) {
      setBudgetComponentsMessage("Correct! Both budget components are entered correctly.");
      setBudgetComponentsComplete(true);
      checkBudgetComplete();
    } else if (!pair1Valid && !pair2Valid) {
      setBudgetComponentsMessage("Both entries are incorrect. Try again.");
    } else if (!allComponentsIncluded) {
      setBudgetComponentsMessage("You've entered duplicate components. Make sure to include both Enterprise Departments and General Fund.");
    } else {
      setBudgetComponentsMessage("One or more entries are incorrect. Try again.");
    }
  }

  function revealBudgetComponents() {
    setBudgetComponent1('Enterprise Departments');
    setBudgetAmount1('$9.0B');
    setBudgetComponent2('General Fund');
    setBudgetAmount2('$6.9B');
    setBudgetComponentsMessage("Revealed: Enterprise Departments ($9.0B) and General Fund ($6.9B)");
    setBudgetComponentsComplete(true);
    checkBudgetComplete();
  }

  function checkBudgetComplete() {
    if (totalBudgetComplete && budgetComponentsComplete) {
      setBudgetComplete(true);
    }
  }

  // Toggle reveal all answers
  const toggleRevealAnswers = () => {
    if (!revealAnswers) {
      revealTotalBudget();
      revealBudgetComponents();
    }
    setRevealAnswers(!revealAnswers);
  };

  // Reset the quiz
  const resetQuiz = () => {
    setTotalBudget('');
    setTotalBudgetComplete(false);
    setTotalBudgetMessage('');
    setBudgetComponent1('');
    setBudgetAmount1('');
    setBudgetComponent2('');
    setBudgetAmount2('');
    setBudgetComponentsComplete(false);
    setBudgetComponentsMessage('');
    setBudgetComplete(false);
    setRevealAnswers(false);
  };

  return (
    <div className="container">
      <h1 className="title">San Francisco Budget</h1>
      
      {/* Total Budget Section */}
      <div className="budget-block">
        <h2 className="section-title">Total Budget</h2>
        <p className="section-description">What is the total annual budget for the City and County of San Francisco? (Format: $XX.XB)</p>
        
        <div className="input-container">
          <input
            type="text"
            className="text-input"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="Enter total budget (e.g., $10.0B)"
            disabled={totalBudgetComplete}
          />
          
          <button
            className="check-btn"
            onClick={checkTotalBudget}
            disabled={totalBudgetComplete}
          >
            Check
          </button>
        </div>
        
        {totalBudgetMessage && (
          <div className={`feedback ${totalBudgetMessage.startsWith("Correct") ? 'correct-feedback' : totalBudgetMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
            {totalBudgetMessage}
          </div>
        )}
      </div>
      
      {/* Budget Components Section */}
      <div className="budget-block">
        <h2 className="section-title">Budget Components</h2>
        <p className="section-description">The city budget is split into two major components. Enter the name and amount for each.</p>
        
        <div className="components-grid">
          {/* First Component */}
          <div className="component-card">
            <label className="label">Component 1:</label>
            <input
              type="text"
              className="text-input"
              value={budgetComponent1}
              onChange={(e) => setBudgetComponent1(e.target.value)}
              placeholder="Enter component name"
              disabled={budgetComponentsComplete}
            />
            
            <label className="label">Amount 1:</label>
            <input
              type="text"
              className="text-input"
              value={budgetAmount1}
              onChange={(e) => setBudgetAmount1(e.target.value)}
              placeholder="Enter amount (e.g., $5.0B)"
              disabled={budgetComponentsComplete}
            />
          </div>
          
          {/* Second Component */}
          <div className="component-card">
            <label className="label">Component 2:</label>
            <input
              type="text"
              className="text-input"
              value={budgetComponent2}
              onChange={(e) => setBudgetComponent2(e.target.value)}
              placeholder="Enter component name"
              disabled={budgetComponentsComplete}
            />
            
            <label className="label">Amount 2:</label>
            <input
              type="text"
              className="text-input"
              value={budgetAmount2}
              onChange={(e) => setBudgetAmount2(e.target.value)}
              placeholder="Enter amount (e.g., $5.0B)"
              disabled={budgetComponentsComplete}
            />
          </div>
        </div>
        
        <button
          className="check-btn"
          onClick={checkBudgetComponents}
          disabled={budgetComponentsComplete}
        >
          Check Components
        </button>
        
        {budgetComponentsMessage && (
          <div className={`feedback ${budgetComponentsMessage.startsWith("Correct") ? 'correct-feedback' : budgetComponentsMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
            {budgetComponentsMessage}
          </div>
        )}
      </div>
      
      {/* Control Buttons */}
      <div className="buttons-group">
        <button
          className="reveal-btn"
          onClick={toggleRevealAnswers}
        >
          {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </button>
        
        {(totalBudgetComplete || budgetComponentsComplete) && (
          <button
            className="reset-btn"
            onClick={resetQuiz}
          >
            Reset Quiz
          </button>
        )}
      </div>
      
      {/* Status Section */}
      {budgetComplete && (
        <div className="success-message">
          <h3>✅ Budget Section Complete!</h3>
          <p>You have successfully completed all questions in this section.</p>
        </div>
      )}
    </div>
  );
};

export default BudgetSection;