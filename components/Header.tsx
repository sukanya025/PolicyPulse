import React from 'react';
import { ShieldCheck, Search, CheckCircle } from 'lucide-react';
import Button from './Button';

interface HeaderProps {
  currentView?: 'analysis' | 'finder';
  onNavigate?: (view: 'analysis' | 'finder') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView = 'analysis', onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-gov-900 p-1.5 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gov-900 tracking-tight">PolicyPulse</span>
          </div>

          {/* Navigation */}
          {onNavigate && (
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => onNavigate('analysis')}
                className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentView === 'analysis' 
                    ? 'bg-white text-gov-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify Scheme
              </button>
              <button
                onClick={() => onNavigate('finder')}
                className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentView === 'finder' 
                    ? 'bg-white text-gov-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Search className="w-4 h-4 mr-2" />
                Find Eligible Schemes
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;