import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';

const Header = () => {
  const { language, changeLanguage } = useTranslation();

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

      {/* Manual Language Selector */}
      <div>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={language || 'en'}
          className="bg-gray-50 border border-gray-200 text-sm font-medium text-citizenNavy rounded-full px-4 py-2 focus:outline-none focus:border-nigraniBlue transition-colors"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="ur">اردو (Urdu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="as">অসমীয়া (Assamese)</option>
        </select>
      </div>
    </header>
  );
};

export default Header;