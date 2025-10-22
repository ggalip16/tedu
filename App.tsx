
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AiChat from './components/AiChat';
import Schedule from './components/Schedule';
import Tracker from './components/Tracker';
import UpcomingEvents from './components/UpcomingEvents';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('ai-chat');

  const renderContent = () => {
    switch (currentView) {
      case 'schedule':
        return <Schedule />;
      case 'events':
        return <UpcomingEvents />;
      case 'tracker':
        return <Tracker />;
      case 'ai-chat':
      default:
        return <AiChat />;
    }
  };

  return (
    <div className="flex h-screen bg-primary font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
