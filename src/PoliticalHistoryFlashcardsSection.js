import React, { useState, useEffect } from 'react';
import './PoliticalHistoryFlashcardsSection.css';

const SFHistoryFlashcards = () => {
  const historyData = [
    {
      year: 1849,
      event: "California Constitution adopted",
      type: "Constitutional Structure",
      notes: "Coincided with the Gold Rush. Immediately followed the Treaty of Guadalupe Hidalgo in 1848, which granted California territory to U.S."
    },
    {
      year: 1850,
      event: "California State Legislature established",
      type: "Constitutional Structure",
      notes: "San Francisco County and San Francisco City established as separate entities."
    },
    {
      year: 1856,
      event: "San Francisco County and City consolidated",
      type: "Constitutional Structure",
      notes: "Followed a period of chaos and corruption. Consolidation Act meant to streamline coordination between city and county government. It also created San Mateo County, which was speculated to be a haven for criminals."
    },
    {
      year: 1879,
      event: "Second California Constitution adopted (revision)",
      type: "Constitutional Structure",
      notes: "Major rewrite of entire Constitution. This document is now our active Constitution, though amendments have been added. Article 11 opens the door for local governments to take on home power."
    },
    {
      year: 1898,
      event: "First San Francisco Charter adopted",
      type: "Constitutional Structure",
      notes: "Until this point, San Francisco had been governed by state statute. This followed a Gilded Age period of big business and limited government capacity. The forthcoming Progressive Era would see governments take on a bigger role in stamping out corruption, and a greater influence of party bosses."
    },
    {
      year: 1917,
      event: "San Francisco Planning Commission created",
      type: "Land Use",
      notes: "Advisory body only."
    },
    {
      year: 1921,
      event: "San Francisco Zoning Ordinance adopted",
      type: "Land Use",
      notes: "First full plan for San Francisco as opposed to ad hoc designations, but primitive relative to today's planning code."
    },
    {
      year: 1932,
      event: "Second San Francisco Charter adopted (revision)",
      type: "Constitutional Structure",
      notes: "Introduces Chief Administrative Officer to split out responsibilities of executive, in part to reduce corruption."
    },
    {
      year: 1942,
      event: "San Francisco Planning Department created",
      type: "Land Use",
      notes: "Culmination of Progressive Era of big government. Provided human capital for implementing land use plan."
    },
    {
      year: 1945,
      event: "First General Plan adopted",
      type: "Land Use",
      notes: ""
    },
    {
      year: 1960,
      event: "Second San Francisco Zoning Ordinance codified",
      type: "Land Use",
      notes: "Born out of the activism in response to urban renewal to block construction of new highways. Represented a reining in of government power and a rise of community input."
    },
    {
      year: 1970,
      event: "California Environmental Quality Act enacted",
      type: "Land Use",
      notes: ""
    },
    {
      year: 1996,
      event: "Third San Francisco Charter adopted (revision)",
      type: "Constitutional Structure",
      notes: "In response to inefficiencies resulting from split executive model, introduced \"strong mayor\" model. Strength of mayor has diminished over time, with authority shifting to BoS via amendments. Revision first put on ballot in 1980."
    }
  ];

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
      <h1 className="flashcards-title">San Francisco Government History Flashcards</h1>
      
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
            {showTypeHint ? 'Hide Type Hint' : 'Show Type Hint'}
          </button>
          
          <button
            className={`hint-button ${showNotesHint ? 'active' : ''}`}
            onClick={toggleNotesHint}
            disabled={!hasNotes}
          >
            {showNotesHint ? 'Hide Notes Hint' : 'Show Notes Hint'}
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
          className="reset-button"
          onClick={resetCards}
        >
          Reset & Shuffle
        </button>
      </div>
    </div>
  );
};

export default SFHistoryFlashcards;