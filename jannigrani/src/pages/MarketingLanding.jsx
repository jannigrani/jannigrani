/**
 * SYSTEM DOCUMENTATION / 13-LANGUAGE TRANSLATION
 * Context: Official Marketing Landing Page for JanNigrani.
 * Brand: JanNigrani
 * Design: Custom mockups (Left-aligned hero, custom graphic, interactive modals)
 *
 * SYSTEM COLORS REFERENCE (STRICT):
 * Primary Background: #FFFFFF (Pure White)
 * Dark Text: #111111 (Deep Black)
 * Highlight CTA: #00A9F7 (Action Blue)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowUp, Globe, ShieldCheck, MapPin, Activity, Bell } from 'lucide-react';

const TRANSLATIONS = {
    en: {
        lang: "English", products: "Products", sitemap: "Sitemap", careers: "Careers", coming_soon: "Coming Soon",
        badge: "Smart Civic Platform",
        main_title: "See. Verify.\nReport. Connect.",
        main_sub: "Report public issues securely. Track civic resolutions.",
        cta_btn: "Download App",
        val1_title: "Report", val1_sub: "Log civic issues.",
        val2_title: "Track", val2_sub: "Real-time status.",
        val3_title: "Alerts", val3_sub: "Official updates.",
        val4_title: "Secure", val4_sub: "Protected data.",
        select_lang: "Select Language", built_by: "Built by"
    },
    hi: {
        lang: "हिन्दी", products: "उत्पाद", sitemap: "साइटमैप", careers: "करियर", coming_soon: "जल्द आ रहा है",
        badge: "स्मार्ट नागरिक मंच",
        main_title: "देखें. जांचें.\nरिपोर्ट करें. जुड़ें.",
        main_sub: "सुरक्षित रूप से रिपोर्ट करें। समाधान ट्रैक करें।",
        cta_btn: "ऐप खोलें",
        val1_title: "रिपोर्ट", val1_sub: "समस्याएं दर्ज करें।",
        val2_title: "ट्रैक", val2_sub: "ताजा स्थिति।",
        val3_title: "अलर्ट", val3_sub: "आधिकारिक अपडेट।",
        val4_title: "सुरक्षित", val4_sub: "सुरक्षित डेटा।",
        select_lang: "भाषा चुनें", built_by: "निर्मित"
    },
    mr: {
        lang: "मराठी", products: "उत्पादने", sitemap: "साइटमॅप", careers: "करिअर", coming_soon: "लवकरच येत आहे",
        badge: "स्मार्ट नागरी व्यासपीठ",
        main_title: "पहा. तपासा.\nतक्रार करा. जोडा.",
        main_sub: "सुरक्षितपणे तक्रार करा. निराकरण ट्रॅक करा.",
        cta_btn: "ॲप उघडा",
        val1_title: "तक्रार", val1_sub: "समस्या नोंदवा.",
        val2_title: "ट्रॅक", val2_sub: "रिअल-टाइम स्थिती.",
        val3_title: "अलर्ट", val3_sub: "अधिकृत अपडेट्स.",
        val4_title: "सुरक्षित", val4_sub: "सुरक्षित डेटा.",
        select_lang: "भाषा निवडा", built_by: "निर्मित"
    },
    bn: {
        lang: "বাংলা", products: "পণ্য", sitemap: "সাইটম্যাপ", careers: "ক্যারিয়ার", coming_soon: "শীঘ্রই আসছে",
        badge: "স্মার্ট নাগরিক প্ল্যাটফর্ম",
        main_title: "দেখুন. যাচাই করুন.\nরিপোর্ট করুন. যুক্ত হন.",
        main_sub: "নিরাপদে রিপোর্ট করুন। সমাধান ট্র্যাক করুন।",
        cta_btn: "অ্যাপ খুলুন",
        val1_title: "রিপোর্ট", val1_sub: "সমস্যা লগ করুন।",
        val2_title: "ট্র্যাক", val2_sub: "রিয়েল-টাইম স্ট্যাটাস।",
        val3_title: "অ্যালার্ট", val3_sub: "অফিসিয়াল আপডেট।",
        val4_title: "নিরাপদ", val4_sub: "সুরক্ষিত ডেটা।",
        select_lang: "ভাষা নির্বাচন করুন", built_by: "দ্বারা নির্মিত"
    },
    te: {
        lang: "తెలుగు", products: "ఉత్పత్తులు", sitemap: "సైట్‌మ్యాప్", careers: "కెరీర్స్", coming_soon: "త్వరలో",
        badge: "స్మార్ట్ ప్లాట్‌ఫారమ్",
        main_title: "చూడండి. నిర్ధారించండి.\nనివేదించండి. కనెక్ట్ అవ్వండి.",
        main_sub: "సురక్షితంగా నివేదించండి. ట్రాక్ చేయండి.",
        cta_btn: "యాప్ తెరవండి",
        val1_title: "నివేదిక", val1_sub: "సమస్యలను లాగ్ చేయండి.",
        val2_title: "ట్రాక్", val2_sub: "రియల్ టైమ్ స్థితి.",
        val3_title: "అలర్ట్స్", val3_sub: "అధికారిక నవీకరణలు.",
        val4_title: "సురక్షితం", val4_sub: "రక్షిత డేటా.",
        select_lang: "భాష ఎంచుకోండి", built_by: "నిర్మించినవారు"
    },
    ta: {
        lang: "தமிழ்", products: "தயாரிப்புகள்", sitemap: "தளவரைபடம்", careers: "தொழில்கள்", coming_soon: "விரைவில்",
        badge: "ஸ்மார்ட் தளம்",
        main_title: "பார்க்க. சரிபார்க்க.\nபுகார் செய். இணை.",
        main_sub: "பாதுகாப்பாக புகார் செய். நிலையை அறி.",
        cta_btn: "செயலியை திற",
        val1_title: "அறிக்கை", val1_sub: "பிரச்சனைகளை பதிவு செய்.",
        val2_title: "கண்காணி", val2_sub: "நிகழ்நேர நிலை.",
        val3_title: "எச்சரிக்கைகள்", val3_sub: "அதிகாரப்பூர்வ தகவல்.",
        val4_title: "பாதுகாப்பு", val4_sub: "பாதுகாப்பான தரவு.",
        select_lang: "மொழியைத் தேர்ந்தெடு", built_by: "உருவாக்கியவர்"
    },
    gu: {
        lang: "ગુજરાતી", products: "ઉત્પાદનો", sitemap: "સાઇટમેપ", careers: "કારકિર્દી", coming_soon: "ટૂંક સમયમાં",
        badge: "સ્માર્ટ પ્લેટફોર્મ",
        main_title: "જુઓ. ચકાસો.\nરિપોર્ટ કરો. જોડાઓ.",
        main_sub: "સુરક્ષિત રીતે રિપોર્ટ કરો. ઉકેલ ટ્રૅક કરો.",
        cta_btn: "એપ્લિકેશન ખોલો",
        val1_title: "રિપોર્ટ", val1_sub: "સમસ્યાઓ નોંધો.",
        val2_title: "ટ્રૅક", val2_sub: "રિયલ-ટાઇમ સ્થિતિ.",
        val3_title: "એલર્ટ", val3_sub: "સત્તાવાર અપડેટ્સ.",
        val4_title: "સુરક્ષિત", val4_sub: "સુરક્ષિત ડેટા.",
        select_lang: "ભાષા પસંદ કરો", built_by: "દ્વારા"
    },
    kn: {
        lang: "ಕನ್ನಡ", products: "ಉತ್ಪನ್ನಗಳು", sitemap: "ಸೈಟ್‌ಮ್ಯಾಪ್", careers: "ವೃತ್ತಿ", coming_soon: "ಶೀಘ್ರದಲ್ಲೇ",
        badge: "ಸ್ಮಾರ್ಟ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
        main_title: "ನೋಡಿ. ಪರಿಶೀಲಿಸಿ.\nವರದಿ ಮಾಡಿ. ಸಂಪರ್ಕಿಸಿ.",
        main_sub: "ಸುರಕ್ಷಿತವಾಗಿ ವರದಿ ಮಾಡಿ. ಪರಿಹಾರ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
        cta_btn: "ಅಪ್ಲಿಕೇಶನ್ ತೆರೆಯಿರಿ",
        val1_title: "ವರದಿ", val1_sub: "ಸಮಸ್ಯೆಗಳನ್ನು ದಾಖಲಿಸಿ.",
        val2_title: "ಟ್ರ್ಯಾಕ್", val2_sub: "ನೈಜ ಸಮಯದ ಸ್ಥಿತಿ.",
        val3_title: "ಎಚ್ಚರಿಕೆಗಳು", val3_sub: "ಅಧಿಕೃತ ನವೀಕರಣಗಳು.",
        val4_title: "ಸುರಕ್ಷಿತ", val4_sub: "ರಕ್ಷಿತ ಡೇಟಾ.",
        select_lang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ", built_by: "ನಿರ್ಮಿಸಿದವರು"
    },
    or: {
        lang: "ଓଡ଼ିଆ", products: "ଉତ୍ପାଦ", sitemap: "ସାଇଟମ୍ୟାପ୍", careers: "କ୍ୟାରିୟର୍", coming_soon: "ଶୀଘ୍ର ଆସୁଛି",
        badge: "ସ୍ମାର୍ଟ ପ୍ଲାଟଫର୍ମ",
        main_title: "ଦେଖନ୍ତୁ. ଯାଞ୍ଚ କରନ୍ତୁ.\nରିପୋର୍ଟ କରନ୍ତୁ. ଯୋଡନ୍ତୁ.",
        main_sub: "ସୁରକ୍ଷିତ ଭାବେ ରିପୋର୍ଟ କରନ୍ତୁ।",
        cta_btn: "ଆପ୍ ଖୋଲନ୍ତୁ",
        val1_title: "ରିପୋର୍ଟ", val1_sub: "ସମସ୍ୟା ଦାଖଲ କରନ୍ତୁ।",
        val2_title: "ଟ୍ରାକ୍", val2_sub: "ସିଧାସଳଖ ସ୍ଥିତି।",
        val3_title: "ଆଲର୍ଟ", val3_sub: "ଅଫିସିଆଲ୍ ଅପଡେଟ୍।",
        val4_title: "ସୁରକ୍ଷିତ", val4_sub: "ସୁରକ୍ଷିତ ଡାଟା।",
        select_lang: "ଭାଷା ବାଛନ୍ତୁ", built_by: "ଦ୍ୱାରା ନିର୍ମିତ"
    },
    ml: {
        lang: "മലയാളം", products: "ഉൽപ്പന്നങ്ങൾ", sitemap: "സൈറ്റ്മാപ്പ്", careers: "കരിയർ", coming_soon: "ഉടൻ വരുന്നു",
        badge: "സ്മാർട്ട് പ്ലാറ്റ്ഫോം",
        main_title: "കാണുക. പരിശോധിക്കുക.\nറിപ്പോർട്ട് ചെയ്യുക. ബന്ധിപ്പിക്കുക.",
        main_sub: "സുരക്ഷിതമായി റിപ്പോർട്ട് ചെയ്യുക.",
        cta_btn: "ആപ്പ് തുറക്കുക",
        val1_title: "റിപ്പോർട്ട്", val1_sub: "പ്രശ്നങ്ങൾ രേഖപ്പെടുത്തുക.",
        val2_title: "ട്രാക്ക്", val2_sub: "തത്സമയ അവസ്ഥ.",
        val3_title: "അലർട്ടുകൾ", val3_sub: "ഔദ്യോഗിക വിവരങ്ങൾ.",
        val4_title: "സുരക്ഷിതം", val4_sub: "സുരക്ഷിതമായ ഡാറ്റ.",
        select_lang: "ഭാഷ തിരഞ്ഞെടുക്കുക", built_by: "നിർമ്മിച്ചത്"
    },
    pa: {
        lang: "ਪੰਜਾਬੀ", products: "ਉਤਪਾਦ", sitemap: "ਸਾਈਟਮੈਪ", careers: "ਕਰੀਅਰ", coming_soon: "ਜਲਦੀ",
        badge: "ਸਮਾਰਟ ਪਲੇਟਫਾਰਮ",
        main_title: "ਦੇਖੋ. ਜਾਂਚੋ.\nਰਿਪੋਰਟ ਕਰੋ. ਜੁੜੋ.",
        main_sub: "ਸੁਰੱਖਿਅਤ ਰਿਪੋਰਟ ਕਰੋ। ਹੱਲ ਟਰੈਕ ਕਰੋ।",
        cta_btn: "ਐਪ ਖੋਲ੍ਹੋ",
        val1_title: "ਰਿਪੋਰਟ", val1_sub: "ਸਮੱਸਿਆਵਾਂ ਦਰਜ ਕਰੋ।",
        val2_title: "ਟਰੈਕ", val2_sub: "ਰੀਅਲ-ਟਾਈਮ ਸਥਿਤੀ।",
        val3_title: "ਅਲਰਟ", val3_sub: "ਅਧਿਕਾਰਤ ਅੱਪਡੇਟ।",
        val4_title: "ਸੁਰੱਖਿਅਤ", val4_sub: "ਸੁਰੱਖਿਅਤ ਡਾਟਾ।",
        select_lang: "ਭਾਸ਼ਾ ਚੁਣੋ", built_by: "ਦੁਆਰਾ ਬਣਾਇਆ"
    },
    as: {
        lang: "অসমীয়া", products: "পণ্য", sitemap: "চাইটমেপ", careers: "কৰিয়াৰ", coming_soon: "সোনকালেই আহি আছে",
        badge: "স্মাৰ্ট প্লেটফৰ্ম",
        main_title: "চাওক. প্ৰমাণ কৰক.\nৰিপৰ্ট কৰক. সংযোগ কৰক.",
        main_sub: "নিৰাপদে ৰিপৰ্ট কৰক। সমাধান চাওক।",
        cta_btn: "এপ খোলক",
        val1_title: "ৰিপৰ্ট", val1_sub: "সমস্যাসমূহ পঞ্জীয়ন কৰক।",
        val2_title: "ট্ৰেক", val2_sub: "বৰ্তমানৰ অৱস্থা।",
        val3_title: "এলাৰ্ট", val3_sub: "চৰকাৰী আপডেট।",
        val4_title: "নিৰাপদ", val4_sub: "সুৰক্ষিত ডাটা।",
        select_lang: "ভাষা বাছক", built_by: "দ্বাৰা নিৰ্মিত"
    },
    ur: {
        lang: "اردو", products: "مصنوعات", sitemap: "سائٹ میپ", careers: "کیریئر", coming_soon: "جلد آ رہا ہے",
        badge: "سمارٹ پلیٹ فارم",
        main_title: "دیکھیں. تصدیق کریں.\nرپورٹ کریں. جڑیں.",
        main_sub: "محفوظ طریقے سے رپورٹ کریں۔ حل ٹریک کریں۔",
        cta_btn: "ایپ کھولیں",
        val1_title: "رپورٹ", val1_sub: "مسائل درج کریں۔",
        val2_title: "ٹریک", val2_sub: "موجودہ حالت۔",
        val3_title: "الرٹس", val3_sub: "سرکاری اپ ڈیٹس۔",
        val4_title: "محفوظ", val4_sub: "محفوظ ڈیٹا۔",
        select_lang: "زبان منتخب کریں", built_by: "تیار کردہ"
    }
};

export default function MarketingLanding() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [lang, setLang] = useState('en');
    const [showLangPrompt, setShowLangPrompt] = useState(false);
    const [showProductsPrompt, setShowProductsPrompt] = useState(false);
    const [showSitemapPrompt, setShowSitemapPrompt] = useState(false);

    // STRICT COLOR VARIABLES
    const theme = {
        primary: "#111111",
        bg: "#FFFFFF",
        text: "#111111",
        accent: "#00A9F7"
    };

    const currentT = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    const languageOptions = [
        { code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' },
        { code: 'mr', label: 'मराठी' }, { code: 'bn', label: 'বাংলা' },
        { code: 'te', label: 'తెలుగు' }, { code: 'ta', label: 'தமிழ்' },
        { code: 'gu', label: 'ગુજરાતી' }, { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'or', label: 'ଓଡ଼ିଆ' }, { code: 'ml', label: 'മലയാളം' },
        { code: 'pa', label: 'ਪੰਜਾਬੀ' }, { code: 'as', label: 'অসমীয়া' },
        { code: 'ur', label: 'اردو' }
    ];

    useEffect(() => {
        const sysLang = navigator.language.slice(0, 2);
        if (TRANSLATIONS[sysLang]) setLang(sysLang);
    }, []);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleAppRedirect = () => {
        navigate('/download');
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div ref={scrollRef} className="fixed inset-0 w-screen h-[100dvh] z-[9999] overflow-y-auto overflow-x-hidden font-sans flex flex-col" style={{ backgroundColor: theme.bg, color: theme.text }}>
            
            <style>
                {`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            <header className="w-full flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 animate-fade relative z-50">
                <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
                    <img 
                        src="https://i.postimg.cc/PrDX9Wtm/photo-6066349669190669559-y-removebg-preview.png" 
                        alt="Logo" 
                        className="h-12 w-auto mr-[1px]" 
                        onError={(e) => { e.target.style.display = 'none' }} 
                    />
                    <span className="font-black text-[1.5rem] tracking-tighter text-[#111111]">
                        JanNigrani
                    </span>
                </div>
                
                <div className="flex items-center gap-4 sm:gap-6 text-[0.95rem] font-bold">
                    <button onClick={() => setShowLangPrompt(true)} className="flex items-center gap-2 text-[#111111] hover:opacity-70 transition-opacity outline-none">
                        <Globe size={16} /> <span className="hidden sm:inline">{currentT.lang}</span>
                    </button>
                    <button onClick={() => setShowProductsPrompt(true)} className="hidden md:block text-[#111111] hover:opacity-70 transition-opacity outline-none">
                        {currentT.products}
                    </button>
                </div>
            </header>

            <main className="w-full max-w-none px-6 md:px-12 lg:px-24 pt-16 pb-24 mb-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 flex-1">
                
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full lg:w-[50%] xl:w-[45%] z-10 flex flex-col items-start justify-center text-left">
                    
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#111111]/10 mb-8 bg-[#00A9F7]/10">
                        <ShieldCheck size={16} color={theme.accent} />
                        <span className="text-[0.75rem] font-bold tracking-widest uppercase text-[#00A9F7]">{currentT.badge}</span>
                    </div>

                    <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black leading-[1.1] tracking-tighter mb-6 text-[#111111]">
                        {currentT.main_title.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}<br/></React.Fragment>
                        ))}
                    </h1>
                    
                    <p className="text-[1.15rem] md:text-[1.3rem] text-[#111111] font-medium leading-[1.6] mb-12 opacity-90">
                        {currentT.main_sub}
                    </p>
                    
                    <button 
                        onClick={handleAppRedirect} 
                        style={{ backgroundColor: theme.accent, color: "#FFFFFF" }}
                        className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-[1.1rem] transition-transform hover:scale-105 outline-none shadow-lg mb-16 flex items-center justify-center gap-2"
                    >
                        {currentT.cta_btn} <ArrowRight size={20} />
                    </button>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-full max-w-[500px]">
                        {[
                            { icon: MapPin, title: currentT.val1_title, desc: currentT.val1_sub },
                            { icon: Activity, title: currentT.val2_title, desc: currentT.val2_sub },
                            { icon: Bell, title: currentT.val3_title, desc: currentT.val3_sub },
                            { icon: ShieldCheck, title: currentT.val4_title, desc: currentT.val4_sub }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-start text-left">
                                <div className="w-12 h-12 rounded-full border border-[#111111]/10 flex items-center justify-center mb-3 bg-[#00A9F7]/10">
                                    <item.icon size={20} color={theme.accent} />
                                </div>
                                <h4 className="text-[1.15rem] font-black text-[#111111] mb-1">{item.title}</h4>
                                <p className="text-[0.9rem] text-[#111111] opacity-80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="w-full lg:w-[50%] h-[500px] lg:h-[750px] relative z-0 flex items-center justify-center lg:justify-end xl:pr-12">
                    <svg viewBox="0 0 600 600" className="w-full h-full max-w-[750px]" fill="none">
                        
                        <motion.circle 
                            cx="300" cy="200" r="100" 
                            fill="rgba(0,169,247,0.1)" 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                        />
                        <circle cx="300" cy="200" r="50" fill={theme.accent} />
                        
                        <path d="M 0 450 Q 150 320 300 450 T 600 450 L 600 600 L 0 600 Z" fill="rgba(17,17,17,0.03)" />

                        <path d="M 100 450 L 100 220 L 170 220 L 170 450 Z" fill="rgba(17,17,17,0.06)" />
                        <path d="M 190 450 L 190 120 L 270 120 L 270 450 Z" fill="rgba(17,17,17,0.09)" />
                        <path d="M 290 450 L 290 180 L 350 180 L 350 450 Z" fill="rgba(17,17,17,0.05)" />
                        <path d="M 370 450 L 370 80 L 470 80 L 470 450 Z" fill="rgba(17,17,17,0.08)" />

                        <rect x="210" y="150" width="20" height="20" fill={theme.accent} />
                        <rect x="240" y="210" width="20" height="20" fill={theme.accent} />
                        <rect x="390" y="120" width="20" height="20" fill={theme.accent} />
                        <rect x="440" y="300" width="20" height="20" fill={theme.accent} />
                        <rect x="120" y="260" width="20" height="20" fill={theme.accent} />
                        
                        <path d="M 140 450 L 140 380" stroke="rgba(17,17,17,0.2)" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="140" cy="350" r="30" fill="rgba(17,17,17,0.15)" />
                        <path d="M 330 450 L 330 350" stroke="rgba(17,17,17,0.2)" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="330" cy="310" r="40" fill="rgba(17,17,17,0.15)" />
                        <path d="M 500 450 L 500 370" stroke="rgba(17,17,17,0.2)" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="500" cy="330" r="35" fill="rgba(17,17,17,0.1)" />

                        <motion.path 
                            d="M 0 480 C 150 450 300 510 600 480 L 600 600 L 0 600 Z" 
                            fill="rgba(0,169,247,0.15)" 
                            animate={{ d: ["M 0 480 C 150 450 300 510 600 480 L 600 600 L 0 600 Z", "M 0 480 C 150 510 300 450 600 480 L 600 600 L 0 600 Z", "M 0 480 C 150 450 300 510 600 480 L 600 600 L 0 600 Z"] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.path 
                            d="M 0 520 C 200 490 400 550 600 520 L 600 600 L 0 600 Z" 
                            fill="rgba(0,169,247,0.25)" 
                            animate={{ d: ["M 0 520 C 200 490 400 550 600 520 L 600 600 L 0 600 Z", "M 0 520 C 200 550 400 490 600 520 L 600 600 L 0 600 Z", "M 0 520 C 200 490 400 550 600 520 L 600 600 L 0 600 Z"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <motion.path 
                            d="M 400 200 Q 410 190 420 200 Q 410 210 400 200" 
                            stroke="#111111" strokeWidth="2" fill="none" 
                            animate={{ x: [0, -100, 0], y: [0, -30, 0] }} 
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
                        />
                        <motion.path 
                            d="M 450 150 Q 460 140 470 150 Q 460 160 450 150" 
                            stroke="#111111" strokeWidth="2" fill="none" 
                            animate={{ x: [0, -150, 0], y: [0, -20, 0] }} 
                            transition={{ duration: 15, repeat: Infinity, delay: 2, ease: "linear" }} 
                        />
                    </svg>
                </motion.div>
            </main>

            <AnimatePresence>
                {showLangPrompt && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-[#111111]/60 backdrop-blur-sm flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-[400px] bg-[#FFFFFF] rounded-3xl p-8 flex flex-col shadow-2xl relative max-h-[80vh] overflow-y-auto border border-[#111111]/10 hide-scrollbar">
                            <button onClick={() => setShowLangPrompt(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors outline-none"><X size={18} /></button>
                            <div className="w-12 h-12 mx-auto rounded-full border border-[#111111]/10 flex items-center justify-center mb-4"><Globe size={24} color="#111111" strokeWidth="1.5" /></div>
                            <h2 className="text-[1.4rem] font-black tracking-tight mb-6 text-[#111111] text-center mt-4">{currentT.select_lang}</h2>
                            <div className="flex flex-col gap-2 mt-4">
                                {languageOptions.map((option) => (
                                    <button key={option.code} onClick={() => { setLang(option.code); setShowLangPrompt(false); }} className={`w-full p-4 rounded-xl flex items-center justify-between group transition-colors outline-none ${lang === option.code ? 'bg-[#00A9F7] text-[#FFFFFF] border border-[#00A9F7]' : 'bg-[#FFFFFF] text-[#111111] border border-[#111111]/10 hover:border-[#00A9F7]'}`}>
                                        <span className="font-bold text-[1rem]">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showProductsPrompt && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-[#111111]/60 backdrop-blur-sm flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-[500px] bg-[#FFFFFF] rounded-3xl p-10 flex flex-col shadow-2xl relative border border-[#111111]/10 max-h-[90vh] overflow-y-auto hide-scrollbar">
                            <button onClick={() => setShowProductsPrompt(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors outline-none"><X size={18} /></button>
                            
                            <h2 className="text-[1.8rem] font-black tracking-tight mb-2 text-[#111111] text-center mt-2">Also from us</h2>
                            <p className="text-[#111111]/70 text-[0.95rem] text-center mb-8">Part of our app.</p>

                            <div className="flex flex-col gap-4">
                                <Link to="/" className="group flex flex-col items-center justify-center gap-2 bg-[#FFFFFF] border-2 border-[#00A9F7] p-6 rounded-2xl transition-all text-center w-full outline-none">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={24} color="#00A9F7" strokeWidth={2.5} />
                                        <span className="font-black text-[1.4rem] tracking-tighter text-[#111111]">
                                            JanNigrani
                                        </span>
                                    </div>
                                    <p className="text-[#00A9F7] text-[0.85rem] leading-relaxed mt-1 font-bold">
                                        Citizen evidence & reporting.
                                    </p>
                                </Link>

                                <button onClick={(e) => { e.preventDefault(); alert("Official Authority Portal is Coming Soon!"); }} className="group flex flex-col items-center justify-center gap-2 bg-[#FFFFFF] border border-[#111111]/10 p-6 rounded-2xl opacity-70 hover:bg-[#111111]/5 transition-all text-center w-full outline-none relative cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-[1.4rem] tracking-tighter text-[#111111]">
                                            Authority <span className="font-medium text-[1.1rem] text-[#111111]/70">Portal</span>
                                        </span>
                                    </div>
                                    <span className="absolute top-3 right-3 text-[0.65rem] font-bold px-2 py-1 bg-[#111111]/5 text-[#111111] rounded-full uppercase tracking-wider">Coming Soon</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSitemapPrompt && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-[#111111]/60 backdrop-blur-sm flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-[500px] bg-[#FFFFFF] rounded-3xl p-10 flex flex-col shadow-2xl relative border border-[#111111]/10">
                            <button onClick={() => setShowSitemapPrompt(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors outline-none"><X size={18} /></button>
                            
                            <h2 className="text-[1.8rem] font-black tracking-tight mb-2 text-[#111111] text-left">{currentT.sitemap}</h2>
                            <p className="text-[#111111]/70 text-[0.95rem] text-left mb-8">Go directly to app pages.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <Link to="/home" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>App Login</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Main screen</span>
                                </Link>
                                <Link to="/download" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>Get App</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Download APK</span>
                                </Link>
                                <Link to="/profile" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>Profile</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Your details</span>
                                </Link>
                                <Link to="/my-reports" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>My Reports</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Track submissions</span>
                                </Link>
                                <Link to="/leaderboard" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>Leaderboard</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Top contributors</span>
                                </Link>
                                <Link to="/settings" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>Settings</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">App preferences</span>
                                </Link>
                                <Link to="/help" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>Help</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Support & FAQs</span>
                                </Link>
                                <Link to="/about" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col">
                                    <span>About</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">App information</span>
                                </Link>
                                <Link to="/more" className="bg-[#FFFFFF] border border-[#111111]/20 p-4 rounded-xl font-bold text-[#111111] text-[0.95rem] hover:border-[#00A9F7] transition-colors text-left outline-none flex flex-col sm:col-span-2">
                                    <span>More</span>
                                    <span className="text-[#111111]/60 font-normal text-[0.75rem] mt-1">Explore features</span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="w-full mt-auto bg-[#FFFFFF] flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-12 lg:px-24 py-8 pb-12 border-t border-[#111111]/10 relative z-10">
                
                <div className="flex flex-wrap justify-center items-center gap-6">
                    <button onClick={() => setShowLangPrompt(true)} className="flex items-center gap-2 text-[#111111] font-bold text-[0.9rem] px-5 py-2.5 rounded-full border border-[#111111]/20 hover:bg-[#111111]/5 transition-colors outline-none">
                        <Globe size={16} /> <span className="hidden sm:inline">{currentT.lang}</span>
                    </button>
                </div>

                <div className="flex items-center gap-5 text-[#111111]">
                        <a href="https://www.linkedin.com/company/pbglobal-services/" className="hover:opacity-70 transition-opacity outline-none">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="#" className="hover:opacity-70 transition-opacity outline-none">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                        </a>
                        <a href="https://instagram.com/" className="hover:opacity-70 transition-opacity outline-none">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                        <a href="#" className="hover:opacity-70 transition-opacity outline-none">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.006 4.15H5.078z"/></svg>
                        </a>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 text-[0.85rem] font-bold text-[#111111]">
                    <button onClick={() => setShowProductsPrompt(true)} className="hover:opacity-70 transition-opacity outline-none uppercase">{currentT.products}</button>
                    <span className="w-1.5 h-1.5 bg-[#111111] opacity-30 rounded-full"></span>
                    <button onClick={() => setShowSitemapPrompt(true)} className="hover:opacity-70 transition-opacity outline-none uppercase">{currentT.sitemap}</button>
                    <span className="w-1.5 h-1.5 bg-[#111111] opacity-30 rounded-full"></span>
                    
                    <div className="flex items-center gap-0.5 uppercase tracking-wider opacity-90">
                        {currentT.built_by} 
                        <a href="https://rebrand.ly/pbg" target="_blank" rel="noopener noreferrer" className="ml-1 hover:opacity-80 transition-opacity outline-none">
                            <img src="https://i.postimg.cc/wMgtFyQk/imageedit-8-5494402482.png" alt="PB Global Services" className="h-4 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span class="underline text-[#FFFFFF]">AnyAstro</span>'); }} />
                        </a>
                    </div>

                    <button onClick={scrollToTop} className="ml-2 p-2.5 rounded-full border border-[#111111]/20 text-[#111111] hover:bg-[#111111]/5 transition-colors outline-none flex items-center justify-center">
                        <ArrowUp size={16} />
                    </button>
                </div>
            </footer>
        </div>
    );
}