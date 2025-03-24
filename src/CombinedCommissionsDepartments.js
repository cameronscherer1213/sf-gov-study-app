import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './CombinedCommissionsDepartments.css';

const CombinedCommissionsDepartments = () => {
  // State for commissions and departments data
  const [commissions, setCommissions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for user selections in matching activity
  const [selectedItems, setSelectedItems] = useState([]);
  
  // State for current selection
  const [currentCommission, setCurrentCommission] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState('');
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [currentHeadTitle, setCurrentHeadTitle] = useState('');
  
  // State for feedback in matching activity
  const [feedback, setFeedback] = useState({
    show: false,
    correct: false,
    message: ''
  });

  // State for administrative departments
  const [departmentOne, setDepartmentOne] = useState('');
  const [departmentTwo, setDepartmentTwo] = useState('');
  
  // State for administrative departments feedback
  const [feedbackOne, setFeedbackOne] = useState({ show: false, correct: false, message: '' });
  const [feedbackTwo, setFeedbackTwo] = useState({ show: false, correct: false, message: '' });
  
  // State for administrative departments reveal answers
  const [revealAnswers, setRevealAnswers] = useState(false);
  
  // Correct answers for administrative departments
  const correctAdminDepts = [
    "Office of the City Administrator",
    "Controller's Office"
  ];

  // Appointment structures (hardcoded from requirements)
  const appointmentStructures = [
    'Mayor (1)',
    'Mayor (4), Board of Supervisors (3)',
    'Mayor (5)',
    'Mayor (7)',
    'Mayor (1), Board of Supervisors (1), District Attorney (1), City Attorney (1), Assessor-Recorder (1)'
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile('SF Political Map Information.csv');
        const text = new TextDecoder().decode(response);
        
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const commissionData = results.data.filter(row => row.Type === 'Commission');
            const departmentData = results.data.filter(row => 
              row.Type === 'Department' && 
              row['Overseen By'] && 
              row['Overseen By'] !== 'N/A'
            );
            
            setCommissions(commissionData);
            setDepartments(departmentData);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle commission selection
  const handleCommissionChange = (value) => {
    setCurrentCommission(value);
    setCurrentDepartment('');
    setCurrentHeadTitle('');
    setFeedback({ show: false, correct: false, message: '' });
  };

  // Handle appointment selection
  const handleAppointmentChange = (value) => {
    setCurrentAppointment(value);
    setFeedback({ show: false, correct: false, message: '' });
  };

  // Handle department selection
  const handleDepartmentChange = (value) => {
    setCurrentDepartment(value);
    setFeedback({ show: false, correct: false, message: '' });
  };
  
  // Handle department head title input
  const handleHeadTitleChange = (value) => {
    setCurrentHeadTitle(value);
    setFeedback({ show: false, correct: false, message: '' });
  };

  // Check answer
  const checkAnswer = () => {
    // Validate selections
    if (!currentCommission) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please select a commission."
      });
      return;
    }
    
    if (!currentAppointment) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please select an appointment structure."
      });
      return;
    }
    
    if (!currentDepartment) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please select a department."
      });
      return;
    }
    
    if (!currentHeadTitle.trim()) {
      setFeedback({
        show: true,
        correct: false,
        message: "Please enter the department head title."
      });
      return;
    }
    
    // Check if this commission has already been selected
    if (selectedItems.some(item => item.commission === currentCommission)) {
      setFeedback({
        show: true,
        correct: false,
        message: "You've already selected this commission. Please choose another one."
      });
      return;
    }
    
    // Check if commission-appointment match is correct
    const commission = commissions.find(c => c.Name === currentCommission);
    const correctAppointment = commission ? commission['Appointed By'] : null;
    const isAppointmentCorrect = currentAppointment === correctAppointment;
    
    // Check if commission-department match is correct
    const correctDepartment = departments.find(dept => dept['Overseen By'] === currentCommission);
    const isDepartmentCorrect = correctDepartment && (currentDepartment === correctDepartment.Name);
    
    // Check if department head title is correct
    const correctHeadTitle = correctDepartment ? correctDepartment['Department Head Title'] : null;
    const isHeadTitleCorrect = correctHeadTitle && (currentHeadTitle.trim().toLowerCase() === correctHeadTitle.toLowerCase());
    
    if (!isAppointmentCorrect) {
      setFeedback({
        show: true,
        correct: false,
        message: `Incorrect. ${currentCommission} is not appointed by ${currentAppointment}.`
      });
      return;
    }
    
    if (!isDepartmentCorrect) {
      setFeedback({
        show: true,
        correct: false,
        message: `Incorrect. ${currentCommission} does not oversee ${currentDepartment}.`
      });
      return;
    }
    
    if (!isHeadTitleCorrect) {
      setFeedback({
        show: true,
        correct: false,
        message: `Incorrect. The head title for ${currentDepartment} is not "${currentHeadTitle}".`
      });
      return;
    }
    
    // All correct
    setSelectedItems([
      ...selectedItems,
      {
        commission: currentCommission,
        appointment: currentAppointment,
        department: currentDepartment,
        headTitle: correctHeadTitle
      }
    ]);
    
    // Clear current selections
    setCurrentCommission('');
    setCurrentAppointment('');
    setCurrentDepartment('');
    setCurrentHeadTitle('');
    
    setFeedback({
      show: true,
      correct: true,
      message: `Correct! You've successfully matched all information for ${currentCommission}.`
    });
  };

  // Toggle reveal answers for administrative departments
  const toggleRevealAnswers = () => {
    setRevealAnswers(!revealAnswers);
    
    if (!revealAnswers) {
      setDepartmentOne(correctAdminDepts[0]);
      setDepartmentTwo(correctAdminDepts[1]);
      setFeedbackOne({
        show: true,
        correct: true,
        message: "Answer revealed."
      });
      setFeedbackTwo({
        show: true,
        correct: true,
        message: "Answer revealed."
      });
    } else {
      // Reset if hiding
      setFeedbackOne({
        show: false,
        correct: false,
        message: ""
      });
      setFeedbackTwo({
        show: false,
        correct: false,
        message: ""
      });
    }
  };

  // Check administrative department answers individually
  const checkAdminDept = (answer, index) => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const correctAnswer = correctAdminDepts[index].toLowerCase();
    
    const isCorrect = normalizedAnswer === correctAnswer;
    
    if (index === 0) {
      setFeedbackOne({
        show: true,
        correct: isCorrect,
        message: isCorrect ? "Correct!" : "Incorrect. Try again."
      });
    } else {
      setFeedbackTwo({
        show: true,
        correct: isCorrect,
        message: isCorrect ? "Correct!" : "Incorrect. Try again."
      });
    }
  };
  
  // Check both administrative department answers
  const checkAllAdminDepts = () => {
    checkAdminDept(departmentOne, 0);
    checkAdminDept(departmentTwo, 1);
  };
  
  // Reset administrative departments inputs
  const resetAdminDepts = () => {
    setDepartmentOne('');
    setDepartmentTwo('');
    setFeedbackOne({ show: false, correct: false, message: '' });
    setFeedbackTwo({ show: false, correct: false, message: '' });
    setRevealAnswers(false);
  };

  // Calculate remaining selections
  const remainingCount = 5 - selectedItems.length;
  const isComplete = remainingCount === 0;

  // Filter out already selected commissions
  const availableCommissions = commissions.filter(
    commission => !selectedItems.some(item => item.commission === commission.Name)
  );
  
  // Filter departments based on the selected commission
  const getSelectableDepartments = () => {
    if (!currentCommission) return [];
    
    // Filter to only departments overseen by the current commission
    return departments.filter(dept => dept['Overseen By'] === currentCommission);
  };

  // Reset the commissions/departments activity
  const resetActivity = () => {
    setSelectedItems([]);
    setCurrentCommission('');
    setCurrentAppointment('');
    setCurrentDepartment('');
    setCurrentHeadTitle('');
    setFeedback({ show: false, correct: false, message: '' });
  };

  // Render loading state
  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Commissions and Departments</h1>
      
      {/* Commissions and Departments Matching Section */}
      <h2 className="subtitle">Part 1: Select 5 commissions and match them with their appointment structure, the department they oversee, and the department head title.</h2>
      
      <div className="progress">
        <p className="progress-text">
          {isComplete 
            ? "Complete! You've correctly identified 5 commission/department pairs." 
            : `${selectedItems.length} of 5 selected. ${remainingCount} remaining.`}
        </p>
      </div>
      
      {!isComplete && (
        <div className="selection-section">
          <div className="selection-fields">
            <div className="field">
              <label className="label">
                1. Select a commission:
              </label>
              <select
                className="select-input"
                value={currentCommission}
                onChange={(e) => handleCommissionChange(e.target.value)}
              >
                <option value="">-- Select a commission --</option>
                {availableCommissions.map((commission, index) => (
                  <option key={index} value={commission.Name}>
                    {commission.Name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="field">
              <label className="label">
                2. Select how this commission is appointed:
              </label>
              <select
                className="select-input"
                value={currentAppointment}
                onChange={(e) => handleAppointmentChange(e.target.value)}
                disabled={!currentCommission}
              >
                <option value="">-- Select appointment structure --</option>
                {appointmentStructures.map((structure, index) => (
                  <option key={index} value={structure}>
                    {structure}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="field">
              <label className="label">
                3. Select the department overseen by this commission:
              </label>
              <select
                className="select-input"
                value={currentDepartment}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                disabled={!currentCommission}
              >
                <option value="">-- Select a department --</option>
                {getSelectableDepartments().map((dept, index) => (
                  <option key={index} value={dept.Name}>
                    {dept.Name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="field">
              <label className="label">
                4. Enter the title of the department head:
              </label>
              <input
                type="text"
                className="text-input"
                value={currentHeadTitle}
                onChange={(e) => handleHeadTitleChange(e.target.value)}
                placeholder="Enter department head title"
                disabled={!currentDepartment}
              />
            </div>
            
            <button
              className="check-btn"
              onClick={checkAnswer}
              disabled={isComplete}
            >
              Check Answer
            </button>
          </div>
          
          {feedback.show && (
            <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}
      
      {isComplete && (
        <div className="completion-actions">
          <button className="reset-btn" onClick={resetActivity}>
            Start Over
          </button>
        </div>
      )}
      
      {/* Selected Items List */}
      <div className="results-section">
        <h3 className="section-subtitle">Your Selections:</h3>
        {selectedItems.length > 0 ? (
          <div className="table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Commission</th>
                  <th>Appointment</th>
                  <th>Department</th>
                  <th>Department Head</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.commission}</td>
                    <td>{item.appointment}</td>
                    <td>{item.department}</td>
                    <td>{item.headTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-message">None selected yet</p>
        )}
      </div>
      
      {/* Administrative Departments Section */}
      <h2 className="subtitle admin-section-title">Part 2: Administrative Departments</h2>
      <h3 className="section-description">Please name the two departments we discussed in class that report directly to the Mayor that do not have an oversight commission. The third is the Office of Economic and Workforce Development.</h3>
      
      <div className="admin-section">
        <div className="admin-field">
          <label className="label">First department:</label>
          <div className="input-field">
            <input
              type="text"
              className="text-input"
              value={departmentOne}
              onChange={(e) => setDepartmentOne(e.target.value)}
              placeholder="Enter department name"
            />
          </div>
          
          {feedbackOne.show && (
            <div className={`feedback ${feedbackOne.correct ? 'correct' : 'incorrect'}`}>
              {feedbackOne.message}
            </div>
          )}
        </div>
        
        <div className="admin-field">
          <label className="label">Second department:</label>
          <div className="input-field">
            <input
              type="text"
              className="text-input"
              value={departmentTwo}
              onChange={(e) => setDepartmentTwo(e.target.value)}
              placeholder="Enter department name"
            />
          </div>
          
          {feedbackTwo.show && (
            <div className={`feedback ${feedbackTwo.correct ? 'correct' : 'incorrect'}`}>
              {feedbackTwo.message}
            </div>
          )}
        </div>
        
        <div className="buttons-group">
          <button
            className="check-btn"
            onClick={checkAllAdminDepts}
          >
            Check Both Answers
          </button>
          
          <button
            className="reveal-btn"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
          </button>
          
          {(feedbackOne.show || feedbackTwo.show) && (
            <button
              className="reset-btn"
              onClick={resetAdminDepts}
            >
              Reset
            </button>
          )}
        </div>
        
        {revealAnswers && (
          <div className="revealed-answer">
            <p><strong>Correct answers:</strong></p>
            <ol className="answers-list">
              <li>{correctAdminDepts[0]}</li>
              <li>{correctAdminDepts[1]}</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedCommissionsDepartments;