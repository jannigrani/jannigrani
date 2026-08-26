import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useTranslation } from '../../contexts/LanguageContext';

const authTranslations = {
  en: { loginTitle: "Login", signupTitle: "Create Account", email: "Email Address", password: "Password", submitLogin: "Login", submitSignup: "Sign Up", google: "Continue with Google", toSignup: "New here? Create Account", toLogin: "Have an account? Login", or: "OR", wait: "Please wait...", err: "Action failed. Please check details." },
  hi: { loginTitle: "लॉगिन", signupTitle: "खाता बनाएं", email: "ईमेल", password: "पासवर्ड", submitLogin: "लॉगिन करें", submitSignup: "साइन अप करें", google: "Google के साथ जारी रखें", toSignup: "नया खाता बनाएं", toLogin: "पहले से खाता है? लॉगिन करें", or: "या", wait: "कृपया प्रतीक्षा करें...", err: "कार्रवाई विफल रही। पुनः प्रयास करें।" },
  mr: { loginTitle: "लॉगिन", signupTitle: "खाते तयार करा", email: "ईमेल", password: "पासवर्ड", submitLogin: "लॉगिन करा", submitSignup: "साइन अप करा", google: "Google सह सुरू ठेवा", toSignup: "नवीन खाते तयार करा", toLogin: "खाते आहे? लॉगिन करा", or: "किंवा", wait: "कृपया प्रतीक्षा करा...", err: "क्रिया अयशस्वी. पुन्हा प्रयत्न करा." },
  bn: { loginTitle: "লগইন", signupTitle: "অ্যাকাউন্ট তৈরি করুন", email: "ইমেইল", password: "পাসওয়ার্ড", submitLogin: "লগইন করুন", submitSignup: "সাইন আপ করুন", google: "Google এর সাথে চালিয়ে যান", toSignup: "নতুন অ্যাকাউন্ট তৈরি করুন", toLogin: "অ্যাকাউন্ট আছে? লগইন করুন", or: "অথবা", wait: "অনুগ্রহ করে অপেক্ষা করুন...", err: "ব্যর্থ হয়েছে। আবার চেষ্টা করুন।" },
  te: { loginTitle: "లాగిన్", signupTitle: "ఖాతా సృష్టించండి", email: "ఇమెయిల్", password: "పాస్‌వర్డ్", submitLogin: "లాగిన్ చేయండి", submitSignup: "సైన్ అప్ చేయండి", google: "Google తో కొనసాగించండి", toSignup: "కొత్త ఖాతా సృష్టించండి", toLogin: "ఖాతా ఉందా? లాగిన్ చేయండి", or: "లేదా", wait: "దయచేసి వేచి ఉండండి...", err: "విఫలమైంది. మళ్లీ ప్రయత్నించండి." },
  ta: { loginTitle: "உள்நுழைக", signupTitle: "கணக்கை உருவாக்கு", email: "மின்னஞ்சல்", password: "கடவுச்சொல்", submitLogin: "உள்நுழைக", submitSignup: "பதிவு செய்க", google: "Google உடன் தொடரவும்", toSignup: "புதிய கணக்கை உருவாக்கு", toLogin: "கணக்கு உள்ளதா? உள்நுழைக", or: "அல்லது", wait: "காத்திருக்கவும்...", err: "தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்." },
  gu: { loginTitle: "લૉગિન", signupTitle: "એકાઉન્ટ બનાવો", email: "ઈમેલ", password: "પાસવર્ડ", submitLogin: "લૉગિન કરો", submitSignup: "સાઇન અપ કરો", google: "Google સાથે ચાલુ રાખો", toSignup: "નવું એકાઉન્ટ બનાવો", toLogin: "એકાઉન્ટ છે? લૉગિન કરો", or: "અથવા", wait: "કૃપા કરીને રાહ જુઓ...", err: "નિષ્ફળ ગયું. ફરી પ્રયાસ કરો." },
  ur: { loginTitle: "لاگ ان", signupTitle: "اکاؤنٹ بنائیں", email: "ای میل", password: "پاس ورڈ", submitLogin: "لاگ ان کریں", submitSignup: "سائن اپ کریں", google: "Google کے ساتھ جاری رکھیں", toSignup: "نیا اکاؤنٹ بنائیں", toLogin: "اکاؤنٹ ہے؟ لاگ ان کریں", or: "یا", wait: "براہ کرم انتظار کریں...", err: "ناکام ہو گیا۔ دوبارہ کوشش کریں۔" },
  kn: { loginTitle: "ಲಾಗಿನ್", signupTitle: "ಖಾತೆ ರಚಿಸಿ", email: "ಇಮೇಲ್", password: "ಪಾಸ್ವರ್ಡ್", submitLogin: "ಲಾಗಿನ್ ಮಾಡಿ", submitSignup: "ಸೈನ್ ಅಪ್ ಮಾಡಿ", google: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ", toSignup: "ಹೊಸ ಖಾತೆ ರಚಿಸಿ", toLogin: "ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಮಾಡಿ", or: "ಅಥವಾ", wait: "ದಯವಿಟ್ಟು ಕಾಯಿರಿ...", err: "ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." },
  or: { loginTitle: "ଲଗଇନ୍", signupTitle: "ଆକାଉଣ୍ଟ୍ ତିଆରି କରନ୍ତୁ", email: "ଇମେଲ୍", password: "ପାସୱାର୍ଡ", submitLogin: "ଲଗଇନ୍ କରନ୍ତୁ", submitSignup: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ", google: "Google ସହିତ ଆଗକୁ ବଢନ୍ତୁ", toSignup: "ନୂଆ ଆକାଉଣ୍ଟ୍ ତିଆରି କରନ୍ତୁ", toLogin: "ଆକାଉଣ୍ଟ୍ ଅଛି? ଲଗଇନ୍ କରନ୍ତୁ", or: "କିମ୍ବା", wait: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...", err: "ବିଫଳ ହେଲା। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।" },
  ml: { loginTitle: "ലോഗിൻ", signupTitle: "അക്കൗണ്ട് സൃഷ്ടിക്കുക", email: "ഇമെയിൽ", password: "പാസ്‌വേഡ്", submitLogin: "ലോഗിൻ ചെയ്യുക", submitSignup: "സൈൻ അപ്പ് ചെയ്യുക", google: "Google ഉപയോഗിച്ച് തുടരുക", toSignup: "പുതിയ അക്കൗണ്ട് സൃഷ്ടിക്കുക", toLogin: "അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ ചെയ്യുക", or: "അല്ലെങ്കിൽ", wait: "ദയവായി കാത്തിരിക്കുക...", err: "പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക." },
  pa: { loginTitle: "ਲਾਗਇਨ", signupTitle: "ਖਾਤਾ ਬਣਾਓ", email: "ਈਮੇਲ", password: "ਪਾਸਵਰਡ", submitLogin: "ਲਾਗਇਨ ਕਰੋ", submitSignup: "ਸਾਈਨ ਅੱਪ ਕਰੋ", google: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ", toSignup: "ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ", toLogin: "ਖਾਤਾ ਹੈ? ਲਾਗਇਨ ਕਰੋ", or: "ਜਾਂ", wait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...", err: "ਅਸਫਲ ਰਿਹਾ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" },
  as: { loginTitle: "লগইন", signupTitle: "একাউণ্ট বনাওক", email: "ইমেইল", password: "পাছৱৰ্ড", submitLogin: "লগইন কৰক", submitSignup: "চাইন আপ কৰক", google: "Google ৰ সৈতে আগবাঢ়ক", toSignup: "নতুন একাউণ্ট বনাওক", toLogin: "একাউণ্ট আছে? লগইন কৰক", or: "বা", wait: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...", err: "ব্যৰ্থ হৈছে। পুনৰ চেষ্টা কৰক।" }
};

const AuthModal = () => {
  const { language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tLocal = (key) => {
    const langData = authTranslations[language] || authTranslations['en'];
    return langData[key] || authTranslations['en'][key];
  };

  useEffect(() => {
    // Listen for the custom event dispatched from the Header
    const handleOpen = () => {
      setIsOpen(true);
      setError('');
      setEmail('');
      setPassword('');
      setIsLogin(true);
    };
    window.addEventListener('openAuthModal', handleOpen);
    return () => window.removeEventListener('openAuthModal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const auth = getAuth();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setError(tLocal('err'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setError(tLocal('err'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[32px] shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="font-serif text-3xl font-black text-center text-[#0B243B] mb-8">
              {isLogin ? tLocal('loginTitle') : tLocal('signupTitle')}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="flex flex-col space-y-4">
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tLocal('email')}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-5 py-4 focus:outline-none focus:border-[#00A9F7] focus:bg-white transition-colors"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tLocal('password')}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-5 py-4 focus:outline-none focus:border-[#00A9F7] focus:bg-white transition-colors"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1C1C1E] text-white rounded-xl py-4 font-bold text-base transition-all hover:bg-black disabled:opacity-50 mt-2"
              >
                {loading ? tLocal('wait') : (isLogin ? tLocal('submitLogin') : tLocal('submitSignup'))}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-xs font-bold text-gray-400">{tLocal('or')}</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button 
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-100 text-gray-800 rounded-xl py-4 font-bold text-base flex items-center justify-center space-x-3 transition-all hover:bg-gray-50 hover:border-gray-200 disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{tLocal('google')}</span>
            </button>

            <div className="mt-8 text-center">
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-sm font-bold text-gray-500 hover:text-[#0B243B] transition-colors"
              >
                {isLogin ? tLocal('toSignup') : tLocal('toLogin')}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;