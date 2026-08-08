import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { MainApp } from './pages/MainApp';
import { TabView } from './components/Dashboard/HeaderNav';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [initialAppTab, setInitialAppTab] = useState<TabView>('digitalTwin');
  const [autoLaunchDemo, setAutoLaunchDemo] = useState(false);

  const handleLaunchApp = (tab: TabView = 'dashboard') => {
    setInitialAppTab(tab);
    setCurrentView('app');
  };

  if (currentView === 'landing') {
    return (
      <LandingPage
        onLaunchApp={() => handleLaunchApp('digitalTwin')}
        onExploreDigitalTwin={() => handleLaunchApp('digitalTwin')}
        onOpenDemoMode={() => {
          setAutoLaunchDemo(true);
          handleLaunchApp('dashboard');
        }}
      />
    );
  }

  return <MainApp initialTab={initialAppTab} />;
}

export default App;
