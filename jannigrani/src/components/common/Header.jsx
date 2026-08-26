import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { language, changeLanguage } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
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

  const handleProfileClick = () => {
    // Check if user is fully logged in and not just an anonymous guest
    if (currentUser && !currentUser.isAnonymous) {
      navigate('/profile');
    } else {
      // Trigger the custom event to open the Auth Modal for sign up / login
      window.dispatchEvent(new CustomEvent('openAuthModal'));
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      
      {/* Logo updated to use standard image tag with exact sizing */}
      <div className="flex items-center space-x-3">
        <img src="https://i.postimg.cc/6p643zBR/photo-6066349669190669559-y.jpg" alt="JanNigrani" className="w-10 h-10 object-contain" />
        <span className="font-serif text-xl font-bold text-citizenNavy tracking-tight">
        </span>
      </div>

      {/* Right Side Icons Container */}
      <div className="flex items-center space-x-2">
        
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

        {/* User Profile / Login Icon */}
        <button
          onClick={handleProfileClick}
          className="p-2 rounded-full hover:bg-gray-100 text-citizenNavy transition-colors flex items-center justify-center focus:outline-none"
          aria-label="User Profile"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

      </div>
    </header>
  );
};

export default Header;