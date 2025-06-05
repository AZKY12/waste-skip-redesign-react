import React from 'react';
import { Check, Clock, Star } from 'lucide-react';

export interface SkipData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

interface SkipCardProps {
  skip: SkipData;
  isSelected: boolean;
  onSelect: (skip: SkipData) => void;
  isPopular?: boolean;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, isPopular = false }) => {
  const finalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  
  // Map skip sizes to their corresponding images
  const getSkipImage = (size: number) => {
    const imageMap: { [key: number]: string } = {
      4: '/uploads/b4221d4c-cbb6-4c64-a4b3-fd8fb8ee123a.png',
      6: '/uploads/18022031-c719-4884-b125-705fbd2eb095.png',
      8: '/uploads/c600d8ae-6ee3-48c3-8c3d-8bce05202e75.png',
      10: '/uploads/bfe08fb2-8305-4f43-ae4a-5dd8025fb783.png',
      12: '/uploads/4f748f7d-c14d-40eb-bb36-f9bdb96c61e6.png',
      14: '/uploads/1f550796-5e92-434b-bcd7-7b4ec833050c.png',
      16: '/uploads/1d102439-5b28-4d72-bb39-d7a392cea1a6.png',
      20: '/uploads/9a32ccc7-03f7-4f83-a49a-b13b97576e74.png',
      40: '/uploads/0da8fd23-1a59-418d-bc0f-caba54306619.png'
    };
    return imageMap[size] || '/uploads/b4221d4c-cbb6-4c64-a4b3-fd8fb8ee123a.png';
  };
  
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
        isSelected
          ? 'border-blue-500 shadow-lg ring-1 ring-blue-100 dark:ring-blue-900 scale-105'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-lg'
      } perspective-1000 touch-manipulation`}
      onClick={() => onSelect(skip)}
      style={{
        transformStyle: 'preserve-3d',
        transform: isSelected ? 'rotateY(2deg) rotateX(2deg)' : '',
      }}
    >
      {/* Enhanced popular badge for mobile */}
      {isPopular && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current animate-pulse" />
            <span className="whitespace-nowrap">Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
        {/* Enhanced skip image section with full div coverage */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg h-20 sm:h-24 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 overflow-hidden">
          <img 
            src={getSkipImage(skip.size)}
            alt={`${skip.size} yard skip`}
            className="absolute inset-0 w-full h-full object-cover rounded-lg drop-shadow-lg z-10"
          />
          
          {/* Size badge with better mobile visibility */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-20">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs font-bold shadow-md">
              {skip.size} Yards
            </span>
          </div>
          
          {/* Subtle overlay for better badge visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/20 rounded-lg z-15"></div>
        </div>

        {/* Improved header section */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white drop-shadow-sm flex-1 min-w-0">
            {skip.size} Yard Skip
          </h3>
          <div className="text-right flex-shrink-0">
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white drop-shadow-sm">
              £{finalPrice.toFixed(0)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">inc. VAT</div>
          </div>
        </div>

        {/* Mobile-optimized hire period */}
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{skip.hire_period_days} day hire period</span>
        </div>

        {/* Enhanced features with better mobile layout */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full shadow-sm flex-shrink-0 ${
              skip.allowed_on_road ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'
            }`} />
            <span className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
              {skip.allowed_on_road ? 'Road placement allowed' : 'Private land only'}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full shadow-sm flex-shrink-0 ${
              skip.allows_heavy_waste ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'
            }`} />
            <span className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
              {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}
            </span>
          </div>
        </div>

        {/* Enhanced mobile-friendly select button */}
        <button
          className={`w-full py-2 sm:py-2.5 px-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg min-h-[36px] touch-manipulation ${
            isSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-200 dark:shadow-blue-900'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
          }}
        >
          {isSelected ? (
            <div className="flex items-center justify-center gap-1">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Selected</span>
            </div>
          ) : (
            'Select This Skip'
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
