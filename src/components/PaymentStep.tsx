import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Truck, X, CreditCard } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import StepIndicator from './StepIndicator';

const PaymentStep: React.FC = () => {
  const { bookingData, setCurrentStep } = useBooking();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '1234 1234 1234 1234',
    expirationDate: '',
    securityCode: '',
    country: 'United Kingdom',
    saveCard: true
  });

  const [additionalCharges, setAdditionalCharges] = useState({
    permitFee: bookingData.permitRequired ? 84 : 0,
    tonneBag: 30
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
    
    const skipPrice = bookingData.selectedSkip.price_before_vat;
    const permitFee = additionalCharges.permitFee;
    const tonneBag = additionalCharges.tonneBag;
    
    const subtotal = skipPrice + permitFee + tonneBag;
    const vat = subtotal * 0.2;
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
    <div className="min-h-screen bg-black text-white">
      <StepIndicator currentStep="payment" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Order Summary
            </h2>

            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Delivery Address
              </h3>
              <div className="text-gray-300">
                <p>{bookingData.address.houseNumber} {bookingData.address.streetName}, {bookingData.address.city}</p>
                <p>{bookingData.address.postcode}</p>
              </div>
            </div>

            {/* Delivery & Collection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Delivery & Collection
              </h3>
              <div className="text-gray-300 space-y-1">
                <p>Delivery: <span className="font-medium">{formatDate(bookingData.deliveryDate)}</span></p>
                <p>Collection: <span className="font-medium">{formatDate(bookingData.collectionDate)}</span></p>
              </div>
            </div>

            {/* Skip Details */}
            {bookingData.selectedSkip && (
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{bookingData.selectedSkip.size} Yard Skip</h4>
                    <p className="text-gray-400 text-sm">{bookingData.selectedSkip.hire_period_days} day hire period</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">£{bookingData.selectedSkip.price_before_vat.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm">+ VAT £{(bookingData.selectedSkip.price_before_vat * 0.2).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Charges */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Additional Charges</h4>
              
              {additionalCharges.permitFee > 0 && (
                <div className="flex justify-between items-center mb-3 p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Road Permit Fee</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold">£{additionalCharges.permitFee.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">+ VAT £{(additionalCharges.permitFee * 0.2).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeCharge('permit')}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {additionalCharges.tonneBag > 0 && (
                <div className="flex justify-between items-center mb-3 p-3 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">1x Tonne Bag</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold">£{additionalCharges.tonneBag.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">+ VAT £{(additionalCharges.tonneBag * 0.2).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeCharge('tonneBag')}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-gray-700">
              <div className="flex justify-between">
                <span>Subtotal (excl. VAT)</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-600">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-400" />
              Payment Details
            </h2>

            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium mb-2">Card number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
                  </div>
                </div>
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Expiration date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={paymentData.expirationDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expirationDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Security Code */}
              <div>
                <label className="block text-sm font-medium mb-2">Security code</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    value={paymentData.securityCode}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, securityCode: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-5 bg-gray-600 rounded text-xs flex items-center justify-center">
                      123
                    </div>
                  </div>
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={paymentData.country}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              {/* Save Card */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={paymentData.saveCard}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, saveCard: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="saveCard" className="text-sm">
                  Save this card as default payment method
                </label>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
              >
                Complete Payment
              </button>

              {/* Back Button */}
              <button
                onClick={handleBack}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;