import React, { useState, useEffect } from 'react';
import './Flashcards.css';

const LegislativeFlashcardsSection = () => {
  // Hardcoded data with flashcards
  const hardcodedFlashcards = [
    {
      Prompt: "What are the three types of Board actions?",
      Response: "Ordinances, resolutions, motions"
    },
    {
      Prompt: "If the Mayor returns a passed ordinance unsigned, what happens?",
      Response: "It's enacted 10 days later"
    },
    {
      Prompt: "If the Mayor vetoes a passed ordinance, can the Board of Supervisors respond?",
      Response: "Yes, a veto can be overturned by 8 members of the Board."
    },
    {
      Prompt: "How long after an ordinance is enacted (signed by the Mayor OR 10 days after left unsigned by Mayor) is an ordinance effective?",
      Response: "30 days"
    },
    {
      Prompt: "Can commissions create laws?",
      Response: "Commissions can create regulations within scope of authority granted by Charter, not laws."
    },
    {
      Prompt: "What is a regulatory ordinance?",
      Response: "A law that prescribes a rule of conduct prospectively."
    },
    {
      Prompt: "What is an administrative ordinance?",
      Response: "A formal action that, by its nature, is concrete rather than general."
    },
    {
      Prompt: "What are the steps of the legislative process for an ordinance?",
      Response: "Introduction → Committee → Full Board → Mayor → Effective Date"
    },
    {
      Prompt: "What happens at the introduction stage of an ordinance?",
      Response: "Sponsor introduces ordinance, clerk assigns number, refers to committee, publishes notice."
    },
    {
      Prompt: "What happens at the committee stage of an ordinance?",
      Response: "Committee hears ordinance, may amend, and then forwards to full Board with recommendation."
    },
    {
      Prompt: "What happens at the full Board stage of an ordinance?",
      Response: "First reading (title only), second reading (at least 5 days later), must pass by majority vote."
    },
    {
      Prompt: "What is a resolution?",
      Response: "An expression of intent, opinion, policy, or direction. Not binding law."
    },
    {
      Prompt: "What is a motion?",
      Response: "Procedural action taken at a meeting, usually to conduct Board business."
    },
    {
      Prompt: "How many members constitute a quorum for the Board of Supervisors?",
      Response: "6 members (majority of the 11-member Board)"
    },
    {
      Prompt: "What is the Brown Act?",
      Response: "California state law that guarantees the public's right to attend and participate in local legislative bodies' meetings."
    }
  ];
  
  // State for flashcards data
  const [flashcards] = useState(hardcodedFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Set up CSV data if needed
  useEffect(() => {
    // If you want to load from CSV later, you can do it here
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
      <h1 className="text-2xl font-bold mb-6">Legislative Process Flashcards</h1>
      
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

export default LegislativeFlashcardsSection;