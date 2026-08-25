import React, { createContext, useState, useContext } from 'react';

// Massive manual dictionary for 13+ Indian Languages (Simple Terms)
const dictionaries = {
  en: {
    homeTitle: "Make an Impact",
    report: "Report",
    pollution: "Pollution",
    safety: "Safety",
    civic: "Civic",
    continue: "Continue",
    supportThis: "Support This",
    verified: "Verified",
    loading: "Loading...",
    back: "Go Back"
  },
  hi: {
    homeTitle: "प्रभाव डालें",
    report: "रिपोर्ट करें",
    pollution: "प्रदूषण",
    safety: "सुरक्षा",
    civic: "नागरिक",
    continue: "आगे बढ़ें",
    supportThis: "समर्थन करें",
    verified: "सत्यापित",
    loading: "लोड हो रहा है...",
    back: "वापस जाएं"
  },
  mr: {
    homeTitle: "प्रभाव पाडा",
    report: "अहवाल द्या",
    pollution: "प्रदूषण",
    safety: "सुरक्षा",
    civic: "नागरी",
    continue: "पुढे जा",
    supportThis: "याला पाठिंबा द्या",
    verified: "सत्यापित",
    loading: "लोड होत आहे...",
    back: "मागे जा"
  },
  bn: {
    homeTitle: "প্রভাব ফেলুন",
    report: "রিপোর্ট করুন",
    pollution: "দূষণ",
    safety: "নিরাপত্তা",
    civic: "নাগরিক",
    continue: "চালিয়ে যান",
    supportThis: "সমর্থন করুন",
    verified: "যাচাইকৃত",
    loading: "লোড হচ্ছে...",
    back: "ফিরে যান"
  },
  te: {
    homeTitle: "ప్రభావం చూపండి",
    report: "నివేదించండి",
    pollution: "కాలుష్యం",
    safety: "భద్రత",
    civic: "పౌర",
    continue: "కొనసాగించండి",
    supportThis: "మద్దతు ఇవ్వండి",
    verified: "ధృవీకరించబడింది",
    loading: "లోడ్ అవుతోంది...",
    back: "వెనుకకు"
  },
  ta: {
    homeTitle: "தாக்கத்தை ஏற்படுத்துங்கள்",
    report: "அறிக்கை",
    pollution: "மாசுபாடு",
    safety: "பாதுகாப்பு",
    civic: "குடிமை",
    continue: "தொடரவும்",
    supportThis: "ஆதரவு கொடுங்கள்",
    verified: "சரிபார்க்கப்பட்டது",
    loading: "ஏற்றுகிறது...",
    back: "திரும்பிச் செல்"
  },
  gu: {
    homeTitle: "પ્રભાવ પાડો",
    report: "રિપોર્ટ કરો",
    pollution: "પ્રદૂષણ",
    safety: "સુરક્ષા",
    civic: "નાગરિક",
    continue: "ચાલુ રાખો",
    supportThis: "આને ટેકો આપો",
    verified: "ચકાસાયેલ",
    loading: "લોડ થઈ રહ્યું છે...",
    back: "પાછા જાઓ"
  },
  ur: {
    homeTitle: "اثر ڈالیں",
    report: "رپورٹ کریں",
    pollution: "آلودگی",
    safety: "حفاظت",
    civic: "شہری",
    continue: "جاری رکھیں",
    supportThis: "اس کی حمایت کریں",
    verified: "تصدیق شدہ",
    loading: "لوڈ ہو رہا ہے...",
    back: "واپس جائیں"
  },
  kn: {
    homeTitle: "ಪರಿಣಾಮ ಬೀರಿ",
    report: "ವರದಿ ಮಾಡಿ",
    pollution: "ಮಾಲಿನ್ಯ",
    safety: "ಸುರಕ್ಷತೆ",
    civic: "ನಾಗರಿಕ",
    continue: "ಮುಂದುವರಿಸಿ",
    supportThis: "ಬೆಂಬಲಿಸಿ",
    verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    back: "ಹಿಂದೆ ಹೋಗಿ"
  },
  or: {
    homeTitle: "ପ୍ରଭାବ ପକାନ୍ତୁ",
    report: "ରିପୋର୍ଟ କରନ୍ତୁ",
    pollution: "ପ୍ରଦୂଷଣ",
    safety: "ସୁରକ୍ଷା",
    civic: "ନାଗରିକ",
    continue: "ଆଗକୁ ବଢନ୍ତୁ",
    supportThis: "ସମର୍ଥନ କରନ୍ତୁ",
    verified: "ଯାଞ୍ଚ ହୋଇଛି",
    loading: "ଲୋଡ୍ ହେଉଛି...",
    back: "ଫେରିଯାଆନ୍ତୁ"
  },
  ml: {
    homeTitle: "സ്വാധീനം ചെലുത്തുക",
    report: "റിപ്പോർട്ട് ചെയ്യുക",
    pollution: "മലിനീകരണം",
    safety: "സുരക്ഷ",
    civic: "പൗരസമൂഹം",
    continue: "തുടരുക",
    supportThis: "പിന്തുണയ്ക്കുക",
    verified: "പരിശോധിച്ചു",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    back: "മടങ്ങുക"
  },
  pa: {
    homeTitle: "ਪ੍ਰਭਾਵ ਪਾਓ",
    report: "ਰਿਪੋਰਟ ਕਰੋ",
    pollution: "ਪ੍ਰਦੂਸ਼ਣ",
    safety: "ਸੁਰੱਖਿਆ",
    civic: "ਨਾਗਰਿਕ",
    continue: "ਜਾਰੀ ਰੱਖੋ",
    supportThis: "ਇਸਦਾ ਸਮਰਥਨ ਕਰੋ",
    verified: "ਤਸਦੀਕ ਕੀਤਾ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    back: "ਵਾਪਸ ਜਾਓ"
  },
  as: {
    homeTitle: "প্ৰভাৱ পেলাওক",
    report: "ৰিপৰ্ট কৰক",
    pollution: "প্ৰদূষণ",
    safety: "নিৰাপত্তা",
    civic: "নাগৰিক",
    continue: "চলাই যাওক",
    supportThis: "সমৰ্থন কৰক",
    verified: "সত্যাপন কৰা হ'ল",
    loading: "ল'ড হৈ আছে...",
    back: "উভতি যাওক"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (newLanguage) => {
    if (dictionaries[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key, fallbackText) => {
    // Return requested language text, OR english text, OR the fallback text
    return dictionaries[language]?.[key] || dictionaries['en']?.[key] || fallbackText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to replace useTranslation
export const useTranslation = () => {
  return useContext(LanguageContext);
};