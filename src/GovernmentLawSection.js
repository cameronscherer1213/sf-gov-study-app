import React, { useState, useEffect } from 'react';
import './GovernmentLawSection.css';
import AppFooter from './AppFooter';

const MergedGovernmentLawSection = ({ navigateTo }) => {
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
  
  // Additional Hierarchy of Law fields states
  const [federalAmendment, setFederalAmendment] = useState('');
  const [stateArticle, setStateArticle] = useState('');
  const [localInput, setLocalInput] = useState('');
  
  // Additional feedback for new fields
  const [amendmentFeedback, setAmendmentFeedback] = useState({ show: false, correct: false, message: '' });
  const [articleFeedback, setArticleFeedback] = useState({ show: false, correct: false, message: '' });
  const [localFeedback, setLocalFeedback] = useState({ show: false, correct: false, message: '' });
  
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
  
  // State for feedback (overall and per section)
  const [feedback, setFeedback] = useState({
    show: false,
    correct: false,
    message: '',
    details: {}
  });
  
  // State for section-specific feedback
  const [sectionFeedback, setSectionFeedback] = useState({
    Constitutional: { show: false, correct: false, message: '' },
    Statutory: { show: false, correct: false, message: '' },
    Administrative: { show: false, correct: false, message: '' },
    Case: { show: false, correct: false, message: '' }
  });
  
  // State for revealing answers (overall and per section)
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [revealSectionAnswers, setRevealSectionAnswers] = useState({
    Constitutional: false,
    Statutory: false,
    Administrative: false,
    Case: false
  });
  
  // All possible SF law options
  const sfLawOptions = [
    'San Francisco Charter',
    'Administrative Code',
    'Police Code',
    'Ordinances',
    'Department rules and regulations',
    'Mayoral Executive Directives'
  ];

  // Generate options for amendments
  const generateAmendmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 27; i++) {
      let suffix;
      if (i === 1) suffix = "st";
      else if (i === 2) suffix = "nd";
      else if (i === 3) suffix = "rd";
      else suffix = "th";
      
      options.push(
        <option key={i} value={`${i}${suffix} Amendment`}>{`${i}${suffix} Amendment`}</option>
      );
    }
    return options;
  };
  
  // Generate options for articles
  const generateArticleOptions = () => {
    const options = [];
    for (let i = 1; i <= 35; i++) {
      options.push(
        <option key={i} value={`Article ${i}`}>{`Article ${i}`}</option>
      );
    }
    return options;
  };

  // Check amendment answer
  const checkAmendmentAnswer = () => {
    const isCorrect = federalAmendment === '10th Amendment';
    setAmendmentFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Check your Amendment selection"
    });
  };

  // Check article answer
  const checkArticleAnswer = () => {
    const isCorrect = stateArticle === 'Article 11';
    setArticleFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "Check your Article selection"
    });
  };

  // Check local answer
  const checkLocalAnswer = () => {
    // Check if the field is empty
    if (!localInput.trim()) {
      setLocalFeedback({
        show: true,
        correct: false,
        message: "⚠️ Please fill in all required fields for this section."
      });
      return;
    }
    
    // Check if the answer is correct
    const isCorrect = localInput.toLowerCase() === 'charter' || 
                      localInput.toLowerCase() === 'san francisco charter';
    
    setLocalFeedback({
      show: true,
      correct: isCorrect,
      message: isCorrect ? "Correct!" : "⚠️ Try again."
    });
  };

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

  // Reset the quiz
  const resetQuiz = () => {
    setUserAnswers({
      Constitutional: { definition: '', us: '', california: '', sanFrancisco: [] },
      Statutory: { definition: '', us: '', california: '', sanFrancisco: [] },
      Administrative: { definition: '', us: '', california: '', sanFrancisco: [] },
      Case: { definition: '', us: '', california: '', sanFrancisco: [] }
    });
    
    // Reset Hierarchy fields
    setFederalAmendment('');
    setStateArticle('');
    setLocalInput('');
    
    // Reset Hierarchy feedback
    setAmendmentFeedback({ show: false, correct: false, message: '' });
    setArticleFeedback({ show: false, correct: false, message: '' });
    setLocalFeedback({ show: false, correct: false, message: '' });
    
    setFeedback({
      show: false,
      correct: false,
      message: '',
      details: {}
    });
    
    setSectionFeedback({
      Constitutional: { show: false, correct: false, message: '' },
      Statutory: { show: false, correct: false, message: '' },
      Administrative: { show: false, correct: false, message: '' },
      Case: { show: false, correct: false, message: '' }
    });
    
    setRevealAnswers(false);
    setRevealSectionAnswers({
      Constitutional: false,
      Statutory: false,
      Administrative: false,
      Case: false
    });
  };

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
    
    // Also clear section feedback
    setSectionFeedback(prev => ({
      ...prev,
      [lawType]: { show: false, correct: false, message: '' }
    }));
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
    
    // Also clear section feedback
    setSectionFeedback(prev => ({
      ...prev,
      [lawType]: { show: false, correct: false, message: '' }
    }));
  };
  
  // Check a specific law section
  const checkSectionAnswers = (lawType) => {
    const row = lawData.find(item => item.Type === lawType);
    const userAnswer = userAnswers[lawType];
    
    // Check for empty required fields
    const isEmpty = {
      definition: !userAnswer.definition,
      us: !userAnswer.us.trim(),
      california: !userAnswer.california.trim()
    };
    
    // Special case for sanFrancisco - only mark as empty if there should be selections
    const correctSFOptions = [
      row['San Francisco (1)'],
      row['San Francisco (2)'],
      row['San Francisco (3)'],
      row['San Francisco (4)']
    ].filter(option => option !== '');
    
    const shouldHaveSfSelections = correctSFOptions.length > 0;
    
    isEmpty.sanFrancisco = shouldHaveSfSelections && (!userAnswer.sanFrancisco || userAnswer.sanFrancisco.length === 0);
    
    // For Constitutional law, also check the additional fields
    if (lawType === 'Constitutional') {
      // Check amendment
      if (federalAmendment) {
        checkAmendmentAnswer();
      }
      
      // Check article
      if (stateArticle) {
        checkArticleAnswer();
      }
      
      // Check local input
      if (localInput) {
        checkLocalAnswer();
      }
    }
    
    // Check if any required field is empty
    if (isEmpty.definition || isEmpty.us || isEmpty.california || isEmpty.sanFrancisco) {
      setSectionFeedback(prev => ({
        ...prev,
        [lawType]: { 
          show: true, 
          correct: false, 
          message: "⚠️ Please fill in all required fields for this section." 
        }
      }));
      return;
    }
    
    // Check definition
    const isDefinitionCorrect = userAnswer.definition === row.Definition;
    
    // Check US example
    let isUSCorrect = false;
    if (userAnswer.us.trim()) {
      // Case-insensitive match
      isUSCorrect = userAnswer.us.trim().toLowerCase() === row["U.S."].toLowerCase();
      
      // Also check for common variations/abbreviations
      if (!isUSCorrect) {
        const usInput = userAnswer.us.trim().toLowerCase();
        const correctUS = row["U.S."].toLowerCase();
        
        // Allow for variations like "US Constitution" vs "U.S. Constitution"
        if (correctUS === "u.s. constitution" && 
            (usInput === "us constitution" || usInput === "united states constitution")) {
          isUSCorrect = true;
        }
        
        // Allow for variations of "Code of Federal Regulation"
        if (correctUS === "code of federal regulation" && 
            (usInput === "code of federal regulations" || usInput === "cfr")) {
          isUSCorrect = true;
        }
        
        // Allow for variations of "U.S. Code"
        if (correctUS === "u.s. code" && 
            (usInput === "us code" || usInput === "united states code" || usInput === "usc")) {
          isUSCorrect = true;
        }
        
        // Allow for variations of "SCOTUS Opinions"
        if (correctUS === "scotus opinions" && 
            (usInput === "supreme court opinions" || 
             usInput === "supreme court rulings" ||
             usInput === "supreme court decisions")) {
          isUSCorrect = true;
        }
      }
    }
    
    // Check California example
    let isCaliforniaCorrect = false;
    if (userAnswer.california.trim()) {
      // Case-insensitive match
      isCaliforniaCorrect = userAnswer.california.trim().toLowerCase() === row.California.toLowerCase();
      
      // Also check for common variations
      if (!isCaliforniaCorrect) {
        const caInput = userAnswer.california.trim().toLowerCase();
        const correctCA = row.California.toLowerCase();
        
        // Allow for variations of "California Constitution"
        if (correctCA === "california constitution" && 
            (caInput === "ca constitution" || caInput === "state constitution")) {
          isCaliforniaCorrect = true;
        }
        
        // Allow for variations of "California Code"
        if (correctCA === "california code" && 
            (caInput === "ca code" || caInput === "state code")) {
          isCaliforniaCorrect = true;
        }
        
        // Allow for variations of "California Code of Regulations"
        if (correctCA === "california code of regulations" && 
            (caInput === "ca code of regulations" || caInput === "ccr")) {
          isCaliforniaCorrect = true;
        }
        
        // Allow for variations of "California Supreme Court opinions"
        if (correctCA === "california supreme court opinions" && 
            (caInput === "ca supreme court opinions" || 
             caInput === "california supreme court rulings" ||
             caInput === "state supreme court opinions")) {
          isCaliforniaCorrect = true;
        }
      }
    }
    
    // Check if the user selected all the correct options and only the correct options
    const userSFOptions = userAnswer.sanFrancisco || [];
    const isSFCorrect = 
      correctSFOptions.every(option => userSFOptions.includes(option)) && 
      userSFOptions.every(option => correctSFOptions.includes(option));
    
    // Determine if all answers in this section are correct
    const isAllCorrect = isDefinitionCorrect && isUSCorrect && isCaliforniaCorrect && isSFCorrect;
    
    // Set the section feedback
    setSectionFeedback(prev => ({
      ...prev,
      [lawType]: { 
        show: true, 
        correct: isAllCorrect, 
        message: isAllCorrect 
          ? "✅ All answers are correct in this section!" 
          : "❌ Some answers are incorrect in this section." 
      }
    }));
  };
  
  // Reveal answers for a specific section
  const revealSectionAnswer = (lawType) => {
    const row = lawData.find(item => item.Type === lawType);
    
    // Get the correct SF options
    const correctSFOptions = [
      row['San Francisco (1)'],
      row['San Francisco (2)'],
      row['San Francisco (3)'],
      row['San Francisco (4)']
    ].filter(option => option !== '');
    
    // Update user answers with correct answers for this section
    setUserAnswers(prev => ({
      ...prev,
      [lawType]: {
        definition: row.Definition,
        us: row["U.S."],
        california: row.California,
        sanFrancisco: correctSFOptions
      }
    }));
    
    // For Constitutional law, also reveal the additional fields
    if (lawType === 'Constitutional') {
      setFederalAmendment('10th Amendment');
      setStateArticle('Article 11');
      
      // Set feedback for these fields
      setAmendmentFeedback({ show: true, correct: true, message: "Answer revealed." });
      setArticleFeedback({ show: true, correct: true, message: "Answer revealed." });
    }
    
    // Update the section reveal state
    setRevealSectionAnswers(prev => ({
      ...prev,
      [lawType]: true
    }));
    
    // Set feedback
    setSectionFeedback(prev => ({
      ...prev,
      [lawType]: {
        show: true,
        correct: true,
        message: "Answers revealed for this section."
      }
    }));
  };

  // Check all user answers
  const checkAnswers = () => {
    const results = {};
    let allCorrect = true;
    let emptyFields = false;
    
    lawData.forEach(row => {
      const lawType = row.Type;
      const userAnswer = userAnswers[lawType];
      
      // Check for empty required fields
      const isEmpty = {
        definition: !userAnswer.definition,
        us: !userAnswer.us.trim(),
        california: !userAnswer.california.trim()
      };
      
      // Special case for sanFrancisco - only mark as empty if there should be selections
      const correctSFOptions = [
        row['San Francisco (1)'],
        row['San Francisco (2)'],
        row['San Francisco (3)'],
        row['San Francisco (4)']
      ].filter(option => option !== '');
      
      const shouldHaveSfSelections = correctSFOptions.length > 0;
      
      isEmpty.sanFrancisco = shouldHaveSfSelections && (!userAnswer.sanFrancisco || userAnswer.sanFrancisco.length === 0);
      
      // Also check constitutional law additionals
      if (lawType === 'Constitutional') {
        // Check amendment
        checkAmendmentAnswer();
        
        // Check article
        checkArticleAnswer();
        
        // Check local input
        checkLocalAnswer();
      }
      
      // Check if any required field is empty
      if (isEmpty.definition || isEmpty.us || isEmpty.california || isEmpty.sanFrancisco) {
        emptyFields = true;
      }
      
      // Check definition
      const isDefinitionCorrect = userAnswer.definition === row.Definition;
      
      // Check US example
      let isUSCorrect = false;
      if (userAnswer.us.trim()) {
        // Case-insensitive match
        isUSCorrect = userAnswer.us.trim().toLowerCase() === row["U.S."].toLowerCase();
        
        // Also check for common variations/abbreviations
        if (!isUSCorrect) {
          const usInput = userAnswer.us.trim().toLowerCase();
          const correctUS = row["U.S."].toLowerCase();
          
          // Allow for variations like "US Constitution" vs "U.S. Constitution"
          if (correctUS === "u.s. constitution" && 
              (usInput === "us constitution" || usInput === "united states constitution")) {
            isUSCorrect = true;
          }
          
          // Allow for variations of "Code of Federal Regulation"
          if (correctUS === "code of federal regulation" && 
              (usInput === "code of federal regulations" || usInput === "cfr")) {
            isUSCorrect = true;
          }
          
          // Allow for variations of "U.S. Code"
          if (correctUS === "u.s. code" && 
              (usInput === "us code" || usInput === "united states code" || usInput === "usc")) {
            isUSCorrect = true;
          }
          
          // Allow for variations of "SCOTUS Opinions"
          if (correctUS === "scotus opinions" && 
              (usInput === "supreme court opinions" || 
               usInput === "supreme court rulings" ||
               usInput === "supreme court decisions")) {
            isUSCorrect = true;
          }
        }
      }
      
      // Check California example
      let isCaliforniaCorrect = false;
      if (userAnswer.california.trim()) {
        // Case-insensitive match
        isCaliforniaCorrect = userAnswer.california.trim().toLowerCase() === row.California.toLowerCase();
        
        // Also check for common variations
        if (!isCaliforniaCorrect) {
          const caInput = userAnswer.california.trim().toLowerCase();
          const correctCA = row.California.toLowerCase();
          
          // Allow for variations of "California Constitution"
          if (correctCA === "california constitution" && 
              (caInput === "ca constitution" || caInput === "state constitution")) {
            isCaliforniaCorrect = true;
          }
          
          // Allow for variations of "California Code"
          if (correctCA === "california code" && 
              (caInput === "ca code" || caInput === "state code")) {
            isCaliforniaCorrect = true;
          }
          
          // Allow for variations of "California Code of Regulations"
          if (correctCA === "california code of regulations" && 
              (caInput === "ca code of regulations" || caInput === "ccr")) {
            isCaliforniaCorrect = true;
          }
          
          // Allow for variations of "California Supreme Court opinions"
          if (correctCA === "california supreme court opinions" && 
              (caInput === "ca supreme court opinions" || 
               caInput === "california supreme court rulings" ||
               caInput === "state supreme court opinions")) {
            isCaliforniaCorrect = true;
          }
        }
      }
      
      // Check if the user selected all the correct options and only the correct options
      const userSFOptions = userAnswer.sanFrancisco || [];
      const isSFCorrect = 
        correctSFOptions.every(option => userSFOptions.includes(option)) && 
        userSFOptions.every(option => correctSFOptions.includes(option));
      
      results[lawType] = {
        definition: isDefinitionCorrect && !isEmpty.definition,
        us: isUSCorrect && !isEmpty.us,
        california: isCaliforniaCorrect && !isEmpty.california,
        sanFrancisco: isSFCorrect && !isEmpty.sanFrancisco,
        empty: isEmpty
      };
      
      if (!isDefinitionCorrect || !isUSCorrect || !isCaliforniaCorrect || !isSFCorrect || 
          isEmpty.definition || isEmpty.us || isEmpty.california || isEmpty.sanFrancisco) {
        allCorrect = false;
      }
    });
    
    let message = '';
    if (emptyFields) {
      message = "⚠️ Some required fields are empty. Please fill in all fields before checking answers.";
    } else if (allCorrect) {
      message = "✅ Congratulations! All answers are correct.";
    } else {
      message = "❌ Some answers are incorrect. Check the highlighted fields and try again.";
    }
    
    setFeedback({
      show: true,
      correct: allCorrect,
      message: message,
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
      
      // Set Hierarchy fields
      setFederalAmendment('10th Amendment');
      setStateArticle('Article 11');
      setLocalInput('San Francisco Charter');
      
      // Set feedback for these fields
      setAmendmentFeedback({ show: true, correct: true, message: "Answer revealed." });
      setArticleFeedback({ show: true, correct: true, message: "Answer revealed." });
      setLocalFeedback({ show: true, correct: true, message: "Answer revealed." });
    }
    
    setRevealAnswers(!revealAnswers);
  };

  // Get input field class and emoji based on feedback state
  const getFieldFeedback = (lawType, field) => {
    if (!feedback.show) {
      return {
        className: 'w-90 p-2 border rounded',
        emoji: null
      };
    }
    
    const isEmpty = feedback.details[lawType]?.empty?.[field];
    const isCorrect = feedback.details[lawType]?.[field];
    
    if (isEmpty) {
      return {
        className: 'w-90 p-2 border rounded',
        emoji: '⚠️'
      };
    } else if (isCorrect === false) {
      return {
        className: 'w-90 p-2 border rounded',
        emoji: '❌'
      };
    } else if (isCorrect === true) {
      return {
        className: 'w-90 p-2 border rounded',
        emoji: '✅'
      };
    }
    
    return {
      className: 'w-90 p-2 border rounded',
      emoji: null
    };
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
      
      {/* San Francisco Charter Question Section */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">San Francisco Government</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Enter the document that establishes San Francisco's government:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-90 p-2 border rounded"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Enter local law document..."
              disabled={revealAnswers}
            />
            {localFeedback.show && (
              <span className={`ml-2 ${localFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                {localFeedback.correct ? '✅' : '❌'}
              </span>
            )}
          </div>
          {localFeedback.show && (
            <div className={`mt-2 p-2 ${localFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
              {localFeedback.message}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              className="px-3 py-1 text-white rounded text-sm font-normal"
              style={{ backgroundColor: '#2463EB', fontWeight: 'normal' }}
              onClick={checkLocalAnswer}
              disabled={revealAnswers}
            >
              Check Answer
            </button>
            
            <button
              className="px-3 py-1 text-white rounded text-sm font-normal"
              style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
              onClick={() => {
                setLocalInput('San Francisco Charter');
                setLocalFeedback({ show: true, correct: true, message: "Answer revealed." });
              }}
              disabled={revealAnswers}
            >
              Reveal Answer
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        {lawData.map((row, index) => (
          <div key={index} className="mb-8 p-4 border rounded shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">{row.Type} Law</h2>
            
            {/* Definition Dropdown */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Definition:</label>
              <div className="flex items-center">
                <select
                  className={getFieldFeedback(row.Type, 'definition').className}
                  value={userAnswers[row.Type]?.definition || ''}
                  onChange={(e) => handleAnswerChange(row.Type, 'definition', e.target.value)}
                  disabled={revealAnswers || revealSectionAnswers[row.Type]}
                  style={{ color: 'inherit' }}
                >
                  <option value="">-- Select a definition --</option>
                  {shuffledDefinitions.map((definition, defIndex) => (
                    <option key={defIndex} value={definition}>
                      {definition}
                    </option>
                  ))}
                </select>
                {getFieldFeedback(row.Type, 'definition').emoji && (
                  <span className="ml-2">{getFieldFeedback(row.Type, 'definition').emoji}</span>
                )}
              </div>
            </div>
            
            {/* US Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">U.S. Book of Law:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className={getFieldFeedback(row.Type, 'us').className}
                  value={userAnswers[row.Type]?.us || ''}
                  onChange={(e) => handleAnswerChange(row.Type, 'us', e.target.value)}
                  placeholder="Enter U.S. book of law"
                  disabled={revealAnswers || revealSectionAnswers[row.Type]}
                  style={{ color: 'inherit' }}
                />
                {getFieldFeedback(row.Type, 'us').emoji && (
                  <span className="ml-2">{getFieldFeedback(row.Type, 'us').emoji}</span>
                )}
              </div>
            </div>
            
            {/* Add the amendment dropdown for Constitutional Law */}
            {row.Type === 'Constitutional' && (
              <div className="mb-4 ml-4 border-l-4 border-blue-200 pl-4">
                <label className="block mb-2 font-medium">
                  Which amendment grants powers to states?
                </label>
                <div className="flex items-center">
                  <select
                    className="w-90 p-2 border rounded"
                    value={federalAmendment}
                    onChange={(e) => setFederalAmendment(e.target.value)}
                    disabled={revealAnswers || revealSectionAnswers[row.Type]}
                  >
                    <option value="">Select an amendment</option>
                    {generateAmendmentOptions()}
                  </select>
                  {amendmentFeedback.show && (
                    <span className={`ml-2 ${amendmentFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                      {amendmentFeedback.correct ? '✅' : '❌'}
                    </span>
                  )}
                </div>
                {amendmentFeedback.show && (
                  <div className={`mt-2 p-2 ${amendmentFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {amendmentFeedback.message}
                  </div>
                )}
              </div>
            )}
            
            {/* California Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">California Book of Law:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className={getFieldFeedback(row.Type, 'california').className}
                  value={userAnswers[row.Type]?.california || ''}
                  onChange={(e) => handleAnswerChange(row.Type, 'california', e.target.value)}
                  placeholder="Enter California book of law"
                  disabled={revealAnswers || revealSectionAnswers[row.Type]}
                  style={{ color: 'inherit' }}
                />
                {getFieldFeedback(row.Type, 'california').emoji && (
                  <span className="ml-2">{getFieldFeedback(row.Type, 'california').emoji}</span>
                )}
              </div>
            </div>
            
            {/* Add article dropdown for Constitutional Law */}
            {row.Type === 'Constitutional' && (
              <div className="mb-4 ml-4 border-l-4 border-blue-200 pl-4">
                <label className="block mb-2 font-medium">
                  Which article covers local government?
                </label>
                <div className="flex items-center">
                  <select
                    className="w-90 p-2 border rounded"
                    value={stateArticle}
                    onChange={(e) => setStateArticle(e.target.value)}
                    disabled={revealAnswers || revealSectionAnswers[row.Type]}
                  >
                    <option value="">Select an article</option>
                    {generateArticleOptions()}
                  </select>
                  {articleFeedback.show && (
                    <span className={`ml-2 ${articleFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                      {articleFeedback.correct ? '✅' : '❌'}
                    </span>
                  )}
                </div>
                {articleFeedback.show && (
                  <div className={`mt-2 p-2 ${articleFeedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                    {articleFeedback.message}
                  </div>
                )}
              </div>
            )}
            
            {/* San Francisco Multi-select */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">San Francisco Examples (select all that apply):</label>
              <div className="flex items-start">
                <div 
                  className={getFieldFeedback(row.Type, 'sanFrancisco').className}
                  style={{ width: '90%' }}
                >
                  {shuffledSfOptions[row.Type].map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`${row.Type}-sf-${optIndex}`}
                        checked={userAnswers[row.Type]?.sanFrancisco?.includes(option) || false}
                        onChange={() => handleSFOptionToggle(row.Type, option)}
                        className="mr-2"
                        disabled={revealAnswers || revealSectionAnswers[row.Type]}
                      />
                      <label 
                        htmlFor={`${row.Type}-sf-${optIndex}`}
                        style={{ color: 'inherit' }}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {getFieldFeedback(row.Type, 'sanFrancisco').emoji && (
                  <span className="ml-2 mt-2">{getFieldFeedback(row.Type, 'sanFrancisco').emoji}</span>
                )}
              </div>
            </div>
            
            {/* Section-specific feedback */}
            {sectionFeedback[row.Type].show && (
              <div className={`p-2 rounded mb-4 ${sectionFeedback[row.Type].correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {sectionFeedback[row.Type].message}
              </div>
            )}
            
            {/* Section-specific buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className="px-3 py-1 text-white rounded text-sm font-normal"
                style={{ backgroundColor: '#2463EB', fontWeight: 'normal' }}
                onClick={() => checkSectionAnswers(row.Type)}
                disabled={revealAnswers || revealSectionAnswers[row.Type]}
              >
                Check This Section
              </button>
              
              <button
                className="px-3 py-1 text-white rounded text-sm font-normal"
                style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
                onClick={() => revealSectionAnswer(row.Type)}
                disabled={revealAnswers || revealSectionAnswers[row.Type]}
              >
                Reveal This Section
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Feedback Legend */}
      {feedback.show && (
        <div className="mb-4 p-3 border rounded bg-blue-50">
          <h3 className="font-semibold mb-2">Answer Key:</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span>✅ Correct answer</span>
            </div>
            <div className="flex items-center">
              <span>❌ Incorrect answer</span>
            </div>
            <div className="flex items-center">
              <span>⚠️ Missing answer</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Control Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className="px-4 py-2 text-white rounded font-normal"
          style={{ backgroundColor: '#2463EB', fontWeight: 'normal' }}
          onClick={checkAnswers}
          disabled={revealAnswers}
        >
          Check All Answers
        </button>
        
        <button
          className="px-4 py-2 text-white rounded font-normal"
          style={{ backgroundColor: '#BC1010', fontWeight: 'normal' }}
          onClick={toggleRevealAnswers}
        >
          {revealAnswers ? 'Hide All Answers' : 'Reveal All Answers'}
        </button>
        
        <button
          className="px-4 py-2 text-white rounded font-normal"
          style={{ backgroundColor: '#6B7280', fontWeight: 'normal' }}
          onClick={resetQuiz}
        >
          Reset Quiz
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
      
      {navigateTo && <AppFooter navigateTo={navigateTo} />}
    </div>
  );
};

export default MergedGovernmentLawSection;