import React, { useState } from 'react';
import { Search, X, ArrowRight, MapPin } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useLanguage } from '../contexts/LanguageContext';
import StepIndicator from './StepIndicator';

const PostcodeStep: React.FC = () => {
  const { t } = useLanguage();
  const { bookingData, updateAddress, setCurrentStep } = useBooking();
  const [postcode, setPostcode] = useState(bookingData.address.postcode || '');
  const [city, setCity] = useState(bookingData.address.city || '');
  const [streetName, setStreetName] = useState(bookingData.address.streetName || '');
  const [houseNumber, setHouseNumber] = useState(bookingData.address.houseNumber || '');

  // Sri Lankan districts for dropdown
  const districts = [
    'district.colombo', 'district.gampaha', 'district.kalutara', 'district.kandy',
    'district.matale', 'district.nuwara_eliya', 'district.galle', 'district.matara',
    'district.hambantota', 'district.jaffna', 'district.kilinochchi', 'district.mannar',
    'district.vavuniya', 'district.mullaitivu', 'district.batticaloa', 'district.ampara',
    'district.trincomalee', 'district.kurunegala', 'district.puttalam', 'district.anuradhapura',
    'district.polonnaruwa', 'district.badulla', 'district.moneragala', 'district.ratnapura',
    'district.kegalle'
  ];

  const handleContinue = () => {
    updateAddress({
      postcode,
      city,
      streetName,
      houseNumber
    });
    setCurrentStep('waste-type');
  };

  const clearPostcode = () => {
    setPostcode('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900 transition-colors duration-500 flex flex-col pt-20">
      <StepIndicator currentStep="postcode" />
      
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {t('skip.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 italic font-light mb-8">
              {t('skip.subtitle')}
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🇱🇰</span>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            {/* Location Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Postcode Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('skip.postcode')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    placeholder={t('skip.postcode.placeholder')}
                    className="block w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                  {postcode && (
                    <button
                      onClick={clearPostcode}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    </button>
                  )}
                </div>
              </div>

              {/* District/City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('skip.city')}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={t(district)}>
                      {t(district)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('skip.street')}
                </label>
                <input
                  type="text"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* House Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('skip.house')}
                </label>
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!postcode || !city || !streetName || !houseNumber}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {t('common.continue')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Version */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0 - Sri Lanka</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcodeStep;