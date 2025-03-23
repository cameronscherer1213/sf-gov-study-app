import React, { useState, useEffect } from 'react';
import './GovernmentLawSection.css';

const GovernmentLawSection = () => {
  // Hardcoded data to avoid CSV loading issues
  const lawData = [
    {
      Type: "Constitutional",
      Definition: "Highest law, outlines form and function of the law",
      "U.S.": "U.S. Constitution",
      "California": "California Constitution",
      "San Francisco (1)": "",
      "San Francisco (2)": "",
      "San Francisco (3)": "",
      "San Francisco (4)": ""
    },
    {
      Type: "Statutory",
      Definition: "Law passed by legislative bodies",
      "U.S.": "U.S. Code",
      "California": "California Code",
      "San Francisco (1)": "San Francisco Charter",
      "San Francisco (2)": "Administrative Code",
      "San Francisco (3)": "Police Code",
      "San Francisco (4)": "Ordinances"
    },
    {
      Type: "Administrative",
      Definition: "Law enacted by executive agencies",
      "U.S.": "Code of Federal Regulation",
      "California": "California Code of Regulations",
      "San Francisco (1)": "Department rules and regulations",
      "San Francisco (2)": "Mayoral Executive Directives",
      "San Francisco (3)": "",
      "San Francisco (4)": ""
    },
    {
      Type: "Case",
      Definition: "Judicial interpretation of the law (no actual lawmaking)",
      "U.S.": "SCOTUS Opinions",
      "California": "California Supreme Court opinions",
      "San Francisco (1)": "",
      "San Francisco (2)": "",
      "San Francisco (3)": "",
      "San Francisco (4)": ""
    }
  ];
  
  // State for user answers
  const [userAnswers, setUserAnswers] = useState({
    Constitutional: { definition: '', us: '', california: '', sanFrancisco: [] },
    Statutory: { definition: '', us: '', california: '', sanFrancisco: [] },
    Administrative: { definition: '', us: '', california: '', sanFrancisco: [] },
    Case: { definition: '', us: '', california: '', sanFrancisco: [] }
  });

  // State for shuffled SF law options per law type
  const [shuffledSfOptions, setShuffledSfOptions] = useState({});
  
  // State for shuffled definitions
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
  
  // State for feedback
  const [feedback, setFeedback] = useState({
    show: false,
    correct: false,
    message: '',
    details: {}
  });
  
  // State for revealing answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // All possible SF law options
  const sfLawOptions = [
    'San Francisco Charter',
    'Administrative Code',
    'Police Code',
    'Ordinances',
    'Department rules and regulations',
    'Mayoral Executive Directives'
  ];

  // Shuffle function
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize shuffled options
  useEffect(() => {
    // Shuffle SF options for each law type
    const shuffledSf = {};
    lawData.forEach(row => {
      shuffledSf[row.Type] = shuffleArray([...sfLawOptions]);
    });
    setShuffledSfOptions(shuffledSf);
    
    // Shuffle definitions
    const definitions = lawData.map(row => row.Definition);
    setShuffledDefinitions(shuffleArray(definitions));
  }, []);

  // Update user answers
  const handleAnswerChange = (lawType, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [lawType]: {
        ...prev[lawType],
        [field]: value
      }
    }));
    
    // Clear feedback when user changes an answer
    setFeedback({
      show: false,
      correct: false,
      message: '',
      details: {}
    });
  };
  
  // Handle multi-select for SF law options
  const handleSFOptionToggle = (lawType, option) => {
    setUserAnswers(prev => {
      const currentSelections = prev[lawType].sanFrancisco || [];
      let newSelections;
      
      if (currentSelections.includes(option)) {
        // Remove option if already selected
        newSelections = currentSelections.filter(item => item !== option);
      } else {
        // Add option if not selected
        newSelections = [...currentSelections, option];
      }
      
      return {
        ...prev,
        [lawType]: {
          ...prev[lawType],
          sanFrancisco: newSelections
        }
      };
    });
    
    // Clear feedback when user changes an answer
    setFeedback({
      show: false,
      correct: false,
      message: '',
      details: {}
    });
  };
  
  // Check user answers
  const checkAnswers = () => {
    const results = {};
    let allCorrect = true;
    
    lawData.forEach(row => {
      const lawType = row.Type;
      const userAnswer = userAnswers[lawType];
      
      // Check definition
      const isDefinitionCorrect = userAnswer.definition === row.Definition;
      
      // Check US example
      const isUSCorrect = userAnswer.us.trim().toLowerCase() === row["U.S."].toLowerCase();
      
      // Check California example
      const isCaliforniaCorrect = userAnswer.california.trim().toLowerCase() === row.California.toLowerCase();
      
      // Check San Francisco options
      const correctSFOptions = [
        row['San Francisco (1)'],
        row['San Francisco (2)'],
        row['San Francisco (3)'],
        row['San Francisco (4)']
      ].filter(option => option !== '');
      
      // Check if the user selected all the correct options and only the correct options
      const userSFOptions = userAnswer.sanFrancisco || [];
      const isSFCorrect = 
        correctSFOptions.every(option => userSFOptions.includes(option)) && 
        userSFOptions.every(option => correctSFOptions.includes(option));
      
      results[lawType] = {
        definition: isDefinitionCorrect,
        us: isUSCorrect,
        california: isCaliforniaCorrect,
        sanFrancisco: isSFCorrect
      };
      
      if (!isDefinitionCorrect || !isUSCorrect || !isCaliforniaCorrect || !isSFCorrect) {
        allCorrect = false;
      }
    });
    
    setFeedback({
      show: true,
      correct: allCorrect,
      message: allCorrect 
        ? "Congratulations! All answers are correct." 
        : "Some answers are incorrect. Check the highlighted fields and try again.",
      details: results
    });
  };
  
  // Toggle reveal answers
  const toggleRevealAnswers = () => {
    if (!revealAnswers) {
      // Set all correct answers
      const correctAnswers = {};
      
      lawData.forEach(row => {
        const sfOptions = [
          row['San Francisco (1)'],
          row['San Francisco (2)'],
          row['San Francisco (3)'],
          row['San Francisco (4)']
        ].filter(option => option !== '');
        
        correctAnswers[row.Type] = {
          definition: row.Definition,
          us: row["U.S."],
          california: row.California,
          sanFrancisco: sfOptions
        };
      });
      
      setUserAnswers(correctAnswers);
    }
    
    setRevealAnswers(!revealAnswers);
  };

  // If shuffled options aren't ready yet
  if (Object.keys(shuffledSfOptions).length === 0 || shuffledDefinitions.length === 0) {
    return <div className="p-4">Loading government law data...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-6">Government Law</h1>
      <p className="mb-6">
        Match each type of law with its definition and provide the corresponding examples at federal, state, and local levels.
      </p>
      
      <div className="mb-6">
        {lawData.map((row, index) => (
          <div key={index} className="mb-8 p-4 border rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">{row.Type} Law</h2>
            
            {/* Definition Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Definition:</label>
              <select
                className={`w-90 p-2 border rounded ${
                  feedback.show && !feedback.details[row.Type]?.definition
                    ? 'border-red-500'
                    : feedback.show && feedback.details[row.Type]?.definition
                    ? 'border-green-500'
                    : ''
                }`}
                value={userAnswers[row.Type]?.definition || ''}
                onChange={(e) => handleAnswerChange(row.Type, 'definition', e.target.value)}
                disabled={revealAnswers}
              >
                <option value="">-- Select a definition --</option>
                {shuffledDefinitions.map((definition, defIndex) => (
                  <option key={defIndex} value={definition}>
                    {definition}
                  </option>
                ))}
              </select>
            </div>
            
            {/* US Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">U.S. Book of Law:</label>
              <input
                type="text"
                className={`w-90 p-2 border rounded ${
                  feedback.show && !feedback.details[row.Type]?.us
                    ? 'border-red-500'
                    : feedback.show && feedback.details[row.Type]?.us
                    ? 'border-green-500'
                    : ''
                }`}
                value={userAnswers[row.Type]?.us || ''}
                onChange={(e) => handleAnswerChange(row.Type, 'us', e.target.value)}
                placeholder="Enter U.S. book of law"
                disabled={revealAnswers}
              />
            </div>
            
            {/* California Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">California Book of Law:</label>
              <input
                type="text"
                className={`w-90 p-2 border rounded ${
                  feedback.show && !feedback.details[row.Type]?.california
                    ? 'border-red-500'
                    : feedback.show && feedback.details[row.Type]?.california
                    ? 'border-green-500'
                    : ''
                }`}
                value={userAnswers[row.Type]?.california || ''}
                onChange={(e) => handleAnswerChange(row.Type, 'california', e.target.value)}
                placeholder="Enter California book of law"
                disabled={revealAnswers}
              />
            </div>
            
            {/* San Francisco Multi-select */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">San Francisco Examples (select all that apply):</label>
              <div 
                className={`p-3 border rounded bg-white ${
                  feedback.show && !feedback.details[row.Type]?.sanFrancisco
                    ? 'border-red-500'
                    : feedback.show && feedback.details[row.Type]?.sanFrancisco
                    ? 'border-green-500'
                    : ''
                }`}
              >
                {shuffledSfOptions[row.Type].map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`${row.Type}-sf-${optIndex}`}
                      checked={userAnswers[row.Type]?.sanFrancisco?.includes(option) || false}
                      onChange={() => handleSFOptionToggle(row.Type, option)}
                      className="mr-2"
                      disabled={revealAnswers}
                    />
                    <label htmlFor={`${row.Type}-sf-${optIndex}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Control Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={checkAnswers}
          disabled={revealAnswers}
          style={{ boxShadow: 'none', outline: 'none', border: 'none' }}
        >
          Check Answers
        </button>
        
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={toggleRevealAnswers}
          style={{ boxShadow: 'none', outline: 'none', border: 'none' }}
        >
          {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </button>
      </div>
      
      {/* Feedback Section */}
      {feedback.show && (
        <div className={`p-4 rounded mb-6 ${feedback.correct ? 'bg-green-100 border border-green-200' : 'bg-yellow-100 border border-yellow-200'}`}>
          <h3 className="font-bold mb-2">
            {feedback.correct ? '✅ All Correct!' : '⚠️ Some Answers Need Attention'}
          </h3>
          <p>{feedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default GovernmentLawSection;