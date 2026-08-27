import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const translations = {
  en: { title: "My Reports", sub: "Track your submitted complaints", empty: "No reports found", status: "Status", pending: "Pending", verified: "Verified", date: "Date", category: "Category" },
  hi: { title: "मेरी शिकायतें", sub: "अपनी भेजी गई शिकायतें देखें", empty: "कोई रिपोर्ट नहीं मिली", status: "स्थिति", pending: "विचाराधीन", verified: "सत्यापित", date: "तारीख", category: "श्रेणी" },
  bn: { title: "আমার রিপোর্ট", sub: "আপনার জমা দেওয়া অভিযোগ দেখুন", empty: "কোনো রিপোর্ট পাওয়া যায়নি", status: "অবস্থা", pending: "অপেক্ষমাণ", verified: "যাচাই করা হয়েছে", date: "তারিখ", category: "বিভাগ" },
  te: { title: "నా రిపోర్టులు", sub: "మీరు సమర్పించిన ఫిర్యాదులను ట్రాక్ చేయండి", empty: "రిపోర్టులు కనుగొనబడలేదు", status: "స్థితి", pending: "పెండింగ్", verified: "ధృవీకరించబడింది", date: "తేదీ", category: "వర్గం" },
  mr: { title: "माझे अहवाल", sub: "तुमच्या पाठवलेल्या तक्रारी ट्रॅक करा", empty: "कोणताही अहवाल सापडला नाही", status: "स्थिती", pending: "प्रलंबित", verified: "तपासले", date: "दिनांक", category: "वर्ग" },
  ta: { title: "எனது அறிக்கைகள்", sub: "உங்கள் புகார்களை கண்காணிக்கவும்", empty: "அறிக்கைகள் எதுவும் இல்லை", status: "நிலை", pending: "நிலுவையில்", verified: "சரிபார்க்கப்பட்டது", date: "தேதி", category: "வகை" },
  gu: { title: "મારા રિપોર્ટ", sub: "તમારી સબમિટ કરેલી ફરિયાદો ટ્રૅક કરો", empty: "કોઈ રિપોર્ટ મળ્યો નથી", status: "સ્થિતિ", pending: "બાકી", verified: "ચકાસાયેલ", date: "તારીખ", category: "શ્રેણી" },
  ur: { title: "میری رپورٹس", sub: "اپنی جمع کردہ شکایات کو ٹریک کریں", empty: "کوئی رپورٹ نہیں ملی", status: "حالت", pending: "ز زیر غور", verified: "تصدیق شدہ", date: "تاریخ", category: "زمرہ" },
  kn: { title: "ನನ್ನ ವರದಿಗಳು", sub: "ನಿಮ್ಮ ಸಲ್ಲಿಸಿದ ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", empty: "ಯಾವ ವರದಿಗಳು ಸಿಗಲಿಲ್ಲ", status: "ಸ್ಥಿತಿ", pending: "ಬಾಕಿ", verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ", date: "ದಿನಾಂಕ", category: "ವರ್ಗ" },
  or: { title: "ମୋର ରିପୋର୍ଟ", sub: "ଆପଣଙ୍କ ଦାଖଲ ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ", empty: "କୌଣସି ରିପୋର୍ଟ ମିଳିଲା ନାହିଁ", status: "ସ୍ଥିତି", pending: "ବାକି", verified: "ଯାଞ୍ଚ ହୋଇଛି", date: "ତାରିଖ", category: "ବର୍ଗ" },
  ml: { title: "എന്റെ റിപ്പോർട്ടുകൾ", sub: "നിങ്ങളുടെ പരാതികൾ ട്രാക്ക് ചെയ്യുക", empty: "റിപ്പോർട്ടുകളൊന്നും കണ്ടെത്തിയില്ല", status: "ാവസ്ഥ", pending: "പെൻഡിംഗ്", verified: "പരിശോധിച്ചു", date: "തീയതി", category: "വിഭാഗം" },
  pa: { title: "मेरी ਰਿਪੋਰਟਾਂ", sub: "अपनी ਸ਼िकायतें ਟਰੈਕ ਕਰੋ", empty: "कोइ ਰਿਪੋਰਟ नहीं मिली", status: "ਸਥਿতি", pending: "ਲੰबित", verified: "तصدिق शुदा", date: "ਤਾਰੀਖ", category: "ਸ਼ਰੇਣੀ" },
  as: { title: "মোৰ ৰিপৰ্ট", sub: "আপোনাৰ অভিযোগসমূহ ট্ৰেক কৰক", empty: "কোনো ৰিপৰ্ট পোৱা নগ’ল", status: "অৱস্থা", pending: "বিচাৰাধীন", verified: "যাচাই কৰা হ’ল", date: "তাৰিখ", category: "শ্ৰেণী" }
};

const MyReports = () => {
  const { language } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [reportsList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const tLocal = (key) => {
    const langData = translations[language] || translations['en'];
    return langData[key] || translations['en'][key];
  };

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
      let fetchedReports = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Match reports submitted by current user ID or email
        if (data.userId === currentUser.uid || data.email === currentUser.email || !data.userId) {
          fetchedReports.push({
            id: doc.id,
            ...data
          });
        }
      });
      // Sort by newest first based on createdAt or local fallback
      fetchedReports.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setReportsList(fetchedReports);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user reports:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-[#0B243B] font-bold text-lg">...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-[#0B243B] mb-1">
            {tLocal('title')}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {tLocal('sub')}
          </p>
        </div>

        <div className="space-y-4">
          {reportsList.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 font-medium">{tLocal('empty')}</p>
            </div>
          ) : (
            reportsList.map((report) => (
              <motion.div 
                key={report.id}
                onClick={() => navigate(`/feed/${report.id}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-[#00A9F7] transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#00A9F7] font-bold uppercase">
                    {report.category ? report.category.substring(0, 2) : 'RP'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B243B] capitalize">
                      {report.category || 'Complaint'}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    report.status === 'Verified' || report.status === 'Resolved'
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  }`}>
                    {report.status === 'Verified' ? tLocal('verified') : tLocal('pending')}
                  </span>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MyReports;