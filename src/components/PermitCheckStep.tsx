import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Truck, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
      <StepIndicator currentStep="permit" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Where will the skip be placed?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            This helps us determine if you need a permit for your skip placement
          </p>
        </div>

        {/* Placement Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Private Property */}
          <button
            onClick={() => handlePlacementSelect('private')}
            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 transform bg-white dark:bg-gray-800 shadow-md hover:shadow-lg ${
              selectedPlacement === 'private'
                ? 'border-green-500 ring-2 ring-green-100 dark:ring-green-900'
                : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg transition-colors ${
                selectedPlacement === 'private' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <Home className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Private Property</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Driveway or private land</p>
              </div>

              {selectedPlacement === 'private' && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                ✓ No permit required when placed on your private property
              </p>
            </div>
          </button>

          {/* Public Road */}
          <button
            onClick={() => handlePlacementSelect('public')}
            className={`p-6 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 transform bg-white dark:bg-gray-800 shadow-md hover:shadow-lg ${
              selectedPlacement === 'public'
                ? 'border-orange-500 ring-2 ring-orange-100 dark:ring-orange-900'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg transition-colors ${
                selectedPlacement === 'public' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <Truck className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Public Road</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Council or public property</p>
              </div>

              {selectedPlacement === 'public' && (
                <CheckCircle className="w-6 h-6 text-orange-500" />
              )}
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
              <p className="text-orange-800 dark:text-orange-200 text-sm font-medium">
                ⚠ Permit required for placement on public roads
              </p>
            </div>
          </button>
        </div>

        {/* Permit Information */}
        {selectedPlacement === 'public' && (
          <div className="space-y-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Permit Required</h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  A permit is required when placing a skip on a public road. We'll handle the permit 
                  application process for you at an additional cost.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Processing Time</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  The council requires 5 working days notice to process permit applications. Please plan your 
                  delivery date accordingly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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