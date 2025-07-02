import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Common
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    
    // Skip Hire
    'skip.title': 'SKIP HIRE',
    'skip.subtitle': 'With A Difference',
    'skip.postcode': 'Enter Your Location',
    'skip.postcode.placeholder': 'Enter postal code or area',
    'skip.city': 'City',
    'skip.street': 'Street Name',
    'skip.house': 'House/Flat Number',
    'skip.waste.title': 'What type of waste are you disposing of?',
    'skip.waste.subtitle': 'Select all waste types that apply to your project',
    'skip.waste.construction': 'Construction Waste',
    'skip.waste.construction.desc': 'Building materials and renovation debris',
    'skip.waste.household': 'Household Waste',
    'skip.waste.household.desc': 'General household items and furniture',
    'skip.waste.garden': 'Garden Waste',
    'skip.waste.garden.desc': 'Green waste and landscaping materials',
    'skip.waste.commercial': 'Commercial Waste',
    'skip.waste.commercial.desc': 'Business and office clearance',
    'skip.permit.title': 'Where will the skip be placed?',
    'skip.permit.subtitle': 'This helps us determine if you need a permit',
    'skip.permit.private': 'Private Property',
    'skip.permit.private.desc': 'Driveway or private land',
    'skip.permit.public': 'Public Road',
    'skip.permit.public.desc': 'Council or public property',
    'skip.date.title': 'Choose Your Delivery Date',
    'skip.date.subtitle': 'Select your preferred skip delivery date',
    'skip.payment.title': 'Complete Your Order',
    'skip.payment.subtitle': 'Review your order and complete payment',
    
    // Districts
    'district.colombo': 'Colombo',
    'district.gampaha': 'Gampaha',
    'district.kalutara': 'Kalutara',
    'district.kandy': 'Kandy',
    'district.matale': 'Matale',
    'district.nuwara_eliya': 'Nuwara Eliya',
    'district.galle': 'Galle',
    'district.matara': 'Matara',
    'district.hambantota': 'Hambantota',
    'district.jaffna': 'Jaffna',
    'district.kilinochchi': 'Kilinochchi',
    'district.mannar': 'Mannar',
    'district.vavuniya': 'Vavuniya',
    'district.mullaitivu': 'Mullaitivu',
    'district.batticaloa': 'Batticaloa',
    'district.ampara': 'Ampara',
    'district.trincomalee': 'Trincomalee',
    'district.kurunegala': 'Kurunegala',
    'district.puttalam': 'Puttalam',
    'district.anuradhapura': 'Anuradhapura',
    'district.polonnaruwa': 'Polonnaruwa',
    'district.badulla': 'Badulla',
    'district.moneragala': 'Moneragala',
    'district.ratnapura': 'Ratnapura',
    'district.kegalle': 'Kegalle',
    
    // Currency
    'currency.lkr': 'LKR',
    'currency.symbol': 'Rs.',
    
    // Footer
    'footer.company': 'EcoSkip Lanka',
    'footer.description': 'Leading waste management solutions in Sri Lanka',
    'footer.contact': 'Contact Information',
    'footer.phone': '+94 11 234 5678',
    'footer.email': 'info@ecoskiplanka.lk',
    'footer.address': 'No. 123, Galle Road, Colombo 03',
    'footer.services': 'Our Services',
    'footer.skip_hire': 'Skip Hire',
    'footer.waste_collection': 'Waste Collection',
    'footer.recycling': 'Recycling Services',
    'footer.consultation': 'Environmental Consultation',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.social': 'Follow Us',
    'footer.copyright': '© 2025 EcoSkip Lanka. All rights reserved.',
  },
  si: {
    // Navigation
    'nav.home': 'මුල් පිටුව',
    'nav.services': 'සේවාවන්',
    'nav.about': 'අප ගැන',
    'nav.contact': 'සම්බන්ධතා',
    'nav.login': 'ප්‍රවේශය',
    'nav.register': 'ලියාපදිංචිය',
    'nav.dashboard': 'පාලක පුවරුව',
    'nav.logout': 'ඉවත්වීම',
    
    // Common
    'common.continue': 'ඉදිරියට',
    'common.back': 'ආපසු',
    'common.next': 'ඊළඟ',
    'common.previous': 'පෙර',
    'common.submit': 'ඉදිරිපත් කරන්න',
    'common.cancel': 'අවලංගු කරන්න',
    'common.save': 'සුරකින්න',
    'common.edit': 'සංස්කරණය',
    'common.delete': 'මකන්න',
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථකයි',
    'common.warning': 'අනතුරු ඇඟවීම',
    'common.info': 'තොරතුරු',
    
    // Skip Hire
    'skip.title': 'ස්කිප් කුලියට දීම',
    'skip.subtitle': 'වෙනස්කමක් සමඟ',
    'skip.postcode': 'ඔබේ ස්ථානය ඇතුළත් කරන්න',
    'skip.postcode.placeholder': 'තැපැල් කේතය හෝ ප්‍රදේශය ඇතුළත් කරන්න',
    'skip.city': 'නගරය',
    'skip.street': 'වීදි නම',
    'skip.house': 'නිවස/මහල් නිවාස අංකය',
    'skip.waste.title': 'ඔබ බැහැර කරන අපද්‍රව්‍ය වර්ගය කුමක්ද?',
    'skip.waste.subtitle': 'ඔබේ ව්‍යාපෘතියට අදාළ සියලුම අපද්‍රව්‍ය වර්ග තෝරන්න',
    'skip.waste.construction': 'ඉදිකිරීම් අපද්‍රව්‍ය',
    'skip.waste.construction.desc': 'ගොඩනැගිලි ද්‍රව්‍ය සහ ප්‍රතිසංස්කරණ සුන්බුන්',
    'skip.waste.household': 'ගෘහස්ථ අපද්‍රව්‍ය',
    'skip.waste.household.desc': 'සාමාන්‍ය ගෘහස්ථ භාණ්ඩ සහ ගෘහ භාණ්ඩ',
    'skip.waste.garden': 'උද්‍යාන අපද්‍රව්‍ය',
    'skip.waste.garden.desc': 'හරිත අපද්‍රව්‍ය සහ භූමි අලංකරණ ද්‍රව්‍ය',
    'skip.waste.commercial': 'වාණිජ අපද්‍රව්‍ය',
    'skip.waste.commercial.desc': 'ව්‍යාපාරික සහ කාර්යාල පිරිසිදු කිරීම',
    'skip.permit.title': 'ස්කිප් එක තබන්නේ කොහේද?',
    'skip.permit.subtitle': 'ඔබට අවසර පත්‍රයක් අවශ්‍ය දැයි තීරණය කිරීමට මෙය උපකාරී වේ',
    'skip.permit.private': 'පුද්ගලික දේපල',
    'skip.permit.private.desc': 'ධාවන පථය හෝ පුද්ගලික ඉඩම',
    'skip.permit.public': 'පොදු මාර්ගය',
    'skip.permit.public.desc': 'සභා හෝ පොදු දේපල',
    'skip.date.title': 'ඔබේ බෙදා හැරීමේ දිනය තෝරන්න',
    'skip.date.subtitle': 'ඔබේ කැමති ස්කිප් බෙදා හැරීමේ දිනය තෝරන්න',
    'skip.payment.title': 'ඔබේ ඇණවුම සම්පූර්ණ කරන්න',
    'skip.payment.subtitle': 'ඔබේ ඇණවුම සමාලෝචනය කර ගෙවීම සම්පූර්ණ කරන්න',
    
    // Districts
    'district.colombo': 'කොළඹ',
    'district.gampaha': 'ගම්පහ',
    'district.kalutara': 'කළුතර',
    'district.kandy': 'මහනුවර',
    'district.matale': 'මාතලේ',
    'district.nuwara_eliya': 'නුවරඑළිය',
    'district.galle': 'ගාල්ල',
    'district.matara': 'මාතර',
    'district.hambantota': 'හම්බන්තොට',
    'district.jaffna': 'යාපනය',
    'district.kilinochchi': 'කිලිනොච්චි',
    'district.mannar': 'මන්නාරම',
    'district.vavuniya': 'වවුනියාව',
    'district.mullaitivu': 'මුලතිව්',
    'district.batticaloa': 'මඩකලපුව',
    'district.ampara': 'අම්පාර',
    'district.trincomalee': 'ත්‍රිකුණාමලය',
    'district.kurunegala': 'කුරුණෑගල',
    'district.puttalam': 'පුත්තලම',
    'district.anuradhapura': 'අනුරාධපුරය',
    'district.polonnaruwa': 'පොළොන්නරුව',
    'district.badulla': 'බදුල්ල',
    'district.moneragala': 'මොණරාගල',
    'district.ratnapura': 'රත්නපුර',
    'district.kegalle': 'කෑගල්ල',
    
    // Currency
    'currency.lkr': 'ලංකා රුපියල්',
    'currency.symbol': 'රු.',
    
    // Footer
    'footer.company': 'ඊකෝස්කිප් ලංකා',
    'footer.description': 'ශ්‍රී ලංකාවේ ප්‍රමුඛ අපද්‍රව්‍ය කළමනාකරණ විසඳුම්',
    'footer.contact': 'සම්බන්ධතා තොරතුරු',
    'footer.phone': '+94 11 234 5678',
    'footer.email': 'info@ecoskiplanka.lk',
    'footer.address': 'අංක 123, ගාල්ල පාර, කොළඹ 03',
    'footer.services': 'අපගේ සේවාවන්',
    'footer.skip_hire': 'ස්කිප් කුලියට දීම',
    'footer.waste_collection': 'අපද්‍රව්‍ය එකතු කිරීම',
    'footer.recycling': 'ප්‍රතිචක්‍රීකරණ සේවාවන්',
    'footer.consultation': 'පරිසර උපදේශනය',
    'footer.legal': 'නීතිමය',
    'footer.privacy': 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
    'footer.terms': 'සේවා කොන්දේසි',
    'footer.cookies': 'කුකී ප්‍රතිපත්තිය',
    'footer.social': 'අපව අනුගමනය කරන්න',
    'footer.copyright': '© 2025 ඊකෝස්කිප් ලංකා. සියලුම හිමිකම් ඇවිරිණි.',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.contact': 'தொடர்பு',
    'nav.login': 'உள்நுழைவு',
    'nav.register': 'பதிவு',
    'nav.dashboard': 'கட்டுப்பாட்டு பலகை',
    'nav.logout': 'வெளியேறு',
    
    // Common
    'common.continue': 'தொடரவும்',
    'common.back': 'பின்',
    'common.next': 'அடுத்து',
    'common.previous': 'முந்தைய',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமிக்கவும்',
    'common.edit': 'திருத்து',
    'common.delete': 'நீக்கு',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.warning': 'எச்சரிக்கை',
    'common.info': 'தகவல்',
    
    // Skip Hire
    'skip.title': 'ஸ்கிப் வாடகை',
    'skip.subtitle': 'வித்தியாசத்துடன்',
    'skip.postcode': 'உங்கள் இடத்தை உள்ளிடவும்',
    'skip.postcode.placeholder': 'அஞ்சல் குறியீடு அல்லது பகுதியை உள்ளிடவும்',
    'skip.city': 'நகரம்',
    'skip.street': 'தெரு பெயர்',
    'skip.house': 'வீடு/அடுக்குமாடி எண்',
    'skip.waste.title': 'நீங்கள் அகற்றும் கழிவு வகை என்ன?',
    'skip.waste.subtitle': 'உங்கள் திட்டத்திற்கு பொருந்தும் அனைத்து கழிவு வகைகளையும் தேர்ந்தெடுக்கவும்',
    'skip.waste.construction': 'கட்டுமான கழிவு',
    'skip.waste.construction.desc': 'கட்டுமான பொருட்கள் மற்றும் புதுப்பித்தல் குப்பைகள்',
    'skip.waste.household': 'வீட்டு கழிவு',
    'skip.waste.household.desc': 'பொதுவான வீட்டு பொருட்கள் மற்றும் மரச்சாமான்கள்',
    'skip.waste.garden': 'தோட்ட கழிவு',
    'skip.waste.garden.desc': 'பசுமை கழிவு மற்றும் நிலத்தை அலங்கரிக்கும் பொருட்கள்',
    'skip.waste.commercial': 'வணிக கழிவு',
    'skip.waste.commercial.desc': 'வணிக மற்றும் அலுவலக சுத்தம்',
    'skip.permit.title': 'ஸ்கிப் எங்கே வைக்கப்படும்?',
    'skip.permit.subtitle': 'உங்களுக்கு அனுமதி தேவையா என்பதை தீர்மானிக்க இது உதவுகிறது',
    'skip.permit.private': 'தனியார் சொத்து',
    'skip.permit.private.desc': 'வாகன நிறுத்துமிடம் அல்லது தனியார் நிலம்',
    'skip.permit.public': 'பொது சாலை',
    'skip.permit.public.desc': 'சபை அல்லது பொது சொத்து',
    'skip.date.title': 'உங்கள் விநியோக தேதியை தேர்ந்தெடுக்கவும்',
    'skip.date.subtitle': 'உங்கள் விருப்பமான ஸ்கிப் விநியோக தேதியை தேர்ந்தெடுக்கவும்',
    'skip.payment.title': 'உங்கள் ஆர்டரை முடிக்கவும்',
    'skip.payment.subtitle': 'உங்கள் ஆர்டரை மதிப்பாய்வு செய்து பணம் செலுத்துங்கள்',
    
    // Districts
    'district.colombo': 'கொழும்பு',
    'district.gampaha': 'கம்பஹா',
    'district.kalutara': 'களுத்துறை',
    'district.kandy': 'கண்டி',
    'district.matale': 'மாத்தளை',
    'district.nuwara_eliya': 'நுவரெலியா',
    'district.galle': 'காலி',
    'district.matara': 'மாத்தறை',
    'district.hambantota': 'ஹம்பாந்தோட்டை',
    'district.jaffna': 'யாழ்ப்பாணம்',
    'district.kilinochchi': 'கிளிநொச்சி',
    'district.mannar': 'மன்னார்',
    'district.vavuniya': 'வவுனியா',
    'district.mullaitivu': 'முல்லைத்தீவு',
    'district.batticaloa': 'மட்டக்களப்பு',
    'district.ampara': 'அம்பாறை',
    'district.trincomalee': 'திருகோணமலை',
    'district.kurunegala': 'குருணாகல்',
    'district.puttalam': 'புத்தளம்',
    'district.anuradhapura': 'அனுராதபுரம்',
    'district.polonnaruwa': 'பொலன்னறுவை',
    'district.badulla': 'பதுளை',
    'district.moneragala': 'மொணராகலை',
    'district.ratnapura': 'இரத்தினபுரி',
    'district.kegalle': 'கேகாலை',
    
    // Currency
    'currency.lkr': 'இலங்கை ரூபாய்',
    'currency.symbol': 'ரூ.',
    
    // Footer
    'footer.company': 'ஈகோஸ்கிப் லங்கா',
    'footer.description': 'இலங்கையின் முன்னணி கழிவு மேலாண்மை தீர்வுகள்',
    'footer.contact': 'தொடர்பு தகவல்',
    'footer.phone': '+94 11 234 5678',
    'footer.email': 'info@ecoskiplanka.lk',
    'footer.address': 'எண். 123, காலி சாலை, கொழும்பு 03',
    'footer.services': 'எங்கள் சேவைகள்',
    'footer.skip_hire': 'ஸ்கிப் வாடகை',
    'footer.waste_collection': 'கழிவு சேகரிப்பு',
    'footer.recycling': 'மறுசுழற்சி சேவைகள்',
    'footer.consultation': 'சுற்றுச்சூழல் ஆலோசனை',
    'footer.legal': 'சட்டபூர்வ',
    'footer.privacy': 'தனியுரிமை கொள்கை',
    'footer.terms': 'சேவை நிபந்தனைகள்',
    'footer.cookies': 'குக்கீ கொள்கை',
    'footer.social': 'எங்களை பின்தொடரவும்',
    'footer.copyright': '© 2025 ஈகோஸ்கிப் லங்கா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};