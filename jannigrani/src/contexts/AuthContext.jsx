import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';

const translations = {
  en: { 
    authError: 'Could not connect. Please check your internet.',
    googleError: 'Google login failed. Please try again.'
  },
  hi: { 
    authError: 'जुड़ नहीं सका। कृपया अपना इंटरनेट जांचें।',
    googleError: 'गूगल से जुड़ना विफल रहा। फिर से प्रयास करें।'
  },
  bn: { 
    authError: 'সংযোগ করা যায়নি। আপনার ইন্টারনেট চেক করুন।',
    googleError: 'গুগল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।'
  },
  te: { 
    authError: 'కనెక్ట్ కాలేదు. దయచేసి మీ ఇంటర్నెట్ తనిఖీ చేయండి.',
    googleError: 'గూగుల్ లాగిన్ విఫలమైంది. మళ్ళీ ప్రయత్నించండి.'
  },
  mr: { 
    authError: 'जोडता आले नाही. कृपया तुमचे इंटरनेट तपासा.',
    googleError: 'गुगल लॉगिन अयशस्वी. पुन्हा प्रयत्न करा.'
  },
  ta: { 
    authError: 'இணைய முடியவில்லை. உங்கள் இணையத்தை சரிபார்க்கவும்.',
    googleError: 'கூகுள் நுழைவு தோல்வி. மீண்டும் முயற்சிக்கவும்.'
  },
  gu: { 
    authError: 'જોડાઈ શક્યા નહીં. કૃપા કરીને તમારું ઇન્ટરનેટ તપાસો.',
    googleError: 'ગૂગલ લોગિન નિષ્ફળ. ફરી પ્રયાસ કરો.'
  },
  kn: { 
    authError: 'ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ.',
    googleError: 'ಗೂಗಲ್ ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
  },
  or: { 
    authError: 'ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
    googleError: 'ଗୁଗୁଲ୍ ଲଗଇନ୍ ବିଫଳ ହେଲା। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।'
  },
  ml: { 
    authError: 'ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല. നിങ്ങളുടെ ഇന്റർനെറ്റ് പരിശോധിക്കുക.',
    googleError: 'ഗൂഗിൾ ലോഗിൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.'
  },
  pa: { 
    authError: 'ਜੁੜ ਨਹੀਂ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਚੈੱਕ ਕਰੋ।',
    googleError: 'ਗੂਗਲ ਲਾਗਇਨ ਫੇਲ੍ਹ ਹੋਇਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
  },
  as: { 
    authError: 'সংযোগ কৰিব পৰা নগ’ল। অনুগ্ৰহ কৰি আপোনাৰ ইণ্টাৰনেট পৰীক্ষা কৰক।',
    googleError: 'গুগল লগইন বিফল হৈছে। পুনৰ চেষ্টা কৰক।'
  },
  ur: { 
    authError: 'منسلک نہیں ہو سکا۔ براہ کرم اپنا انٹرنیٹ چیک کریں۔',
    googleError: 'گوگل لاگ ان ناکام ہو گیا۔ دوبارہ کوشش کریں۔'
  }
};

const getLocalLanguage = () => {
  try {
    return localStorage.getItem('language') || 'en';
  } catch {
    return 'en';
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).catch((error) => {
      console.error("Google sign in failed:", error);
      const lang = getLocalLanguage();
      const message = translations[lang]?.googleError || translations['en'].googleError;
      alert(message);
      throw error;
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is found (either logged in or anonymous guest)
        setCurrentUser(user);
        setLoading(false);
      } else {
        // No user found, create an automatic guest session
        signInAnonymously(auth).catch((error) => {
          console.error("Guest login failed:", error);
          const lang = getLocalLanguage();
          const message = translations[lang]?.authError || translations['en'].authError;
          alert(message);
          setLoading(false);
        });
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};