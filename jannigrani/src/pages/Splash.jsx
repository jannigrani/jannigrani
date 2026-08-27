import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const splashTranslations = {
  en: { tagline: "Your City, Your Voice" },
  hi: { tagline: "आपका शहर, आपकी आवाज़" },
  mr: { tagline: "तुमचे शहर, तुमचा आवाज" },
  bn: { tagline: "আপনার শহর, আপনার কণ্ঠ" },
  te: { tagline: "మీ నగరం, మీ వాయిస్" },
  ta: { tagline: "உங்கள் நகரம், உங்கள் குரல்" },
  gu: { tagline: "તમારું શહેર, તમારો અવાજ" },
  ur: { tagline: "آپ کا شہر، آپ کی آواز" },
  kn: { tagline: "ನಿಮ್ಮ ನಗರ, ನಿಮ್ಮ ಧ್ವನಿ" },
  or: { tagline: "ଆପଣଙ୍କ ସହର, ଆପଣଙ୍କ ସ୍ୱର" },
  ml: { tagline: "നിങ്ങളുടെ നഗരം, നിങ്ങളുടെ ശബ്ദം" },
  pa: { tagline: "ਤੁਹਾਡਾ ਸ਼ਹਿਰ, ਤੁਹਾਡੀ ਆਵਾਜ਼" },
  as: { tagline: "আপোনাৰ চহৰ, আপোনাৰ মাত" }
};

const Splash = ({ onFinish }) => {
  const { language } = useTranslation();
  const navigate = useNavigate();

  const tLocal = (key) => {
    const langData = splashTranslations[language] || splashTranslations['en'];
    return langData[key] || splashTranslations['en'][key];
  };

  useEffect(() => {
    // Hold the splash screen for 3 seconds before navigating
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      } else {
        // Fallback navigation to root router to handle auth checks
        navigate('/', { replace: true });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onFinish]);

  return (
    <div className="min-h-screen bg-[#0B243B] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Animated Background Glowing Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#00A9F7] rounded-full mix-blend-screen filter blur-[100px]"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#174A7E] rounded-full mix-blend-screen filter blur-[100px]"
      ></motion.div>

      {/* Center Logo and Tagline Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Logo Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="bg-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-8 flex items-center justify-center"
        >
          <img 
            src="https://i.postimg.cc/PrDX9Wtm/photo-6066349669190669559-y-removebg-preview.png" 
            alt="JanNigrani Logo" 
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        {/* Animated Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl font-black text-white mb-3 tracking-wide drop-shadow-md">
            JanNigrani
          </h1>
          <p className="text-[#00A9F7] font-bold text-sm md:text-base tracking-widest uppercase shadow-black drop-shadow-sm">
            {tLocal('tagline')}
          </p>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Splash;