import React from 'react';
import './App.css'; // Import the main CSS file where we'll add the footer styles

const AppFooter = ({ currentSection, navigateTo }) => {
  // Define the navigation order
  const navigationOrder = [
    'hierarchy',
    'elected',
    'commissions',
    'budget',
    'recallable',
    'key-influences-flashcards',
    'district-map',
    'government-law',
    'legislative-flashcards',
    'landuse-flashcards',
    'landuse-timeline',
    'history-timeline'
  ];
  
  // Find the current section in the navigation order
  const currentIndex = navigationOrder.indexOf(currentSection);
  
  // Determine if there's a next section
  const hasNextSection = currentIndex !== -1 && currentIndex < navigationOrder.length - 1;
  const nextSection = hasNextSection ? navigationOrder[currentIndex + 1] : null;
  
  return (
  <div className="app-footer">
    <div className="footer-buttons-container">
      <button 
        className="app-button navigation-button"
        onClick={() => navigateTo('home')}
      >
        Back to Home
      </button>
      
      {hasNextSection && (
        <button 
          className="app-button navigation-button"
          onClick={() => navigateTo(nextSection)}
        >
          Next Section
        </button>
      )}
    </div>
  </div>
);
};

export default AppFooter;