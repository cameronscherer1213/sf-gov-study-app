import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './DistrictMapSection.css';
import AppFooter from './AppFooter';

const DistrictMapSection = ({ navigateTo }) => {
  // Complete list of SF neighborhoods (alphabetically sorted)
  const completeNeighborhoodsList = [
    "Alcatraz",
    "Ashbury Heights",
    "Bayview Heights",
    "Bayview-Hunters Point",
    "Bernal Heights",
    "Buena Vista Park",
    "Candlestick Point",
    "Cathedral Hill",
    "Cayuga",
    "Central Richmond",
    "Central Sunset",
    "Central Waterfront",
    "Chinatown",
    "Civic Center",
    "Clarendon Heights",
    "Cole Valley",
    "Corona Heights",
    "Cow Hollow",
    "Crocker Amazon",
    "Diamond Heights",
    "Dogpatch",
    "Dolores Heights",
    "Duboce Triangle",
    "Eureka Valley",
    "Excelsior",
    "Farallon Islands",
    "Fillmore",
    "Financial District",
    "Forest Hill",
    "Forest Knolls",
    "Glen Park",
    "Golden Gate Heights",
    "Golden Gate Park",
    "Haight Ashbury",
    "Hayes Valley",
    "India Basin",
    "Ingleside",
    "Ingleside Heights",
    "Inner Parkside",
    "Inner Richmond",
    "Inner Sunset",
    "Japantown",
    "Jordan Park",
    "Lake District",
    "Lakeshore",
    "Laurel Heights",
    "Lincoln Park",
    "Little Hollywood",
    "Lone Mountain",
    "Lower Haight",
    "Lower Pacific Heights",
    "Maiden Lane",
    "Marina",
    "McLaren Park",
    "Merced Heights",
    "Merced Manor",
    "Mid-Market",
    "Midtown Terrace",
    "Miraloma Park",
    "Mission Bay",
    "Mission District",
    "Mission Dolores",
    "Mission Terrace",
    "Nob Hill",
    "Noe Valley",
    "North Beach",
    "North Panhandle",
    "North Waterfront",
    "Oceanview",
    "Outer Mission",
    "Outer Parkside",
    "Outer Richmond",
    "Outer Sunset",
    "Pacific Heights",
    "Parkside",
    "Parnassus Heights",
    "Pine Lake Park",
    "Polk Gulch",
    "Portola",
    "Potrero Hill",
    "Presidio",
    "Presidio Heights",
    "Presidio Terrace",
    "Rincon Hill",
    "Russian Hill",
    "Seacliff",
    "Silver Terrace",
    "South Beach",
    "South of Market",
    "Sunnydale",
    "Sunnyside",
    "Telegraph Hill",
    "Tenderloin",
    "The Castro",
    "Treasure Island",
    "Twin Peaks",
    "Union Square",
    "University of San Francisco",
    "Visitacion Valley",
    "Vista del Mar",
    "West Portal",
    "Western Addition",
    "Yerba Buena Island"
  ];

  // Hard-coded district data
  const hardcodedDistrictData = {
    "A": { 
      district: 4, 
      supervisor: "Beya Alcaraz", 
      neighborhoods: [
        "Central Sunset", "Outer Sunset", "Parkside", "Outer Parkside", 
        "Pine Lake Park", "Lakeshore", "Merced Manor", "Farallon Islands"
      ] 
    },
    "B": { 
      district: 1, 
      supervisor: "Connie Chan", 
      neighborhoods: [
        "Inner Richmond", "Central Richmond", "Outer Richmond", "Vista del Mar", 
        "Seacliff", "Lake District", "Presidio Terrace", "Lone Mountain", 
        "Golden Gate Park", "Lincoln Park", "University of San Francisco"
      ] 
    },
    "C": { 
      district: 7, 
      supervisor: "Myrna Melgar", 
      neighborhoods: [
        "Inner Parkside", "Golden Gate Heights", "Inner Sunset", "Parnassus Heights", 
        "Clarendon Heights", "Twin Peaks", "West Portal", "Forest Knolls", 
        "Midtown Terrace", "Forest Hill", "Miraloma Park", "Sunnyside"
      ] 
    },
    "D": { 
      district: 2, 
      supervisor: "Stephen Sherrill", 
      neighborhoods: [
        "Marina", "Cow Hollow", "Pacific Heights", "Presidio Heights", 
        "Jordan Park", "Laurel Heights", "Presidio", "Lower Pacific Heights", 
        "Cathedral Hill", "Russian Hill"
      ] 
    },
    "E": { 
      district: 5, 
      supervisor: "Bilal Mahmood", 
      neighborhoods: [
        "Haight Ashbury", "Lower Haight", "Fillmore", "Western Addition", 
        "North Panhandle", "Japantown", "Hayes Valley", "Tenderloin", "Civic Center"
      ] 
    },
    "F": { 
      district: 8, 
      supervisor: "Rafael Mandelman", 
      neighborhoods: [
        "The Castro", "Noe Valley", "Diamond Heights", "Glen Park", "Corona Heights", 
        "Eureka Valley", "Dolores Heights", "Mission Dolores", "Duboce Triangle", 
        "Buena Vista Park", "Cole Valley", "Ashbury Heights"
      ] 
    },
    "G": { 
      district: 11, 
      supervisor: "Chyanne Chen", 
      neighborhoods: [
        "Excelsior", "Ingleside", "Oceanview", "Merced Heights", "Ingleside Heights", 
        "Mission Terrace", "Outer Mission", "Cayuga", "Crocker Amazon"
      ] 
    },
    "H": { 
      district: 9, 
      supervisor: "Jackie Fielder", 
      neighborhoods: [
        "Mission District", "Bernal Heights", "Portola"
      ] 
    },
    "I": { 
      district: 10, 
      supervisor: "Shamann Walton", 
      neighborhoods: [
        "Potrero Hill", "Central Waterfront", "Dogpatch", "Bayview-Hunters Point", 
        "Bayview Heights", "India Basin", "Silver Terrace", "Candlestick Point", 
        "Visitacion Valley", "Little Hollywood", "Sunnydale", "McLaren Park"
      ] 
    },
    "J": { 
      district: 6, 
      supervisor: "Matt Dorsey", 
      neighborhoods: [
        "Mid-Market", "Rincon Hill", "South of Market", "South Beach", 
        "Mission Bay", "Treasure Island", "Yerba Buena Island", "Alcatraz"
      ] 
    },
    "K": { 
      district: 3, 
      supervisor: "Danny Sauter", 
      neighborhoods: [
        "North Beach", "Chinatown", "Telegraph Hill", "North Waterfront", 
        "Financial District", "Nob Hill", "Union Square", "Maiden Lane", 
        "Polk Gulch", "Russian Hill"
      ] 
    }
  };

  // State for district data
  const [districtData, setDistrictData] = useState(hardcodedDistrictData);
  const [loading, setLoading] = useState(false);
  
  // State for user inputs (11 rows A-K)
  const [userAnswers, setUserAnswers] = useState({
    A: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    B: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    C: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    D: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    E: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    F: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    G: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    H: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    I: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    J: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' },
    K: { district: '', supervisor: '', neighborhood1: '', neighborhood2: '' }
  });
  
  // State for feedback on each row
  const [feedback, setFeedback] = useState({
    A: { show: false, correct: false, message: '' },
    B: { show: false, correct: false, message: '' },
    C: { show: false, correct: false, message: '' },
    D: { show: false, correct: false, message: '' },
    E: { show: false, correct: false, message: '' },
    F: { show: false, correct: false, message: '' },
    G: { show: false, correct: false, message: '' },
    H: { show: false, correct: false, message: '' },
    I: { show: false, correct: false, message: '' },
    J: { show: false, correct: false, message: '' },
    K: { show: false, correct: false, message: '' }
  });
  
  // State for revealed answers
  const [revealedAnswers, setRevealedAnswers] = useState({
    A: false, B: false, C: false, D: false, E: false,
    F: false, G: false, H: false, I: false, J: false, K: false
  });

  // Handle input change
  const handleInputChange = (row, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [row]: {
        ...prev[row],
        [field]: value
      }
    }));
    
    // Clear feedback when typing
    setFeedback(prev => ({
      ...prev,
      [row]: {
        ...prev[row],
        show: false
      }
    }));
  };

  // Check answers for a specific row
  const checkAnswers = (row) => {
    const userAnswer = userAnswers[row];
    const correctData = districtData[row];
    
    // Check district number
    const isDistrictCorrect = parseInt(userAnswer.district) === correctData.district;
    
    // Check supervisor (case insensitive)
    const isSupervisorCorrect = 
      userAnswer.supervisor.trim().toLowerCase() === correctData.supervisor.toLowerCase();
    
    // Check neighborhoods - both need to be valid for this district and different from each other
    const neighborhood1 = userAnswer.neighborhood1;
    const neighborhood2 = userAnswer.neighborhood2;
    
    // Check if neighborhoods are both selected
    if (!neighborhood1 || !neighborhood2) {
      setFeedback(prev => ({
        ...prev,
        [row]: {
          show: true,
          correct: false,
          message: 'Please select two different neighborhoods from this district.'
        }
      }));
      return;
    }
    
    // Check if neighborhoods are valid for this district
    const neighborhood1Valid = correctData.neighborhoods.includes(neighborhood1);
    const neighborhood2Valid = correctData.neighborhoods.includes(neighborhood2);
    
    // Check if the two neighborhoods are different
    const neighborhoodsAreDifferent = neighborhood1 !== neighborhood2;
    
    // All three conditions must be met for neighborhoods to be valid
    const areNeighborhoodsValid = 
      neighborhood1Valid && neighborhood2Valid && neighborhoodsAreDifferent;
    
    // All answers must be correct
    const isCorrect = isDistrictCorrect && isSupervisorCorrect && areNeighborhoodsValid;
    
    let message = '';
    if (isCorrect) {
      message = 'Correct! All answers are right.';
    } else {
      // Start with general message
      message = 'Some answers are incorrect:';
      
      // Add specific messages for each wrong answer
      if (!isDistrictCorrect) {
        message += ' District number is wrong.';
      }
      
      if (!isSupervisorCorrect) {
        message += ' Supervisor name is wrong.';
      }
      
      if (!areNeighborhoodsValid) {
        if (!neighborhood1Valid && !neighborhood2Valid) {
          message += ' Both neighborhoods are not in this district.';
        } else if (!neighborhood1Valid) {
          message += ` "${neighborhood1}" is not in this district.`;
        } else if (!neighborhood2Valid) {
          message += ` "${neighborhood2}" is not in this district.`;
        } else if (!neighborhoodsAreDifferent) {
          message += ' Please select two different neighborhoods.';
        }
      }
    }
    
    setFeedback(prev => ({
      ...prev,
      [row]: {
        show: true,
        correct: isCorrect,
        message: message
      }
    }));
  };

  // Reveal answers for a specific row
  const revealAnswers = (row) => {
    const correctData = districtData[row];
    
    // Get the first two neighborhoods from the district list
    const firstNeighborhood = correctData.neighborhoods[0] || 'N/A';
    const secondNeighborhood = correctData.neighborhoods.length > 1 ? 
                              correctData.neighborhoods[1] : 'N/A';
    
    // Update the user answers with the revealed data
    setUserAnswers(prev => ({
      ...prev,
      [row]: {
        district: correctData.district.toString(),
        supervisor: correctData.supervisor,
        neighborhood1: firstNeighborhood,
        neighborhood2: secondNeighborhood
      }
    }));
    
    // Mark this row as revealed
    setRevealedAnswers(prev => ({
      ...prev,
      [row]: true
    }));
    
    // Format the list of all neighborhoods for this district for the feedback message
    const neighborhoodsList = correctData.neighborhoods.join(', ');
    
    setFeedback(prev => ({
      ...prev,
      [row]: {
        show: true,
        correct: true,
        message: `Answers revealed! This district includes: ${neighborhoodsList}`
      }
    }));
  };

  // Generate the districts that we have data for
  const renderDistricts = () => {
    // Get district letters from our data and sort them
    const districtLetters = Object.keys(districtData).sort();
    
    return districtLetters.map(letter => {
      const rowData = districtData[letter];
      const userAnswer = userAnswers[letter];
      const rowFeedback = feedback[letter];
      const isRevealed = revealedAnswers[letter];
      
      return (
        <div key={letter} className="district-block">
          <h3 className="district-title">District {letter}</h3>
          
          <div className="inputs-grid">
            <div className="input-field">
              <label className="label">District Number:</label>
              <input
                type="number"
                className="number-input shorter-input"
                value={userAnswer.district}
                onChange={(e) => handleInputChange(letter, 'district', e.target.value)}
                placeholder="Enter district number"
                disabled={isRevealed}
              />
            </div>
            
            <div className="input-field">
              <label className="label">Supervisor:</label>
              <input
                type="text"
                className="text-input shorter-input"
                value={userAnswer.supervisor}
                onChange={(e) => handleInputChange(letter, 'supervisor', e.target.value)}
                placeholder="Enter supervisor name"
                disabled={isRevealed}
              />
            </div>
            
            <div className="input-field">
              <label className="label">Neighborhood 1:</label>
              <select
                className="text-input shorter-input"
                value={userAnswer.neighborhood1}
                onChange={(e) => handleInputChange(letter, 'neighborhood1', e.target.value)}
                disabled={isRevealed}
              >
                <option value="">Select a neighborhood</option>
                {completeNeighborhoodsList.map((neighborhood, index) => (
                  <option key={`n1-${index}`} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
            
            <div className="input-field">
              <label className="label">Neighborhood 2:</label>
              <select
                className="text-input shorter-input"
                value={userAnswer.neighborhood2}
                onChange={(e) => handleInputChange(letter, 'neighborhood2', e.target.value)}
                disabled={isRevealed}
              >
                <option value="">Select a neighborhood</option>
                {completeNeighborhoodsList.map((neighborhood, index) => (
                  <option key={`n2-${index}`} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="buttons-group">
  <button
    className="app-button check-button"  // Changed from check-btn
    onClick={() => checkAnswers(letter)}
    disabled={isRevealed}
    style={{ fontWeight: 400, width: '140px' }}  // Added inline style
  >
    Check Answers
  </button>
  
  <button
    className="app-button reveal-button"  // Changed from reveal-btn 
    onClick={() => revealAnswers(letter)}
    disabled={isRevealed}
    style={{ fontWeight: 400, width: '140px' }}  // Added inline style
  >
    Reveal Answers
  </button>
</div>
          
          {rowFeedback && rowFeedback.show && (
            <div className={`feedback ${rowFeedback.correct ? 'correct' : 'incorrect'}`}>
              {rowFeedback.message}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return <div className="container">Loading district data...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">San Francisco District Map & Supervisors</h1>
      
      <p>
        For each district, enter the district number, supervisor name, and select two different neighborhoods within that district.
      </p>
      
      <div className="map-container">
        {/* Left side: Map image in a sticky container */}
        <div className="map-column">
          <div className="sticky-container">
            <img 
              src="/sf-district-map.jpg" 
              alt="San Francisco District Map" 
              className="map-image"
              onError={(e) => {
                console.error("Error loading image");
                e.target.src = "/api/placeholder/800/600";
                e.target.alt = "San Francisco District Map (Image could not be loaded)";
              }}
            />
            <p className="map-caption">
              Map of San Francisco Districts (A-K)
            </p>
          </div>
        </div>
        
        {/* Right side: Input fields */}
        <div className="inputs-column">
          {/* Generate districts */}
          {renderDistricts()}
        </div>
      </div>
      
      {/* Add AppFooter */}
      <AppFooter currentSection="district-map" navigateTo={navigateTo} />
    </div>
  );
};

export default DistrictMapSection;