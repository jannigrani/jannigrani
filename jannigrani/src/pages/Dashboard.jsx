import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';

const translations = {
  en: { title: 'Your Work', sub: 'Live city reports', progress: 'Fixed Problems', total: 'Total Reports', recent: 'Recent Reports', empty: 'No reports found' },
  hi: { title: 'आपका काम', sub: 'शहर की रिपोर्ट', progress: 'ठीक की गई समस्या', total: 'कुल रिपोर्ट', recent: 'हाल की रिपोर्ट', empty: 'कोई रिपोर्ट नहीं मिली' },
  bn: { title: 'আপনার কাজ', sub: 'শহরের রিপোর্ট', progress: 'সমাধান করা সমস্যা', total: 'মোট রিপোর্ট', recent: 'নতুন রিপোর্ট', empty: 'কোনো রিপোর্ট নেই' },
  te: { title: 'మీ పని', sub: 'నగర రిపోర్టులు', progress: 'పరిష్కరించిన సమస్యలు', total: 'మొత్తం రిపోర్టులు', recent: 'తాజా రిపోర్టులు', empty: 'రిపోర్టులు లేవు' },
  mr: { title: 'तुमचे काम', sub: 'शहराचा अहवाल', progress: 'सोडवलेल्या समस्या', total: 'एकूण अहवाल', recent: 'नवीन अहवाल', empty: 'अहवाल नाही' },
  ta: { title: 'உங்கள் வேலை', sub: 'நகர அறிக்கைகள்', progress: 'சரிசெய்யப்பட்டவை', total: 'மொத்த அறிக்கைகள்', recent: 'புதிய அறிக்கைகள்', empty: 'அறிக்கைகள் இல்லை' },
  gu: { title: 'તમારું કામ', sub: 'શહેરનો રિપોર્ટ', progress: 'ઉકેલાયેલ સમસ્યા', total: 'કુલ રિપોર્ટ', recent: 'નવા રિપોર્ટ', empty: 'કોઈ રિપોર્ટ નથી' },
  kn: { title: 'ನಿಮ್ಮ ಕೆಲಸ', sub: 'ನಗರದ ವರದಿಗಳು', progress: 'ಪರಿಹರಿಸಲಾದ ಸಮಸ್ಯೆಗಳು', total: 'ಒಟ್ಟು ವರದಿಗಳು', recent: 'ಇತ್ತೀಚಿನ ವರದಿಗಳು', empty: 'ವರದಿಗಳಿಲ್ಲ' },
  or: { title: 'ଆପଣଙ୍କ କାମ', sub: 'ସହର ରିପୋର୍ଟ', progress: 'ସମାଧାନ ହୋଇଥିବା ସମସ୍ୟା', total: 'ମୋଟ ରିପୋର୍ଟ', recent: 'ନୂଆ ରିପୋର୍ଟ', empty: 'କୌଣସି ରିପୋର୍ଟ ନାହିଁ' },
  ml: { title: 'നിങ്ങളുടെ ജോലി', sub: 'നഗര റിപ്പോർട്ടുകൾ', progress: 'പരിഹരിച്ച പ്രശ്നങ്ങൾ', total: 'ആകെ റിപ്പോർട്ടുകൾ', recent: 'പുതിയ റിപ്പോർട്ടുകൾ', empty: 'റിപ്പോർട്ടുകളില്ല' },
  pa: { title: 'ਤੁਹਾਡਾ ਕੰਮ', sub: 'ਸ਼ਹਿਰ ਦੀ ਰਿਪੋਰਟ', progress: 'ਹੱਲ ਕੀਤੀਆਂ ਸਮੱਸਿਆਵਾਂ', total: 'ਕੁੱਲ ਰਿਪੋਰਟਾਂ', recent: 'ਨਵੀਆਂ ਰਿਪੋਰਟਾਂ', empty: 'ਕੋਈ ਰਿਪੋਰਟ ਨਹੀਂ' },
  as: { title: 'আপোনাৰ কাম', sub: 'চহৰৰ ৰিপৰ্ট', progress: 'সমাধান কৰা সমস্যা', total: 'মুঠ ৰিপৰ্ট', recent: 'নতুন ৰিপৰ্ট', empty: 'কোনো ৰিপৰ্ট নাই' },
  ur: { title: 'آپ کا کام', sub: 'شہر کی رپورٹ', progress: 'حل شدہ مسائل', total: 'کل رپورٹیں', recent: 'حالیہ رپورٹیں', empty: 'کوئی رپورٹ نہیں ملی' }
};

const Dashboard = () => {
  const { language } = useTranslation();
  const [stats, setStats] = useState({ total: 0, verified: 0 });
  const [reportsList, setReportsList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const tLocal = (key) => {
    const langData = translations[language] || translations['en'];
    return langData[key] || translations['en'][key];
  };

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeSnapshot = null;

    // Strictly wait for the user to be authenticated before fetching to prevent permission errors
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeSnapshot = onSnapshot(collection(db, 'reports'), (snapshot) => {
          let totalCount = 0;
          let verifiedCount = 0;
          let fetchedReports = [];

          snapshot.forEach((doc) => {
            totalCount++;
            const data = doc.data();
            
            if (data.status === 'Verified') {
              verifiedCount++;
            }
            
            fetchedReports.push({
              id: doc.id,
              ...data,
              timestamp: data.createdAt?.toMillis() || Date.now()
            });
          });

          fetchedReports.sort((a, b) => b.timestamp - a.timestamp);

          setStats({ total: totalCount, verified: verifiedCount });
          setReportsList(fetchedReports);
        }, (error) => {
          console.error("Database connection error:", error);
        });
      } else {
        setReportsList([]);
        setStats({ total: 0, verified: 0 });
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const verifiedPercentage = stats.total > 0 ? (stats.verified / stats.total) * 100 : 0;
  const strokeDashoffset = circumference - (verifiedPercentage / 100) * circumference;

  const filters = ['All', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      
      {/* Clean White Top Section for High Contrast */}
      <div className="bg-white pt-12 pb-32 px-6 rounded-b-[40px] shadow-sm relative z-10">
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-1 text-citizenNavy">{tLocal('title')}</h1>
            <p className="text-gray-500 text-sm font-medium">{tLocal('sub')}</p>
          </div>

          {/* Large Glowing Circular Progress Widget */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative flex items-center justify-center w-48 h-48 bg-white rounded-full shadow-[0_10px_30px_rgba(0,169,247,0.1)] border border-gray-100">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E8F1F8"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#00A9F7" 
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-citizenNavy mb-1">
                  {stats.verified}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest max-w-[80px] leading-tight">
                  {tLocal('progress')}
                </span>
              </div>
            </div>
          </div>

          {/* Horizontal Selector */}
          <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded-full mb-4 overflow-x-auto no-scrollbar border border-gray-100">
            {filters.map((f, i) => (
              <button 
                key={i} 
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  activeFilter === f ? 'bg-[#00A9F7] text-white shadow-md scale-105' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
        </div>
      </div>

      {/* Bottom Sheet-Style List with pb-48 to prevent navigation collision */}
      <div className="bg-gray-50 w-full min-h-[50vh] rounded-t-[40px] -mt-20 relative z-20 px-6 pt-8 pb-48 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto">
          
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-citizenNavy">{tLocal('recent')}</h2>
            <span className="text-sm font-bold text-gray-500">{stats.total} {tLocal('total')}</span>
          </div>

          <div className="space-y-4">
            {reportsList.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
                <p className="text-gray-500 font-medium">{tLocal('empty')}</p>
              </div>
            ) : (
              reportsList.map((report) => (
                <div key={report.id} className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#E8F1F8] flex items-center justify-center text-[#00A9F7] font-bold">
                      {report.category ? report.category.substring(0, 1).toUpperCase() : 'R'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-citizenNavy capitalize">{report.category || 'Report'}</h3>
                      <p className="text-xs text-gray-500 font-medium mt-0.5 capitalize">{report.status || 'Pending'}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Dashboard;