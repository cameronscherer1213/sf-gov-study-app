import React, { useState } from 'react';
import './Flashcards.css';
// Import the centralized data source
import landUseFlashcardsData from './landUseFlashcardsData';

const LandUseFlashcardsSection = () => {
  // State for flashcards data
  const [flashcards] = useState(landUseFlashcardsData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
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

  // Go to specific card
  const goToCard = (index) => {
    if (index === currentCardIndex) return;
    
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentCardIndex(index);
    }, 100);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-6">Land Use Flashcards</h1>
      
      <div className="card-counter">
        <p>Card {currentCardIndex + 1} of {flashcards.length}</p>
      </div>
      
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-front">
            <h2 className="question-title">Question:</h2>
            <p className="question-text">{currentCard.Prompt}</p>
            
            <div className={`answer-container ${showAnswer ? 'show' : ''}`}>
              <div className="mt-8 pt-4 border-t">
                <h2 className="answer-title">Answer:</h2>
                <p className="answer-text">{formatText(currentCard.Response)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-nav">
        <button
          className="button-secondary"
          onClick={prevCard}
        >
          Previous
        </button>
        
        <button
          className="button-primary"
          onClick={toggleAnswer}
        >
          {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
        </button>
        
        <button
          className="button-secondary"
          onClick={nextCard}
        >
          Next
        </button>
      </div>
      
      <div className="card-dots">
        {flashcards.map((_, index) => (
          <button
            key={index}
            className={`card-dot ${
              index === currentCardIndex ? 'active' : 'inactive'
            }`}
            onClick={() => goToCard(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LandUseFlashcardsSection;