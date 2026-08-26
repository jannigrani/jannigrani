import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

// Real dictionary for 13+ Indian languages embedded strictly for simple navigation terms
const navTranslations = {
  en: { home: "Home", work: "Work", report: "Report", profile: "Profile" },
  hi: { home: "होम", work: "काम", report: "रिपोर्ट", profile: "प्रोफ़ाइल" },
  mr: { home: "मुख्यपृष्ठ", work: "काम", report: "अहवाल", profile: "प्रोफाइल" },
  bn: { home: "হোম", work: "কাজ", report: "রিপোর্ট", profile: "প্রোফাইল" },
  te: { home: "హోమ్", work: "పని", report: "నివేదిక", profile: "ప్రొఫైల్" },
  ta: { home: "முகப்பு", work: "வேலை", report: "அறிக்கை", profile: "சுயவிவரம்" },
  gu: { home: "હોમ", work: "કામ", report: "રિપોર્ટ", profile: "પ્રોફાઇલ" },
  ur: { home: "ہوم", work: "کام", report: "رپورٹ", profile: "پروفائل" },
  kn: { home: "ಮುಖಪುಟ", work: "ಕೆಲಸ", report: "ವರದಿ", profile: "ಪ್ರೊಫೈಲ್" },
  or: { home: "ହୋମ୍", work: "କାମ", report: "ରିପୋର୍ଟ", profile: "ପ୍ରୋଫାଇଲ୍" },
  ml: { home: "ഹോം", work: "ജോലി", report: "റിപ്പോർട്ട്", profile: "പ്രൊഫൈൽ" },
  pa: { home: "ਹੋਮ", work: "ਕੰਮ", report: "ਰਿਪੋਰਟ", profile: "ਪ੍ਰੋਫਾਈਲ" },
  as: { home: "হোম", work: "কাম", report: "ৰিপৰ্ট", profile: "প্ৰফাইল" }
};

const FloatingBottomNav = () => {
  const { language } = useTranslation();

  // Fallback to English if translation is missing for safety
  const tLocal = (key) => {
    const langData = navTranslations[language] || navTranslations['en'];
    return langData[key] || navTranslations['en'][key];
  };

  const navItems = [
    {
      id: 'home',
      path: '/',
      label: tLocal('home'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'dashboard',
      path: '/dashboard',
      label: tLocal('work'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'addReport',
      path: '/add-report',
      label: tLocal('report'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      id: 'profile',
      path: '/profile',
      label: tLocal('profile'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-md z-50">
      <nav className="bg-ui-dark rounded-full shadow-heavy-bottom px-8 py-4 flex justify-between items-center border border-white/5">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-12 h-12 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? '-translate-y-2' : ''}`}>
                  {item.icon}
                </div>
                
                {/* Active State Dot Indicator matching the reference design */}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-2 w-1.5 h-1.5 bg-white rounded-full"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}

                {/* Small Translated Label for accessibility and clarity */}
                <span className={`absolute -bottom-2 text-[9px] font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 hidden'
                }`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default FloatingBottomNav;