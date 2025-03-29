import React, { useState, useEffect } from 'react';
import './Timelines.css';
import AppFooter from './AppFooter';
// Import the political history data specifically
import { politicalHistoryData } from './historyData';

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

const SFChronologyQuiz = ({ navigateTo }) => {
  // State for the randomly ordered events that the user will sort
  const [shuffledEvents, setShuffledEvents] = useState([]);
  // State to track which items are in the correct position
  const [correctPositions, setCorrectPositions] = useState([]);
  // State to track which years are correct
  const [correctYears, setCorrectYears] = useState([]);
  // State to track whether answers are revealed
  const [answersRevealed, setAnswersRevealed] = useState(false);
  // State to track whether sequence is revealed
  const [sequenceRevealed, setSequenceRevealed] = useState(false);
  // State to track quiz completion
  const [allCorrect, setAllCorrect] = useState(false);
  // State for user entered years
  const [userYears, setUserYears] = useState([]);
  
  // State to show/hide event notes
  const [showNotes, setShowNotes] = useState(false);
  
  // Initialize the quiz with shuffled events
  useEffect(() => {
    shuffleEvents();
  }, []);

  // Function to shuffle the events
  const shuffleEvents = () => {
    const eventsOnly = politicalHistoryData.map((item, index) => ({
      id: index,
      event: item.event,
      year: item.year,
      notes: item.notes
    }));
    
    // Shuffle events randomly
    const shuffled = [...eventsOnly].sort(() => Math.random() - 0.5);
    
    setShuffledEvents(shuffled);
    setCorrectPositions(Array(shuffled.length).fill(false));
    setCorrectYears(Array(shuffled.length).fill(false));
    setUserYears(Array(shuffled.length).fill(""));
    setAnswersRevealed(false);
    setSequenceRevealed(false); // Reset the sequenceRevealed state
    setAllCorrect(false);
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
    // We need to reorder the user years to match the new order of events
    if (draggedItem !== null && draggedOverItem !== null) {
      const newYears = [...userYears];
      const movedYear = newYears[draggedItem];
      
      // Remove the year from its original position
      newYears.splice(draggedItem, 1);
      
      // Insert it at the new position
      newYears.splice(draggedOverItem, 0, movedYear);
      
      setUserYears(newYears);
      
      // Also need to reorder the correctYears array if any validations have happened
      const newCorrectYears = [...correctYears];
      const movedCorrectYear = newCorrectYears[draggedItem];
      
      // Remove from original position
      newCorrectYears.splice(draggedItem, 1);
      
      // Insert at new position
      newCorrectYears.splice(draggedOverItem, 0, movedCorrectYear);
      
      setCorrectYears(newCorrectYears);
    }
    
    setShuffledEvents(newList);
    // Reset correct positions when items are moved
    setCorrectPositions(Array(newList.length).fill(false));
    setAllCorrect(false);
  });
  
  // Toggle showing notes
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  // Handle year input change
  const handleYearChange = (index, value) => {
    const newYears = [...userYears];
    newYears[index] = value;
    setUserYears(newYears);
    
    // Reset correct status when input changes
    const newCorrectYears = [...correctYears];
    newCorrectYears[index] = false;
    setCorrectYears(newCorrectYears);
    setAllCorrect(false);
  };

  // Check the user's sequence and years against the correct chronological order
  const checkAnswers = () => {
    // Get the chronologically sorted events (the correct order)
    const correctOrder = [...politicalHistoryData].sort((a, b) => a.year - b.year);
    
    // Check each position
    const positionChecks = shuffledEvents.map((item, index) => {
      return item.event === correctOrder[index].event;
    });
    
    // Check each year
    const yearChecks = shuffledEvents.map((item, index) => {
      const userEnteredYear = parseInt(userYears[index], 10);
      // Check if the user entered year matches the event's actual year
      return !isNaN(userEnteredYear) && userEnteredYear === item.year;
    });
    
    setCorrectPositions(positionChecks);
    setCorrectYears(yearChecks);
    
    // Check if all positions and years are correct
    const isAllCorrect = positionChecks.every(isCorrect => isCorrect) && 
                         yearChecks.every(isCorrect => isCorrect);
    setAllCorrect(isAllCorrect);
  };

  // Reveal only the correct sequence (order of events) but not the years
  const revealSequence = () => {
    // Sort the events by year
    const sortedEvents = [...shuffledEvents].sort((a, b) => a.year - b.year);
    setShuffledEvents(sortedEvents);
    
    // Set positions as correct but not years
    setCorrectPositions(Array(sortedEvents.length).fill(true));
    
    // Important: Don't fill in the years, but keep whatever the user has entered
    
    // Instead of setting answersRevealed to true, create a new state flag for sequence revealed
    setSequenceRevealed(true);
    
    // Hide notes when revealing answers for cleaner display
    setShowNotes(false);
  };
  
  // Reveal all answers (sequence and years)
  const revealAnswers = () => {
    // Sort the events by year
    const sortedEvents = [...shuffledEvents].sort((a, b) => a.year - b.year);
    setShuffledEvents(sortedEvents);
    
    // Set all positions and years as correct
    setCorrectPositions(Array(sortedEvents.length).fill(true));
    setCorrectYears(Array(sortedEvents.length).fill(true));
    
    // Set the correct years in the input fields
    setUserYears(sortedEvents.map(item => item.year.toString()));
    
    setAnswersRevealed(true);
    setAllCorrect(true);
    // Hide notes when revealing answers for cleaner display
    setShowNotes(false);
  };

  return (
    <div className="timeline-container">
      <h1 className="timeline-title">San Francisco Political History Chronology Quiz</h1>
      <p className="timeline-subtitle">Arrange the events in chronological order (earliest to latest) and enter the correct year for each event</p>
      
      {/* Add this container div to wrap all interactive elements */}
      <div className="p-4 border rounded shadow-sm bg-white mb-6">
        <div className="timeline-controls">
          <button
            className={`timeline-hint-btn ${showNotes ? 'active' : ''}`}
            onClick={toggleNotes}
          >
            {showNotes ? 'Hide Event Notes' : 'Show Event Notes'}
          </button>
        </div>
        
        <div className="timeline-events">
          {shuffledEvents.map((item, index) => (
            <div key={item.id} className="timeline-event-row">
              <div 
                className={`timeline-event-item ${
                  (correctPositions[index] && correctYears[index]) 
                    ? 'correct' 
                    : correctPositions[index] === true ? '' // Don't mark as incorrect if position is correct
                    : (correctPositions[index] === false || correctYears[index] === false) && 
                      (correctPositions.some(pos => pos === true) || correctYears.some(year => year === true))
                      ? 'incorrect'
                      : ''
                } ${draggedItem === index ? 'dragging' : ''} ${draggedOverItem === index ? 'drag-over' : ''}`}
                draggable={!sequenceRevealed && !answersRevealed} // Can't drag if either sequence or all answers are revealed
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
                  {showNotes && item.notes && (
                    <div className="timeline-event-notes">
                      <p><strong>Notes:</strong> {item.notes}</p>
                    </div>
                  )}
                </div>
                <div className="timeline-year-input">
                  <input
                    type="text"
                    placeholder="Year"
                    value={userYears[index]}
                    onChange={(e) => handleYearChange(index, e.target.value)}
                    disabled={answersRevealed} // Only disable if all answers are revealed
                    className={`year-input ${
                      correctYears[index] ? 'correct-year' : 
                      correctYears[index] === false && correctYears.some(year => year === true) ? 'incorrect-year' : ''
                    }`}
                  />
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
              🎉 Congratulations! All events are in the correct chronological order with the correct years.
            </div>
          )}
        </div>
        
        <div className="timeline-actions">
          <button
            className="app-button check-button"
            onClick={checkAnswers}
            disabled={answersRevealed} // Only disable if all answers are revealed
          >
            Check Answers
          </button>
          
          <button
            className="app-button navigation-button"
            onClick={revealSequence}
            disabled={sequenceRevealed || answersRevealed} // Disable if sequence or all answers already revealed
          >
            Reveal Correct Sequence
          </button>
          
          <button
            className="app-button reveal-button"
            onClick={revealAnswers}
            disabled={answersRevealed} // Only disable if all answers are revealed
          >
            Reveal All Answers
          </button>
          
          <button
            className="app-button reset-button"
            onClick={shuffleEvents}
          >
            Reset Quiz
          </button>
        </div>
      </div>
      
      {/* App Footer */}
      <AppFooter currentSection="history-timeline" navigateTo={navigateTo} />
    </div>
  );
};

export default SFChronologyQuiz;