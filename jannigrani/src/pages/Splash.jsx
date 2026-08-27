import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// SVG Icons representing civic categories for the falling transition
const FallingIcons = [
  {
    id: 'trash',
    left: '15%',
    delay: 0.1,
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00A9F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    )
  },
  {
    id: 'cone',
    left: '40%',
    delay: 0.3,
    svg: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#174A7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 22h20L12 2z"></path>
        <path d="M12 2v20"></path>
        <path d="M4.5 16.5h15"></path>
        <path d="M7.5 10.5h9"></path>
      </svg>
    )
  },
  {
    id: 'shield',
    left: '65%',
    delay: 0.0,
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0B243B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    id: 'water',
    left: '85%',
    delay: 0.2,
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00A9F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
    )
  }
];

const Splash = ({ onFinish }) => {
  const { language } = useTranslation();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const tLocal = (key) => {
    const langData = splashTranslations[language] || splashTranslations['en'];
    return langData[key] || splashTranslations['en'][key];
  };

  useEffect(() => {
    // Trigger the falling icons exit animation at 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Complete the splash screen and navigate at 3.5 seconds
    const navTimer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      } else {
        navigate('/', { replace: true });
      }
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, onFinish]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Expanding Pulsing Concentric Circles (Sonar/Radar Effect) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-[2px] border-[#00A9F7]"
            initial={{ width: 80, height: 80, opacity: 0.6 }}
            animate={{ width: 1000, height: 1000, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Center Logo with Bounce Entry */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <img 
            src="https://i.postimg.cc/PrDX9Wtm/photo-6066349669190669559-y-removebg-preview.png" 
            alt="JanNigrani Logo" 
            className="w-28 h-28 object-contain mb-2"
          />
          <h1 className="font-serif text-4xl font-black text-[#0B243B] tracking-tight">
            JanNigrani
          </h1>
        </motion.div>
      </div>

      {/* Falling Icons Exit Transition */}
      <AnimatePresence>
        {isExiting && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {FallingIcons.map((item) => (
              <motion.div
                key={item.id}
                initial={{ y: -150, opacity: 1 }}
                animate={{ y: window.innerHeight + 150 }}
                transition={{ 
                  duration: 0.7, 
                  ease: "easeIn", 
                  delay: item.delay 
                }}
                className="absolute flex flex-col items-center"
                style={{ left: item.left }}
              >
                {/* Speed lines effect representing fast falling */}
                <div className="w-0.5 h-12 bg-gray-200 mb-2 rounded-full opacity-50"></div>
                <div className="w-0.5 h-8 bg-gray-200 mb-4 rounded-full opacity-30"></div>
                {item.svg}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Center Translated Tagline */}
      <div className="absolute bottom-12 w-full text-center z-10">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-500 font-bold text-sm md:text-base tracking-widest uppercase"
        >
          {tLocal('tagline')}
        </motion.p>
      </div>
      
    </div>
  );
};

export default Splash;