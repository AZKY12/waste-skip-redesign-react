import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingData, AddressData, SkipData, PaymentData } from '../types';

interface BookingContextType {
  bookingData: BookingData;
  updateAddress: (address: AddressData) => void;
  updateWasteTypes: (wasteTypes: string[]) => void;
  updateSelectedSkip: (skip: SkipData) => void;
  updatePlacement: (placement: 'private' | 'public') => void;
  updateDeliveryDate: (date: Date) => void;
  updateCollectionDate: (date: Date) => void;
  updatePermitRequired: (required: boolean) => void;
  updateAdditionalCharges: (charges: { permitFee: number; tonneBag: number }) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingData: BookingData = {
  address: {
    postcode: '',
    city: '',
    streetName: '',
    houseNumber: ''
  },
  wasteTypes: [],
  selectedSkip: null,
  placement: 'private',
  deliveryDate: null,
  collectionDate: null,
  permitRequired: false,
  additionalCharges: {
    permitFee: 0,
    tonneBag: 0
  }
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [currentStep, setCurrentStep] = useState('postcode');

  const updateAddress = (address: AddressData) => {
    setBookingData(prev => ({ ...prev, address }));
  };

  const updateWasteTypes = (wasteTypes: string[]) => {
    setBookingData(prev => ({ ...prev, wasteTypes }));
  };

  const updateSelectedSkip = (skip: SkipData) => {
    setBookingData(prev => ({ ...prev, selectedSkip: skip }));
  };

  const updatePlacement = (placement: 'private' | 'public') => {
    setBookingData(prev => ({ 
      ...prev, 
      placement,
      permitRequired: placement === 'public'
    }));
  };

  const updateDeliveryDate = (date: Date) => {
    setBookingData(prev => ({ ...prev, deliveryDate: date }));
  };

  const updateCollectionDate = (date: Date) => {
    setBookingData(prev => ({ ...prev, collectionDate: date }));
  };

  const updatePermitRequired = (required: boolean) => {
    setBookingData(prev => ({ ...prev, permitRequired: required }));
  };

  const updateAdditionalCharges = (charges: { permitFee: number; tonneBag: number }) => {
    setBookingData(prev => ({ ...prev, additionalCharges: charges }));
  };

  const resetBooking = () => {
    setBookingData(initialBookingData);
    setCurrentStep('postcode');
  };

  return (
    <BookingContext.Provider value={{
      bookingData,
      updateAddress,
      updateWasteTypes,
      updateSelectedSkip,
      updatePlacement,
      updateDeliveryDate,
      updateCollectionDate,
      updatePermitRequired,
      updateAdditionalCharges,
      currentStep,
      setCurrentStep,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};