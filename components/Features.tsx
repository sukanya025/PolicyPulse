import React from 'react';
import { Database, SearchCheck, CheckCircle2, MessageSquareText, FileText } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Intelligent Context Input',
    description: 'Input complete case details including age, income, category, and location to get precise applicability.',
    icon: Database,
  },
  {
    title: 'Instant Policy Retrieval',
    description: 'AI scans thousands of documents in milliseconds to find the exact regulation matching the case.',
    icon: SearchCheck,
  },
  {
    title: 'Verified Citations',
    description: 'Every answer is backed by direct links to the official document, page number, and clause.',
    icon: FileText,
  },
  {
    title: 'Decision Support',
    description: 'Receive clear "Eligible" or "Not Eligible" recommendations with detailed reasoning.',
    icon: CheckCircle2,
  },
  {
    title: 'Natural Language Query',
    description: 'Ask complex questions like "Can a single mother apply if income is $45k?" and get plain answers.',
    icon: MessageSquareText,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gov-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Key Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gov-900 sm:text-4xl">
            Built for accuracy and speed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            PolicyPulse combines advanced Natural Language Processing with strict verified retrieval to ensure zero hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gov-900 text-white mb-6">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gov-900 mb-3">{feature.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed flex-grow">{feature.description}</p>
            </div>
          ))}
          {/* Last card call to action style */}
          <div className="flex flex-col justify-center items-center bg-blue-600 rounded-lg shadow-sm p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-3">Ready to modernize?</h3>
            <p className="text-blue-100 mb-6">Join verified government agencies using PolicyPulse today.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;