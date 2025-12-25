import React from 'react';
import { User, Cpu, FileCheck } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Enter Case Details',
    description: 'Officer inputs applicant data (e.g., demographics, income) and selects the relevant scheme or service domain.',
    icon: User,
  },
  {
    id: 2,
    title: 'AI Analysis & Retrieval',
    description: 'PolicyPulse analyzes the context against the latest policy database, filtering for relevant eligibility rules.',
    icon: Cpu,
  },
  {
    id: 3,
    title: 'Decision & Explanation',
    description: 'System outputs a clear decision (Eligible/Not Eligible) with specific citations and next steps.',
    icon: FileCheck,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gov-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-gray-500">Streamlining complex decisions into three simple steps.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" aria-hidden="true"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center bg-white p-4">
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white border-4 border-blue-100 shadow-sm mb-6">
                  <step.icon className="h-8 w-8 text-blue-600" />
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gov-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gov-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;