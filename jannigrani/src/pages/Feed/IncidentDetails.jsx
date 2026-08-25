import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../config/firebase';
import GlowingCard from '../../components/ui/GlowingCard';
import PillButton from '../../components/ui/PillButton';
import { useTranslation } from '../../contexts/LanguageContext';

const translations = {
  en: {
    loading: 'Loading details...',
    notFound: 'Report not found.',
    back: 'Go Back',
    noImage: 'No photo provided',
    impactScore: 'People Support This',
    saving: 'Saving...',
    supportThis: 'Support This',
    statusTitle: 'Current Status',
    location: 'Place Details',
    dateReported: 'Date Reported',
    pollution: 'Dirt or Pollution',
    safety: 'Danger or Risk',
    civic: 'Broken Public Property',
    pending: 'Waiting to be checked',
    Verified: 'Checked & True'
  },
  hi: {
    loading: 'जानकारी ला रहे हैं...',
    notFound: 'रिपोर्ट नहीं मिली।',
    back: 'पीछे जाएं',
    noImage: 'कोई फोटो नहीं',
    impactScore: 'लोगों का समर्थन',
    saving: 'सेव कर रहे हैं...',
    supportThis: 'समर्थन करें',
    statusTitle: 'वर्तमान स्थिति',
    location: 'जगह की जानकारी',
    dateReported: 'रिपोर्ट की तारीख',
    pollution: 'गंदगी या प्रदूषण',
    safety: 'खतरा या जोखिम',
    civic: 'टूटी हुई सरकारी संपत्ति',
    pending: 'जांच बाकी है',
    Verified: 'सही पाया गया'
  },
  bn: {
    loading: 'তথ্য আনা হচ্ছে...',
    notFound: 'রিপোর্ট পাওয়া যায়নি।',
    back: 'ফিরে যান',
    noImage: 'কোনো ছবি নেই',
    impactScore: 'মানুষের সমর্থন',
    saving: 'সেভ করা হচ্ছে...',
    supportThis: 'সমর্থন করুন',
    statusTitle: 'বর্তমান অবস্থা',
    location: 'জায়গার তথ্য',
    dateReported: 'রিপোর্টের তারিখ',
    pollution: 'ময়লা বা দূষণ',
    safety: 'বিপদ বা ঝুঁকি',
    civic: 'ভাঙ্গা সরকারি সম্পত্তি',
    pending: 'চেক করার অপেক্ষায়',
    Verified: 'সঠিক পাওয়া গেছে'
  },
  te: {
    loading: 'వివరాలు తీసుకువస్తున్నాము...',
    notFound: 'రిపోర్టు కనుగొనబడలేదు.',
    back: 'వెనుకకు వెళ్ళండి',
    noImage: 'ఫోటో లేదు',
    impactScore: 'ప్రజల మద్దతు',
    saving: 'సేవ్ అవుతోంది...',
    supportThis: 'మద్దతు ఇవ్వండి',
    statusTitle: 'ప్రస్తుత స్థితి',
    location: 'స్థలం వివరాలు',
    dateReported: 'రిపోర్టు తేదీ',
    pollution: 'మురికి లేదా కాలుష్యం',
    safety: 'ప్రమాదం లేదా రిస్క్',
    civic: 'విరిగిన ప్రభుత్వ ఆస్తి',
    pending: 'తనిఖీకి వేచి ఉంది',
    Verified: 'సరైనదిగా గుర్తించబడింది'
  },
  mr: {
    loading: 'माहिती आणत आहोत...',
    notFound: 'अहवाल सापडला नाही.',
    back: 'मागे जा',
    noImage: 'फोटो नाही',
    impactScore: 'लोकांचा पाठिंबा',
    saving: 'सेव्ह करत आहे...',
    supportThis: 'पाठिंबा द्या',
    statusTitle: 'सध्याची स्थिती',
    location: 'जागेची माहिती',
    dateReported: 'अहवालाची तारीख',
    pollution: 'घाण किंवा प्रदूषण',
    safety: 'धोका किंवा जोखीम',
    civic: 'तुटलेली सरकारी मालमत्ता',
    pending: 'तपासणी बाकी आहे',
    Verified: 'बरोबर आढळले'
  },
  ta: {
    loading: 'விவரங்கள் வருகின்றன...',
    notFound: 'புகார் கிடைக்கவில்லை.',
    back: 'பின்னால் செல்',
    noImage: 'புகைப்படம் இல்லை',
    impactScore: 'மக்களின் ஆதரவு',
    saving: 'சேமிக்கப்படுகிறது...',
    supportThis: 'ஆதரவு கொடு',
    statusTitle: 'தற்போதைய நிலை',
    location: 'இடத்தின் விவரம்',
    dateReported: 'புகாரின் தேதி',
    pollution: 'குப்பை அல்லது மாசு',
    safety: 'ஆபத்து',
    civic: 'உடைந்த பொது சொத்து',
    pending: 'சரிபார்க்க காத்திருக்கிறது',
    Verified: 'உண்மை என உறுதியானது'
  },
  gu: {
    loading: 'માહિતી લાવી રહ્યા છીએ...',
    notFound: 'રિપોર્ટ મળ્યો નથી.',
    back: 'પાછા જાઓ',
    noImage: 'કોઈ ફોટો નથી',
    impactScore: 'લોકોનો ટેકો',
    saving: 'સેવ થઈ રહ્યું છે...',
    supportThis: 'ટેકો આપો',
    statusTitle: 'હાલની સ્થિતિ',
    location: 'જગ્યાની માહિતી',
    dateReported: 'રિપોર્ટની તારીખ',
    pollution: 'ગંદકી અથવા પ્રદૂષણ',
    safety: 'ખતરો અથવા જોખમ',
    civic: 'તૂટેલી સરકારી મિલકત',
    pending: 'તપાસ બાકી છે',
    Verified: 'સાચું મળ્યું'
  },
  kn: {
    loading: 'ವಿವರಗಳನ್ನು ತರಲಾಗುತ್ತಿದೆ...',
    notFound: 'ವರದಿ ಸಿಕ್ಕಿಲ್ಲ.',
    back: 'ಹಿಂದೆ ಹೋಗಿ',
    noImage: 'ಯಾವುದೇ ಫೋಟೋ ಇಲ್ಲ',
    impactScore: 'ಜನರ ಬೆಂಬಲ',
    saving: 'ಸೇವ್ ಆಗುತ್ತಿದೆ...',
    supportThis: 'ಬೆಂಬಲ ನೀಡಿ',
    statusTitle: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ',
    location: 'ಸ್ಥಳದ ಮಾಹಿತಿ',
    dateReported: 'ವರದಿಯ ದಿನಾಂಕ',
    pollution: 'ಕೊಳಕು ಅಥವಾ ಮಾಲಿನ್ಯ',
    safety: 'ಅಪಾಯ',
    civic: 'ಒಡೆದ ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ',
    pending: 'ಪರಿಶೀಲನೆಗೆ ಕಾಯುತ್ತಿದೆ',
    Verified: 'ಸರಿ ಎಂದು ಕಂಡುಬಂದಿದೆ'
  },
  or: {
    loading: 'ତଥ୍ୟ ଆଣୁଛୁ...',
    notFound: 'ରିପୋର୍ଟ ମିଳିଲା ନାହିଁ।',
    back: 'ପଛକୁ ଯାଆନ୍ତୁ',
    noImage: 'କୌଣସି ଫଟୋ ନାହିଁ',
    impactScore: 'ଲୋକଙ୍କ ସମର୍ଥନ',
    saving: 'ସେଭ୍ ହେଉଛି...',
    supportThis: 'ସମର୍ଥନ କରନ୍ତୁ',
    statusTitle: 'ବର୍ତ୍ତମାନର ସ୍ଥିତି',
    location: 'ସ୍ଥାନର ତଥ୍ୟ',
    dateReported: 'ରିପୋର୍ଟ ତାରିଖ',
    pollution: 'ମଇଳା କିମ୍ବା ପ୍ରଦୂଷଣ',
    safety: 'ବିପଦ କିମ୍ବା ରିସ୍କ',
    civic: 'ଭଙ୍ଗା ସରକାରୀ ସମ୍ପତ୍ତି',
    pending: 'ଯାଞ୍ଚ ବାକି ଅଛି',
    Verified: 'ସଠିକ୍ ମିଳିଲା'
  },
  ml: {
    loading: 'വിവരങ്ങൾ കൊണ്ടുവരുന്നു...',
    notFound: 'റിപ്പോർട്ട് കണ്ടെത്താനായില്ല.',
    back: 'തിരികെ പോകുക',
    noImage: 'ഫോട്ടോ ഇല്ല',
    impactScore: 'ആളുകളുടെ പിന്തുണ',
    saving: 'സേവ് ചെയ്യുന്നു...',
    supportThis: 'പിന്തുണ നൽകുക',
    statusTitle: 'നിലവിലെ അവസ്ഥ',
    location: 'സ്ഥലത്തിന്റെ വിവരങ്ങൾ',
    dateReported: 'റിപ്പോർട്ട് ചെയ്ത തീയതി',
    pollution: 'അഴുക്ക് അല്ലെങ്കിൽ മലിനീകരണം',
    safety: 'അപകടം അല്ലെങ്കിൽ സാധ്യത',
    civic: 'തകർന്ന പൊതു സ്വത്ത്',
    pending: 'പരിശോധിക്കാൻ കാത്തിരിക്കുന്നു',
    Verified: 'ശരിയാണെന്ന് കണ്ടെത്തി'
  },
  pa: {
    loading: 'ਜਾਣਕਾਰੀ ਲਿਆ ਰਹੇ ਹਾਂ...',
    notFound: 'ਰਿਪੋਰਟ ਨਹੀਂ ਮਿਲੀ।',
    back: 'ਪਿੱਛੇ ਜਾਓ',
    noImage: 'ਕੋਈ ਫੋਟੋ ਨਹੀਂ',
    impactScore: 'ਲੋਕਾਂ ਦਾ ਸਮਰਥਨ',
    saving: 'ਸੇਵ ਕਰ ਰਹੇ ਹਾਂ...',
    supportThis: 'ਸਮਰਥਨ ਕਰੋ',
    statusTitle: 'ਮੌਜੂਦਾ ਸਥਿਤੀ',
    location: 'ਜਗ੍ਹਾ ਦੀ ਜਾਣਕਾਰੀ',
    dateReported: 'ਰਿਪੋਰਟ ਦੀ ਤਾਰੀਖ',
    pollution: 'ਗੰਦਗੀ ਜਾਂ ਪ੍ਰਦੂਸ਼ਣ',
    safety: 'ਖਤਰਾ ਜਾਂ ਜੋਖਮ',
    civic: 'ਟੁੱਟੀ ਸਰਕਾਰੀ ਜਾਇਦਾਦ',
    pending: 'ਜਾਂਚ ਬਾਕੀ ਹੈ',
    Verified: 'ਸਹੀ ਪਾਇਆ ਗਿਆ'
  },
  as: {
    loading: 'তথ্য অনা হৈছে...',
    notFound: 'ৰিপৰ্ট পোৱা নগ’ল।',
    back: 'পিছুৱাই যাওক',
    noImage: 'কোনো ফটো নাই',
    impactScore: 'মানুহৰ সমৰ্থন',
    saving: 'চেভ কৰা হৈছে...',
    supportThis: 'সমৰ্থন কৰক',
    statusTitle: 'বৰ্তমানৰ স্থিতি',
    location: 'ঠাইৰ তথ্য',
    dateReported: 'ৰিপৰ্টৰ তাৰিখ',
    pollution: 'লেতেৰা বা প্ৰদূষণ',
    safety: 'বিপদ বা শংকা',
    civic: 'ভঙা চৰকাৰী সম্পত্তি',
    pending: 'পৰীক্ষাৰ বাবে ৰৈ আছে',
    Verified: 'সঁচা বুলি পোৱা গৈছে'
  },
  ur: {
    loading: 'معلومات لا رہے ہیں...',
    notFound: 'رپورٹ نہیں ملی۔',
    back: 'پیچھے جائیں',
    noImage: 'کوئی تصویر نہیں',
    impactScore: 'لوگوں کی حمایت',
    saving: 'محفوظ کر رہا ہے...',
    supportThis: 'حمایت کریں',
    statusTitle: 'موجودہ حالت',
    location: 'جگہ کی معلومات',
    dateReported: 'رپورٹ کی تاریخ',
    pollution: 'گندگی یا آلودگی',
    safety: 'خطرہ یا رسک',
    civic: 'ٹوٹی ہوئی سرکاری جائیداد',
    pending: 'چیکنگ باقی ہے',
    Verified: 'درست پایا گیا'
  }
};

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  const t = (key) => translations[language]?.[key] || translations['en'][key] || key;

  useEffect(() => {
    // Real-time listener for this specific report
    const docRef = doc(db, 'reports', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setReport({ id: docSnap.id, ...docSnap.data() });
      } else {
        setReport(null);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSupportClick = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const docRef = doc(db, 'reports', id);
      // Add one support vote to the database in real-time
      await updateDoc(docRef, {
        upvotes: increment(1)
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-gray-500 font-medium">{t('loading')}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-500 font-medium mb-6">{t('notFound')}</p>
        <PillButton onClick={() => navigate(-1)}>{t('back')}</PillButton>
      </div>
    );
  }

  const currentVotes = report.upvotes || 0;

  return (
    <div className="min-h-screen bg-[#F5F8FA] pb-32">
      {/* Top Image Section */}
      <div className="relative w-full h-80 bg-gray-200">
        {report.mediaUrl ? (
          <img 
            src={report.mediaUrl} 
            alt="Report Evidence" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">{t('noImage')}</span>
          </div>
        )}
        
        {/* Back Button Overlay */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-citizenNavy px-4 py-2 rounded-extreme-pill font-bold shadow-sm"
        >
          {t('back')}
        </button>
      </div>

      {/* Details Section */}
      <div className="max-w-2xl mx-auto px-6 -mt-12 relative z-10 space-y-6">
        
        {/* Impact Score Card */}
        <GlowingCard glowColor="blue" className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-citizenNavy">
                +{currentVotes}
              </span>
              <span className="text-sm font-medium text-gray-500 mt-1">
                {t('impactScore')}
              </span>
            </div>
            
            <button 
              onClick={handleSupportClick}
              disabled={isVoting}
              className="bg-nigraniBlue text-white px-6 py-3 rounded-extreme-pill font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isVoting ? t('saving') : t('supportThis')}
            </button>
          </div>
        </GlowingCard>

        {/* Information Card */}
        <div className="bg-white rounded-3xl p-8 shadow-floating-card space-y-6">
          <div>
            <span className="bg-[#E8F1F8] text-citizenNavy text-xs font-bold px-4 py-2 rounded-extreme-pill uppercase">
              {t(report.category)}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-citizenNavy mb-2">
              {t('statusTitle')}
            </h2>
            <p className="text-gray-600 font-medium">
              {t(report.status)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 mb-2">
              {t('location')}
            </h2>
            <p className="text-gray-700 font-mono">
              {report.latitude?.toFixed(6)}, {report.longitude?.toFixed(6)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 mb-2">
              {t('dateReported')}
            </h2>
            <p className="text-gray-700 font-medium">
              {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IncidentDetails;