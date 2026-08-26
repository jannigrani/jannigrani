import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';

const Header = () => {
  const { language, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'ur', label: 'اردو (Urdu)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'as', label: 'অসমীয়া (Assamese)' }
  ];

  const handleSelectLanguage = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      
      {/* Logo with strict color mapping: Citizen Navy camera, Nigrani Blue pin, White rings */}
      <div className="flex items-center space-x-3">
        <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="white" stroke="#E8F1F8" strokeWidth="2" />
          <rect x="10" y="15" width="20" height="14" rx="3" fill="#0A192F" />
          <circle cx="20" cy="22" r="4" fill="white" />
          <path d="M20 6C16.6863 6 14 8.68629 14 12C14 16.5 20 22 20 22C20 22 26 16.5 26 12C26 8.68629 23.3137 6 20 6Z" fill="#0056B3" />
          <circle cx="20" cy="12" r="2" fill="white" />
        </svg>
        <span className="font-serif text-xl font-bold text-citizenNavy tracking-tight">
          JanNigrani
        </span>
      </div>

      {/* Clean Icon-Based Language Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 text-citizenNavy transition-colors flex items-center justify-center focus:outline-none"
          aria-label="Select Language"
        >
          {/* Globe Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Dropdown Menu List */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 origin-top-right transition-all">
            <div className="max-h-64 overflow-y-auto no-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                    language === lang.code 
                      ? 'bg-[#00A9F7] text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;