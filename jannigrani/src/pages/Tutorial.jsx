import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const translations = {
  en: {
    skip: "Skip",
    next: "Next",
    start: "Start Now",
    slide1Title: "Spot a Problem",
    slide1Desc: "See dirt or broken roads? Take a photo to report it.",
    slide2Title: "Send Report",
    slide2Desc: "Tell us where it is. We will record the exact place.",
    slide3Title: "See Changes",
    slide3Desc: "Track your report and see when the work gets done.",
    chooseLang: "Choose Your Language"
  },
  hi: {
    skip: "छोड़ें",
    next: "अगला",
    start: "अभी शुरू करें",
    slide1Title: "समस्या खोजें",
    slide1Desc: "गंदगी या टूटी सड़क देखें? शिकायत के लिए फोटो लें।",
    slide2Title: "रिपोर्ट भेजें",
    slide2Desc: "हमें बताएं यह कहाँ है। हम सही जगह दर्ज करेंगे।",
    slide3Title: "बदलाव देखें",
    slide3Desc: "अपनी रिपोर्ट ट्रैक करें और काम पूरा होते देखें।",
    chooseLang: "अपनी भाषा चुनें"
  },
  bn: {
    skip: "এড়িয়ে যান",
    next: "পরবর্তী",
    start: "এখন শুরু করুন",
    slide1Title: "সমস্যা খুঁজুন",
    slide1Desc: "ময়লা বা ভাঙা রাস্তা দেখছেন? অভিযোগ করতে ছবি তুলুন।",
    slide2Title: "রিপোর্ট পাঠান",
    slide2Desc: "এটি কোথায় আমাদের বলুন। আমরা সঠিক জায়গা রেকর্ড করব।",
    slide3Title: "পরিবর্তন দেখুন",
    slide3Desc: "আপনার রিপোর্ট ট্র্যাক করুন এবং কাজ শেষ হতে দেখুন।",
    chooseLang: "আপনার ভাষা বেছে নিন"
  },
  te: {
    skip: "దాటవేయి",
    next: "తదుపరి",
    start: "ఇప్పుడే ప్రారంభించండి",
    slide1Title: "సమస్యను గుర్తించండి",
    slide1Desc: "మురికి లేదా విరిగిన రోడ్లు చూశారా? ఫిర్యాదు చేయడానికి ఫోటో తీయండి.",
    slide2Title: "రిపోర్ట్ పంపండి",
    slide2Desc: "అది ఎక్కడ ఉందో చెప్పండి. మేము సరైన స్థలాన్ని రికార్డ్ చేస్తాము.",
    slide3Title: "మార్పులు చూడండి",
    slide3Desc: "మీ రిపోర్ట్‌ను ట్రాక్ చేయండి మరియు పని పూర్తి కావడాన్ని చూడండి.",
    chooseLang: "మీ భాషను ఎంచుకోండి"
  },
  mr: {
    skip: "वगळा",
    next: "पुढे",
    start: "आता सुरू करा",
    slide1Title: "समस्या शोधा",
    slide1Desc: "घाण किंवा तुटलेले रस्ते पाहता? तक्रार करण्यासाठी फोटो काढा.",
    slide2Title: "अहवाल पाठवा",
    slide2Desc: "ते कुठे आहे ते सांगा. आम्ही योग्य जागा नोंदवू.",
    slide3Title: "बदल पहा",
    slide3Desc: "तुमचा अहवाल ट्रॅक करा आणि काम पूर्ण होताना पहा.",
    chooseLang: "तुमची भाषा निवडा"
  },
  ta: {
    skip: "தவிர்",
    next: "அடுத்து",
    start: "இப்போது தொடங்கு",
    slide1Title: "பிரச்சனையை கண்டுபிடி",
    slide1Desc: "குப்பை அல்லது உடைந்த சாலையா? புகார் செய்ய படம் எடு.",
    slide2Title: "புகார் அனுப்பு",
    slide2Desc: "எங்கு என்று சொல். நாங்கள் சரியான இடத்தை பதிவு செய்வோம்.",
    slide3Title: "மாற்றத்தை பார்",
    slide3Desc: "உன் புகாரை கவனி, வேலை முடிவதை பார்.",
    chooseLang: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்"
  },
  gu: {
    skip: "છોડો",
    next: "આગળ",
    start: "હવે શરૂ કરો",
    slide1Title: "સમસ્યા શોધો",
    slide1Desc: "ગંદકી કે તૂટેલા રસ્તા જુઓ છો? ફરિયાદ કરવા ફોટો લો.",
    slide2Title: "રિપોર્ટ મોકલો",
    slide2Desc: "તે ક્યાં છે તે કહો. અમે સાચી જગ્યા નોંધીશું.",
    slide3Title: "ફેરફાર જુઓ",
    slide3Desc: "તમારો રિપોર્ટ ટ્રેક કરો અને કામ પૂરું થતું જુઓ.",
    chooseLang: "તમારી ભાષા પસંદ કરો"
  },
  kn: {
    skip: "ಬಿಟ್ಟುಬಿಡಿ",
    next: "ಮುಂದೆ",
    start: "ಈಗ ಪ್ರಾರಂಭಿಸಿ",
    slide1Title: "ಸಮಸ್ಯೆ ಹುಡುಕಿ",
    slide1Desc: "ಕೊಳಕು ಅಥವಾ ಹಾಳಾದ ರಸ್ತೆ ಕಂಡರೆ? ದೂರು ನೀಡಲು ಫೋಟೋ ತೆಗೆಯಿರಿ.",
    slide2Title: "ವರದಿ ಕಳುಹಿಸಿ",
    slide2Desc: "ಅದು ಎಲ್ಲಿದೆ ಎಂದು ತಿಳಿಸಿ. ನಾವು ಸರಿಯಾದ ಸ್ಥಳವನ್ನು ದಾಖಲಿಸುತ್ತೇವೆ.",
    slide3Title: "ಬದಲಾವಣೆ ನೋಡಿ",
    slide3Desc: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಕೆಲಸ ಮುಗಿಯುವುದನ್ನು ನೋಡಿ.",
    chooseLang: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
  },
  or: {
    skip: "ବାଦ୍ ଦିଅନ୍ତୁ",
    next: "ପରବର୍ତ୍ତୀ",
    start: "ବର୍ତ୍ତମାନ ଆରମ୍ଭ କରନ୍ତୁ",
    slide1Title: "ସମସ୍ୟା ଖୋଜନ୍ତୁ",
    slide1Desc: "ମଇଳା କିମ୍ବା ଭଙ୍ଗା ରାସ୍ତା ଦେଖୁଛନ୍ତି? ଅଭିଯୋଗ ପାଇଁ ଫଟୋ ନିଅନ୍ତୁ।",
    slide2Title: "ରିପୋର୍ଟ ପଠାନ୍ତୁ",
    slide2Desc: "ଏହା କେଉଁଠାରେ ଅଛି କୁହନ୍ତୁ। ଆମେ ସଠିକ୍ ଜାଗା ରେକର୍ଡ କରିବୁ।",
    slide3Title: "ପରିବର୍ତ୍ତନ ଦେଖନ୍ତୁ",
    slide3Desc: "ଆପଣଙ୍କ ରିପୋର୍ଟ ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ କାମ ସରିବା ଦେଖନ୍ତୁ।",
    chooseLang: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ"
  },
  ml: {
    skip: "ഒഴിവാക്കുക",
    next: "അടുത്തത്",
    start: "ഇപ്പോൾ തുടങ്ങുക",
    slide1Title: "പ്രശ്നം കണ്ടെത്തുക",
    slide1Desc: "അഴുക്കോ തകർന്ന റോഡോ കാണുന്നുണ്ടോ? പരാതിപ്പെടാൻ ഫോട്ടോ എടുക്കുക.",
    slide2Title: "റിപ്പോർട്ട് അയയ്ക്കുക",
    slide2Desc: "അതെവിടെയാണെന്ന് പറയുക. ഞങ്ങൾ കൃത്യമായ സ്ഥലം രേഖപ്പെടുത്തും.",
    slide3Title: "മാറ്റങ്ങൾ കാണുക",
    slide3Desc: "നിങ്ങളുടെ റിപ്പോർട്ട് ട്രാക്ക് ചെയ്ത് പണി പൂർത്തിയാകുന്നത് കാണുക.",
    chooseLang: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക"
  },
  pa: {
    skip: "ਛੱਡੋ",
    next: "ਅਗਲਾ",
    start: "ਹੁਣੇ ਸ਼ੁਰੂ ਕਰੋ",
    slide1Title: "ਸਮੱਸਿਆ ਲੱਭੋ",
    slide1Desc: "ਗੰਦਗੀ ਜਾਂ ਟੁੱਟੀ ਸੜਕ ਦੇਖੋ? ਸ਼ਿਕਾਇਤ ਕਰਨ ਲਈ ਫੋਟੋ ਲਓ।",
    slide2Title: "ਰਿਪੋਰਟ ਭੇਜੋ",
    slide2Desc: "ਸਾਨੂੰ ਦੱਸੋ ਇਹ ਕਿੱਥੇ ਹੈ। ਅਸੀਂ ਸਹੀ ਜਗ੍ਹਾ ਰਿਕਾਰਡ ਕਰਾਂਗੇ।",
    slide3Title: "ਬਦਲਾਅ ਦੇਖੋ",
    slide3Desc: "ਆਪਣੀ ਰਿਪੋਰਟ ਟਰੈਕ ਕਰੋ ਅਤੇ ਕੰਮ ਪੂਰਾ ਹੁੰਦੇ ਦੇਖੋ।",
    chooseLang: "अपनी भाषा चुनें"
  },
  as: {
    skip: "এৰক",
    next: "পৰৱৰ্তী",
    start: "এতিয়া আৰম্ভ কৰক",
    slide1Title: "সমস্যা বিচাৰক",
    slide1Desc: "লেতেৰা বা ভঙা ৰাস্তা দেখিছে? অভিযোগ দিবলৈ ফটো তোলক।",
    slide2Title: "ৰিপৰ্ট পঠাওক",
    slide2Desc: "সেইটো ক’ত আছে আমাক জনাওক। আমি সঠিক ঠাই ৰেকৰ্ড কৰিম।",
    slide3Title: "পৰিৱৰ্তন চাওক",
    slide3Desc: "আপোনাৰ ৰিপৰ্ট ট্ৰেক কৰক আৰু কাম শেষ হোৱা চাওক।",
    chooseLang: "আপোনাৰ ভাষা বাছক"
  },
  ur: {
    skip: "چھوڑیں",
    next: "اگلا",
    start: "ابھی شروع کریں",
    slide1Title: "مسئلہ تلاش کریں",
    slide1Desc: "گندگی یا ٹوٹی سڑک دیکھیں؟ شکایت کے لیے تصویر لیں۔",
    slide2Title: "رپورٹ بھیجیں",
    slide2Desc: "ہمیں بتائیں کہ یہ کہاں ہے۔ ہم صحیح جگہ ریکارڈ کریں گے۔",
    slide3Title: "تبدیلی دیکھیں",
    slide3Desc: "اپنی رپورٹ ٹریک کریں اور کام مکمل ہوتے دیکھیں۔",
    chooseLang: "اپنی زبان منتخب کریں"
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

const Tutorial = () => {
  const { language, changeLanguage } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const t = (key) => translations[language]?.[key] || translations['en'][key];

  const slides = [
    {
      id: 1,
      title: t('slide1Title'),
      desc: t('slide1Desc'),
      icon: (
        <svg className="w-24 h-24 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: t('slide2Title'),
      desc: t('slide2Desc'),
      icon: (
        <svg className="w-24 h-24 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: t('slide3Title'),
      desc: t('slide3Desc'),
      icon: (
        <svg className="w-24 h-24 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    navigate('/dashboard');
  };

  // Handle swipe gestures
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; 
    if (info.offset.x < -swipeThreshold) {
      nextStep();
    } else if (info.offset.x > swipeThreshold) {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col justify-between overflow-hidden relative">
      
      {/* Background Artwork */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 z-0 pointer-events-none"></div>

      {/* Top Header - Translator Icon and Skip Button strictly only */}
      <div className="flex justify-between items-center p-6 relative z-20 w-full">
        {/* Translator Icon Button */}
        <button 
          onClick={() => setIsLangModalOpen(true)}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-[#0B243B] hover:bg-gray-50 transition-colors flex items-center justify-center focus:outline-none"
          aria-label="Choose Language"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Skip Button */}
        <button 
          onClick={skipTutorial}
          className="text-gray-500 font-bold text-sm tracking-wide hover:text-[#0B243B] transition-colors"
        >
          {t('skip')}
        </button>
      </div>

      {/* Main Slide Content (Swipeable) */}
      <div className="flex-grow flex items-center justify-center relative w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute flex flex-col items-center text-center px-8 w-full max-w-md cursor-grab active:cursor-grabbing"
          >
            <div className="bg-white p-8 rounded-full shadow-lg mb-10 border border-gray-100 pointer-events-none">
              {slides[currentStep].icon}
            </div>
            
            <h2 className="text-3xl font-black text-[#0B243B] mb-4 pointer-events-none">
              {slides[currentStep].title}
            </h2>
            
            <p className="text-gray-600 font-medium text-lg leading-relaxed pointer-events-none">
              {slides[currentStep].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls with reduced top spacing */}
      <div className="px-8 pt-2 pb-12 w-full max-w-md mx-auto relative z-20">
        
        {/* High-Contrast Active Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-[#00A9F7]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Solid High-Contrast Action Button */}
        <button
          onClick={nextStep}
          className="w-full bg-[#0B243B] text-white font-bold py-4 rounded-full shadow-xl hover:bg-black active:scale-[0.98] transition-all"
        >
          {currentStep === slides.length - 1 ? t('start') : t('next')}
        </button>
        
      </div>

      {/* Language Selection Modal Popup */}
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
                  {t('chooseLang')}
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

export default Tutorial;