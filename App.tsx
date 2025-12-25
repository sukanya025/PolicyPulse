import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CaseAnalysis from './components/CaseAnalysis';
import SchemeFinder from './components/SchemeFinder';

const App: React.FC = () => {
  const [view, setView] = useState<'analysis' | 'finder'>('analysis');

  return (
    <div className="min-h-screen bg-white">
      <Header currentView={view} onNavigate={setView} />
      <main>
        {view === 'analysis' ? <CaseAnalysis /> : <SchemeFinder />}
      </main>
      <Footer />
    </div>
  );
};

export default App;