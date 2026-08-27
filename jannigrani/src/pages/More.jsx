import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

const moreTranslations = {
  en: {
    title: "More Options",
    sub: "Manage your account and app tools",
    myReports: "My Reports",
    myReportsDesc: "View complaints you submitted",
    leaderboard: "Leaderboard",
    leaderboardDesc: "See top community helpers",
    settings: "Settings",
    settingsDesc: "Change language and location",
    help: "Help & Support",
    helpDesc: "Emergency numbers and guides",
    about: "About Us",
    aboutDesc: "Learn about our mission"
  },
  hi: {
    title: "अन्य विकल्प",
    sub: "अपना खाता और ऐप टूल्स प्रबंधित करें",
    myReports: "मेरी शिकायतें",
    myReportsDesc: "द्वारा भेजी गई शिकायतें देखें",
    leaderboard: "लीडरबोर्ड",
    leaderboardDesc: "शीर्ष सामुदायिक सहायकों को देखें",
    settings: "सेटिंग्स",
    settingsDesc: "भाषा और स्थान बदलें",
    help: "सहायता और समर्थन",
    helpDesc: "आपातकालीन नंबर और गाइड",
    about: "हमारे बारे में",
    aboutDesc: "हमारे मिशन के बारे में जानें"
  },
  mr: {
    title: "आणखी पर्याय",
    sub: "खाते आणि ॲप टूल्स व्यवस्थापित करा",
    myReports: "माझे अहवाल",
    myReportsDesc: "तुम्ही पाठवलेल्या तक्रारी पहा",
    leaderboard: "लिडरबोर्ड",
    leaderboardDesc: "शीर्ष समुदाय सहाय्यक पहा",
    settings: "सेटिंग्स",
    settingsDesc: "भाषा आणि स्थान बदला",
    help: "मदत आणि समर्थन",
    helpDesc: "आपत्कालीन नंबर आणि मार्गदर्शक",
    about: "आमच्याबद्दल",
    aboutDesc: "आमच्या ध्येयाबद्दल जाणून घ्या"
  },
  bn: {
    title: "আরও বিকল্প",
    sub: "আপনার অ্যাকাউন্ট এবং অ্যাপ টুলস পরিচালনা করুন",
    myReports: "আমার রিপোর্ট",
    myReportsDesc: "আপনার জমা দেওয়া অভিযোগ দেখুন",
    leaderboard: "লিডারবোর্ড",
    leaderboardDesc: "শীর্ষ সম্প্রদায় সহায়ক দেখুন",
    settings: "সেটিংস",
    settingsDesc: "ভাষা এবং অবস্থান পরিবর্তন করুন",
    help: "সহায়তা এবং সমর্থন",
    helpDesc: "জরুরী নম্বর এবং নির্দেশিকা",
    about: "আমাদের সম্পর্কে",
    aboutDesc: "আমাদের লক্ষ্য সম্পর্কে জানুন"
  },
  te: {
    title: "మరిన్ని ఎంపికలు",
    sub: "మీ ఖాతా మరియు యాప్ టూల్స్‌ను నిర్వహించండి",
    myReports: "నా రిపోర్టులు",
    myReportsDesc: "మీరు సమర్పించిన ఫిర్యాదులను వీక్షించండి",
    leaderboard: "లీడర్‌బోర్డ్",
    leaderboardDesc: "టాప్ కమ్యూనిటీ సహాయకులను చూడండి",
    settings: "సెట్టింగ్‌లు",
    settingsDesc: "భాష మరియు స్థానాన్ని మార్చండి",
    help: "సహాయం మరియు మద్దతు",
    helpDesc: "అత్యవసర నంబర్లు మరియు మార్గదర్శకాలు",
    about: "మా గురించి",
    aboutDesc: "మా మిషన్ గురించి తెలుసుకోండి"
  },
  ta: {
    title: "கூடுதல் தேர்வுகள்",
    sub: "உங்கள் கணக்கு மற்றும் கருவிகளை நிர்வகிக்கவும்",
    myReports: "எனது அறிக்கைகள்",
    myReportsDesc: "நீங்கள் சமர்ப்பித்த புகார்களை காண்க",
    leaderboard: "தலைமைப் பலகை",
    leaderboardDesc: "சிறந்த சமூக உதவியாளர்களை காண்க",
    settings: "அமைப்புகள்",
    settingsDesc: "மொழி மற்றும் இருப்பிடத்தை மாற்றுக",
    help: "உதவி மற்றும் ஆதரவு",
    helpDesc: "அவசர எண்கள் மற்றும் வழிகாட்டிகள்",
    about: "எங்களைப் பற்றி",
    aboutDesc: "எங்கள் இலக்கை அறிக"
  },
  gu: {
    title: "વધુ વિકલ્પો",
    sub: "તમારું એકાઉન્ટ અને એપ્લિકેશન સાધનો 관리 કરો",
    myReports: "મારા રિપોર્ટ",
    myReportsDesc: "તમે સબમિટ કરેલી ફરિયાદો જુઓ",
    leaderboard: "લીડરબોર્ડ",
    leaderboardDesc: "ટોચના સમુદાય સહાયકો જુઓ",
    settings: "સેટિંગ્સ",
    settingsDesc: "ભાષા અને સ્થાન બદલો",
    help: "મદદ અને સપોર્ટ",
    helpDesc: "કટોકટી નંબરો અને માર્ગદર્શિકાઓ",
    about: "અમારા વિશે",
    aboutDesc: "અમારા ધ્યેય વિશે જાણો"
  },
  ur: {
    title: "مزید اختیارات",
    sub: "اپنا اکاؤنٹ اور ایپ ٹولز کا انتظام کریں",
    myReports: "میری رپورٹس",
    myReportsDesc: "اپنی جمع کردہ شکایات دیکھیں",
    leaderboard: "لیڈر بورڈ",
    leaderboardDesc: "سرفہرست کمیونٹی مددگار دیکھیں",
    settings: "ترتیبات",
    settingsDesc: "زبان اور مقام تبدیل کریں",
    help: "مدد اور معاونت",
    helpDesc: "ہنگامی نمبر اور گائیڈز",
    about: "हमारे बारे में",
    aboutDesc: "ہمارے مشن کے بارے میں جانیں"
  },
  kn: {
    title: "ಹೆಚ್ಚಿನ ಆಯ್ಕೆಗಳು",
    sub: "ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್ ಸಾಧನಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    myReports: "ನನ್ನ ವರದಿಗಳು",
    myReportsDesc: "ನೀವು ಸಲ್ಲಿಸಿದ ದೂರುಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    leaderboard: "ಲೀಡರ್‌ಬೋರ್ಡ್",
    leaderboardDesc: "शीर्ष ಸಮುದಾಯ ಸಹಾಯಕರನ್ನು ನೋಡಿ",
    settings: "ಸೇಟಿಂಗ್ಸ್",
    settingsDesc: "भाषा ಮತ್ತು ಸ್ಥಳ ಬದಲಾಯಿಸಿ",
    help: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    helpDesc: "ತುರ್ತು ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿಗಳು",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    aboutDesc: "ನಮ್ಮ ಗುರಿಯ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ"
  },
  or: {
    title: "ଅଧିକ ବିକଳ୍ପ",
    sub: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟ୍ ଏବଂ ଆପ୍ ଟୁଲ୍ସ ପରିଚାଳନା କରନ୍ତୁ",
    myReports: "ମୋର ରିପୋର୍ଟ",
    myReportsDesc: "ଆପଣ ଦାଖଲ କରିଥିବା ଅଭିଯୋଗ ଦେଖନ୍ତୁ",
    leaderboard: "ଲିଡରବୋର୍ଡ",
    leaderboardDesc: "ଶ୍ରେଷ୍ଠ ସମୁଦାୟ ସହାୟକଙ୍କୁ ଦେଖନ୍ତୁ",
    settings: "ସେଟିଂସ୍",
    settingsDesc: "ଭାଷା ଏବଂ ସ୍ଥାନ ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
    help: "ସାହାଯ୍ୟ ଏବଂ ସମର୍ଥନ",
    helpDesc: "ଜରୁରୀକାଳୀନ ନମ୍ବର ଏବଂ ଗାଇଡ୍",
    about: "ଆମ ବିଷୟରେ",
    aboutDesc: "ଆମର ଲକ୍ଷ୍ୟ ବିଷୟରେ ଜାଣନ୍ତୁ"
  },
  ml: {
    title: "കൂടുതൽ ഓപ്ഷനുകൾ",
    sub: "നിങ്ങളുടെ അക്കൗണ്ടും ആപ്പ് ടൂളുകളും കൈകാര്യം ചെയ്യുക",
    myReports: "എന്റെ റിപ്പോർട്ടുകൾ",
    myReportsDesc: "നിങ്ങൾ സമർപ്പിച്ച പരാതികൾ കാണുക",
    leaderboard: "ലീഡർബോർഡ്",
    leaderboardDesc: "മികച്ച കമ്മ്യൂണിറ്റി സഹായികളെ കാണുക",
    settings: "ക്രമീകരണങ്ങൾ",
    settingsDesc: "ഭാഷയും സ്ഥലവും മാറ്റുക",
    help: "സഹായവും പിന്തുണയും",
    helpDesc: "അടിയന്തര നമ്പറുകളും ഗൈഡുകളും",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    aboutDesc: "ഞങ്ങളുടെ ലക്ഷ്യത്തെക്കുറിച്ച് അറിയുക"
  },
  pa: {
    title: "ਹੋਰ ਵਿਕਲਪ",
    sub: "ਆਪਣा खाता ਅਤੇ ਐਪ ਟੂਲ ਪ੍ਰਬੰਧિત ਕਰੋ",
    myReports: "मेरी ਰਿਪੋਰਟਾਂ",
    myReportsDesc: "ਆਪਣੀਆਂ ਦਰਜ ਕੀਤੀਆਂ ਸ਼िकਾਇਤਾਂ ਦੇਖੋ",
    leaderboard: "ਲੀਡरਬੋਰਡ",
    leaderboardDesc: "शीर्ष ਕਮਿਊਨिटी ਮਦदਗਾਰ देਖੋ",
    settings: "ਸੈटिंग्स",
    settingsDesc: "भाशा ਅਤੇ ਸਥान ਬदलो",
    help: "मदद और समਰਥਨ",
    helpDesc: "आपातकालीन नम्बर",
    about: "साਡੇ बाре ਵਿੱਚ",
    aboutDesc: "ਸाਡੇ ਟੀਚے बारे जाṇो"
  },
  as: {
    title: "অধিক বিকল্প",
    sub: "আপোনাৰ একাউণ্ট আৰু এপ টুলসমূহ পৰিচালনা কৰক",
    myReports: "মোৰ ৰিপৰ্ট",
    myReportsDesc: "আপুনি জমা দিয়া অভিযোগসমূহ চাওক",
    leaderboard: "লিডাৰবৰ্ড",
    leaderboardDesc: "শীর্ষ সম্প্ৰদায় সহায়কসকলক চাওক",
    settings: "ছেটিংছ",
    settingsDesc: "ভাষা আৰু অৱস্থান সলনি কৰক",
    help: "সহায় আৰু সমৰ্থন",
    helpDesc: "জৰুৰীকালীন নম্বৰ আৰু নিৰ্দেশিকা",
    about: "আমাৰ বিষয়ে",
    aboutDesc: "আমাৰ লক্ষ্যৰ বিষয়ে জনাওক"
  }
};

const More = () => {
  const { language } = useTranslation();
  const navigate = useNavigate();

  const tLocal = (key) => {
    const langData = moreTranslations[language] || moreTranslations['en'];
    return langData[key] || moreTranslations['en'][key];
  };

  const menuItems = [
    {
      id: 'myReports',
      title: tLocal('myReports'),
      desc: tLocal('myReportsDesc'),
      path: '/my-reports',
      icon: (
        <svg className="w-6 h-6 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'leaderboard',
      title: tLocal('leaderboard'),
      desc: tLocal('leaderboardDesc'),
      path: '/leaderboard',
      icon: (
        <svg className="w-6 h-6 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'settings',
      title: tLocal('settings'),
      desc: tLocal('settingsDesc'),
      path: '/settings',
      icon: (
        <svg className="w-6 h-6 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'help',
      title: tLocal('help'),
      desc: tLocal('helpDesc'),
      path: '/help',
      icon: (
        <svg className="w-6 h-6 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'about',
      title: tLocal('about'),
      desc: tLocal('aboutDesc'),
      path: '/about',
      icon: (
        <svg className="w-6 h-6 text-[#00A9F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

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
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00A9F7] transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F1F8] flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B243B]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default More;