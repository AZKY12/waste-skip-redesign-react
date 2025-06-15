import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building, Home, Leaf, Building2, Check, Info } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import StepIndicator from './StepIndicator';

const wasteTypes = [
  {
    id: 'construction',
    name: 'Construction Waste',
    description: 'Building materials and renovation debris.',
    icon: Building
  },
  {
    id: 'household',
    name: 'Household Waste',
    description: 'General household items and furniture.',
    icon: Home
  },
  {
    id: 'garden',
    name: 'Garden Waste',
    description: 'Green waste and landscaping materials',
    icon: Leaf
  },
  {
    id: 'commercial',
    name: 'Commercial Waste',
    description: 'Business and office clearance',
    icon: Building2
  }
];

const WasteTypeStep: React.FC = () => {
  const { bookingData, updateWasteTypes, setCurrentStep } = useBooking();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(bookingData.wasteTypes);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleContinue = () => {
    updateWasteTypes(selectedTypes);
    setCurrentStep('skip-size');
  };

  const handleBack = () => {
    setCurrentStep('postcode');
  };

  const getSelectedTypeNames = () => {
    return selectedTypes.map(id => 
      wasteTypes.find(type => type.id === id)?.name
    ).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <StepIndicator currentStep="waste-type" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            What type of waste are you disposing of?
          </h1>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-blue-200 text-sm">
            Select all that apply
          </p>
        </div>

        {/* Waste Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {wasteTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedTypes.includes(type.id);
            
            return (
              <button
                key={type.id}
                onClick={() => handleTypeToggle(type.id)}
                className={`relative p-6 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-blue-500' : 'bg-gray-700'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Types Summary */}
        {selectedTypes.length > 0 && (
          <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold mb-2">Selected Waste Types</h3>
            <p className="text-gray-300 text-sm">
              {getSelectedTypeNames().join(', ')}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={selectedTypes.length === 0}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WasteTypeStep;