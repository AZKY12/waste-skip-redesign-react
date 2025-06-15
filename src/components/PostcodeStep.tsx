import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const PostcodeStep: React.FC = () => {
  const { bookingData, updateAddress, setCurrentStep } = useBooking();
  const [postcode, setPostcode] = useState(bookingData.address.postcode || 'LE10 1SH');
  const [city, setCity] = useState(bookingData.address.city || 'Hinckley');
  const [streetName, setStreetName] = useState(bookingData.address.streetName || 'Ashby Road');
  const [houseNumber, setHouseNumber] = useState(bookingData.address.houseNumber || '197');

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
            SKIP HIRE
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 italic font-light">
            With A Difference
          </p>
        </div>

        {/* Postcode Input */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Enter postcode"
              className="block w-full pl-10 pr-10 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            {postcode && (
              <button
                onClick={clearPostcode}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>

          {/* Address Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Street Name
              </label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                House/Flat Number
              </label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!postcode || !city || !streetName || !houseNumber}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Version */}
        <div className="text-center">
          <p className="text-sm text-gray-500">Version 11.34</p>
        </div>
      </div>
    </div>
  );
};

export default PostcodeStep;