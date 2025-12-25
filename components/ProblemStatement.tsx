import React from 'react';
import { Search, FileWarning, AlertTriangle, FileQuestion } from 'lucide-react';

const problems = [
  {
    icon: Search,
    title: 'Manual Policy Search',
    description: 'Officers spend hours digging through PDFs, physical files, and fragmented databases to find relevant clauses.',
  },
  {
    icon: FileWarning,
    title: 'Outdated Information',
    description: 'Frequent amendments lead to decisions based on obsolete rules, causing compliance risks.',
  },
  {
    icon: AlertTriangle,
    title: 'Inconsistent Answers',
    description: 'Citizens receive different answers from different counters due to varying interpretations of complex rules.',
  },
  {
    icon: FileQuestion,
    title: 'Lack of Transparency',
    description: 'Rejections often lack clear, cited reasons, leading to disputes and lower public trust.',
  },
];

const ProblemStatement: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">The Challenge</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gov-900 sm:text-4xl">
            Government services are slowed down by information silos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Traditional methods of policy retrieval are manual, error-prone, and inefficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="relative group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity blur-xl"></div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gov-900 mb-2">{problem.title}</h3>
              <p className="text-base text-gray-500">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;