import React, { useState } from 'react';
import './LandingPage.css';
import HierarchyOfLawSection from './HierarchyOfLawSection';
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

  // Function to render the current section
  const renderSection = () => {
    switch (currentSection) {
      case 'hierarchy':
        return <HierarchyOfLawSection />;
      case 'elected':
        return <ElectedOfficialsSection />;
      case 'commissions':
        return <CombinedCommissionsDepartments />;
      case 'budget':
        return <BudgetSection />;
      case 'recallable':
        return <RecallableOfficialsSection />;
      case 'history-timeline':
        return <SFChronologyQuiz />;
      case 'landuse-timeline':
        return <LandUseChronologyQuiz />;
      case 'district-map':
        return <DistrictMapSection />;
      case 'government-law':
        return <GovernmentLawSection />;
      case 'legislative-flashcards':
        return <LegislativeFlashcardsSection />;
      case 'landuse-flashcards':
        return <LandUseFlashcardsSection />;
      case 'key-influences-flashcards':
        return <KeyInfluencesFlashcardsSection />;
      default:
        return (
          <div className="home-content">
            <p className="intro-text">
              Welcome to your San Francisco municipal government interactive study guide. Choose a topic below to test your knowledge.
            </p>
            <h1 className="main-title">San Francisco Political Map: Major Players and Ideas</h1>
            <div className="topics-grid">
              {topics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => setCurrentSection(topic.id)}
                >
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* San Francisco Political History Section */}
            <h1 className="main-title" style={{ marginTop: '3rem' }}>San Francisco Political History</h1>
            <div className="topics-grid">
              {historyTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => setCurrentSection(topic.id)}
                >
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* San Francisco Legislative Process Section */}
            <h1 className="main-title" style={{ marginTop: '3rem' }}>San Francisco Legislative Process</h1>
            <div className="topics-grid">
              {legislativeTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => setCurrentSection(topic.id)}
                >
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* San Francisco District Map & Supervisors Section */}
            <h1 className="main-title" style={{ marginTop: '3rem' }}>San Francisco District Map & Supervisors</h1>
            <div className="topics-grid">
              {districtTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => setCurrentSection(topic.id)}
                >
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
            
            {/* San Francisco Planning and Land Use Section */}
            <h1 className="main-title" style={{ marginTop: '3rem' }}>San Francisco Planning and Land Use</h1>
            <div className="topics-grid">
              {landUseTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="topic-card"
                  onClick={() => setCurrentSection(topic.id)}
                >
                  <h2 className="topic-title">{topic.title}</h2>
                  <p className="topic-description">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Topics data with new Key Influences topic added
  const topics = [
    {
      id: 'hierarchy',
      title: 'Hierarchy of Law',
      description: 'Learn about the relationships between federal, state, and local laws.'
    },
    {
      id: 'elected',
      title: 'Elected Officials',
      description: 'Test your knowledge of San Francisco\'s elected officials and their roles.'
    },
    {
      id: 'commissions',
      title: 'Commissions & Departments',
      description: 'Learn about commissions, their appointment structures, and the departments they oversee.'
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Test your knowledge of San Francisco\'s budget amounts and components.'
    },
    {
      id: 'recallable',
      title: 'Recallable Officials',
      description: 'Select which elected officials in San Francisco can be recalled by voters.'
    },
    {
      id: 'key-influences-flashcards',
      title: 'Key Influences Flashcards',
      description: 'Review the key drivers and influences on San Francisco government and policy.'
    }
  ];

  // History topics data
  const historyTopics = [
    {
      id: 'history-timeline',
      title: 'Political History Timeline',
      description: 'Arrange significant constitutional and structural events in chronological order to understand the evolution of San Francisco\'s government structure.'
    }
  ];

  // Legislative Process topics data
  const legislativeTopics = [
    {
      id: 'government-law',
      title: 'Government Law',
      description: 'Test your knowledge of different types of law at federal, state, and local levels.'
    },
    {
      id: 'legislative-flashcards',
      title: 'Legislative Flashcards',
      description: 'Review key concepts about San Francisco\'s legislative process with interactive flashcards.'
    }
  ];

  // District Map topics data
  const districtTopics = [
    {
      id: 'district-map',
      title: 'District Map & Supervisors',
      description: 'Learn about San Francisco\'s districts and the supervisors who represent them.'
    }
  ];
  
  // Land Use topics data
  const landUseTopics = [
    {
      id: 'landuse-flashcards',
      title: 'Land Use Flashcards',
      description: 'Review key concepts about San Francisco\'s planning and land use policies with interactive flashcards.'
    },
    {
      id: 'landuse-timeline',
      title: 'Land Use Timeline',
      description: 'Arrange significant land use and planning events in chronological order to understand the evolution of San Francisco\'s urban development approach.'
    }
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigate to a section and close sidebar on mobile
  const navigateTo = (section) => {
    setCurrentSection(section);
    setSidebarOpen(false);
  };

  // Group all topics for the sidebar
  const allTopics = [
    { title: "Main Topics", items: topics },
    { title: "Political History", items: historyTopics },
    { title: "Legislative Process", items: legislativeTopics },
    { title: "District Map", items: districtTopics },
    { title: "Planning and Land Use", items: landUseTopics }
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
          <h1 
            className="nav-title"
            onClick={() => navigateTo('home')}
          >
            San Francisco Government Interactive Study Guide
          </h1>
          <div className="nav-buttons">
            {currentSection !== 'home' && (
              <button 
                className="back-button"
                onClick={() => navigateTo('home')}
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default LandingPage;