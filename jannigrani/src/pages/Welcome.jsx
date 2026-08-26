import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import AuthModal from '../components/auth/AuthModal';

// Real dictionary for 13+ Indian languages embedded strictly for the Welcome flow
const welcomeTranslations = {
  en: { t1: "Let's make", t2: "your city", t3: "better", sub: "No waiting. Direct action.", opt1: "Clean Dirt", opt2: "Fix Roads", opt3: "Stop Crime", opt4: "Save Water", opt5: "Public Help", next: "Get Started", login: "I Already Have an Account" },
  hi: { t1: "आइए बनाएं", t2: "अपने शहर को", t3: "बेहतर", sub: "कोई इंतज़ार नहीं। सीधा काम।", opt1: "कचरा साफ", opt2: "सड़क सुधार", opt3: "अपराध रोकें", opt4: "पानी बचाएं", opt5: "जनता की मदद", next: "शुरू करें", login: "मेरे पास पहले से खाता है" },
  mr: { t1: "चला बनवूया", t2: "आपले शहर", t3: "अधिक चांगले", sub: "वाट पाहू नका. थेट काम.", opt1: "कचरा साफ करा", opt2: "रस्ते दुरुस्त करा", opt3: "गुन्हेगारी थांबवा", opt4: "पाणी वाचवा", opt5: "सार्वजनिक मदत", next: "सुरू करा", login: "माझे आधीच खाते आहे" },
  bn: { t1: "আসুন তৈরি করি", t2: "আপনার শহরকে", t3: "আরও ভালো", sub: "অপেক্ষা নয়। সরাসরি কাজ।", opt1: "পরিষ্কার করুন", opt2: "রাস্তা ঠিক করুন", opt3: "অপরাধ কমান", opt4: "জল বাঁচান", opt5: "জনসাধারণের সাহায্য", next: "শুরু করুন", login: "আমার ইতিমধ্যে একটি অ্যাকাউন্ট আছে" },
  te: { t1: "మరింత మెరుగ్గా", t2: "మీ నగరాన్ని", t3: "తీర్చిదిద్దుదాం", sub: "వేచి ఉండొద్దు. నేరుగా పని.", opt1: "చెత్త శుభ్రం", opt2: "రోడ్ల మరమ్మత్తు", opt3: "నేరాలను ఆపండి", opt4: "నీటిని ఆదా చేయండి", opt5: "ప్రజల సహాయం", next: "ప్రారంభించండి", login: "నాకు ఇప్పటికే ఖాతా ఉంది" },
  ta: { t1: "உருவாக்குவோம்", t2: "உங்கள் நகரத்தை", t3: "சிறப்பாக", sub: "காத்திருக்க வேண்டாம். நேரடி செயல்.", opt1: "சுத்தம் செய்", opt2: "சாலைகளை சரிசெய்", opt3: "குற்றங்களை தடு", opt4: "நீரை சேமி", opt5: "பொது உதவி", next: "தொடங்கு", login: "என்னிடம் ஏற்கனவே கணக்கு உள்ளது" },
  gu: { t1: "ચાલો બનાવીએ", t2: "તમારા શહેરને", t3: "વધુ સારું", sub: "કોઈ રાહ નહીં. સીધું કામ.", opt1: "કચરો સાફ કરો", opt2: "રસ્તાઓ ઠીક કરો", opt3: "ગુનાઓ અટકાવો", opt4: "પાણી બચાવો", opt5: "જાહેર મદદ", next: "શરૂ કરો", login: "મારું પહેલેથી જ એકાઉન્ટ છે" },
  ur: { t1: "آئیے بنائیں", t2: "اپنے شہر کو", t3: "بہتر", sub: "کوئی انتظار نہیں۔ سیدھا کام۔", opt1: "گندگی صاف", opt2: "سڑکیں ٹھیک", opt3: "جرائم روکیں", opt4: "پانی بچائیں", opt5: "عوامی مدد", next: "شروع کریں", login: "میرا پہلے سے اکاؤنٹ ہے" },
  kn: { t1: "ಬನ್ನಿ ಮಾಡೋಣ", t2: "ನಿಮ್ಮ ನಗರವನ್ನು", t3: "ಉತ್ತಮವಾಗಿ", sub: "ಕಾಯುವಂತಿಲ್ಲ. ನೇರ ಕೆಲಸ.", opt1: "ಕಸ ಸ್ವಚ್ಛಗೊಳಿಸಿ", opt2: "ರಸ್ತೆಗಳನ್ನು ಸರಿಪಡಿಸಿ", opt3: "ಅಪರಾಧಗಳನ್ನು ತಡೆಯಿರಿ", opt4: "ನೀರು ಉಳಿಸಿ", opt5: "ಸಾರ್ವಜನಿಕ ಸಹಾಯ", next: "ಪ್ರಾರಂಭಿಸಿ", login: "ನಾನು ಈಗಾಗಲೇ ಖಾತೆಯನ್ನು ಹೊಂದಿದ್ದೇನೆ" },
  or: { t1: "ଆସନ୍ତୁ କରିବା", t2: "ଆପଣଙ୍କ ସହରକୁ", t3: "ଅଧିକ ଭଲ", sub: "ଅପେକ୍ଷା ନାହିଁ। ସିଧା କାମ।", opt1: "ଅଳିଆ ସଫା କରନ୍ତୁ", opt2: "ରାସ୍ତା ସଜାଡନ୍ତୁ", opt3: "ଅପରାଧ ରୋକନ୍ତୁ", opt4: "ପାଣି ବଞ୍ଚାନ୍ତୁ", opt5: "ସାଧାରଣ ସାହାଯ୍ୟ", next: "ଆରମ୍ଭ କରନ୍ତୁ", login: "ମୋର ପୂର୍ବରୁ ଏକ ଆକାଉଣ୍ଟ୍ ଅଛି" },
  ml: { t1: "നമുക്ക് മാറ്റാം", t2: "നിങ്ങളുടെ നഗരത്തെ", t3: "കൂടുതൽ മികച്ചതായി", sub: "കാത്തിരിപ്പില്ല. നേരിട്ടുള്ള പ്രവർത്തനം.", opt1: "മാലിന്യം വൃത്തിയാക്കുക", opt2: "റോഡുകൾ നന്നാക്കുക", opt3: "കുറ്റകൃത്യങ്ങൾ തടയുക", opt4: "വെള്ളം സംരക്ഷിക്കുക", opt5: "പൊതു സഹായം", next: "തുടങ്ങുക", login: "എനിക്ക് ഇതിനകം ഒരു അക്കൗണ്ട് ഉണ്ട്" },
  pa: { t1: "ਆਓ ਬਣਾਈਏ", t2: "ਆਪਣੇ ਸ਼ਹਿਰ ਨੂੰ", t3: "ਬਿਹਤਰ", sub: "ਕੋਈ ਇੰਤਜ਼ਾਰ ਨਹੀਂ। ਸਿੱਧਾ ਕੰਮ।", opt1: "ਗੰਦਗੀ ਸਾਫ਼ ਕਰੋ", opt2: "ਸੜਕਾਂ ਠੀਕ ਕਰੋ", opt3: "ਅਪਰਾਧ ਰੋਕੋ", opt4: "ਪਾਣੀ ਬਚਾਓ", opt5: "ਜਨਤਕ ਮਦਦ", next: "ਸ਼ੁਰੂ ਕਰੋ", login: "ਮੇਰਾ ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ" },
  as: { t1: "আহক সজাওঁ", t2: "আপোনাৰ চহৰখন", t3: "অধিক উন্নত", sub: "অপেক্ষা নাই। পোনপটীয়া কাম।", opt1: "আৱৰ্জনা পৰিষ্কাৰ কৰক", opt2: "ৰাস্তা মেৰামতি কৰক", opt3: "অপৰাধ ৰোধ কৰক", opt4: "পানী বচাওক", opt5: "ৰাজহুৱা সহায়", next: "আৰম্ভ কৰক", login: "মোৰ ইতিমধ্যে এটা একাউণ্ট আছে" }
};

const Welcome = () => {
  const { language } = useTranslation();
  const navigate = useNavigate();
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fallback to English if translation is missing for safety
  const tLocal = (key) => {
    const langData = welcomeTranslations[language] || welcomeTranslations['en'];
    return langData[key] || welcomeTranslations['en'][key];
  };

  // Options mapped with specific margins to create the horizontally staggered layout
  const concernOptions = [
    { 
      id: 'clean', label: tLocal('opt1'), marginClass: 'mt-0',
      icon: <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    },
    { 
      id: 'safety', label: tLocal('opt3'), marginClass: 'mt-8',
      icon: <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    },
    { 
      id: 'roads', label: tLocal('opt2'), marginClass: '-mt-4',
      icon: <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    },
    { 
      id: 'water', label: tLocal('opt4'), marginClass: 'mt-10',
      icon: <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
    },
    { 
      id: 'civic', label: tLocal('opt5'), marginClass: 'mt-2',
      icon: <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 pb-12 text-center text-brand-stark overflow-hidden">
        
        {/* Main Content Area - Large Typography */}
        <div className="w-full mt-20 flex flex-col items-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[3.25rem] md:text-7xl font-black tracking-tight leading-[1.05]"
          >
            {tLocal('t1')} <br />
            <span className="italic font-light opacity-90">{tLocal('t2')}</span> <br />
            {tLocal('t3')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 mt-6 text-sm md:text-base font-bold tracking-wide"
          >
            {tLocal('sub')}
          </motion.p>
        </div>

        {/* Floating Horizontally Staggered Dashed Selection Pills */}
        <div className="flex-grow flex items-center justify-center w-full my-10 relative">
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-lg">
            <AnimatePresence>
              {concernOptions.map((option, index) => {
                const isActive = selectedConcern === option.id;
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    onClick={() => setSelectedConcern(option.id)}
                    className={`flex items-center py-3 px-5 rounded-full border border-dashed transition-all duration-300 text-sm font-bold shadow-sm ${option.marginClass} ${
                      isActive 
                        ? 'bg-blue-50 border-[#00A9F7] text-[#00A9F7] shadow-md scale-105' 
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="w-full max-w-sm z-10 flex flex-col items-center">
          <button 
            onClick={() => navigate('/tutorial')}
            disabled={!selectedConcern}
            className={`w-[90%] bg-[#1C1C1E] text-white rounded-full py-5 font-bold text-[17px] transition-all duration-300 shadow-xl ${
              selectedConcern ? 'opacity-100 hover:bg-black translate-y-0 scale-100' : 'opacity-40 pointer-events-none translate-y-2 scale-95'
            }`}
          >
            {tLocal('next')}
          </button>
          
          <button 
             onClick={() => setIsAuthModalOpen(true)}
             className="mt-6 text-sm font-bold text-gray-600 hover:text-black transition-colors"
          >
            {tLocal('login')}
          </button>
        </div>
        
      </div>

      {/* Render the AuthModal */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Welcome;