import React, { useState, useEffect } from 'react';
import './PoliticalHistoryTimelineSection.css';
// Import the centralized data source
import historyData from './historyData';

// Custom hook for drag-and-drop functionality
const useDraggable = (items, setItems) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    // This is needed for Firefox to enable dragging
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverItem(index);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem];
    
    // Remove the dragged item
    newItems.splice(draggedItem, 1);
    // Insert it at the new position
    newItems.splice(index, 0, draggedItemContent);
    
    setItems(newItems);
    // Reset
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return {
    draggedItem,
    draggedOverItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};

const SFChronologyQuiz = () => {
  // State for the randomly ordered events that the user will sort
  const [shuffledEvents, setShuffledEvents] = useState([]);
  // State to track which items are in the correct position
  const [correctPositions, setCorrectPositions] = useState([]);
  // State to track whether answers are revealed
  const [answersRevealed, setAnswersRevealed] = useState(false);
  // State to track quiz completion
  const [allCorrect, setAllCorrect] = useState(false);
  // State to show/hide years as hints
  const [showYears, setShowYears] = useState(false);
  // State to show/hide event notes
  const [showNotes, setShowNotes] = useState(false);
  // State for chronological years (for hint)
  const [chronologicalYears, setChronologicalYears] = useState([]);

  // Initialize the quiz with shuffled events
  useEffect(() => {
    shuffleEvents();
    
    // Set the chronological years
    const years = [...historyData].sort((a, b) => a.year - b.year).map(item => item.year);
    setChronologicalYears(years);
  }, []);

  // Function to shuffle the events
  const shuffleEvents = () => {
    const eventsOnly = historyData.map((item, index) => ({
      id: index,
      event: item.event,
      year: item.year,
      type: item.type,
      notes: item.notes
    }));
    
    // Sort by year (chronological order) to establish correct order
    const sortedByYear = [...eventsOnly].sort((a, b) => a.year - b.year);
    
    // Get the correct order of IDs
    const correctOrder = sortedByYear.map(item => item.id);
    
    // Shuffle events randomly
    const shuffled = [...eventsOnly].sort(() => Math.random() - 0.5);
    
    setShuffledEvents(shuffled);
    setCorrectPositions(Array(shuffled.length).fill(false));
    setAnswersRevealed(false);
    setAllCorrect(false);
    setShowYears(false);
    setShowNotes(false);
  };

  // Set up drag and drop functionality
  const {
    draggedItem,
    draggedOverItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useDraggable(shuffledEvents, (newList) => {
    setShuffledEvents(newList);
    // Reset correct positions when items are moved
    setCorrectPositions(Array(newList.length).fill(false));
    setAllCorrect(false);
  });
  
  // Toggle showing years
  const toggleYears = () => {
    setShowYears(!showYears);
  };
  
  // Toggle showing notes
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  // Check the user's sequence against the correct chronological order
  const checkSequence = () => {
    // Get the chronologically sorted events (the correct order)
    const correctOrder = [...historyData].sort((a, b) => a.year - b.year).map(item => item.event);
    
    // Check each position
    const positionChecks = shuffledEvents.map((item, index) => {
      return item.event === correctOrder[index];
    });
    
    setCorrectPositions(positionChecks);
    
    // Check if all positions are correct
    const isAllCorrect = positionChecks.every(isCorrect => isCorrect);
    setAllCorrect(isAllCorrect);
  };

  // Reveal the correct answers
  const revealAnswers = () => {
    // Sort the events by year
    const sortedEvents = [...shuffledEvents].sort((a, b) => a.year - b.year);
    setShuffledEvents(sortedEvents);
    setCorrectPositions(Array(sortedEvents.length).fill(true));
    setAnswersRevealed(true);
    setAllCorrect(true);
    // Hide notes when revealing answers for cleaner display
    setShowNotes(false);
  };

  return (
    <div className="timeline-container">
      <h1 className="timeline-title">San Francisco Government Chronology Quiz</h1>
      <p className="timeline-subtitle">Arrange the events in chronological order (earliest to latest)</p>
      
      <div className="timeline-controls">
        <button
          className={`timeline-hint-btn ${showYears ? 'active' : ''}`}
          onClick={toggleYears}
        >
          {showYears ? 'Hide Years' : 'Show Years as Hint'}
        </button>
        
        <button
          className={`timeline-hint-btn ${showNotes ? 'active' : ''}`}
          onClick={toggleNotes}
        >
          {showNotes ? 'Hide Event Notes' : 'Show Event Notes'}
        </button>
      </div>
      
      {showYears && (
        <div className="timeline-hint-guide">
          <p>Years are displayed in chronological order as a guide</p>
        </div>
      )}
      
      <div className="timeline-events">
        {shuffledEvents.map((item, index) => (
          <div key={item.id} className="timeline-event-row">
            {showYears && (
              <div className="timeline-chrono-year">
                {chronologicalYears[index]}
              </div>
            )}
            <div 
              className={`timeline-event-item ${
                correctPositions[index] 
                  ? 'correct' 
                  : correctPositions[index] === false && correctPositions.some(pos => pos === true)
                    ? 'incorrect'
                    : ''
              } ${draggedItem === index ? 'dragging' : ''} ${draggedOverItem === index ? 'drag-over' : ''}`}
              draggable={!answersRevealed}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="timeline-event-number">
                {index + 1}
              </div>
              <div className="timeline-event-content">
                <div className="timeline-event-title">{item.event}</div>
                <div className="timeline-event-type">{item.type}</div>
                {showNotes && item.notes && (
                  <div className="timeline-event-notes">
                    <p><strong>Notes:</strong> {item.notes}</p>
                  </div>
                )}
              </div>
              <div className="timeline-event-handle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
        
        {allCorrect && (
          <div className="timeline-success">
            🎉 Congratulations! All events are in the correct chronological order.
          </div>
        )}
      </div>
      
      <div className="timeline-actions">
        <button
          className="timeline-btn check"
          onClick={checkSequence}
          disabled={answersRevealed}
        >
          Check Sequence
        </button>
        
        <button
          className="timeline-btn reveal"
          onClick={revealAnswers}
          disabled={answersRevealed}
        >
          Reveal Correct Order
        </button>
        
        <button
          className="timeline-btn reset"
          onClick={shuffleEvents}
        >
          Reset Quiz
        </button>
      </div>
      
      {answersRevealed && (
        <div className="timeline-answer-key">
          <h3 className="timeline-answer-title">Correct Chronological Order:</h3>
          <ol className="timeline-answer-list">
            {shuffledEvents.map((item) => (
              <li key={item.id} className="timeline-answer-item">
                <span className="timeline-answer-event">{item.event}</span> ({item.year})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SFChronologyQuiz;