import React from 'react';
import { Check, MapPin, Trash2, Truck, Calendar, CreditCard, CheckCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useBooking } from '../contexts/BookingContext';

interface Step {
  id: string;
  title: string;
  icon: React.ElementType;
  completed: boolean;
  current: boolean;
  clickable: boolean;
}

interface StepIndicatorProps {
  currentStep: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const { isDark, toggleTheme } = useTheme();
  const { bookingData, setCurrentStep } = useBooking();

  const stepOrder = ['postcode', 'waste-type', 'skip-size', 'permit', 'date', 'payment'];
  const currentStepIndex = stepOrder.indexOf(currentStep);

  const steps: Step[] = [
    {
      id: 'postcode',
      title: 'Postcode',
      icon: MapPin,
      completed: currentStepIndex > 0 && !!bookingData.address.postcode,
      current: currentStep === 'postcode',
      clickable: true
    },
    {
      id: 'waste-type',
      title: 'Waste Type',
      icon: Trash2,
      completed: currentStepIndex > 1 && bookingData.wasteTypes.length > 0,
      current: currentStep === 'waste-type',
      clickable: !!bookingData.address.postcode
    },
    {
      id: 'skip-size',
      title: 'Select Skip',
      icon: Truck,
      completed: currentStepIndex > 2 && !!bookingData.selectedSkip,
      current: currentStep === 'skip-size',
      clickable: bookingData.wasteTypes.length > 0
    },
    {
      id: 'permit',
      title: 'Permit Check',
      icon: CheckCircle,
      completed: currentStepIndex > 3,
      current: currentStep === 'permit',
      clickable: !!bookingData.selectedSkip
    },
    {
      id: 'date',
      title: 'Choose Date',
      icon: Calendar,
      completed: currentStepIndex > 4 && !!bookingData.deliveryDate,
      current: currentStep === 'date' || currentStep === 'date-selection',
      clickable: currentStepIndex >= 3
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: CreditCard,
      completed: false,
      current: currentStep === 'payment',
      clickable: !!bookingData.deliveryDate
    }
  ];

  const completedStepsCount = steps.filter(step => step.completed).length;
  const progressPercentage = (completedStepsCount / steps.length) * 100;

  const handleStepClick = (step: Step) => {
    if (step.clickable && !step.current) {
      if (step.id === 'date') {
        setCurrentStep('date-selection');
      } else {
        setCurrentStep(step.id);
      }
    }
  };

  return (
    <div className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Single-line navbar layout */}
        <div className="flex items-center justify-between gap-4">
          {/* Left section: Title and step info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                Skip Hire Process
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>
            
            {/* Enhanced progress bar with integrated desktop steps */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-4xl">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Progress
              </span>
              
              {/* Integrated steps with progress line */}
              <div className="flex-1 relative">
                {/* Background progress line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                {/* Step indicators */}
                <div className="flex items-center justify-between relative z-10">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center group">
                      <button
                        onClick={() => handleStepClick(step)}
                        disabled={!step.clickable}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-300 transform group-hover:scale-110 ${
                          step.completed 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-md cursor-pointer' 
                            : step.current 
                            ? 'bg-white dark:bg-gray-800 border-blue-500 text-blue-500 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900' 
                            : step.clickable
                            ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer'
                            : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`} 
                        style={step.current ? { animation: 'pulse-slow 1.5s infinite' } : {}}
                      >
                        {step.completed ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                      </button>
                      
                      <span className={`mt-1 text-xs font-medium transition-colors duration-300 text-center leading-tight ${
                        step.completed || step.current 
                          ? 'text-gray-900 dark:text-white' 
                          : step.clickable
                          ? 'text-gray-600 dark:text-gray-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          {/* Right section: Theme toggle */}
          <button 
            onClick={toggleTheme} 
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                <span className="hidden sm:inline text-xs font-medium text-gray-700 dark:text-gray-300">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                <span className="hidden sm:inline text-xs font-medium text-gray-700 dark:text-gray-300">Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile steps section */}
      <div className="max-w-7xl mx-auto sm:px-4 py-2 sm:py-3 px-[12px] rounded-md lg:py-[5px] lg:px-[12px] md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center min-w-[70px] relative">
              {/* Connection line for mobile */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-[calc(100%-12px)] w-6 h-1 bg-gray-200 dark:bg-gray-700 z-0 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 rounded-full" 
                    style={{ width: step.completed ? '100%' : '0%' }}
                  />
                </div>
              )}
              
              <button
                onClick={() => handleStepClick(step)}
                disabled={!step.clickable}
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 transform hover:scale-110 ${
                  step.completed 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-md cursor-pointer' 
                    : step.current 
                    ? 'bg-white dark:bg-gray-800 border-blue-500 text-blue-500 shadow-lg ring-2 ring-blue-100 dark:ring-blue-900' 
                    : step.clickable
                    ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 shadow-sm cursor-pointer hover:border-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 shadow-sm cursor-not-allowed'
                }`} 
                style={step.current ? { animation: 'pulse-slow 1.5s infinite' } : {}}
              >
                {step.completed ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
              </button>
              
              <span className={`mt-1.5 text-xs font-semibold text-center transition-colors duration-300 leading-tight ${
                step.completed || step.current 
                  ? 'text-gray-900 dark:text-white' 
                  : step.clickable
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;