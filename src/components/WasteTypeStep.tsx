import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building, Home, Leaf, Building2, Check, Info } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useLanguage } from '../contexts/LanguageContext';
import StepIndicator from './StepIndicator';

const WasteTypeStep: React.FC = () => {
  const { t } = useLanguage();
  const { bookingData, updateWasteTypes, setCurrentStep } = useBooking();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(bookingData.wasteTypes);

  const wasteTypes = [
    {
      id: 'construction',
      name: t('skip.waste.construction'),
      description: t('skip.waste.construction.desc'),
      icon: Building
    },
    {
      id: 'household',
      name: t('skip.waste.household'),
      description: t('skip.waste.household.desc'),
      icon: Home
    },
    {
      id: 'garden',
      name: t('skip.waste.garden'),
      description: t('skip.waste.garden.desc'),
      icon: Leaf
    },
    {
      id: 'commercial',
      name: t('skip.waste.commercial'),
      description: t('skip.waste.commercial.desc'),
      icon: Building2
    }
  ];

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
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900 transition-colors duration-500 flex flex-col">
      <StepIndicator currentStep="waste-type" />
      
      <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {t('skip.waste.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
              {t('skip.waste.subtitle')}
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3 mb-6 flex items-start gap-3 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-green-800 dark:text-green-200 text-sm">
              Select all that apply - you can choose multiple waste types
            </p>
          </div>

          {/* Waste Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto flex-1">
            {wasteTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedTypes.includes(type.id);
              
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeToggle(type.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 transform bg-white dark:bg-gray-800 shadow-md hover:shadow-lg ${
                    isSelected
                      ? 'border-green-500 ring-2 ring-green-100 dark:ring-green-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">{type.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Types Summary */}
          {selectedTypes.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Selected Waste Types</h3>
              <div className="flex flex-wrap gap-2">
                {getSelectedTypeNames().map((name, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center max-w-2xl mx-auto mt-auto pt-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </button>
            
            <button
              onClick={handleContinue}
              disabled={selectedTypes.length === 0}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {t('common.continue')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTypeStep;