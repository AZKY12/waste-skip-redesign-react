import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import SkipCard, { SkipData } from './SkipCard';
import { ArrowLeft, ArrowRight, Filter, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useBooking } from '../contexts/BookingContext';

const SkipSelection: React.FC = () => {
  const { bookingData, updateSelectedSkip, setCurrentStep } = useBooking();
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(bookingData.selectedSkip);
  const [skips, setSkips] = useState<SkipData[]>([]);

  // Mock data as provided in the challenge
  useEffect(() => {
    const mockData: SkipData[] = [{
      id: 17933,
      size: 4,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 278,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:52.813",
      allowed_on_road: true,
      allows_heavy_waste: true
    }, {
      id: 17934,
      size: 6,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 305,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:52.992",
      allowed_on_road: true,
      allows_heavy_waste: true
    }, {
      id: 17935,
      size: 8,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 375,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:53.171",
      allowed_on_road: true,
      allows_heavy_waste: true
    }, {
      id: 17936,
      size: 10,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 400,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:53.339",
      allowed_on_road: false,
      allows_heavy_waste: false
    }, {
      id: 17937,
      size: 12,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 439,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:53.516",
      allowed_on_road: false,
      allows_heavy_waste: false
    }, {
      id: 17938,
      size: 14,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 470,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:53.69",
      allowed_on_road: false,
      allows_heavy_waste: false
    }, {
      id: 17939,
      size: 16,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 496,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:53.876",
      allowed_on_road: false,
      allows_heavy_waste: false
    }, {
      id: 15124,
      size: 20,
      hire_period_days: 14,
      transport_cost: 248,
      per_tonne_cost: 248,
      price_before_vat: 992,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:40.344435",
      updated_at: "2025-04-07T13:16:52.434",
      allowed_on_road: false,
      allows_heavy_waste: true
    }, {
      id: 15125,
      size: 40,
      hire_period_days: 14,
      transport_cost: 248,
      per_tonne_cost: 248,
      price_before_vat: 992,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:40.344435",
      updated_at: "2025-04-07T13:16:52.603",
      allowed_on_road: false,
      allows_heavy_waste: false
    }];
    setSkips(mockData);
  }, []);

  const handleSkipSelect = (skip: SkipData) => {
    setSelectedSkip(skip);
    updateSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      setCurrentStep('permit');
    }
  };

  const handleBack = () => {
    setCurrentStep('waste-type');
  };

  const autoplayPlugin = React.useRef(Autoplay({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
      <StepIndicator currentStep="skip-size" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 my-0 lg:py-0">
        {/* Structured header section with centered alignment */}
        <div className="text-center mb-3 sm:mb-4">
          {/* Main title section */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 leading-tight">
              Choose Your Skip Size
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 lg:px-0">
              Select the skip size that best suits your needs. All prices include VAT and delivery.
            </p>
          </div>

          {/* Redesigned horizontal bar card for selected skip */}
          {selectedSkip && (
            <div className="flex justify-center mb-4">
              <div 
                style={{
                  animation: 'pulse-slow 1.5s infinite'
                }} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 w-full max-w-xs sm:max-w-2xl"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  {/* Skip size badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 shadow-md">
                    {selectedSkip.size}
                  </div>
                  
                  {/* Main content - horizontal layout on desktop */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg">
                      {selectedSkip.size} Yard Skip Selected
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">
                        {selectedSkip.hire_period_days} day hire
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        {selectedSkip.allowed_on_road ? 'Road placement OK' : 'Private land only'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price section */}
                  <div className="text-center sm:text-right flex-shrink-0">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      inc. VAT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Centered location info */}
        <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            Delivering to: <strong className="text-blue-600 dark:text-blue-400">{bookingData.address.postcode || 'NR32'}</strong>
          </span>
        </div>

        {/* Centered filter bar */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 sm:p-2 shadow-md border border-gray-200 dark:border-gray-700 max-w-5xl w-full h-auto">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Active Filters:
                </span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-end">
                <button className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium transition-colors hover:bg-blue-200 dark:hover:bg-blue-800">
                  Road Placement
                </button>
                <button className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
                  Heavy Waste
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced carousel with better mobile touch support */}
        <div className="mb-3 sm:mb-4">
          <Carousel
            plugins={[autoplayPlugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: "trimSnaps"
            }}
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent className="-ml-2 sm:-ml-3">
              {skips.map((skip, index) => (
                <CarouselItem key={skip.id} className="p-5 sm:pl-3 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <SkipCard
                    skip={skip}
                    isSelected={selectedSkip?.id === skip.id}
                    onSelect={handleSkipSelect}
                    isPopular={index === 2}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-8 lg:-left-12" />
            <CarouselNext className="hidden sm:flex -right-8 lg:-right-12" />
          </Carousel>
        </div>

        {/* Mobile-optimized navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4 pb-4">
          <button 
            onClick={handleBack}
            className="flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-all duration-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[40px] touch-manipulation"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Back</span>
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedSkip}
            className={`flex items-center justify-center gap-1 px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold transition-all duration-300 min-h-[40px] touch-manipulation shadow-md ${
              selectedSkip
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="text-xs sm:text-sm">Continue to Next Step</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipSelection;