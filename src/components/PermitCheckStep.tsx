import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Truck, AlertTriangle, Clock } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import StepIndicator from './StepIndicator';

const PermitCheckStep: React.FC = () => {
  const { bookingData, updatePlacement, setCurrentStep } = useBooking();
  const [selectedPlacement, setSelectedPlacement] = useState<'private' | 'public'>(bookingData.placement);

  const handlePlacementSelect = (placement: 'private' | 'public') => {
    setSelectedPlacement(placement);
    updatePlacement(placement);
  };

  const handleContinue = () => {
    setCurrentStep('date-selection');
  };

  const handleBack = () => {
    setCurrentStep('skip-size');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <StepIndicator currentStep="permit" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Where will the skip be placed?
          </h1>
          <p className="text-gray-400 text-lg">
            This helps us determine if you need a permit for your skip
          </p>
        </div>

        {/* Placement Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Private Property */}
          <button
            onClick={() => handlePlacementSelect('private')}
            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
              selectedPlacement === 'private'
                ? 'border-gray-500 bg-gray-800/50'
                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${
                selectedPlacement === 'private' ? 'bg-gray-600' : 'bg-gray-700'
              }`}>
                <Home className="w-6 h-6 text-blue-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Private Property</h3>
                <p className="text-gray-400 text-sm mb-4">Driveway or private land</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              No permit required when placed on your private property
            </p>
          </button>

          {/* Public Road */}
          <button
            onClick={() => handlePlacementSelect('public')}
            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
              selectedPlacement === 'public'
                ? 'border-blue-500 bg-blue-900/30'
                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${
                selectedPlacement === 'public' ? 'bg-blue-500' : 'bg-gray-700'
              }`}>
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Public Road</h3>
                <p className="text-gray-400 text-sm mb-4">Council or public property</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Permit required for placement on public roads
            </p>
          </button>
        </div>

        {/* Permit Information */}
        {selectedPlacement === 'public' && (
          <div className="space-y-4 mb-8">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-200 mb-1">Permit Required</h4>
                <p className="text-yellow-100 text-sm">
                  A permit is required when placing a skip on a public road. We'll handle the permit 
                  application process for you.
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-200 mb-1">Processing Time</h4>
                <p className="text-blue-100 text-sm">
                  The council requires 5 working days notice to process permit applications. Please plan your 
                  delivery date accordingly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermitCheckStep;