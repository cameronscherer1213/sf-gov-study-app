import React, { useState } from 'react';

const CombinedCommissionsDepartments = () => {
  // Embed the data directly in the component instead of importing from external file
  const sfGovernmentData = {
    commissions: [
      {
        "Name": "Public Works Commission",
        "Type": "Commission",
        "Description": "Provides oversight and policy direction to the Department of Public Works, ensuring transparency and accountability in the management of public infrastructure and services.",
        "Department Head Title": "",
        "Appointed By": "Mayor (5)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Public Utilities Commission",
        "Type": "Commission",
        "Description": "Oversees the San Francisco Public Utilities Commission (SFPUC), which provides water, wastewater, and electric power services to San Francisco and surrounding areas.",
        "Department Head Title": "",
        "Appointed By": "Mayor (5)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "MTA Board of Directors",
        "Type": "Commission",
        "Description": "Oversees the San Francisco Municipal Transportation Agency (SFMTA), which manages all ground transportation in the city, including Municipal Railway (Muni), parking, traffic, and taxis.",
        "Department Head Title": "",
        "Appointed By": "Mayor (7)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Health Commission",
        "Type": "Commission",
        "Description": "Manages and oversees the Department of Public Health, including community health services, primary care, and San Francisco General Hospital.",
        "Department Head Title": "",
        "Appointed By": "Mayor (5)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Police Commission",
        "Type": "Commission",
        "Description": "Oversees the Police Department and sets policy for the department, conducts disciplinary hearings, and imposes discipline on officers.",
        "Department Head Title": "",
        "Appointed By": "Mayor (4), Board of Supervisors (3)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Fire Commission",
        "Type": "Commission",
        "Description": "Oversees the Fire Department, setting policy and managing resources for fire prevention, suppression, and emergency medical services.",
        "Department Head Title": "",
        "Appointed By": "Mayor (5)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Human Services Commission",
        "Type": "Commission",
        "Description": "Oversees the Department of Human Services, which administers social welfare programs including food assistance, healthcare access, and child welfare services.",
        "Department Head Title": "",
        "Appointed By": "Mayor (5)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Recreation and Park Commission",
        "Type": "Commission",
        "Description": "Oversees the Recreation and Park Department, managing the city's parks, playgrounds, recreation centers, and public open spaces.",
        "Department Head Title": "",
        "Appointed By": "Mayor (7)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Planning Commission",
        "Type": "Commission",
        "Description": "Oversees the Planning Department, reviewing and approving land use proposals, zoning changes, and long-term city planning initiatives.",
        "Department Head Title": "",
        "Appointed By": "Mayor (4), Board of Supervisors (3)",
        "Overseen By": "",
        "Priority": ""
      },
      {
        "Name": "Ethics Commission",
        "Type": "Commission",
        "Description": "Oversees the Ethics Department, enforcing city laws related to campaign finance, conflicts of interest, lobbying, and governmental ethics.",
        "Department Head Title": "",
        "Appointed By": "Mayor (1), Board of Supervisors (1), District Attorney (1), City Attorney (1), Assessor-Recorder (1)",
        "Overseen By": "",
        "Priority": ""
      }
    ],
    departments: [
      {
        "Name": "Department of Public Works",
        "Type": "Department",
        "Description": "Enhances quality of life by managing public spaces, infrastructure, and facilities.",
        "Department Head Title": "Director",
        "Appointed By": "Mayor",
        "Overseen By": "Public Works Commission",
        "Priority": ""
      },
      {
        "Name": "Public Utilities Commission",
        "Type": "Department",
        "Description": "Provides water, wastewater, and power services to San Francisco and surrounding areas.",
        "Department Head Title": "General Manager",
        "Appointed By": "Commission",
        "Overseen By": "Public Utilities Commission",
        "Priority": ""
      },
      {
        "Name": "Municipal Transportation Agency",
        "Type": "Department",
        "Description": "Manages all ground transportation in the city, including Muni, parking, traffic, and taxis.",
        "Department Head Title": "Director of Transportation",
        "Appointed By": "Commission",
        "Overseen By": "MTA Board of Directors",
        "Priority": ""
      },
      {
        "Name": "Department of Public Health",
        "Type": "Department",
        "Description": "Protects and promotes health through prevention, education, treatment, and monitoring services.",
        "Department Head Title": "Director of Health",
        "Appointed By": "Commission",
        "Overseen By": "Health Commission",
        "Priority": ""
      },
      {
        "Name": "Police Department",
        "Type": "Department",
        "Description": "Provides law enforcement services to ensure public safety and reduce crime.",
        "Department Head Title": "Chief of Police",
        "Appointed By": "Commission",
        "Overseen By": "Police Commission",
        "Priority": ""
      },
      {
        "Name": "Fire Department",
        "Type": "Department",
        "Description": "Provides fire suppression, emergency medical services, and disaster response.",
        "Department Head Title": "Fire Chief",
        "Appointed By": "Commission",
        "Overseen By": "Fire Commission",
        "Priority": ""
      },
      {
        "Name": "Human Services Agency",
        "Type": "Department",
        "Description": "Provides social services, welfare programs, and support for vulnerable populations.",
        "Department Head Title": "Executive Director",
        "Appointed By": "Commission",
        "Overseen By": "Human Services Commission",
        "Priority": ""
      },
      {
        "Name": "Recreation and Park Department",
        "Type": "Department",
        "Description": "Maintains and manages parks, playgrounds, recreation centers, and open spaces.",
        "Department Head Title": "General Manager",
        "Appointed By": "Commission",
        "Overseen By": "Recreation and Park Commission",
        "Priority": ""
      },
      {
        "Name": "Planning Department",
        "Type": "Department",
        "Description": "Manages land use, urban design, and long-term city planning initiatives.",
        "Department Head Title": "Director of Planning",
        "Appointed By": "Commission",
        "Overseen By": "Planning Commission",
        "Priority": ""
      },
      {
        "Name": "Ethics Department",
        "Type": "Department",
        "Description": "Enforces laws related to campaign finance, conflicts of interest, and governmental ethics.",
        "Department Head Title": "Executive Director",
        "Appointed By": "Commission",
        "Overseen By": "Ethics Commission",
        "Priority": ""
      }
    ],
    administrativeDepartments: [
      {
        "Name": "Office of the City Administrator",
        "Description": "Manages various administrative functions, internal services, and non-mayoral departments."
      },
      {
        "Name": "Controller's Office",
        "Description": "Serves as the chief accounting officer and auditor for the city, managing financial systems and conducting audits."
      },
      {
        "Name": "Office of Economic and Workforce Development",
        "Description": "Supports economic growth, workforce development, and business attraction and retention."
      }
    ]
  };

  // Constants for appointment structures
  const appointmentStructures = [
    'Mayor (1)',
    'Mayor (4), Board of Supervisors (3)',
    'Mayor (5)',
    'Mayor (7)',
    'Mayor (1), Board of Supervisors (1), District Attorney (1), City Attorney (1), Assessor-Recorder (1)'
  ];
  
  // Get data from our embedded data object
  const { commissions, departments, administrativeDepartments } = sfGovernmentData;
  
  // State for user selections
  const [selectedItems, setSelectedItems] = useState([]);
  
  // State for current selection
  const [currentCommission, setCurrentCommission] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState('');
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [currentHeadTitle, setCurrentHeadTitle] = useState('');
  
  // State for feedback
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
    administrativeDepartments[0].Name, // "Office of the City Administrator"
    administrativeDepartments[1].Name  // "Controller's Office"
  ];

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

  // State for revealing all commission answers
  const [revealCommissionAnswers, setRevealCommissionAnswers] = useState(false);

  // Reset the commissions/departments activity
  const resetActivity = () => {
    setSelectedItems([]);
    setCurrentCommission('');
    setCurrentAppointment('');
    setCurrentDepartment('');
    setCurrentHeadTitle('');
    setFeedback({ show: false, correct: false, message: '' });
    setRevealCommissionAnswers(false);
  };
  
  // Toggle reveal all commission answers
  const toggleRevealCommissionAnswers = () => {
    setRevealCommissionAnswers(!revealCommissionAnswers);
    
    if (!revealCommissionAnswers) {
      // Create a list of all correct pairings
      const allCorrectPairings = commissions.map(commission => {
        const department = departments.find(dept => dept['Overseen By'] === commission.Name);
        return {
          commission: commission.Name,
          appointment: commission['Appointed By'],
          department: department ? department.Name : 'N/A',
          headTitle: department ? department['Department Head Title'] : 'N/A'
        };
      }).slice(0, 5); // Only show 5 as required by the exercise
      
      setSelectedItems(allCorrectPairings);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-2">Commissions and Departments</h1>
      
      {/* Commissions and Departments Matching Section */}
      <h2 className="text-lg mb-6">Part 1: Select 5 commissions and match them with their appointment structure, the department they oversee, and the department head title.</h2>
      
      <div className="mb-4">
        <p className="mb-4 font-bold">
          {revealCommissionAnswers
            ? "Showing all correct answers."
            : isComplete 
              ? "Complete! You've correctly identified 5 commission/department pairs." 
              : `${selectedItems.length} of 5 selected. ${remainingCount} remaining.`}
        </p>
      </div>
      
      {!isComplete && (
        <div className="mb-6 p-4 border rounded shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-medium">
                1. Select a commission:
              </label>
              <select
                className="w-full p-2 border rounded"
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
            
            <div>
              <label className="block mb-2 font-medium">
                2. Select how this commission is appointed:
              </label>
              <select
                className="w-full p-2 border rounded"
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
            
            <div>
              <label className="block mb-2 font-medium">
                3. Select the department overseen by this commission:
              </label>
              <select
                className="w-full p-2 border rounded"
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
            
            <div>
              <label className="block mb-2 font-medium">
                4. Enter the title of the department head:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentHeadTitle}
                onChange={(e) => handleHeadTitleChange(e.target.value)}
                placeholder="Enter department head title"
                disabled={!currentDepartment}
              />
            </div>
            
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              onClick={checkAnswer}
              disabled={isComplete}
            >
              Check Answer
            </button>
          </div>
          
          {feedback.show && (
            <div className={`mt-3 p-3 rounded ${feedback.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}
      
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetActivity}
        >
          Start Over
        </button>
        
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={toggleRevealCommissionAnswers}
        >
          {revealCommissionAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </button>
      </div>
      
      {/* Selected Items List */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Your Selections:</h3>
        {selectedItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border bg-gray-100">Commission</th>
                  <th className="p-2 border bg-gray-100">Appointment</th>
                  <th className="p-2 border bg-gray-100">Department</th>
                  <th className="p-2 border bg-gray-100">Department Head</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{item.commission}</td>
                    <td className="p-2 border">{item.appointment}</td>
                    <td className="p-2 border">{item.department}</td>
                    <td className="p-2 border">{item.headTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="italic">None selected yet</p>
        )}
      </div>
      
      {/* Administrative Departments Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Part 2: Administrative Departments</h2>
      <h3 className="mb-4">Please name the two departments that report directly to the Mayor that do not have an oversight commission. The third is the Office of Economic and Workforce Development.</h3>
      
      <div className="mb-6 p-4 border rounded shadow-sm">
        <div className="mb-4">
          <label className="block mb-2 font-medium">First department:</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              value={departmentOne}
              onChange={(e) => setDepartmentOne(e.target.value)}
              placeholder="Enter department name"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => checkAdminDept(departmentOne, 0)}
            >
              Check Answer
            </button>
          </div>
          
          {feedbackOne.show && (
            <div className={`mt-2 p-2 rounded ${feedbackOne.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedbackOne.message}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Second department:</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              value={departmentTwo}
              onChange={(e) => setDepartmentTwo(e.target.value)}
              placeholder="Enter department name"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => checkAdminDept(departmentTwo, 1)}
            >
              Check Answer
            </button>
          </div>
          
          {feedbackTwo.show && (
            <div className={`mt-2 p-2 rounded ${feedbackTwo.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedbackTwo.message}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={checkAllAdminDepts}
          >
            Check Both Answers
          </button>
          
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={toggleRevealAnswers}
          >
            {revealAnswers ? 'Hide Answers' : 'Reveal Answers'}
          </button>
          
          {(feedbackOne.show || feedbackTwo.show) && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={resetAdminDepts}
            >
              Reset
            </button>
          )}
        </div>
        
        {revealAnswers && (
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <p><strong>Correct answers:</strong></p>
            <ol className="list-decimal pl-5">
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