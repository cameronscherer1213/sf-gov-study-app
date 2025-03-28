import React, { useState, useEffect } from 'react';
import './LandingPage.css';
// Removed Hierarchy of Law section import
import ElectedOfficialsSection from './ElectedOfficialsSection';
import CombinedCommissionsDepartments from './CombinedCommissionsDepartments';
import BudgetSection from './BudgetSection';
import RecallableOfficialsSection from './RecallableOfficialsSection';
import SFChronologyQuiz from './PoliticalHistoryTimelineSection';
import LandUseChronologyQuiz from './LandUseTimelineSection';
import DistrictMapSection from './DistrictMapSection';
import GovernmentLawSection from './GovernmentLawSection';
// Make sure these files exist in your project directory
import LegislativeFlashcardsSection from './LegislativeFlashcardsSection.js';
import LandUseFlashcardsSection from './LandUseFlashcardsSection.js';
// Import the new Key Influences flashcards component
import KeyInfluencesFlashcardsSection from './KeyInfluencesFlashcardsSection.js';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Handle initial fade-in and section changes
  useEffect(() => {
    // Reset animation state when section changes
    setFadeIn(false);
    
    // Set timeout to allow animation to play
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    
    return () => clearTimeout(timer); // Clean up timer
  }, [currentSection]); // Run when section changes

  // Function to navigate to a section
  const navigateTo = (section) => {
    setCurrentSection(section);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  // Function to get the icon path based on component type
  const getIconPath = (componentType) => {
    switch (componentType) {
      case 'quiz':
        return '/sfgov-quiz.png';
      case 'flashcard':
        return '/sfgov-flashcards.png';
      case 'timeline':
        return '/sfgov-timeline.png';
      default:
        return null;
    }
  };

  // Function to render the current section
  const renderSection = () => {
    switch (currentSection) {
      case 'elected':
        return <ElectedOfficialsSection navigateTo={navigateTo} />;
      case 'commissions':
        return <CombinedCommissionsDepartments navigateTo={navigateTo} />;
      case 'budget':
        return <BudgetSection navigateTo={navigateTo} />;
      case 'recallable':
        return <RecallableOfficialsSection navigateTo={navigateTo} />;
      case 'history-timeline':
        return <SFChronologyQuiz navigateTo={navigateTo} />;
      case 'landuse-timeline':
        return <LandUseChronologyQuiz navigateTo={navigateTo} />;
      case 'district-map':
        return <DistrictMapSection navigateTo={navigateTo} />;
      case 'government-law':
        return <GovernmentLawSection navigateTo={navigateTo} />;
      case 'legislative-flashcards':
        return <LegislativeFlashcardsSection navigateTo={navigateTo} />;
      case 'landuse-flashcards':
        return <LandUseFlashcardsSection navigateTo={navigateTo} />;
      case 'key-influences-flashcards':
        return <KeyInfluencesFlashcardsSection navigateTo={navigateTo} />;
      default:
        return (
          <div className={`home-content ${fadeIn ? 'fade-in' : ''}`}>
            <p className="intro-text">
              Welcome to your San Francisco municipal government interactive study guide. 
              Choose a topic below to test your knowledge about the city's government structure,
              elected officials, and political processes.
            </p>
            
            <h1 className="main-title">Branches of Government</h1>
            <div className="topics-grid">
              {branchesOfGovTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => navigateTo(topic.id)}
                >
                  <div className="topic-card-header">
                    <h2 className="topic-title">{topic.title}</h2>
                    {topic.componentType && (
                      <img 
                        src={getIconPath(topic.componentType)} 
                        alt={`${topic.componentType} icon`}
                        className="topic-icon"
                      />
                    )}
                  </div>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* Law & The Legislative Process Section */}
            <h1 className="main-title">Law & The Legislative Process</h1>
            <div className="topics-grid">
              {legislativeTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => navigateTo(topic.id)}
                >
                  <div className="topic-card-header">
                    <h2 className="topic-title">{topic.title}</h2>
                    {topic.componentType && (
                      <img 
                        src={getIconPath(topic.componentType)} 
                        alt={`${topic.componentType} icon`}
                        className="topic-icon"
                      />
                    )}
                  </div>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* Planning & Land Use Section */}
            <h1 className="main-title">Planning & Land Use</h1>
            <div className="topics-grid">
              {landUseTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => navigateTo(topic.id)}
                >
                  <div className="topic-card-header">
                    <h2 className="topic-title">{topic.title}</h2>
                    {topic.componentType && (
                      <img 
                        src={getIconPath(topic.componentType)} 
                        alt={`${topic.componentType} icon`}
                        className="topic-icon"
                      />
                    )}
                  </div>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Branches of Government topics
  const branchesOfGovTopics = [
    {
      id: 'elected',
      title: 'Elected Officials',
      description: 'Test your knowledge of San Francisco\'s elected officials and their roles.',
      componentType: 'quiz'
    },
    {
      id: 'commissions',
      title: 'Commissions & Departments',
      description: 'Test your knowledge of San Francisco\'s commissions, their appointment structures, and the departments they oversee.',
      componentType: 'quiz'
    },
    {
      id: 'district-map',
      title: 'District Map & Supervisors',
      description: 'Test your knowledge of San Francisco\'s districts and the elected officials who represent them.',
      componentType: 'quiz'
    },
    {
      id: 'recallable',
      title: 'Recallable Officials',
      description: 'Select which elected officials in San Francisco can be recalled by voters.',
      componentType: 'quiz'
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Test your knowledge of San Francisco\'s budget amounts and categories for the 2024 - 2025 fiscal year.',
      componentType: 'quiz'
    },
    {
      id: 'key-influences-flashcards',
      title: 'Key Influences Flashcards',
      description: 'Review some of the key external drivers and influences on San Francisco government and policy.',
      componentType: 'flashcard'
    }
  ];

  // Law & The Legislative Process topics
  const legislativeTopics = [
    {
      id: 'history-timeline',
      title: 'Political History Timeline',
      description: 'Arrange significant constitutional and structural events in chronological order to understand the evolution of San Francisco\'s government structure.',
      componentType: 'timeline'
    },
    {
      id: 'government-law',
      title: 'Government Law',
      description: 'Match each type of law with its definition and provide the corresponding examples at federal, state, and local levels. Select the key laws that pertain to local governance.',
      componentType: 'quiz'
    },
    {
      id: 'legislative-flashcards',
      title: 'Legislative Process Flashcards',
      description: 'Review key concepts about San Francisco\'s legislative processes.',
      componentType: 'flashcard'
    }
  ];
  
  // Land Use topics data with component types (no changes)
  const landUseTopics = [
  {
    id: 'landuse-timeline',
    title: 'Land Use Timeline',
    description: 'Arrange significant land use and planning events in chronological order to understand the evolution of San Francisco\'s urban development approach.',
    componentType: 'timeline'
  },
  {
    id: 'landuse-flashcards',
    title: 'Land Use Flashcards',
    description: 'Review key concepts about San Francisco\'s planning and land use policies with interactive flashcards.',
    componentType: 'flashcard'
  }
];

  // Resources data
  const resources = [
    {
      name: "CivLab",
      url: "https://sfgov.civlab.org/"
    },
    {
      name: "San Francisco Charter",
      url: "https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_charter/0-0-0-52610"
    },
    {
      name: "San Francisco Board of Supervisors",
      url: "https://sfbos.org/"
    },
    {
      name: "Legistar",
      url: "https://sfgov.legistar.com/Legislation.aspx"
    },
    {
      name: "Municipal Code",
      url: "https://codelibrary.amlegal.com/codes/san_francisco/latest/overview"
    }
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Group all topics for the sidebar
  const allTopics = [
    { title: "Branches of Government", items: branchesOfGovTopics },
    { title: "Law & The Legislative Process", items: legislativeTopics },
    { title: "Planning & Land Use", items: landUseTopics }
  ];

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-content">
          <button 
            className="menu-toggle" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          <div className="nav-logo-section" onClick={() => navigateTo('home')}>
            <img src="/sfgov-logo.png" alt="San Francisco Government Logo" className="nav-logo" />
            <h1 className="nav-title">
              Civic Compass SF
            </h1>
          </div>
          
          <div className="nav-buttons">
            {currentSection !== 'home' && (
              <button 
                className="back-button"
                onClick={() => navigateTo('home')}
                aria-label="Back to home page"
              >
                <span className="back-button-text">Back to Home</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Navigation Section - Moved to top */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Navigation</h2>
            <ul className="sidebar-links">
              <li className="sidebar-link-item">
                <span
                  className={`sidebar-link ${currentSection === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </span>
              </li>
            </ul>
          </div>
          
          {/* Topic sections */}
          {allTopics.map((group, groupIndex) => (
            <div key={groupIndex} className="sidebar-section">
              <h2 className="sidebar-title">{group.title}</h2>
              <ul className="sidebar-links">
                {group.items.map((item) => (
                  <li key={item.id} className="sidebar-link-item">
                    <span
                      className={`sidebar-link ${currentSection === item.id ? 'active' : ''}`}
                      onClick={() => navigateTo(item.id)}
                    >
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Resources Section */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">Resources</h2>
            <ul className="sidebar-links">
              {resources.map((resource, index) => (
                <li key={index} className="sidebar-link-item">
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Attribution */}
          <div className="sidebar-attribution">
            Cameron Scherer (2025)
          </div>
        </aside>

        {/* Main Content */}
        <main className={`main-content ${fadeIn ? 'fade-in' : ''}`}>
          {renderSection()}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">San Francisco Government Study Guide &copy; {new Date().getFullYear()}</p>
          <p className="text-xs text-gray-300 mt-1">
            Created for educational purposes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;