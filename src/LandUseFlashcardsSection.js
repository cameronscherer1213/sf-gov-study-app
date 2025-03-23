import React, { useState, useEffect } from 'react';
import './Flashcards.css';

const LandUseFlashcardsSection = () => {
  // Hardcoded data with flashcards
  const hardcodedFlashcards = [
    {
      Prompt: "What does state law require with regard to planning and land use?",
      Response: "- Local governments must have a planning agency with sufficient powers to carry out state law\n- Must be long-term, comprehensive land use plan\n- Planning agency will enact that plan via ordinance"
    },
    {
      Prompt: "What is the General Plan?",
      Response: "A long-term, comprehensive plan for future growth and development, akin to a roadmap. It is statutorily required but not statutory law."
    },
    {
      Prompt: "What are the two components of a General Plan?",
      Response: "Elements (required) and Implementation (optional)"
    },
    {
      Prompt: "What are the 7 required elements of a General Plan?",
      Response: "1. Land Use\n2. Circulation\n3. Housing\n4. Conservation\n5. Open Space\n6. Noise\n7. Safety"
    },
    {
      Prompt: "What are the roles of the Planning Department and Planning Commission?",
      Response: "Planning Department: Provides staff support, conducts research, and makes recommendations\n\nPlanning Commission: Makes recommendations and decisions on land use matters"
    },
    {
      Prompt: "What is the Planning Code?",
      Response: "A set of local ordinances that implement the General Plan, including zoning regulations, development standards, and procedures."
    },
    {
      Prompt: "What is zoning?",
      Response: "The division of a city into districts with specific regulations governing land use, building height, density, setbacks, and other development standards."
    },
    {
      Prompt: "What does a Conditional Use Authorization (CUA) allow?",
      Response: "It allows uses not permitted as-of-right in a zoning district but which may be suitable under certain conditions."
    },
    {
      Prompt: "What body approves Conditional Use Authorizations?",
      Response: "The Planning Commission"
    },
    {
      Prompt: "What is CEQA?",
      Response: "California Environmental Quality Act - State law requiring public agencies to evaluate and mitigate environmental impacts of projects."
    },
    {
      Prompt: "What are the three types of CEQA determinations?",
      Response: "1. Categorical Exemption\n2. Negative Declaration/Mitigated Negative Declaration\n3. Environmental Impact Report (EIR)"
    },
    {
      Prompt: "What is the relationship between the General Plan and Planning Code?",
      Response: "The General Plan sets policy while the Planning Code implements the policies through specific regulations. The Planning Code must be consistent with the General Plan."
    },
    {
      Prompt: "Who can appeal Planning Commission decisions?",
      Response: "The Board of Supervisors"
    },
    {
      Prompt: "What is a variance?",
      Response: "A form of administrative relief allowing a property owner to deviate from zoning requirements due to unique hardship circumstances."
    },
    {
      Prompt: "What is the Housing Element?",
      Response: "A required element of the General Plan that assesses housing needs and establishes goals, policies, and programs to address those needs."
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