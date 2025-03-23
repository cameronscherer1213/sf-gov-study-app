import React from 'react';
import './GovernmentLawSection.css';

const LawHierarchyVisualization = () => {
  return (
    <div className="p-4 border rounded shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Law Hierarchy Visualization</h3>
      
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-2xl">
          {/* Federal level */}
          <div className="bg-blue-100 p-3 rounded-lg mb-2 border border-blue-200">
            <h4 className="font-bold text-blue-800">Federal Law</h4>
            <div className="mt-2 grid grid-cols-1 gap-1">
              <div className="bg-blue-50 p-2 rounded border border-blue-300">
                <span className="font-medium">U.S. Constitution</span>
                <span className="block text-sm text-gray-600">Highest law, outlines form and function</span>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-300">
                <span className="font-medium">U.S. Code</span>
                <span className="block text-sm text-gray-600">Statutory law passed by Congress</span>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-300">
                <span className="font-medium">Code of Federal Regulation</span>
                <span className="block text-sm text-gray-600">Administrative law by executive agencies</span>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-300">
                <span className="font-medium">SCOTUS Opinions</span>
                <span className="block text-sm text-gray-600">Case law (judicial interpretation)</span>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center my-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* State level */}
          <div className="bg-green-100 p-3 rounded-lg mb-2 border border-green-200">
            <h4 className="font-bold text-green-800">State Law</h4>
            <div className="mt-2 grid grid-cols-1 gap-1">
              <div className="bg-green-50 p-2 rounded border border-green-300">
                <span className="font-medium">California Constitution</span>
                <span className="block text-sm text-gray-600">Highest state law</span>
              </div>
              <div className="bg-green-50 p-2 rounded border border-green-300">
                <span className="font-medium">California Code</span>
                <span className="block text-sm text-gray-600">Statutory law passed by state legislature</span>
              </div>
              <div className="bg-green-50 p-2 rounded border border-green-300">
                <span className="font-medium">California Code of Regulations</span>
                <span className="block text-sm text-gray-600">Administrative law by state agencies</span>
              </div>
              <div className="bg-green-50 p-2 rounded border border-green-300">
                <span className="font-medium">California Supreme Court Opinions</span>
                <span className="block text-sm text-gray-600">State case law</span>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center my-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* Local level */}
          <div className="bg-amber-100 p-3 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-800">San Francisco Local Law</h4>
            <div className="mt-2 grid grid-cols-1 gap-1">
              <div className="bg-amber-50 p-2 rounded border border-amber-300">
                <span className="font-medium">San Francisco Charter</span>
                <span className="block text-sm text-gray-600">Local constitution (Statutory)</span>
              </div>
              <div className="bg-amber-50 p-2 rounded border border-amber-300">
                <span className="font-medium">Administrative/Police Code & Ordinances</span>
                <span className="block text-sm text-gray-600">Local statutes</span>
              </div>
              <div className="bg-amber-50 p-2 rounded border border-amber-300">
                <span className="font-medium">Department Rules & Executive Directives</span>
                <span className="block text-sm text-gray-600">Local administrative law</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p className="italic">Note: Higher laws in the hierarchy supersede lower laws when in conflict.</p>
        </div>
      </div>
    </div>
  );
};

export default LawHierarchyVisualization;