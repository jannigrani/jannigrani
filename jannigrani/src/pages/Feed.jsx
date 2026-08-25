import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import GlowingCard from '../components/ui/GlowingCard';
import { useTranslation } from '../contexts/LanguageContext';

const translations = {
  en: {
    feedTitle: 'Checked Reports',
    feedSubtitle: 'True news from your city',
    loading: 'Please wait...',
    noReports: 'No checked reports right now.',
    verified: 'Checked & True',
    pollution: 'Dirt or Pollution',
    safety: 'Danger or Risk',
    civic: 'Broken Public Property',
    location: 'Place Details'
  },
  hi: {
    feedTitle: 'जांची गई रिपोर्ट',
    feedSubtitle: 'आपके शहर की सच्ची खबर',
    loading: 'कृपया प्रतीक्षा करें...',
    noReports: 'अभी कोई जांची गई रिपोर्ट नहीं है।',
    verified: 'सही पाया गया',
    pollution: 'गंदगी या प्रदूषण',
    safety: 'खतरा या जोखिम',
    civic: 'टूटी हुई सरकारी संपत्ति',
    location: 'जगह की जानकारी'
  },
  bn: {
    feedTitle: 'চেক করা রিপোর্ট',
    feedSubtitle: 'আপনার শহরের সত্য খবর',
    loading: 'অনুগ্রহ করে অপেক্ষা করুন...',
    noReports: 'এখন কোনো চেক করা রিপোর্ট নেই।',
    verified: 'সঠিক পাওয়া গেছে',
    pollution: 'ময়লা বা দূষণ',
    safety: 'বিপদ বা ঝুঁকি',
    civic: 'ভাঙ্গা সরকারি সম্পত্তি',
    location: 'জায়গার তথ্য'
  },
  te: {
    feedTitle: 'తనిఖీ చేసిన రిపోర్టులు',
    feedSubtitle: 'మీ నగర నిజమైన వార్తలు',
    loading: 'దయచేసి వేచి ఉండండి...',
    noReports: 'ఇప్పుడు తనిఖీ చేసిన రిపోర్టులు లేవు.',
    verified: 'సరైనదిగా గుర్తించబడింది',
    pollution: 'మురికి లేదా కాలుష్యం',
    safety: 'ప్రమాదం లేదా రిస్క్',
    civic: 'విరిగిన ప్రభుత్వ ఆస్తి',
    location: 'స్థలం వివరాలు'
  },
  mr: {
    feedTitle: 'तपासलेले अहवाल',
    feedSubtitle: 'तुमच्या शहरातील खरी बातमी',
    loading: 'कृपया प्रतीक्षा करा...',
    noReports: 'सध्या कोणतेही तपासलेले अहवाल नाहीत.',
    verified: 'बरोबर आढळले',
    pollution: 'घाण किंवा प्रदूषण',
    safety: 'धोका किंवा जोखीम',
    civic: 'तुटलेली सरकारी मालमत्ता',
    location: 'जागेची माहिती'
  },
  ta: {
    feedTitle: 'சரிபார்க்கப்பட்ட புகார்கள்',
    feedSubtitle: 'உங்கள் ஊரின் உண்மையான செய்திகள்',
    loading: 'காத்திருக்கவும்...',
    noReports: 'இப்போது சரிபார்க்கப்பட்ட புகார்கள் இல்லை.',
    verified: 'உண்மை என உறுதியானது',
    pollution: 'குப்பை அல்லது மாசு',
    safety: 'ஆபத்து',
    civic: 'உடைந்த பொது சொத்து',
    location: 'இடத்தின் விவரம்'
  },
  gu: {
    feedTitle: 'તપાસેલ રિપોર્ટ',
    feedSubtitle: 'તમારા શહેરના સાચા સમાચાર',
    loading: 'કૃપા કરીને રાહ જુઓ...',
    noReports: 'અત્યારે કોઈ તપાસેલ રિપોર્ટ નથી.',
    verified: 'સાચું મળ્યું',
    pollution: 'ગંદકી અથવા પ્રદૂષણ',
    safety: 'ખતરો અથવા જોખમ',
    civic: 'તૂટેલી સરકારી મિલકત',
    location: 'જગ્યાની માહિતી'
  },
  kn: {
    feedTitle: 'ಪರಿಶೀಲಿಸಿದ ವರದಿಗಳು',
    feedSubtitle: 'ನಿಮ್ಮ ಊರಿನ ನಿಜವಾದ ಸುದ್ದಿ',
    loading: 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ...',
    noReports: 'ಈಗ ಯಾವುದೇ ಪರಿಶೀಲಿಸಿದ ವರದಿಗಳಿಲ್ಲ.',
    verified: 'ಸರಿ ಎಂದು ಕಂಡುಬಂದಿದೆ',
    pollution: 'ಕೊಳಕು ಅಥವಾ ಮಾಲಿನ್ಯ',
    safety: 'ಅಪಾಯ',
    civic: 'ಒಡೆದ ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ',
    location: 'ಸ್ಥಳದ ಮಾಹಿತಿ'
  },
  or: {
    feedTitle: 'ଯାଞ୍ଚ ହୋଇଥିବା ରିପୋର୍ଟ',
    feedSubtitle: 'ଆପଣଙ୍କ ସହରର ସତ ଖବର',
    loading: 'ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...',
    noReports: 'ବର୍ତ୍ତମାନ କୌଣସି ଯାଞ୍ଚ ହୋଇଥିବା ରିପୋର୍ଟ ନାହିଁ।',
    verified: 'ସଠିକ୍ ମିଳିଲା',
    pollution: 'ମଇଳା କିମ୍ବା ପ୍ରଦୂଷଣ',
    safety: 'ବିପଦ କିମ୍ବା ରିସ୍କ',
    civic: 'ଭଙ୍ଗା ସରକାରୀ ସମ୍ପତ୍ତି',
    location: 'ସ୍ଥାନର ତଥ୍ୟ'
  },
  ml: {
    feedTitle: 'പരിശോധിച്ച റിപ്പോർട്ടുകൾ',
    feedSubtitle: 'നിങ്ങളുടെ നഗരത്തിലെ യഥാർത്ഥ വാർത്തകൾ',
    loading: 'ദയവായി കാത്തിരിക്കുക...',
    noReports: 'ഇപ്പോൾ പരിശോധിച്ച റിപ്പോർട്ടുകളില്ല.',
    verified: 'ശരിയാണെന്ന് കണ്ടെത്തി',
    pollution: 'അഴുക്ക് അല്ലെങ്കിൽ മലിനീകരണം',
    safety: 'അപകടം അല്ലെങ്കിൽ സാധ്യത',
    civic: 'തകർന്ന പൊതു സ്വത്ത്',
    location: 'സ്ഥലത്തിന്റെ വിവരങ്ങൾ'
  },
  pa: {
    feedTitle: 'ਚੈੱਕ ਕੀਤੀਆਂ ਰਿਪੋਰਟਾਂ',
    feedSubtitle: 'ਤੁਹਾਡੇ ਸ਼ਹਿਰ ਦੀ ਸੱਚੀ ਖ਼ਬਰ',
    loading: 'ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...',
    noReports: 'ਹੁਣ ਕੋਈ ਚੈੱਕ ਕੀਤੀ ਰਿਪੋਰਟ ਨਹੀਂ ਹੈ।',
    verified: 'ਸਹੀ ਪਾਇਆ ਗਿਆ',
    pollution: 'ਗੰਦਗੀ ਜਾਂ ਪ੍ਰਦੂਸ਼ਣ',
    safety: 'ਖਤਰਾ ਜਾਂ ਜੋਖਮ',
    civic: 'ਟੁੱਟੀ ਸਰਕਾਰੀ ਜਾਇਦਾਦ',
    location: 'ਜਗ੍ਹਾ ਦੀ ਜਾਣਕਾਰੀ'
  },
  as: {
    feedTitle: 'পৰীক্ষা কৰা ৰিপৰ্ট',
    feedSubtitle: 'আপোনাৰ চহৰৰ সঁচা খবৰ',
    loading: 'অনুগ্ৰহ কৰি অপেক্ষা কৰক...',
    noReports: 'এতিয়া কোনো পৰীক্ষা কৰা ৰিপৰ্ট নাই।',
    verified: 'সঁচা বুলি পোৱা গৈছে',
    pollution: 'লেতেৰা বা প্ৰদূষণ',
    safety: 'বিপদ বা শংকা',
    civic: 'ভঙা চৰকাৰী সম্পত্তি',
    location: 'ঠাইৰ তথ্য'
  },
  ur: {
    feedTitle: 'چیک کی گئی رپورٹیں',
    feedSubtitle: 'آپ کے شہر کی سچی خبریں',
    loading: 'براہ کرم انتظار کریں...',
    noReports: 'ابھی کوئی چیک کی گئی رپورٹ نہیں ہے۔',
    verified: 'درست پایا گیا',
    pollution: 'گندگی یا آلودگی',
    safety: 'خطرہ یا رسک',
    civic: 'ٹوٹی ہوئی سرکاری جائیداد',
    location: 'جگہ کی معلومات'
  }
};

const Feed = () => {
  const { language } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = (key) => translations[language]?.[key] || translations['en'][key] || key;

  useEffect(() => {
    // Real-time listener for Verified reports only
    const q = query(
      collection(db, 'reports'),
      where('status', '==', 'Verified')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReports = [];
      snapshot.forEach((doc) => {
        fetchedReports.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort by newest first on the device to avoid needing complex database indexes
      fetchedReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setReports(fetchedReports);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-citizenNavy mb-2">
            {t('feedTitle')}
          </h1>
          <p className="text-gray-600 font-medium">
            {t('feedSubtitle')}
          </p>
        </div>
        
        {loading && (
          <div className="text-center text-gray-500 font-medium p-8">
            {t('loading')}
          </div>
        )}
        
        {!loading && reports.length === 0 && (
          <div className="text-center text-gray-500 font-medium p-8 bg-white rounded-2xl border border-gray-200">
            {t('noReports')}
          </div>
        )}

        <div className="space-y-6">
          {reports.map((report) => (
            <GlowingCard key={report.id} glowColor="blue">
              <div className="flex flex-col space-y-4">
                
                <div className="flex justify-between items-center">
                  <span className="bg-[#E8F1F8] text-citizenNavy text-xs font-bold px-4 py-2 rounded-extreme-pill">
                    {t('verified')}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-citizenNavy capitalize">
                  {t(report.category)}
                </h3>
                
                {report.mediaUrl && (
                  <img 
                    src={report.mediaUrl} 
                    alt="Report Evidence" 
                    className="w-full h-64 object-cover rounded-xl border border-gray-100" 
                  />
                )}
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm font-medium text-gray-600">
                    {t('location')}:
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {report.latitude?.toFixed(6)}, {report.longitude?.toFixed(6)}
                  </p>
                </div>

              </div>
            </GlowingCard>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Feed;