import React, { useState, useEffect } from 'react';
import './Flashcards.css';
import AppFooter from './AppFooter';
// Import the centralized data source
import keyInfluencesFlashcardsData from './keyInfluencesFlashcardsData';

const KeyInfluencesFlashcardsSection = ({ navigateTo }) => {
  // State for flashcards data
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Shuffle cards on component mount
  useEffect(() => {
    // Create a shuffled copy of the data
    const shuffledCards = [...keyInfluencesFlashcardsData].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
  }, []);
  
  // Move to next card
  const nextCard = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 100);
  };

  // Move to previous card
  const prevCard = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => 
        prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
      );
    }, 100);
  };

  // Toggle showing the answer
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Format multiline text with line breaks
  const formatText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  // Add a reshuffle function
  const reshuffleCards = () => {
    setShowAnswer(false);
    setCurrentCardIndex(0);
    const shuffledCards = [...keyInfluencesFlashcardsData].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
  };
  
  // If flashcards array is empty (still loading), show loading
  if (flashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-2">Key Influences on San Francisco Government</h1>
      <h2 className="text-lg mb-6">Name the following group, document, or concept, whose influence on San Francisco government and policy is described below.</h2>
      
      <div className="card-counter">
        <p>Card {currentCardIndex + 1} of {flashcards.length}</p>
      </div>
      
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-front">
            <h2 className="question-title">Description:</h2>
            <p className="question-text">{formatText(currentCard.Prompt)}</p>
            
            <div className={`answer-container ${showAnswer ? 'show' : ''}`}>
              <div className="mt-8 pt-4 border-t">
                <h2 className="answer-title">Answer:</h2>
                <p className="answer-text font-bold text-xl">{currentCard.Response}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Updated card navigation with all buttons in one row */}
<div className="card-nav">
  <div className="card-nav-left">
    <button
      className="app-button flashcard-navigation-button"
      onClick={prevCard}
    >
      Previous
    </button>
  </div>
  
  <div className="card-nav-center">
    <button
      className="app-button flashcard-reveal-button"
      onClick={toggleAnswer}
    >
      {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
    </button>
    
    <button
      className="app-button reset-button"
      onClick={reshuffleCards}
    >
      Reshuffle Cards
    </button>
  </div>
  
  <div className="card-nav-right">
    <button
      className="app-button flashcard-navigation-button"
      onClick={nextCard}
    >
      Next
    </button>
  </div>
</div>
      {/* App Footer */}
      <AppFooter currentSection="key-influences-flashcards" navigateTo={navigateTo} />
    </div>
  );
};

export default KeyInfluencesFlashcardsSection;