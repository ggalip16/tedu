import React from 'react';
import { View } from '../types';
import { ChatIcon, CalendarIcon, FlagIcon, PresentationChartLineIcon } from './icons/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
  label: string;
  viewName: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-accent text-white'
          : 'text-muted hover:bg-secondary hover:text-light'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: 'ai-chat', label: 'AI Assistant', icon: <ChatIcon /> },
    { view: 'schedule', label: 'Schedule', icon: <CalendarIcon /> },
    { view: 'events', label: 'Upcoming Events', icon: <FlagIcon /> },
    { view: 'tracker', label: 'Progress Tracker', icon: <PresentationChartLineIcon /> },
  ];

  return (
    <aside className="w-64 bg-secondary flex-shrink-0 p-6 flex flex-col">
      <div className="flex items-center mb-10">
        <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center font-bold text-white text-lg">
          t
        </div>
        <h1 className="text-2xl font-bold ml-3 text-light">ted.ai</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            viewName={item.view}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view as View)}
          />
        ))}
      </nav>
      <div className="mt-auto text-center text-muted text-xs">
        <p>&copy; 2024 TED University</p>
        <p>Your helpful AI librarian.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
