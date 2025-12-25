import React from 'react';
import { ChevronRight, PlayCircle, ShieldCheck } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onNavigate: (view: 'landing' | 'analysis') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gov-50/50 z-0">
        <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/2 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 0 L50 100 L100 0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              New: Real-time Eligibility Verification
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gov-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Smart Policy Guidance for</span>
              <span className="block text-blue-600">Government Services</span>
            </h1>
            <p className="mt-4 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Instantly retrieve accurate government policies and eligibility rules with verified sources—no manual searching. Empowering officers with AI-driven clarity.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="shadow-lg shadow-blue-900/10" onClick={() => onNavigate('analysis')}>
                Start Case Analysis
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center">
                <PlayCircle className="mr-2 h-5 w-5 text-gray-500" />
                View Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">Trusted by 10+ Agencies • SOC2 Compliant • 99.9% Uptime</p>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md bg-white border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-2 text-xs text-gray-400 font-mono">policypulse.sys</div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue-700">OF</span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-sm text-gray-700">
                            Check eligibility for "Senior Citizen Housing Scheme 2024" for a 62-year-old applicant with $35k income.
                        </div>
                    </div>
                     <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-gov-900 flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-blue-50 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-gray-800 border border-blue-100 shadow-sm">
                            <p className="font-semibold text-blue-900 mb-1">✅ Eligible</p>
                            <p className="mb-2">The applicant qualifies based on:</p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600 text-xs">
                                <li>Age: &gt; 60 years (Section 4.1)</li>
                                <li>Income: &lt; $40k/year (Section 4.2b)</li>
                            </ul>
                            <div className="mt-2 pt-2 border-t border-blue-100 text-xs text-blue-500 font-medium">
                                Source: Housing Act 2024, Pg 12
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;