import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { MapView } from './components/dashboard/MapView';
import { ReportForm } from './components/report/ReportForm';
import { DepartmentLeaderboard } from './components/leaderboard/DepartmentLeaderboard';
import { NewsFeed } from './components/news/NewsFeed';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MapView />;
      case 'report':
        return <ReportForm />;
      case 'leaderboard':
        return <DepartmentLeaderboard />;
      case 'news':
        return <NewsFeed />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;