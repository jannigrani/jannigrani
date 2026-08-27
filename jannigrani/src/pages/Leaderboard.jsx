import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useTranslation } from '../contexts/LanguageContext';

const translations = {
  en: { title: "Community Leaderboard", sub: "Top helpers making our city better", rank: "Rank", name: "Citizen Name", points: "Points", empty: "No helpers listed yet" },
  hi: { title: "सामुदायिक लीडरबोर्ड", sub: "हमारे शहर को बेहतर बनाने वाले शीर्ष मददगार", rank: "रैंक", name: "नागरिक का नाम", points: "अंक", empty: "अभी कोई सूची उपलब्ध नहीं है" },
  mr: { title: "समुदाय लिडरबोर्ड", sub: "आपले शहर सुधारणारे शीर्ष मदतनीस", rank: "क्रमांक", name: "नागरिकाचे नाव", points: "गुण", empty: "अद्याप कोणतीही यादी नाही" },
  bn: { title: "কমিউনিটি লিডারবোর্ড", sub: "আমাদের শহরকে উন্নতকারী শীর্ষ সহায়কগণ", rank: "র‍্যাংক", name: "নাগরিকের নাম", points: "পয়েন্ট", empty: "কোনো সাহায্যকারী পাওয়া যায়নি" },
  te: { title: "కమ్యూనిటీ లీడర్‌బోర్డ్", sub: "మన నగరాన్ని మెరుగుపరుస్తున్న టాప్ సహాయకులు", rank: "ర్యాంక్", name: "పౌరుని పేరు", points: "పాయింట్లు", empty: "ఎవరూ జాబితా చేయబడలేదు" },
  ta: { title: "சமூக தலைமைப் பலகை", sub: "நகரத்தை மேம்படுத்தும் சிறந்த உதவியாளர்கள்", rank: "தரம்", name: "குடிமகன் பெயர்", points: "புள்ளிகள்", empty: "யாரும் பட்டியலிடப்படவில்லை" },
  gu: { title: "સમુદાય લીડરબોર્ડ", sub: "આપણા શહેરને વધુ સારું બનાવનાર ટોચના સહાયકો", rank: "રેન્ક", name: "નાગરિકનું નામ", points: "ગુણ", empty: "હજી કોઈ યાદી નથી" },
  ur: { title: "کمیونٹی لیڈر بورڈ", sub: "ہمارے شہر کو بہتر بنانے والے سرفہرست مددگار", rank: "درجہ", name: "شہری کا نام", points: "پوائنٹس", empty: "کوئی مددگار درج نہیں ہے" },
  kn: { title: "ಸಮುದಾಯ ಲೀಡರ್‌ಬೋರ್ಡ್", sub: "ನಮ್ಮ ನಗರವನ್ನು ಉತ್ತಮಗೊಳಿಸುತ್ತಿರುವ ಪ್ರಮುಖ ಸಹಾಯకులు", rank: "ಶ್ರೇಣಿ", name: "ನಾಗರಿಕರ ಹೆಸರು", points: "ಅಂಕಗಳು", empty: "ಯಾವುದೇ ಸಹಾಯಕರಿಲ್ಲ" },
  or: { title: "ସମୁଦାୟ ଲିଡରବୋର୍ଡ", sub: "ଆମ ସହରକୁ ସୁନ୍ଦର କରୁଥିବା ଶ୍ରେଷ୍ଠ ସହାୟକ", rank: "ର‍୍ୟାଙ୍କ", name: "ନାଗରିକଙ୍କ ନାମ", points: "ପଏଣ୍ଟ", empty: "କୌଣସି ସହାୟକ ନାହାଁନ୍ତି" },
  ml: { title: "കമ്മ്യൂണിറ്റി ലീഡർബോർഡ്", sub: "നഗരത്തെ മികച്ചതാക്കുന്ന സഹായികൾ", rank: "റാങ്ക്", name: "പൗരന്റെ പേര്", points: "പോയിന്റുകൾ", empty: "സഹായികളാരും ഇല്ല" },
  pa: { title: "ਕਮਿਊਨिटी ਲੀਡरਬੋਰਡ", sub: "ਸ਼ਹਿਰ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਾਲੇ ਮਦदਗਾਰ", rank: "ਰੈਂਕ", name: "ਨਾਗਰਿਕ ਦਾ ਨਾਮ", points: "ਅੰक", empty: "కోਈ ਸੂਚੀ ਨਹੀਂ" },
  as: { title: "সম্প্ৰদায় লিডাৰবৰ্ড", sub: "চহৰখন উন্নত কৰake শীৰ্ষ সহায়কসকল", rank: "ৰ্যাংক", name: "নাগৰিকৰ নাম", points: "পইণ্ট", empty: "কোনো সহায়ক তালিকাভুক্ত নাই" }
};

const Leaderboard = () => {
  const { language } = useTranslation();
  const [helpersList, setHelpersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const tLocal = (key) => {
    const langData = translations[language] || translations['en'];
    return langData[key] || translations['en'][key];
  };

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedHelpers = [];
      snapshot.forEach((doc) => {
        fetchedHelpers.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Fallback sort if points field is missing on older test accounts
      fetchedHelpers.sort((a, b) => (b.points || 0) - (a.points || 0));
      setHelpersList(fetchedHelpers);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard:", error);
      // Fallback query if index is building or missing
      const fallbackQuery = collection(db, 'users');
      onSnapshot(fallbackQuery, (fallbackSnap) => {
        let fallbackList = [];
        fallbackSnap.forEach((doc) => {
          fallbackList.push({ id: doc.id, ...doc.data() });
        });
        fallbackList.sort((a, b) => (b.points || 0) - (a.points || 0));
        setHelpersList(fallbackList);
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

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

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {helpersList.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 font-medium">{tLocal('empty')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {helpersList.map((helper, index) => (
                <motion.div 
                  key={helper.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                      index === 1 ? 'bg-gray-200 text-gray-700 border border-gray-300' :
                      index === 2 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-[#E8F1F8] text-[#00A9F7]'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0B243B]">
                        {helper.name || helper.email?.split('@')[0] || 'Citizen'}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {index === 0 ? 'Top Helper' : 'Active Contributor'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-[#00A9F7]">
                      {helper.points || 10}
                    </span>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      {tLocal('points')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;