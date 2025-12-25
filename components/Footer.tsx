import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ShieldCheck className="h-6 w-6 text-gov-900" />
            <span className="font-bold text-xl text-gov-900">PolicyPulse</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Contact</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center md:text-left">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} PolicyPulse. All rights reserved. Designed for Government Services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;