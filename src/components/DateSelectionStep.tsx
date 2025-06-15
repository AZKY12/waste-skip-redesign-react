import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';
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
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isDisabled
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-white hover:bg-gray-700'
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
    <div className="min-h-screen bg-black text-white">
      <StepIndicator currentStep="date" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your Delivery Date
          </h1>
          <p className="text-gray-400 text-lg">
            Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
          </p>
        </div>

        {/* Permit Information */}
        {bookingData.permitRequired && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-8 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-200 mb-1">Permit Information</h4>
              <p className="text-blue-100 text-sm mb-2">
                You've selected to place your skip on a public road, which requires a council permit. 
                The council needs 5 working days to process permit applications.
              </p>
              <p className="text-blue-100 text-sm font-medium">
                The earliest available date is Monday 23 June.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Date</h3>
            
            <div className="bg-gray-800 rounded-lg p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <h4 className="text-lg font-semibold">
                  {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </h4>
                
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm text-gray-400 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </div>

          {/* Collection Date */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Collection Date</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Change
              </button>
            </div>
            
            {getCollectionDate() && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">
                  {formatDate(getCollectionDate()!)}
                </h4>
                <p className="text-gray-400 text-sm">
                  We'll collect your skip on this date. Please ensure it's accessible.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedDate}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
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