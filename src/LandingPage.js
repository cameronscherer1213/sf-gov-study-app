import React, { useState } from 'react';
import './LandingPage.css';
import HierarchyOfLawSection from './HierarchyOfLawSection';
import ElectedOfficialsSection from './ElectedOfficialsSection';
import CombinedCommissionsDepartments from './CombinedCommissionsDepartments';
import BudgetSection from './BudgetSection';
import LandUseSection from './LandUseSection';
import CitizenReviewSection from './CitizenReviewSection';
import IntergovernmentalBodiesSection from './IntergovernmentalBodiesSection';
import RecallableOfficialsSection from './RecallableOfficialsSection';
import SFHistoryFlashcards from './PoliticalHistoryFlashcardsSection';
import SFChronologyQuiz from './PoliticalHistoryTimelineSection';
import DistrictMapSection from './DistrictMapSection';
import GovernmentLawSection from './GovernmentLawSection';
// Make sure these files exist in your project directory
import LegislativeFlashcardsSection from './LegislativeFlashcardsSection.js';
import LandUseFlashcardsSection from './LandUseFlashcardsSection.js';

const LandingPage = () => {
  const [currentSection, setCurrentSection] = useState('home');

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
      case 'landuse':
        return <LandUseSection />;
      case 'citizen':
        return <CitizenReviewSection />;
      case 'intergovernmental':
        return <IntergovernmentalBodiesSection />;
      case 'recallable':
        return <RecallableOfficialsSection />;
      case 'history-flashcards':
        return <SFHistoryFlashcards />;
      case 'history-timeline':
        return <SFChronologyQuiz />;
      case 'district-map':
        return <DistrictMapSection />;
      case 'government-law':
        return <GovernmentLawSection />;
      case 'legislative-flashcards':
        return <LegislativeFlashcardsSection />;
      case 'landuse-flashcards':
        return <LandUseFlashcardsSection />;
      default:
        return (
          <div className="home-content">
            <h1 className="main-title">SF Government 101 Study Guide</h1>
            <p className="intro-text">
              Welcome to your interactive study guide for the SF Government 101 final exam. Choose
              a topic below to test your knowledge and prepare for the exam.
            </p>
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

  // Topics data
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
      title: 'SF Budget Quiz',
      description: 'Test your knowledge of San Francisco\'s budget amounts and components.'
    },
    {
      id: 'landuse',
      title: 'Land Use',
      description: 'Identify the primary documents that dictate San Francisco\'s land use policy.'
    },
    {
      id: 'citizen',
      title: 'Citizen Review',
      description: 'Name the bodies that allow citizens to advocate and hold government accountable.'
    },
    {
      id: 'intergovernmental',
      title: 'Intergovernmental Bodies',
      description: 'Identify key drivers at the federal, state, and regional levels affecting local government.'
    },
    {
      id: 'recallable',
      title: 'Recallable Officials',
      description: 'Select which elected officials in San Francisco can be recalled by voters.'
    }
  ];

  // History topics data
  const historyTopics = [
    {
      id: 'history-flashcards',
      title: 'Political History Flashcards',
      description: 'Test your knowledge of key events in San Francisco\'s political history with interactive flashcards.'
    },
    {
      id: 'history-timeline',
      title: 'Political History Timeline',
      description: 'Arrange significant events in chronological order to understand the evolution of San Francisco\'s government structure.'
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
    }
  ];

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-content">
          <h1 
            className="nav-title"
            onClick={() => setCurrentSection('home')}
          >
            SF Gov Study App
          </h1>
          <div className="nav-buttons">
            {currentSection !== 'home' && (
              <button 
                className="back-button"
                onClick={() => setCurrentSection('home')}
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default LandingPage;