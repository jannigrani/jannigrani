import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import GlowingCard from '../components/ui/GlowingCard';
import { useTranslation } from '../contexts/LanguageContext';

const translations = {
  en: {
    dashboardTitle: 'Your Work',
    dashboardSubtitle: 'Live data of city reports',
    verificationProgress: 'Checking Progress',
    totalReports: 'Total',
    submitted: 'Given',
    verified: 'Checked',
    categoryBreakdown: 'Reports by Type',
    pollution: 'Dirt',
    safety: 'Danger',
    civic: 'Property'
  },
  hi: {
    dashboardTitle: 'आपका काम',
    dashboardSubtitle: 'शहर की रिपोर्ट का सीधा डेटा',
    verificationProgress: 'जांच का काम',
    totalReports: 'कुल',
    submitted: 'जमा किया',
    verified: 'सही मिला',
    categoryBreakdown: 'समस्या के प्रकार',
    pollution: 'गंदगी',
    safety: 'खतरा',
    civic: 'सरकारी संपत्ति'
  },
  bn: {
    dashboardTitle: 'আপনার কাজ',
    dashboardSubtitle: 'শহরের রিপোর্টের লাইভ ডেটা',
    verificationProgress: 'যাচাইয়ের কাজ',
    totalReports: 'মোট',
    submitted: 'জমা দেওয়া',
    verified: 'সঠিক পাওয়া',
    categoryBreakdown: 'সমস্যার ধরন',
    pollution: 'ময়লা',
    safety: 'বিপদ',
    civic: 'সরকারি সম্পত্তি'
  },
  te: {
    dashboardTitle: 'మీ పని',
    dashboardSubtitle: 'నగర రిపోర్టుల ప్రత్యక్ష డేటా',
    verificationProgress: 'తనిఖీ పని',
    totalReports: 'మొత్తం',
    submitted: 'ఇచ్చినవి',
    verified: 'సరైనవి',
    categoryBreakdown: 'సమస్య రకాలు',
    pollution: 'మురికి',
    safety: 'ప్రమాదం',
    civic: 'ప్రభుత్వ ఆస్తి'
  },
  mr: {
    dashboardTitle: 'तुमचे काम',
    dashboardSubtitle: 'शहराच्या अहवालाचा थेट डेटा',
    verificationProgress: 'तपासणीचे काम',
    totalReports: 'एकूण',
    submitted: 'जमा केले',
    verified: 'बरोबर आढळले',
    categoryBreakdown: 'समस्येचे प्रकार',
    pollution: 'घाण',
    safety: 'धोका',
    civic: 'सरकारी मालमत्ता'
  },
  ta: {
    dashboardTitle: 'உங்கள் வேலை',
    dashboardSubtitle: 'நகர புகார்களின் நேரடி தரவு',
    verificationProgress: 'சரிபார்க்கும் வேலை',
    totalReports: 'மொத்தம்',
    submitted: 'கொடுக்கப்பட்டது',
    verified: 'உறுதியானது',
    categoryBreakdown: 'பிரச்சனை வகைகள்',
    pollution: 'குப்பை',
    safety: 'ஆபத்து',
    civic: 'பொது சொத்து'
  },
  gu: {
    dashboardTitle: 'તમારું કામ',
    dashboardSubtitle: 'શહેરના રિપોર્ટનો લાઈવ ડેટા',
    verificationProgress: 'તપાસનું કામ',
    totalReports: 'કુલ',
    submitted: 'જમા કર્યું',
    verified: 'સાચું મળ્યું',
    categoryBreakdown: 'સમસ્યાના પ્રકાર',
    pollution: 'ગંદકી',
    safety: 'ખતરો',
    civic: 'સરકારી મિલકત'
  },
  kn: {
    dashboardTitle: 'ನಿಮ್ಮ ಕೆಲಸ',
    dashboardSubtitle: 'ನಗರದ ವರದಿಗಳ ನೇರ ಡೇಟಾ',
    verificationProgress: 'ಪರಿಶೀಲನೆ ಕೆಲಸ',
    totalReports: 'ಒಟ್ಟು',
    submitted: 'ನೀಡಲಾಗಿದೆ',
    verified: 'ಸರಿಯಾಗಿದೆ',
    categoryBreakdown: 'ಸಮಸ್ಯೆಯ ಪ್ರಕಾರಗಳು',
    pollution: 'ಕೊಳಕು',
    safety: 'ಅಪಾಯ',
    civic: 'ಸಾರ್ವಜನಿಕ ಆಸ್ತಿ'
  },
  or: {
    dashboardTitle: 'ଆପଣଙ୍କ କାମ',
    dashboardSubtitle: 'ସହର ରିପୋର୍ଟର ଲାଇଭ୍ ଡାଟା',
    verificationProgress: 'ଯାଞ୍ଚ କାମ',
    totalReports: 'ମୋଟ',
    submitted: 'ଦିଆଯାଇଛି',
    verified: 'ସଠିକ୍ ମିଳିଲା',
    categoryBreakdown: 'ସମସ୍ୟାର ପ୍ରକାର',
    pollution: 'ମଇଳା',
    safety: 'ବିପଦ',
    civic: 'ସରକାରୀ ସମ୍ପତ୍ତି'
  },
  ml: {
    dashboardTitle: 'നിങ്ങളുടെ ജോലി',
    dashboardSubtitle: 'നഗര റിപ്പോർട്ടുകളുടെ തത്സമയ ഡാറ്റ',
    verificationProgress: 'പരിശോധന ജോലി',
    totalReports: 'ആകെ',
    submitted: 'നൽകി',
    verified: 'ശരിയാണെന്ന് കണ്ടു',
    categoryBreakdown: 'പ്രശ്നങ്ങളുടെ തരങ്ങൾ',
    pollution: 'അഴുക്ക്',
    safety: 'അപകടം',
    civic: 'പൊതു സ്വത്ത്'
  },
  pa: {
    dashboardTitle: 'ਤੁਹਾਡਾ ਕੰਮ',
    dashboardSubtitle: 'ਸ਼ਹਿਰ ਦੀਆਂ ਰਿਪੋਰਟਾਂ ਦਾ ਲਾਈਵ ਡਾਟਾ',
    verificationProgress: 'ਜਾਂਚ ਦਾ ਕੰਮ',
    totalReports: 'ਕੁੱਲ',
    submitted: 'ਜਮ੍ਹਾਂ ਕੀਤਾ',
    verified: 'ਸਹੀ ਮਿਲਿਆ',
    categoryBreakdown: 'ਸਮੱਸਿਆ ਦੀਆਂ ਕਿਸਮਾਂ',
    pollution: 'ਗੰਦਗੀ',
    safety: 'ਖਤਰਾ',
    civic: 'ਸਰਕਾਰੀ ਜਾਇਦਾਦ'
  },
  as: {
    dashboardTitle: 'আপোনাৰ কাম',
    dashboardSubtitle: 'চহৰৰ ৰিপৰ্টৰ লাইভ ডাটা',
    verificationProgress: 'পৰীক্ষাৰ কাম',
    totalReports: 'মুঠ',
    submitted: 'জমা দিয়া হৈছে',
    verified: 'সঁচা পোৱা গৈছে',
    categoryBreakdown: 'সমস্যাৰ প্ৰকাৰ',
    pollution: 'লেতেৰা',
    safety: 'বিপদ',
    civic: 'চৰকাৰী সম্পত্তি'
  },
  ur: {
    dashboardTitle: 'آپ کا کام',
    dashboardSubtitle: 'شہر کی رپورٹ کا لائیو ڈیٹا',
    verificationProgress: 'چیکنگ کا کام',
    totalReports: 'کل',
    submitted: 'جمع کرایا',
    verified: 'درست ملا',
    categoryBreakdown: 'مسئلے کی اقسام',
    pollution: 'گندگی',
    safety: 'خطرہ',
    civic: 'سرکاری جائیداد'
  }
};

const Dashboard = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    categories: { pollution: 0, safety: 0, civic: 0 }
  });

  const t = (key) => translations[language]?.[key] || translations['en'][key] || key;

  useEffect(() => {
    // Real-time listener fetching all reports to build live analytics
    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
      let totalCount = 0;
      let verifiedCount = 0;
      let catCounts = { pollution: 0, safety: 0, civic: 0 };

      snapshot.forEach((doc) => {
        totalCount++;
        const data = doc.data();
        
        if (data.status === 'Verified') {
          verifiedCount++;
        }
        
        if (data.category && catCounts[data.category] !== undefined) {
          catCounts[data.category]++;
        }
      });

      setStats({
        total: totalCount,
        verified: verifiedCount,
        categories: catCounts
      });
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  // Circular Progress Math
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const verifiedPercentage = stats.total > 0 ? (stats.verified / stats.total) * 100 : 0;
  const strokeDashoffset = circumference - (verifiedPercentage / 100) * circumference;

  // Bar Chart Math
  const maxCategoryValue = Math.max(stats.categories.pollution, stats.categories.safety, stats.categories.civic, 1);

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-citizenNavy mb-2">
            {t('dashboardTitle')}
          </h1>
          <p className="text-gray-600 font-medium">
            {t('dashboardSubtitle')}
          </p>
        </div>

        {/* Progress Ring Card */}
        <GlowingCard glowColor="blue">
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-lg font-bold text-citizenNavy mb-6">
              {t('verificationProgress')}
            </h3>
            
            <div className="relative flex items-center justify-center">
              {/* Background Ring */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E8F1F8"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Animated Foreground Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#10B981" 
                  strokeWidth="12"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-citizenNavy">
                  {stats.total}
                </span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('totalReports')}
                </span>
              </div>
            </div>

            <div className="flex justify-between w-full max-w-xs mt-8 px-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
                <span className="text-xs text-gray-500">{t('submitted')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-500">{stats.verified}</span>
                <span className="text-xs text-gray-500">{t('verified')}</span>
              </div>
            </div>
          </div>
        </GlowingCard>

        {/* Bar Chart Card */}
        <GlowingCard glowColor="purple">
          <div className="p-4">
            <h3 className="text-lg font-bold text-citizenNavy mb-6 text-center">
              {t('categoryBreakdown')}
            </h3>
            
            <div className="flex items-end justify-around h-48 mt-4 border-b-2 border-gray-100 pb-2">
              
              {/* Pollution Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.pollution}</span>
                <motion.div 
                  className="w-full bg-nigraniBlue rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.pollution / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('pollution')}
                </span>
              </div>

              {/* Safety Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.safety}</span>
                <motion.div 
                  className="w-full bg-citizenNavy rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.safety / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('safety')}
                </span>
              </div>

              {/* Civic Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.civic}</span>
                <motion.div 
                  className="w-full bg-gray-400 rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.civic / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('civic')}
                </span>
              </div>

            </div>
          </div>
        </GlowingCard>

      </div>
    </div>
  );
};

export default Dashboard;