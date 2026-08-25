import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../config/firebase';

const translations = {
  en: { authError: 'Could not connect. Please check your internet.' },
  hi: { authError: 'जुड़ नहीं सका। कृपया अपना इंटरनेट जांचें।' },
  bn: { authError: 'সংযোগ করা যায়নি। আপনার ইন্টারনেট চেক করুন।' },
  te: { authError: 'కనెక్ట్ కాలేదు. దయచేసి మీ ఇంటర్నెట్ తనిఖీ చేయండి.' },
  mr: { authError: 'जोडता आले नाही. कृपया तुमचे इंटरनेट तपासा.' },
  ta: { authError: 'இணைய முடியவில்லை. உங்கள் இணையத்தை சரிபார்க்கவும்.' },
  gu: { authError: 'જોડાઈ શક્યા નહીં. કૃપા કરીને તમારું ઇન્ટરનેટ તપાસો.' },
  kn: { authError: 'ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ.' },
  or: { authError: 'ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।' },
  ml: { authError: 'ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല. നിങ്ങളുടെ ഇന്റർനെറ്റ് പരിശോധിക്കുക.' },
  pa: { authError: 'ਜੁੜ ਨਹੀਂ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਚੈੱਕ ਕਰੋ।' },
  as: { authError: 'সংযোগ কৰিব পৰা নগ’ল। অনুগ্ৰহ কৰি আপোনাৰ ইণ্টাৰনেট পৰীক্ষা কৰক।' },
  ur: { authError: 'منسلک نہیں ہو سکا۔ براہ کرم اپنا انٹرنیٹ چیک کریں۔' }
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
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};