import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'si' as Language, name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta' as Language, name: 'தமிழ்', flag: '🇱🇰' }
  ];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative language-selector">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" />
        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
        <span className="text-sm sm:hidden">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[120px] sm:min-w-[150px] animate-slide-in-up">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-base sm:text-lg">{lang.flag}</span>
            <span className="text-xs sm:text-sm font-medium truncate">{lang.name}</span>
            {language === lang.code && (
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 ml-auto" />
            )}
          </button>
        ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;