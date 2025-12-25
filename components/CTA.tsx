import React from 'react';
import Button from './Button';

const CTA: React.FC = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gov-900 sm:text-4xl mb-4">
          Experience faster and smarter government service delivery.
        </h2>
        <p className="text-xl text-gray-500 mb-8">
          Join the agencies transforming their workflow with PolicyPulse.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg">Start Using PolicyPulse</Button>
          <Button variant="outline" size="lg">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;