import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Info, Calendar as CalendarIcon } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import StepIndicator from './StepIndicator';

const DateSelectionStep: React.FC = () => {
  const { bookingData, updateDeliveryDate, updateCollectionDate, setCurrentStep } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | null>(bookingData.deliveryDate);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    updateDeliveryDate(date);
    
    // Auto-calculate collection date (14 days later)
    const collectionDate = new Date(date);
    collectionDate.setDate(collectionDate.getDate() + 14);
    updateCollectionDate(collectionDate);
  };

  const handleContinue = () => {
    setCurrentStep('payment');
  };

  const handleBack = () => {
    setCurrentStep('permit');
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const minDate = bookingData.permitRequired 
      ? new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days for permit
      : new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day minimum
    
    return date < minDate;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = selectedDate && 
        date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white shadow-lg scale-110'
              : isDisabled
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getCollectionDate = () => {
    if (!selectedDate) return null;
    const collectionDate = new Date(selectedDate);
    collectionDate.setDate(collectionDate.getDate() + 14);
    return collectionDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
      <StepIndicator currentStep="date" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Choose Your Delivery Date
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
          </p>
        </div>

        {/* Permit Information */}
        {bookingData.permitRequired && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 flex items-start gap-4 max-w-3xl mx-auto">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Permit Information</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                You've selected to place your skip on a public road, which requires a council permit. 
                The council needs 5 working days to process permit applications.
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                The earliest available date is Monday 23 June.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Date</h3>
            </div>
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </h4>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>

          {/* Collection Date */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Collection Date</h3>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                Change
              </button>
            </div>
            
            {getCollectionDate() ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {formatDate(getCollectionDate()!)}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We'll collect your skip on this date. Please ensure it's accessible and ready for collection.
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a delivery date to see collection date
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedDate}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionStep;