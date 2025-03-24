import React, { useState, useEffect } from 'react';
import './PoliticalHistoryFlashcardsSection.css';
// Import the centralized data source
import historyData from './historyData';

const SFHistoryFlashcards = () => {
  // State for the current card, user selection, and feedback
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelection, setUserSelection] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showTypeHint, setShowTypeHint] = useState(false);
  const [showNotesHint, setShowNotesHint] = useState(false);
  const [shuffledData, setShuffledData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  // Shuffle the history data
  useEffect(() => {
    const shuffled = [...historyData].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
    
    // Extract all possible events for the dropdown
    const events = historyData.map(item => item.event);
    setAllEvents(events);
  }, []);

  const currentCard = shuffledData[currentIndex] || {};
  const hasNotes = currentCard.notes && currentCard.notes.length > 0;

  // Check user's answer
  const checkAnswer = () => {
    const correct = userSelection === currentCard.event;
    setIsCorrect(correct);
    setShowAnswer(true);
  };

  // Move to the next card
  const nextCard = () => {
    setUserSelection("");
    setShowAnswer(false);
    setIsCorrect(null);
    setShowTypeHint(false);
    setShowNotesHint(false);
    
    if (currentIndex < shuffledData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reshuffle when we've gone through all cards
      const newShuffled = [...historyData].sort(() => Math.random() - 0.5);
      setShuffledData(newShuffled);
      setCurrentIndex(0);
    }
  };

  // Toggle type hint
  const toggleTypeHint = () => {
    setShowTypeHint(!showTypeHint);
  };

  // Toggle notes hint (if available)
  const toggleNotesHint = () => {
    if (hasNotes) {
      setShowNotesHint(!showNotesHint);
    }
  };

  // Reset all cards and start over
  const resetCards = () => {
    const newShuffled = [...historyData].sort(() => Math.random() - 0.5);
    setShuffledData(newShuffled);
    setCurrentIndex(0);
    setUserSelection("");
    setShowAnswer(false);
    setIsCorrect(null);
    setShowTypeHint(false);
    setShowNotesHint(false);
  };

  return (
    <div className="flashcards-container">
      {/* Header text removed as requested */}
      
      <div className="flashcard">
        <div className="flashcard-header">
          <div className="flashcard-year">{currentCard.year}</div>
          <div className="flashcard-counter">Card {currentIndex + 1} of {shuffledData.length}</div>
        </div>
        
        <div className="flashcard-question">
          <label className="flashcard-label">
            What important event happened in {currentCard.year}?
          </label>
          <select
            className="flashcard-select"
            value={userSelection}
            onChange={(e) => setUserSelection(e.target.value)}
            disabled={showAnswer}
          >
            <option value="">-- Select an event --</option>
            {allEvents.map((event, idx) => (
              <option key={idx} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flashcard-hint-buttons">
          <button
            className={`hint-button ${showTypeHint ? 'active' : ''}`}
            onClick={toggleTypeHint}
          >
            {showTypeHint ? 'Hide Type of Event' : 'Show Type of Event'}
          </button>
          
          <button
            className={`hint-button ${showNotesHint ? 'active' : ''}`}
            onClick={toggleNotesHint}
            disabled={!hasNotes}
          >
            {showNotesHint ? 'Hide Hint' : 'Provide Hint'}
          </button>
        </div>
        
        {showTypeHint && (
          <div className="hint-box">
            <div className="hint-title">Type Hint:</div>
            <div>{currentCard.type}</div>
          </div>
        )}
        
        {showNotesHint && hasNotes && (
          <div className="hint-box">
            <div className="hint-title">Notes Hint:</div>
            <div>{currentCard.notes}</div>
          </div>
        )}
        
        {!showAnswer ? (
          <button
            className="check-button"
            onClick={checkAnswer}
            disabled={!userSelection}
          >
            Check Answer
          </button>
        ) : (
          <div className="answer-section">
            <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect. The correct answer is:'}
              {!isCorrect && <div className="correct-answer">{currentCard.event}</div>}
            </div>
            
            <button
              className="next-button"
              onClick={nextCard}
            >
              Next Card
            </button>
          </div>
        )}
      </div>
      
      <div className="reset-container">
        <button
          className="reset-shuffle-button"
          onClick={resetCards}
        >
          Reset & Shuffle
        </button>
      </div>
    </div>
  );
};

export default SFHistoryFlashcards;