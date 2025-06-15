import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import PostcodeStep from '../components/PostcodeStep';
import WasteTypeStep from '../components/WasteTypeStep';
import SkipSelection from '../components/SkipSelection';
import PermitCheckStep from '../components/PermitCheckStep';
import DateSelectionStep from '../components/DateSelectionStep';
import PaymentStep from '../components/PaymentStep';

const Index = () => {
  const { currentStep } = useBooking();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'postcode':
        return <PostcodeStep />;
      case 'waste-type':
        return <WasteTypeStep />;
      case 'skip-size':
        return <SkipSelection />;
      case 'permit':
        return <PermitCheckStep />;
      case 'date-selection':
        return <DateSelectionStep />;
      case 'payment':
        return <PaymentStep />;
      default:
        return <PostcodeStep />;
    }
  };

  return renderCurrentStep();
};

export default Index;