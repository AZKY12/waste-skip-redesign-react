import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Truck, X, CreditCard, Shield } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useLanguage } from '../contexts/LanguageContext';
import StepIndicator from './StepIndicator';

const PaymentStep: React.FC = () => {
  const { t } = useLanguage();
  const { bookingData, setCurrentStep } = useBooking();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: 'Sri Lanka',
    saveCard: true
  });

  const [additionalCharges, setAdditionalCharges] = useState({
    permitFee: bookingData.permitRequired ? 8400 : 0, // Rs. 8,400 for permit
    tonneBag: 3000 // Rs. 3,000 for tonne bag
  });

  const handleBack = () => {
    setCurrentStep('date-selection');
  };

  const handlePayment = () => {
    // Handle payment processing
    alert('Payment processed successfully! Your skip will be delivered as scheduled.');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateTotals = () => {
    if (!bookingData.selectedSkip) return { subtotal: 0, vat: 0, total: 0 };
    
    const skipPrice = bookingData.selectedSkip.price_before_vat * 100; // Convert to LKR (assuming 1 GBP = 100 LKR)
    const permitFee = additionalCharges.permitFee;
    const tonneBag = additionalCharges.tonneBag;
    
    const subtotal = skipPrice + permitFee + tonneBag;
    const vat = subtotal * 0.18; // 18% VAT in Sri Lanka
    const total = subtotal + vat;
    
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotals();

  const removeCharge = (type: 'permit' | 'tonneBag') => {
    setAdditionalCharges(prev => ({
      ...prev,
      [type === 'permit' ? 'permitFee' : 'tonneBag']: 0
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900 transition-colors duration-500 flex flex-col">
      <StepIndicator currentStep="payment" />
      
      <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {t('skip.payment.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
              {t('skip.payment.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
                Order Summary
              </h2>

              {/* Delivery Address */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Delivery Address
                </h3>
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  <p className="font-medium">{bookingData.address.houseNumber} {bookingData.address.streetName}</p>
                  <p>{bookingData.address.city}, {bookingData.address.postcode}</p>
                </div>
              </div>

              {/* Delivery & Collection */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Delivery & Collection
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-medium">{formatDate(bookingData.deliveryDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection:</span>
                    <span className="font-medium">{formatDate(bookingData.collectionDate)}</span>
                  </div>
                </div>
              </div>

              {/* Skip Details */}
              {bookingData.selectedSkip && (
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">{bookingData.selectedSkip.size} Yard Skip</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{bookingData.selectedSkip.hire_period_days} day hire period</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{t('currency.symbol')}{(bookingData.selectedSkip.price_before_vat * 100).toLocaleString()}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">+ VAT {t('currency.symbol')}{(bookingData.selectedSkip.price_before_vat * 100 * 0.18).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Charges */}
              <div className="mb-4">
                <h4 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">Additional Charges</h4>
                
                {additionalCharges.permitFee > 0 && (
                  <div className="flex justify-between items-center mb-2 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Road Permit Fee</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Required for public road placement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{t('currency.symbol')}{additionalCharges.permitFee.toLocaleString()}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">+ VAT {t('currency.symbol')}{(additionalCharges.permitFee * 0.18).toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeCharge('permit')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {additionalCharges.tonneBag > 0 && (
                  <div className="flex justify-between items-center mb-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">1x Tonne Bag</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Additional waste capacity</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{t('currency.symbol')}{additionalCharges.tonneBag.toLocaleString()}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">+ VAT {t('currency.symbol')}{(additionalCharges.tonneBag * 0.18).toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeCharge('tonneBag')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-sm">
                  <span>Subtotal (excl. VAT)</span>
                  <span>{t('currency.symbol')}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-sm">
                  <span>VAT (18%)</span>
                  <span>{t('currency.symbol')}{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{t('currency.symbol')}{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                Payment Details
              </h2>

              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Card number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Expiration date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={paymentData.expirationDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expirationDate: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Security Code */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Security code</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="CVC"
                      value={paymentData.securityCode}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, securityCode: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-4 bg-gray-400 rounded text-white text-xs flex items-center justify-center">
                        123
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Country</label>
                  <select
                    value={paymentData.country}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="Maldives">Maldives</option>
                  </select>
                </div>

                {/* Save Card */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={paymentData.saveCard}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, saveCard: e.target.checked }))}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="saveCard" className="text-sm text-gray-700 dark:text-gray-300">
                    Save this card as default payment method
                  </label>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Complete Payment
                </button>

                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('common.back')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;