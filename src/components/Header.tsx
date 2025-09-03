import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Settings, Home, Phone, Info, Briefcase, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu') && !target.closest('.mobile-menu')) {
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.services'), href: '/services', icon: Briefcase },
    { name: t('nav.about'), href: '/about', icon: Info },
    { name: t('nav.contact'), href: '/contact', icon: Phone },
  ];

  const handleNavClick = (href: string) => {
    window.location.href = href;
    setIsMenuOpen(false);
  };

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 py-2' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={() => handleNavClick('/')}
              className="group cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg">🇱🇰</span>
                </div>
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-blue-700 transition-all duration-300 whitespace-nowrap">
                  EcoSkip Lanka
                </h1>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 group whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {/* Language and Theme - Hidden on small mobile */}
            <div className="hidden xs:flex items-center space-x-1 sm:space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            
            {isAuthenticated ? (
              <div className="relative user-menu flex-shrink-0">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg hover:from-green-200 hover:to-blue-200 dark:hover:from-green-800 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 border border-green-200 dark:border-green-700"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block max-w-20 md:max-w-none truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[200px] sm:min-w-[220px] animate-slide-in-up z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      {t('nav.dashboard')}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-lg text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 whitespace-nowrap"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => handleNavClick('/register')}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md mobile-menu animate-slide-in-up">
            <nav className="px-3 sm:px-4 py-3 sm:py-4 space-y-2">
              {/* Language and Theme for mobile */}
              <div className="xs:hidden flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
                <div className="flex items-center space-x-2">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </div>
              
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-300 group text-left"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm sm:text-base">{item.name}</span>
                  </button>
                );
              })}
              
              {!isAuthenticated && (
                <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button
                    onClick={() => handleNavClick('/login')}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base text-left"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => handleNavClick('/register')}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    {t('nav.register')}
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
        
        {/* Tablet Navigation (md breakpoint) */}
        <nav className="hidden md:flex lg:hidden items-center justify-center space-x-1 mt-2 pb-2 border-t border-gray-200 dark:border-gray-700 pt-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="flex flex-col items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 group min-w-0"
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;