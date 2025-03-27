import React, { useState, useEffect } from 'react';
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

  // Budget categories matching state
  const [showCategoryMatching, setShowCategoryMatching] = useState(false);
  const [budgetItems, setBudgetItems] = useState([
    { id: 1, name: 'San Francisco International Airport', category: 'Enterprise Departments', selected: '' },
    { id: 2, name: 'Municipal Transportation Agency (MTA)', category: 'Enterprise Departments', selected: '' },
    { id: 3, name: 'Public Utilities Commission (PUC)', category: 'Enterprise Departments', selected: '' },
    { id: 4, name: 'Police Department', category: 'General Fund', selected: '' },
    { id: 5, name: 'Fire Department', category: 'General Fund', selected: '' },
    { id: 6, name: 'Health & Human Services', category: 'General Fund', selected: '' },
  ]);
  const [categoryMatchingComplete, setCategoryMatchingComplete] = useState(false);
  const [categoryMatchingMessage, setCategoryMatchingMessage] = useState('');

  const [budgetComplete, setBudgetComplete] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);

  // Shuffle budget items on component mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setBudgetItems(shuffleArray(budgetItems));
  }, []);

  // Show category matching section when both budget components are correctly identified
  useEffect(() => {
    if (budgetComponentsComplete) {
      setShowCategoryMatching(true);
    }
  }, [budgetComponentsComplete]);

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
      setShowCategoryMatching(true);
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
    setShowCategoryMatching(true);
    checkBudgetComplete();
  }

  // Handle budget item category selection
  const handleCategorySelection = (itemId, category) => {
    const updatedItems = budgetItems.map(item => {
      if (item.id === itemId) {
        return { ...item, selected: category };
      }
      return item;
    });
    
    setBudgetItems(updatedItems);
  };

  // Check if all budget items are correctly categorized
  const checkCategoryMatching = () => {
    const allCorrect = budgetItems.every(item => item.selected === item.category);
    const allSelected = budgetItems.every(item => item.selected !== '');
    
    if (!allSelected) {
      setCategoryMatchingMessage("Please categorize all budget items.");
      return;
    }
    
    if (allCorrect) {
      setCategoryMatchingMessage("Correct! All budget items are properly categorized.");
      setCategoryMatchingComplete(true);
      checkBudgetComplete();
    } else {
      const incorrectCount = budgetItems.filter(item => item.selected !== item.category).length;
      setCategoryMatchingMessage(`Incorrect. ${incorrectCount} item(s) are miscategorized. Try again.`);
    }
  };

  // Reveal correct category matches
  const revealCategoryMatching = () => {
    const revealedItems = budgetItems.map(item => {
      return { ...item, selected: item.category };
    });
    
    setBudgetItems(revealedItems);
    setCategoryMatchingMessage("Revealed: All budget items have been correctly categorized.");
    setCategoryMatchingComplete(true);
    checkBudgetComplete();
  };

  function checkBudgetComplete() {
    if (totalBudgetComplete && budgetComponentsComplete && categoryMatchingComplete) {
      setBudgetComplete(true);
    }
  }

  // Toggle reveal all answers
  const toggleRevealAnswers = () => {
    if (!revealAnswers) {
      revealTotalBudget();
      revealBudgetComponents();
      revealCategoryMatching();
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
    
    // Reset category matching
    const resetItems = budgetItems.map(item => {
      return { ...item, selected: '' };
    });
    setBudgetItems(resetItems);
    setCategoryMatchingComplete(false);
    setCategoryMatchingMessage('');
    setShowCategoryMatching(false);
    
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
            Check Answer
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
        <p className="section-description">The city budget is split into two major categories. Enter the name and amount for each. Then, you will be asked to assign specific budget items to these two categories.</p>
        
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
          Check Answers
        </button>
        
        {budgetComponentsMessage && (
          <div className={`feedback ${budgetComponentsMessage.startsWith("Correct") ? 'correct-feedback' : budgetComponentsMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
            {budgetComponentsMessage}
          </div>
        )}
      </div>
      
      {/* Budget Category Matching Section */}
      {showCategoryMatching && (
        <div className="budget-block">
          <h2 className="section-title">Budget Category Matching</h2>
          <p className="section-description">
            Match each of the following budget items to either Enterprise Departments or General Fund.
          </p>
          
          <div className="category-matching">
            {budgetItems.map((item) => (
              <div key={item.id} className="category-item">
                <p className="item-name">{item.name}</p>
                <div className="category-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name={`item-${item.id}`}
                      value="Enterprise Departments"
                      checked={item.selected === "Enterprise Departments"}
                      onChange={() => handleCategorySelection(item.id, "Enterprise Departments")}
                      disabled={categoryMatchingComplete}
                    />
                    Enterprise Departments
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name={`item-${item.id}`}
                      value="General Fund"
                      checked={item.selected === "General Fund"}
                      onChange={() => handleCategorySelection(item.id, "General Fund")}
                      disabled={categoryMatchingComplete}
                    />
                    General Fund
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <button
            className="check-btn"
            onClick={checkCategoryMatching}
            disabled={categoryMatchingComplete}
          >
            Check Categories
          </button>
          
          {categoryMatchingMessage && (
            <div className={`feedback ${categoryMatchingMessage.startsWith("Correct") ? 'correct-feedback' : categoryMatchingMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
              {categoryMatchingMessage}
            </div>
          )}
        </div>
      )}
      
      {/* Control Buttons */}
      <div className="buttons-group">
        <button
          className="reveal-btn"
          onClick={toggleRevealAnswers}
        >
          {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </button>
        
        {(totalBudgetComplete || budgetComponentsComplete || categoryMatchingComplete) && (
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