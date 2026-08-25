import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import pb from '../../config/pocketbase';
import PillButton from '../../components/ui/PillButton';
import { useTranslation } from '../../contexts/LanguageContext';

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

const translations = {
  en: {
    locationError: 'Cannot find location. Allow location access.',
    noLocation: 'Your phone cannot find location.',
    submitError: 'Failed to send. Try again.',
    step1Title: 'What is the problem?',
    pollution: 'Dirt or Pollution',
    safety: 'Danger or Risk',
    civic: 'Broken Public Property',
    step2Title: 'Add a Photo',
    step2Desc: 'Show us the problem clearly.',
    continueBtn: 'Next Step',
    step3Title: 'Your Location',
    step3Desc: 'Tell us where the problem is.',
    loadingLocation: 'Finding location...',
    getLocation: 'Get My Location',
    step4Title: 'Ready to Send',
    step4Desc: 'Your report is ready. Thank you for helping.',
    loadingSaving: 'Sending...',
    submitBtn: 'Send Now'
  },
  hi: {
    locationError: 'लोकेशन नहीं मिली। कृपया अनुमति दें।',
    noLocation: 'आपका फोन लोकेशन नहीं ढूंढ सकता।',
    submitError: 'भेजने में विफल। पुनः प्रयास करें।',
    step1Title: 'समस्या क्या है?',
    pollution: 'गंदगी या प्रदूषण',
    safety: 'खतरा या जोखिम',
    civic: 'टूटी हुई सरकारी संपत्ति',
    step2Title: 'फोटो जोड़ें',
    step2Desc: 'हमें समस्या दिखाएं।',
    continueBtn: 'अगला कदम',
    step3Title: 'आपका स्थान',
    step3Desc: 'हमें बताएं कि समस्या कहां है।',
    loadingLocation: 'स्थान ढूंढ रहे हैं...',
    getLocation: 'मेरा स्थान प्राप्त करें',
    step4Title: 'भेजने के लिए तैयार',
    step4Desc: 'आपकी रिपोर्ट तैयार है। मदद के लिए धन्यवाद।',
    loadingSaving: 'भेज रहे हैं...',
    submitBtn: 'अभी भेजें'
  },
  bn: {
    locationError: 'অবস্থান পাওয়া যায়নি। অনুমতি দিন।',
    noLocation: 'আপনার ফোন অবস্থান খুঁজে পাচ্ছে না।',
    submitError: 'পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
    step1Title: 'সমস্যা কি?',
    pollution: 'ময়লা বা দূষণ',
    safety: 'বিপদ বা ঝুঁকি',
    civic: 'ভাঙ্গা সরকারি সম্পত্তি',
    step2Title: 'ছবি যোগ করুন',
    step2Desc: 'আমাদের সমস্যা দেখান।',
    continueBtn: 'পরবর্তী ধাপ',
    step3Title: 'আপনার অবস্থান',
    step3Desc: 'সমস্যা কোথায় আমাদের বলুন।',
    loadingLocation: 'অবস্থান খোঁজা হচ্ছে...',
    getLocation: 'আমার অবস্থান নিন',
    step4Title: 'পাঠাতে প্রস্তুত',
    step4Desc: 'আপনার রিপোর্ট প্রস্তুত। সাহায্যের জন্য ধন্যবাদ।',
    loadingSaving: 'পাঠানো হচ্ছে...',
    submitBtn: 'এখন পাঠান'
  },
  te: {
    locationError: 'స్థానం కనుగొనబడలేదు. అనుమతి ఇవ్వండి.',
    noLocation: 'మీ ఫోన్ స్థానాన్ని కనుగొనలేకపోయింది.',
    submitError: 'పంపడం విఫలమైంది. మళ్ళీ ప్రయత్నించండి.',
    step1Title: 'సమస్య ఏమిటి?',
    pollution: 'మురికి లేదా కాలుష్యం',
    safety: 'ప్రమాదం లేదా రిస్క్',
    civic: 'విరిగిన ప్రభుత్వ ఆస్తి',
    step2Title: 'ఫోటోను జోడించండి',
    step2Desc: 'మాకు సమస్యను చూపించండి.',
    continueBtn: 'తదుపరి దశ',
    step3Title: 'మీ స్థానం',
    step3Desc: 'సమస్య ఎక్కడ ఉందో చెప్పండి.',
    loadingLocation: 'స్థానాన్ని కనుగొంటుంది...',
    getLocation: 'నా స్థానాన్ని పొందండి',
    step4Title: 'పంపడానికి సిద్ధంగా ఉంది',
    step4Desc: 'మీ నివేదిక సిద్ధంగా ఉంది. సహాయం చేసినందుకు ధన్యవాదాలు.',
    loadingSaving: 'పంపుతోంది...',
    submitBtn: 'ఇప్పుడే పంపండి'
  },
  mr: {
    locationError: 'स्थान सापडले नाही. परवानगी द्या.',
    noLocation: 'तुमचा फोन स्थान शोधू शकत नाही.',
    submitError: 'पाठवणे अयशस्वी. पुन्हा प्रयत्न करा.',
    step1Title: 'समस्या काय आहे?',
    pollution: 'घाण किंवा प्रदूषण',
    safety: 'धोका किंवा जोखीम',
    civic: 'तुटलेली सरकारी मालमत्ता',
    step2Title: 'फोटो जोडा',
    step2Desc: 'आम्हाला समस्या दाखवा.',
    continueBtn: 'पुढची पायरी',
    step3Title: 'तुमचे स्थान',
    step3Desc: 'समस्या कुठे आहे ते सांगा.',
    loadingLocation: 'स्थान शोधत आहे...',
    getLocation: 'माझे स्थान मिळवा',
    step4Title: 'पाठवण्यासाठी तयार',
    step4Desc: 'तुमचा अहवाल तयार आहे. मदतीसाठी धन्यवाद.',
    loadingSaving: 'पाठवत आहे...',
    submitBtn: 'आता पाठवा'
  },
  ta: {
    locationError: 'இடத்தை கண்டுபிடிக்க முடியவில்லை. அனுமதி கொடுங்கள்.',
    noLocation: 'உங்கள் போன் இடத்தை கண்டுபிடிக்கவில்லை.',
    submitError: 'அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    step1Title: 'பிரச்சனை என்ன?',
    pollution: 'குப்பை அல்லது மாசு',
    safety: 'ஆபத்து',
    civic: 'உடைந்த பொது சொத்து',
    step2Title: 'புகைப்படம் சேர்க்கவும்',
    step2Desc: 'பிரச்சனையை எங்களுக்கு காட்டுங்கள்.',
    continueBtn: 'அடுத்த படி',
    step3Title: 'உங்கள் இடம்',
    step3Desc: 'பிரச்சனை எங்கே என்று சொல்லுங்கள்.',
    loadingLocation: 'இடத்தை தேடுகிறது...',
    getLocation: 'என் இடத்தை எடு',
    step4Title: 'அனுப்ப தயார்',
    step4Desc: 'உங்கள் புகார் தயார். உதவிக்கு நன்றி.',
    loadingSaving: 'அனுப்புகிறது...',
    submitBtn: 'இப்போது அனுப்பு'
  },
  gu: {
    locationError: 'સ્થાન મળ્યું નથી. પરવાનગી આપો.',
    noLocation: 'તમારો ફોન સ્થાન શોધી શકતો નથી.',
    submitError: 'મોકલવામાં નિષ્ફળ. ફરી પ્રયાસ કરો.',
    step1Title: 'સમ સમસ્યા શું છે?',
    pollution: 'ગંદકી અથવા પ્રદૂષણ',
    safety: 'ખતરો અથવા જોખમ',
    civic: 'તૂટેલી સરકારી મિલકત',
    step2Title: 'ફોટો ઉમેરો',
    step2Desc: 'અમને સમસ્યા બતાવો.',
    continueBtn: 'આગળનું પગલું',
    step3Title: 'તમારું સ્થાન',
    step3Desc: 'સમ સમસ્યા ક્યાં છે તે કહો.',
    loadingLocation: 'સ્થાન શોધી રહ્યા છીએ...',
    getLocation: 'મારું સ્થાન મેળવો',
    step4Title: 'મોકલવા માટે તૈયાર',
    step4Desc: 'તમારો રિપોર્ટ તૈયાર છે. મદદ માટે આભાર.',
    loadingSaving: 'મોકલી રહ્યા છીએ...',
    submitBtn: 'હવે મોકલો'
  },
  kn: {
    locationError: 'ಸ್ಥಳ ಸಿಗುತ್ತಿಲ್ಲ. ಅನುಮತಿ ನೀಡಿ.',
    noLocation: 'ನಿಮ್ಮ ಫೋನ್ ಸ್ಥಳವನ್ನು ಹುಡುಕಲು ಸಾಧ್ಯವಿಲ್ಲ.',
    submitError: 'ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    step1Title: 'ಸಮಸ್ಯೆ ಏನು?',
    pollution: 'ಕೊಳಕು ಅಥವಾ ಮಾಲಿನ್ಯ',
    safety: 'ಅಪಾಯ',
    civic: 'ಒಡೆದ ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ',
    step2Title: 'ಫೋಟೋ ಸೇರಿಸಿ',
    step2Desc: 'ನಮಗೆ ಸಮಸ್ಯೆ ತೋರಿಸಿ.',
    continueBtn: 'ಮುಂದಿನ ಹಂತ',
    step3Title: 'ನಿಮ್ಮ ಸ್ಥಳ',
    step3Desc: 'ಸಮಸ್ಯೆ ಎಲ್ಲಿದೆ ಎಂದು ತಿಳಿಸಿ.',
    loadingLocation: 'ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
    getLocation: 'ನನ್ನ ಸ್ಥಳ ಪಡೆಯಿರಿ',
    step4Title: 'ಕಳುಹಿಸಲು ಸಿದ್ಧವಾಗಿದೆ',
    step4Desc: 'ನಿಮ್ಮ ವರದಿ ಸಿದ್ಧವಾಗಿದೆ. ಸಹಾಯಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.',
    loadingSaving: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    submitBtn: 'ಈಗ ಕಳುಹಿಸಿ'
  },
  or: {
    locationError: 'ସ୍ଥାନ ମିଳିଲା ନାହିଁ। ଅନୁମତି ଦିଅନ୍ତୁ।',
    noLocation: 'ଆପଣଙ୍କ ଫୋନ୍ ସ୍ଥାନ ଖୋଜିପାରିବ ନାହିଁ।',
    submitError: 'ପଠାଇବାରେ ବିଫଳ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
    step1Title: 'ସମସ୍ୟା କଣ?',
    pollution: 'ମଇଳା କିମ୍ବା ପ୍ରଦୂଷଣ',
    safety: 'ବିପଦ କିମ୍ବା ରିସ୍କ',
    civic: 'ଭଙ୍ଗା ସରକାରୀ ସମ୍ପତ୍ତି',
    step2Title: 'ଫଟୋ ଯୋଡନ୍ତୁ',
    step2Desc: 'ଆମକୁ ସମସ୍ୟା ଦେଖାନ୍ତୁ।',
    continueBtn: 'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ',
    step3Title: 'ଆପଣଙ୍କ ସ୍ଥାନ',
    step3Desc: 'ସମସ୍ୟା କେଉଁଠାରେ ଅଛି କୁହନ୍ତୁ।',
    loadingLocation: 'ସ୍ଥାନ ଖୋଜୁଛି...',
    getLocation: 'ମୋର ସ୍ଥାନ ନିଅନ୍ତୁ',
    step4Title: 'ପଠାଇବାକୁ ପ୍ରସ୍ତୁତ',
    step4Desc: 'ଆପଣଙ୍କ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ ଅଛି। ସାହାଯ୍ୟ ପାଇଁ ଧନ୍ୟବାଦ।',
    loadingSaving: 'ପଠାଯାଉଛି...',
    submitBtn: 'ଏବେ ପଠାନ୍ତୁ'
  },
  ml: {
    locationError: 'സ്ഥലം കണ്ടെത്താനായില്ല. അനുമതി നൽകുക.',
    noLocation: 'നിങ്ങളുടെ ഫോണിന് സ്ഥലം കണ്ടെത്താനാകുന്നില്ല.',
    submitError: 'അയയ്ക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
    step1Title: 'എന്താണ് പ്രശ്നം?',
    pollution: 'അഴുക്ക് അല്ലെങ്കിൽ മലിനീകരണം',
    safety: 'അപകടം അല്ലെങ്കിൽ സാധ്യത',
    civic: 'തകർന്ന പൊതു സ്വത്ത്',
    step2Title: 'ഫോട്ടോ ചേർക്കുക',
    step2Desc: 'ഞങ്ങൾക്ക് പ്രശ്നം കാണിച്ചുതരിക.',
    continueBtn: 'അടുത്ത ഘട്ടം',
    step3Title: 'നിങ്ങളുടെ സ്ഥലം',
    step3Desc: 'പ്രശ്നം എവിടെയാണെന്ന് പറയുക.',
    loadingLocation: 'സ്ഥലം തിരയുന്നു...',
    getLocation: 'എന്റെ സ്ഥലം എടുക്കുക',
    step4Title: 'അയയ്ക്കാൻ തയ്യാറാണ്',
    step4Desc: 'നിങ്ങളുടെ റിപ്പോർട്ട് തയ്യാറാണ്. സഹായത്തിന് നന്ദി.',
    loadingSaving: 'അയയ്ക്കുന്നു...',
    submitBtn: 'ഇപ്പോൾ അയയ്ക്കുക'
  },
  pa: {
    locationError: 'ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਮਿਲੀ। ਇਜਾਜ਼ਤ ਦਿਓ।',
    noLocation: 'ਤੁਹਾਡਾ ਫੋਨ ਲੋਕੇਸ਼ਨ ਨਹੀਂ ਲੱਭ ਸਕਦਾ।',
    submitError: 'ਭੇਜਣ ਵਿੱਚ ਅਸਫਲ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    step1Title: 'ਸਮੱਸਿਆ ਕੀ ਹੈ?',
    pollution: 'ਗੰਦਗੀ ਜਾਂ ਪ੍ਰਦੂਸ਼ਣ',
    safety: 'ਖਤਰਾ ਜਾਂ ਜੋਖਮ',
    civic: 'ਟੁੱਟੀ ਸਰਕਾਰੀ ਜਾਇਦਾਦ',
    step2Title: 'ਫੋਟੋ ਜੋੜੋ',
    step2Desc: 'ਸਾਨੂੰ ਸਮੱਸਿਆ ਦਿਖਾਓ।',
    continueBtn: 'ਅਗਲਾ ਕਦਮ',
    step3Title: 'ਤੁਹਾਡੀ ਲੋਕੇਸ਼ਨ',
    step3Desc: 'ਸਾਨੂੰ ਦੱਸੋ ਸਮੱਸਿਆ ਕਿੱਥੇ ਹੈ।',
    loadingLocation: 'ਲੋਕੇਸ਼ਨ ਲੱਭ ਰਹੇ ਹਾਂ...',
    getLocation: 'ਮੇਰੀ ਲੋਕੇਸ਼ਨ ਲਵੋ',
    step4Title: 'ਭੇਜਣ ਲਈ ਤਿਆਰ',
    step4Desc: 'ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਤਿਆਰ ਹੈ। ਮਦਦ ਲਈ ਧੰਨਵਾਦ।',
    loadingSaving: 'ਭੇਜ ਰਹੇ ਹਾਂ...',
    submitBtn: 'ਹੁਣੇ ਭੇਜੋ'
  },
  as: {
    locationError: 'অৱস্থান পোৱা নগ’ল। অনুমতি দিয়ক।',
    noLocation: 'আপোনাৰ ফোনে অৱস্থান বিচাৰিব নোৱাৰে।',
    submitError: 'পঠোৱাত বিফল হৈছে। পুনৰ চেষ্টা কৰক।',
    step1Title: 'সমস্যাটো কি?',
    pollution: 'লেতেৰা বা প্ৰদূষণ',
    safety: 'বিপদ বা শংকা',
    civic: 'ভঙা চৰকাৰী সম্পত্তি',
    step2Title: 'ফটো যোগ কৰক',
    step2Desc: 'আমাৰ সমস্যাটো দেখুৱাওক।',
    continueBtn: 'পৰৱৰ্তী পদক্ষেপ',
    step3Title: 'আপোনাৰ অৱস্থান',
    step3Desc: 'সমস্যাটো ক’ত আছে আমাক জনাওক।',
    loadingLocation: 'অৱস্থান বিচাৰি থকা হৈছে...',
    getLocation: 'মোৰ অৱস্থান লওক',
    step4Title: 'পঠাবলৈ প্ৰস্তুত',
    step4Desc: 'আপোনাৰ ৰিপৰ্ট প্ৰস্তুত আছে। সহায়ৰ বাবে ধন্যবাদ।',
    loadingSaving: 'পঠাই থকা হৈছে...',
    submitBtn: 'এতিয়া পঠাওক'
  },
  ur: {
    locationError: 'مقام نہیں ملا۔ براہ کرم اجازت دیں۔',
    noLocation: 'آپ کا فون مقام تلاش نہیں کر سکتا۔',
    submitError: 'بھیجنے میں ناکام۔ دوبارہ کوشش کریں۔',
    step1Title: 'مسئلہ کیا ہے؟',
    pollution: 'گندگی یا آلودگی',
    safety: 'خطرہ یا رسک',
    civic: 'ٹوٹی ہوئی سرکاری جائیداد',
    step2Title: 'تصویر شامل کریں',
    step2Desc: 'ہمیں مسئلہ دکھائیں۔',
    continueBtn: 'اگلا قدم',
    step3Title: 'آپ کا مقام',
    step3Desc: 'ہمیں بتائیں کہ مسئلہ کہاں ہے۔',
    loadingLocation: 'مقام تلاش کر رہا ہے...',
    getLocation: 'میرا مقام حاصل کریں',
    step4Title: 'بھیجنے کے لیے تیار',
    step4Desc: 'آپ کی رپورٹ تیار ہے۔ مدد کے لیے شکریہ۔',
    loadingSaving: 'بھیج رہا ہے...',
    submitBtn: 'ابھی بھیجیں'
  }
};

const ReportWizard = () => {
  // FIXED: Changed useLanguage to useTranslation to match the imported context
  const { language } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Real form data state
  const [category, setCategory] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [location, setLocation] = useState(null);

  const t = (key) => translations[language]?.[key] || translations['en'][key];

  // Step 1: Category Selection
  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setStep(2);
  };

  // Step 2: Media Upload Preparation
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  // Step 3: Real Device Geolocation
  const getLocation = () => {
    setIsProcessing(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsProcessing(false);
          setStep(4);
        },
        (error) => {
          console.error(error);
          setIsProcessing(false);
          alert(t('locationError'));
        }
      );
    } else {
      setIsProcessing(false);
      alert(t('noLocation'));
    }
  };

  // Step 4: Final Real Submission (PocketBase + Firestore)
  const submitReport = async () => {
    setIsProcessing(true);
    try {
      let fileUrl = '';
      
      // 1. Upload actual file to PocketBase
      if (mediaFile) {
        const formData = new FormData();
        formData.append('file', mediaFile);
        const record = await pb.collection('attachments').create(formData);
        fileUrl = `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${record.file}`;
      }

      // 2. Save complete record to Firebase
      await addDoc(collection(db, 'reports'), {
        category: category,
        mediaUrl: fileUrl,
        latitude: location?.lat || 0,
        longitude: location?.lng || 0,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      setIsProcessing(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert(t('submitError'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full relative h-[600px] flex flex-col bg-white rounded-3xl shadow-floating-card overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="bg-citizenNavy h-2 transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="flex-grow relative p-8">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-4">
                  {t('step1Title')}
                </h2>
                <button onClick={() => handleCategorySelect('pollution')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('pollution')}
                </button>
                <button onClick={() => handleCategorySelect('safety')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('safety')}
                </button>
                <button onClick={() => handleCategorySelect('civic')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('civic')}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step2Title')}
                </h2>
                <p className="text-gray-500 mb-6">{t('step2Desc')}</p>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                
                <PillButton onClick={() => setStep(3)} className="w-full mt-auto">
                  {t('continueBtn')}
                </PillButton>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step3Title')}
                </h2>
                <p className="text-gray-500 mb-8">{t('step3Desc')}</p>
                
                <PillButton onClick={getLocation} className="w-full">
                  {isProcessing ? t('loadingLocation') : t('getLocation')}
                </PillButton>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step4Title')}
                </h2>
                <p className="text-gray-500 mb-8">{t('step4Desc')}</p>
                
                <PillButton onClick={submitReport} className="w-full bg-nigraniBlue">
                  {isProcessing ? t('loadingSaving') : t('submitBtn')}
                </PillButton>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReportWizard;