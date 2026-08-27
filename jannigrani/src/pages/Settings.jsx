import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useTranslation } from '../contexts/LanguageContext';

const settingsTranslations = {
  en: { 
    title: "Settings", 
    sub: "Manage your app preferences", 
    languageSection: "Language", 
    changeLang: "Select Language", 
    notifications: "Notifications", 
    notificationsDesc: "Receive updates on your reports", 
    logout: "Logout", 
    close: "Close",
    saved: "Saved successfully" 
  },
  hi: { 
    title: "सेटिंग्स", 
    sub: "अपनी ऐप प्राथमिकताएं प्रबंधित करें", 
    languageSection: "भाषा", 
    changeLang: "भाषा चुनें", 
    notifications: "सूचनाएं", 
    notificationsDesc: "अपनी शिकायतों पर अपडेट प्राप्त करें", 
    logout: "लॉग आउट", 
    close: "बंद करें",
    saved: "सफलतापूर्वक सहेजा गया" 
  },
  mr: { 
    title: "सेटिंग्ज", 
    sub: "तुमची ॲप प्राधान्ये व्यवस्थापित करा", 
    languageSection: "भाषा", 
    changeLang: "भाषा निवडा", 
    notifications: "सूचना", 
    notificationsDesc: "तुमच्या तक्रारींवरील अपडेट्स मिळवा", 
    logout: "बाहेर पडा", 
    close: "बंद करा",
    saved: "यशस्वीरित्या सेव्ह केले" 
  },
  bn: { 
    title: "সেটিংস", 
    sub: "আপনার অ্যাপ পছন্দ পরিচালনা করুন", 
    languageSection: "ভাষা", 
    changeLang: "ভাষা নির্বাচন করুন", 
    notifications: "বিজ্ঞপ্তি", 
    notificationsDesc: "আপনার অভিযোগের আপডেট পান", 
    logout: "লগ আউট", 
    close: "বন্ধ করুন",
    saved: "সফলভাবে সংরক্ষিত" 
  },
  te: { 
    title: "సెట్టింగ్‌లు", 
    sub: "మీ యాప్ ప్రాధాన్యతలను నిర్వహించండి", 
    languageSection: "భాష", 
    changeLang: "భాషను ఎంచుకోండి", 
    notifications: "నోటిఫికేషన్‌లు", 
    notificationsDesc: "మీ ఫిర్యాదులపై అప్‌డేట్‌లను పొందండి", 
    logout: "లాగ్ అవుట్", 
    close: "మూసివేయి",
    saved: "విజయవంతంగా సేవ్ చేయబడింది" 
  },
  ta: { 
    title: "அமைப்புகள்", 
    sub: "உங்கள் விருப்பங்களை நிர்வகிக்கவும்", 
    languageSection: "மொழி", 
    changeLang: "மொழியைத் தேர்ந்தெடுக்கவும்", 
    notifications: "அறிவிப்புகள்", 
    notificationsDesc: "உங்கள் புகார்களின் நிலையை அறிக", 
    logout: "வெளியேறு", 
    close: "மூடு",
    saved: "சேமிக்கப்பட்டது" 
  },
  gu: { 
    title: "સેટિંગ્સ", 
    sub: "તમારી એપ્લિકેશન પસંદગીઓ સંચાલિત કરો", 
    languageSection: "ભાષા", 
    changeLang: "ભાષા પસંદ કરો", 
    notifications: "સૂચનાઓ", 
    notificationsDesc: "તમારી ફરિયાદો પર અપડેટ મેળવો", 
    logout: "બહાર નીકળો", 
    close: "બંધ કરો",
    saved: "સાચવવામાં આવ્યું" 
  },
  ur: { 
    title: "ترتیبات", 
    sub: "اپنی ایپ کی ترجیحات کا نظم کریں", 
    languageSection: "زبان", 
    changeLang: "زبان منتخب کریں", 
    notifications: "اطلاعات", 
    notificationsDesc: "अपनी رپورٹس پر اپ ڈیٹس حاصل کریں", 
    logout: "لاگ آؤٹ", 
    close: "بند کریں",
    saved: "محفوظ ہو گیا" 
  },
  kn: { 
    title: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", 
    sub: "ನಿಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಾಶಸ್ತ್ಯಗಳನ್ನು ನಿರ್ವಹಿಸಿ", 
    languageSection: "ಭಾಷೆ", 
    changeLang: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", 
    notifications: "ಅಧಿಸೂಚನೆಗಳು", 
    notificationsDesc: "ನಿಮ್ಮ ದೂರುಗಳ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ", 
    logout: "ಹೊರಬನ್ನಿ", 
    close: "ಮುಚ್ಚಿ",
    saved: "ಉಳಿಸಲಾಗಿದೆ" 
  },
  or: { 
    title: "ସେଟିଂସ୍", 
    sub: "ଆପଣଙ୍କ ଆପ୍ ପସନ୍ଦ ପରିଚାଳନା କରନ୍ତୁ", 
    languageSection: "ଭାଷା", 
    changeLang: "ଭାଷା ବାଛନ୍ତୁ", 
    notifications: "ବିଜ୍ଞପ୍ତି", 
    notificationsDesc: "ଆପଣଙ୍କ ଅଭିଯୋଗର ଅପଡେଟ୍ ପାଆନ୍ତୁ", 
    logout: "ଲଗ୍ ଆଉଟ୍", 
    close: "ବନ୍ଦ କରନ୍ତୁ",
    saved: "ସେଭ୍ ହୋଇଗଲା" 
  },
  ml: { 
    title: "ക്രമീകരണങ്ങൾ", 
    sub: "ആപ്പ് മുൻഗണനകൾ കൈകാര്യം ചെയ്യുക", 
    languageSection: "ഭാഷ", 
    changeLang: "ഭാഷ തിരഞ്ഞെടുക്കുക", 
    notifications: "അറിയിപ്പുകൾ", 
    notificationsDesc: "നിങ്ങളുടെ പരാതികളുടെ അപ്ഡേറ്റുകൾ നേടുക", 
    logout: "പുറത്തിറങ്ങുക", 
    close: "അടയ്ക്കുക",
    saved: "സംരക്ഷിച്ചു" 
  },
  pa: { 
    title: "ਸੈਟिंग्स", 
    sub: "अपनी ਐਪ ਤਰجیحات ਪ੍ਰਬੰਧિત ਕਰੋ", 
    languageSection: "भाशा", 
    changeLang: "भाषा चुणो", 
    notifications: "सूचनाएं", 
    notificationsDesc: "अपनी रिपोर्ट पर अपडेट प्राप्त करें", 
    logout: "लाग आウト", 
    close: "बंद करो",
    saved: "सेव हो गया" 
  },
  as: { 
    title: "ছেটিংছ", 
    sub: "আপোনাৰ এপ পছন্দসমূহ পৰিচালনা কৰক", 
    languageSection: "ভাষা", 
    changeLang: "ভাষা বাছক", 
    notifications: "জাননী", 
    notificationsDesc: "আপোনাৰ ৰিপৰ্টৰ আপডেট লাভ কৰক", 
    logout: "লগ আউট", 
    close: "বন্ধ কৰক",
    saved: "সংরক্ষণ কৰা হ'ল" 
  }
};

const languagesList = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' }
];

const Settings = () => {
  const { language, changeLanguage } = useTranslation();
  const navigate = useNavigate();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const tLocal = (key) => {
    const langData = settingsTranslations[language] || settingsTranslations['en'];
    return langData[key] || settingsTranslations['en'][key];
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-[#0B243B] mb-1">
            {tLocal('title')}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {tLocal('sub')}
          </p>
        </div>

        {toastMessage && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-xl text-center">
            {toastMessage}
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          
          {/* Language Selection Tile */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-[#0B243B]">
                {tLocal('languageSection')}
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {languagesList.find(l => l.code === language)?.name || 'English'}
              </p>
            </div>
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="bg-[#00A9F7] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#174A7E] transition-all"
            >
              {tLocal('changeLang')}
            </button>
          </div>

          {/* Notifications Toggle Tile */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-[#0B243B]">
                {tLocal('notifications')}
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {tLocal('notificationsDesc')}
              </p>
            </div>
            <button
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                showToast(tLocal('saved'));
              }}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                notificationsEnabled ? 'bg-[#00A9F7]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Logout Tile */}
          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 border border-red-200 font-bold py-4 rounded-full shadow-sm hover:bg-red-100 transition-all text-center"
            >
              {tLocal('logout')}
            </button>
          </div>

        </div>
      </motion.div>

      {/* Language Modal */}
      <AnimatePresence>
        {isLangModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-black text-[#0B243B]">
                  {tLocal('changeLang')}
                </h3>
                <button 
                  onClick={() => setIsLangModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsLangModalOpen(false);
                      showToast(tLocal('saved'));
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                      language === lang.code 
                        ? 'bg-[#00A9F7] text-white shadow-md' 
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;