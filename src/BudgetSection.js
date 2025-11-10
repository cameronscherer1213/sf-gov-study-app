import React, { useState, useEffect } from 'react';
import './BudgetSection.css';
import AppFooter from './AppFooter';

const BudgetSection = ({ navigateTo }) => {
  // San Francisco Budget state
  const [totalBudget, setTotalBudget] = useState('');
  const [totalBudgetComplete, setTotalBudgetComplete] = useState(false);
  const [totalBudgetMessage, setTotalBudgetMessage] = useState('');

  const [budgetCategory1, setBudgetCategory1] = useState('');
  const [budgetAmount1, setBudgetAmount1] = useState('');
  const [budgetCategory2, setBudgetCategory2] = useState('');
  const [budgetAmount2, setBudgetAmount2] = useState('');
  const [budgetCategoriesComplete, setBudgetCategoriesComplete] = useState(false);
  const [budgetCategoriesMessage, setBudgetCategoriesMessage] = useState('');

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

  // Show category matching section when both budget categories are correctly identified
  useEffect(() => {
    if (budgetCategoriesComplete) {
      setShowCategoryMatching(true);
    }
  }, [budgetCategoriesComplete]);

  // San Francisco Budget handlers
  function checkTotalBudget() {
    if (totalBudget.trim() === '$16B') {
      setTotalBudgetMessage("Correct!");
      setTotalBudgetComplete(true);
      checkBudgetComplete();
    } else {
      setTotalBudgetMessage("Incorrect. Try again.");
    }
  }

  function revealTotalBudget() {
    setTotalBudget('$16B');
    setTotalBudgetMessage("Revealed: $16B");
    setTotalBudgetComplete(true);
    checkBudgetComplete();
  }

  function resetTotalBudget() {
    setTotalBudget('');
    setTotalBudgetComplete(false);
    setTotalBudgetMessage('');
  }

  function checkBudgetCategories() {
    // Check if each category name is valid
    const isCategory1Valid = budgetCategory1 === 'Enterprise Departments' || budgetCategory1 === 'General Fund';
    const isCategory2Valid = budgetCategory2 === 'Enterprise Departments' || budgetCategory2 === 'General Fund';
    
    // Check if each amount is correctly paired with its category
    const isAmount1Valid = (budgetCategory1 === 'Enterprise Departments' && budgetAmount1 === '$9B') ||
                          (budgetCategory1 === 'General Fund' && budgetAmount1 === '$7B');
    
    const isAmount2Valid = (budgetCategory2 === 'Enterprise Departments' && budgetAmount2 === '$9B') ||
                          (budgetCategory2 === 'General Fund' && budgetAmount2 === '$7B');
    
    // Check if both categories are different (no duplicates)
    const noDuplicates = budgetCategory1 !== budgetCategory2;
    
    // Check if all validations pass
    const allValid = isCategory1Valid && isCategory2Valid && isAmount1Valid && isAmount2Valid && noDuplicates;
    
    if (allValid) {
      setBudgetCategoriesMessage("Correct! Both budget categories are entered correctly.");
      setBudgetCategoriesComplete(true);
      setShowCategoryMatching(true);
      checkBudgetComplete();
    } else if (!isCategory1Valid || !isCategory2Valid) {
      setBudgetCategoriesMessage("One or both category names are incorrect. The categories are 'Enterprise Departments' and 'General Fund'.");
    } else if (!noDuplicates) {
      setBudgetCategoriesMessage("You've entered duplicate categories. Make sure to include both Enterprise Departments and General Fund.");
    } else {
      setBudgetCategoriesMessage("One or more amounts are incorrect. Try again.");
    }
  }

  function revealBudgetCategories() {
    setBudgetCategory1('Enterprise Departments');
    setBudgetAmount1('$9B');
    setBudgetCategory2('General Fund');
    setBudgetAmount2('$7B');
    setBudgetCategoriesMessage("Revealed: Enterprise Departments ($9B) and General Fund ($7B)");
    setBudgetCategoriesComplete(true);
    setShowCategoryMatching(true);
    checkBudgetComplete();
  }

  function resetBudgetCategories() {
    setBudgetCategory1('');
    setBudgetAmount1('');
    setBudgetCategory2('');
    setBudgetAmount2('');
    setBudgetCategoriesComplete(false);
    setBudgetCategoriesMessage('');
    setShowCategoryMatching(false);
  }

  // Handle budget item category selection
  const handleCategorySelection = (itemId, category) => {
    const updatedItems = budgetItems.map(item => {
      if (item.id === itemId) {
        return { 
          ...item, 
          selected: category,
          isCorrect: undefined // Reset the isCorrect flag when changing selection
        };
      }
      return item;
    });
    
    setBudgetItems(updatedItems);
  };

  // Check if all budget items are correctly categorized
  const checkCategoryMatching = () => {
    const allSelected = budgetItems.every(item => item.selected !== '');
    
    if (!allSelected) {
      setCategoryMatchingMessage("Please categorize all budget items.");
      return;
    }
    
    // Check each item individually and provide feedback
    const updatedItems = budgetItems.map(item => {
      return {
        ...item,
        isCorrect: item.selected === item.category
      };
    });
    
    setBudgetItems(updatedItems);
    
    const allCorrect = updatedItems.every(item => item.isCorrect);
    
    if (allCorrect) {
      setCategoryMatchingMessage("Correct! All budget items are properly categorized.");
      setCategoryMatchingComplete(true);
      checkBudgetComplete();
    } else {
      const incorrectCount = updatedItems.filter(item => !item.isCorrect).length;
      setCategoryMatchingMessage(`Incorrect. ${incorrectCount} item(s) are miscategorized. The incorrect items are highlighted.`);
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

  function resetCategoryMatching() {
    const resetItems = budgetItems.map(item => {
      return { ...item, selected: '', isCorrect: undefined };
    });
    setBudgetItems(resetItems);
    setCategoryMatchingComplete(false);
    setCategoryMatchingMessage('');
  }

  function checkBudgetComplete() {
    if (totalBudgetComplete && budgetCategoriesComplete && categoryMatchingComplete) {
      setBudgetComplete(true);
    }
  }

  // Provide hint for budget categories
  const provideCategoryHint = () => {
    setBudgetCategory1('Enterprise Departments');
    setBudgetCategory2('General Fund');
    setShowCategoryMatching(true);
    setBudgetCategoriesMessage("Hint provided: The two budget categories are Enterprise Departments and General Fund. Please enter the correct amounts for each.");
  };

  // Reset the entire quiz
  const resetQuiz = () => {
    resetTotalBudget();
    resetBudgetCategories();
    resetCategoryMatching();
    setBudgetComplete(false);
    setRevealAnswers(false);
  };

  return (
    <div className="container">
      <h1 className="title">San Francisco Budget</h1>
<p>Answer the following questions about the San Francisco budget.</p>
      
      {/* Total Budget Section */}
      <div className="budget-block bg-white">
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
          
          <button
            className="reveal-btn"
            onClick={revealTotalBudget}
            disabled={totalBudgetComplete}
            style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
          >
            Reveal Answer
          </button>
          
          <button
            className="reset-btn"
            onClick={resetTotalBudget}
            disabled={!totalBudgetComplete}
            style={{ backgroundColor: '#6B7280', fontWeight: 'normal' }}
          >
            Reset
          </button>
        </div>
        
        {totalBudgetMessage && (
          <div className={`feedback ${totalBudgetMessage.startsWith("Correct") ? 'correct-feedback' : totalBudgetMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
            {totalBudgetMessage}
          </div>
        )}
      </div>
      
      {/* Budget Categories Section */}
      <div className="budget-block bg-white">
        <h2 className="section-title">Budget Categories</h2>
        <p className="section-description">The city budget is split into two major categories. Enter the name and amount for each. Then, you will be asked to assign specific budget items to these two categories.</p>
        
        <div className="components-grid">
          {/* First Category */}
          <div className="component-card">
            <label className="label">Category 1:</label>
            <input
              type="text"
              className="text-input"
              value={budgetCategory1}
              onChange={(e) => setBudgetCategory1(e.target.value)}
              placeholder="Enter category name"
              disabled={budgetCategoriesComplete}
            />
            
            <label className="label mt-4">Amount 1:</label>
            <input
              type="text"
              className="text-input"
              value={budgetAmount1}
              onChange={(e) => setBudgetAmount1(e.target.value)}
              placeholder="Enter amount (e.g., $5.0B)"
              disabled={budgetCategoriesComplete}
            />
          </div>
          
          {/* Second Category */}
          <div className="component-card">
            <label className="label">Category 2:</label>
            <input
              type="text"
              className="text-input"
              value={budgetCategory2}
              onChange={(e) => setBudgetCategory2(e.target.value)}
              placeholder="Enter category name"
              disabled={budgetCategoriesComplete}
            />
            
            <label className="label mt-4">Amount 2:</label>
            <input
              type="text"
              className="text-input"
              value={budgetAmount2}
              onChange={(e) => setBudgetAmount2(e.target.value)}
              placeholder="Enter amount (e.g., $5.0B)"
              disabled={budgetCategoriesComplete}
            />
          </div>
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkBudgetCategories}
            disabled={budgetCategoriesComplete}
          >
            Check Answers
          </button>
          
          <button
            className="hint-btn"
            onClick={provideCategoryHint}
            disabled={budgetCategoriesComplete}
            style={{ backgroundColor: '#E5A824', fontWeight: 'normal' }}
          >
            Provide Hint
          </button>
          
          <button
            className="reveal-btn"
            onClick={revealBudgetCategories}
            disabled={budgetCategoriesComplete}
            style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
          >
            Reveal Answers
          </button>
          
          <button
            className="reset-btn"
            onClick={resetBudgetCategories}
            disabled={!budgetCategoriesComplete}
            style={{ backgroundColor: '#6B7280', fontWeight: 'normal' }}
          >
            Reset
          </button>
        </div>
        
        {budgetCategoriesMessage && (
          <div className={`feedback ${budgetCategoriesMessage.startsWith("Correct") ? 'correct-feedback' : 
                                    budgetCategoriesMessage.startsWith("Revealed") ? 'revealed-feedback' : 
                                    budgetCategoriesMessage.startsWith("Hint") ? 'hint-feedback' : 'incorrect-feedback'}`}>
            {budgetCategoriesMessage}
          </div>
        )}
      </div>
      
      {/* Budget Category Matching Section */}
      {showCategoryMatching && (
        <div className="budget-block bg-white">
          <h2 className="section-title">Budget Category Matching</h2>
          <p className="section-description">
            Match each of the following budget items to either Enterprise Departments or General Fund.
          </p>
          
          <div className="category-matching">
            {budgetItems.map((item) => (
              <div key={item.id} className="category-item">
                <p className={`item-name ${item.isCorrect === false ? 'incorrect-item' : ''}`}>{item.name}</p>
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
          
          <div className="buttons-group">
            <button
              className="check-btn"
              onClick={checkCategoryMatching}
              disabled={categoryMatchingComplete}
            >
              Check Categories
            </button>
            
            <button
              className="reveal-btn"
              onClick={revealCategoryMatching}
              disabled={categoryMatchingComplete}
              style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
            >
              Reveal Categories
            </button>
            
            <button
              className="reset-btn"
              onClick={resetCategoryMatching}
              disabled={!categoryMatchingComplete}
              style={{ backgroundColor: '#6B7280', fontWeight: 'normal' }}
            >
              Reset
            </button>
          </div>
          
          {categoryMatchingMessage && (
            <div className={`feedback ${categoryMatchingMessage.startsWith("Correct") ? 'correct-feedback' : categoryMatchingMessage.startsWith("Revealed") ? 'revealed-feedback' : 'incorrect-feedback'}`}>
              {categoryMatchingMessage}
            </div>
          )}
        </div>
      )}
      
      {/* Overall Reset Button */}
      {(totalBudgetComplete || budgetCategoriesComplete || categoryMatchingComplete) && (
        <div className="buttons-group">
          <button
            className="reset-btn"
            onClick={resetQuiz}
            style={{ backgroundColor: '#6B7280', fontWeight: 'normal' }}
          >
            Reset All
          </button>
        </div>
      )}
      
      {/* Status Section */}
      {budgetComplete && (
        <div className="success-message">
          <h3>✅ Budget Section Complete!</h3>
          <p>You have successfully completed all questions in this section.</p>
        </div>
      )}
      
      {/* Add AppFooter component */}
      <AppFooter currentSection="budget" navigateTo={navigateTo} />
    </div>
  );
};

export default BudgetSection;