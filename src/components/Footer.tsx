import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-green-400 mb-4">EcoSkip Lanka</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <span className="text-green-400">📧</span>
              <span>info@ecoskiplanka.lk</span>
            </div>
            <div className="flex space-x-4 mt-2">
              <span className="text-green-400">📞</span>
              <span>+94 11 234 5678</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services" className="hover:text-green-400 transition-colors">{t('nav.services')}</a></li>
              <li><a href="/about" className="hover:text-green-400 transition-colors">{t('nav.about')}</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition-colors">{t('nav.contact')}</a></li>
              <li><a href="/dashboard" className="hover:text-green-400 transition-colors">{t('nav.dashboard')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('services.residential')}</li>
              <li>{t('services.commercial')}</li>
              <li>{t('services.construction')}</li>
              <li>{t('services.garden')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EcoSkip Lanka. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;