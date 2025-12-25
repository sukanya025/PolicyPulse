import React from 'react';

const stats = [
  { label: 'Reduction in Research Time', value: '75%' },
  { label: 'Decision Accuracy', value: '99%' },
  { label: 'Officer Satisfaction', value: '4.8/5' },
];

const Impact: React.FC = () => {
  return (
    <section id="impact" className="bg-gov-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
              Empowering Better Governance
            </h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              PolicyPulse isn't just a search engine; it's a decision support system that builds trust between the government and its citizens. By ensuring every answer is consistent and verifiable, we remove ambiguity from public service.
            </p>
            <ul className="space-y-4">
              {[
                'Reduced case handling time',
                'Minimized human error in eligibility checks',
                'Improved transparency in decision making',
                'Consistent policy interpretation across departments'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-gov-800 p-6 rounded-lg border border-gov-700 ${index === 2 ? 'sm:col-span-2' : ''}`}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-gray-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;