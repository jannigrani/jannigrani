import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';

const aboutTranslations = {
  en: { 
    title: "About Us", 
    sub: "Making our city better together", 
    missionTitle: "Our Mission", 
    missionText: "We help you report civic issues like broken roads and dirty streets directly so local authorities can fix them quickly.", 
    trustTitle: "Safe and Secure", 
    trustText: "Your details are safe. We work directly for public welfare and clean neighborhoods." 
  },
  hi: { 
    title: "हमारे बारे में", 
    sub: "मिलकर अपने शहर को बेहतर बनाना", 
    missionTitle: "हमारा उद्देश्य", 
    missionText: "हम सड़क टूटने या गंदगी जैसी समस्याओं की सीधी रिपोर्ट करने में मदद करते हैं ताकि अधिकारी तुरंत ठीक कर सकें।", 
    trustTitle: "सुरक्षित और भरोसेमंद", 
    trustText: "आपकी जानकारी सुरक्षित है। हम जन कल्याण और साफ-सुथरे मोहल्लों के लिए काम करते हैं।" 
  },
  mr: { 
    title: "आमच्याबद्दल", 
    sub: "आपले शहर एकत्र सुधारणे", 
    missionTitle: "आमचे ध्येय", 
    missionText: "रस्ते तुटणे किंवा घाण यासारख्या समस्यांची थेट तक्रार करण्यास आम्ही मदत करतो जेणेकरून अधिकारी लवकर दुरुस्त करू शकतील.", 
    trustTitle: "सुरक्षित आणि खात्रीशीर", 
    trustText: "तुमची माहिती सुरक्षित आहे. आम्ही लोककल्याण आणि स्वच्छ परिसरासाठी काम करतो." 
  },
  bn: { 
    title: "আমাদের সম্পর্কে", 
    sub: "একসাথে আমাদের শহরকে উন্নত করা", 
    missionTitle: "আমাদের লক্ষ্য", 
    missionText: "আমরা ভাঙা রাস্তা বা ময়লার মতো সমস্যা সরাসরি জানাতে সাহায্য করি যাতে প্রশাসন দ্রুত ঠিক করতে পারে।", 
    trustTitle: "নিরাপদ এবং সুরক্ষিত", 
    trustText: "আপনার তথ্য সুরক্ষিত আছে। আমরা জনগণের কল্যাণ এবং পরিষ্কার এলাকার জন্য কাজ করি।" 
  },
  te: { 
    title: "మా గురించి", 
    sub: "మన నగరాన్ని మెరుగ్గా తీర్చిదిద్దుదాం", 
    missionTitle: "మా లక్ష్యం", 
    missionText: "రోడ్లు పాడవడము లేదా చెత్త వంటి సమస్యలను నేరుగా తెలియజేయడానికి మేము సహాయం చేస్తాము.", 
    trustTitle: "సురక్షితం మరియు నమ్మకం", 
    trustText: "మీ వివరాలు సురక్షితంగా ఉంటాయి. మేము ప్రజల సంక్షేమం కోసం పని చేస్తాము." 
  },
  ta: { 
    title: "எங்களைப் பற்றி", 
    sub: "நமது நகரத்தை மேம்படுத்துவது", 
    missionTitle: "எங்கள் நோக்கம்", 
    missionText: "சாலை பழுது அல்லது குப்பை போன்ற பிரச்சனைகளை நேரடியாக புகார் செய்ய உதவுகிறோம்.", 
    trustTitle: "பாதுகாப்பானது", 
    trustText: "உங்கள் விவரங்கள் பாதுகாப்பாக உள்ளன. நாங்கள் மக்களின் நலனுக்காக உழைக்கிறோம்." 
  },
  gu: { 
    title: "અમારા વિશે", 
    sub: "આપણું શહેર સાથે મળીને સુધારવું", 
    missionTitle: "અમારો ઉદ્દેશ્ય", 
    missionText: "તૂટેલા રસ્તા કે ગંદકી જેવી સમસ્યાઓની સીધી ફરિયાદ કરવામાં અમે મદદ કરીએ છીએ જેથી અધિકારીઓ ઝડપથી સુધારી શકે.", 
    trustTitle: "સુરક્ષિત અને વિશ્વાસપાત્ર", 
    trustText: "તમારી માહિતી સુરક્ષિત છે. અમે લોકકલ્યાણ માટે કામ કરીએ છીએ." 
  },
  ur: { 
    title: "ہمارے بارے میں", 
    sub: "مل کر اپنے شہر کو بہتر بنانا", 
    missionTitle: "ہمارا مقصد", 
    missionText: "ہم ٹوٹی ہوئی سڑکوں اور گندگی کی براہ راست رپورٹ کرنے میں مدد کرتے ہیں تاکہ حکام فوری حل کر سکیں.", 
    trustTitle: "محفوظ اور پراعتماد", 
    trustText: "آپ کی معلومات محفوظ ہیں۔ ہم عوامی بہبود کے لیے کام کرتے ہیں۔" 
  },
  kn: { 
    title: "ನಮ್ಮ ಬಗ್ಗೆ", 
    sub: "ನಮ್ಮ ನಗರವನ್ನು ಉತ್ತಮಗೊಳಿಸುವುದು", 
    missionTitle: "ನಮ್ಮ ಗುರಿ", 
    missionText: "ಹಾದಿ ಕೆಟ್ಟುಹೋಗುವುದು ಅಥವಾ ಕಸದಂತಹ ಸಮಸ್ಯೆಗಳನ್ನು ನೇರವಾಗಿ ವರದಿ ಮಾಡಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.", 
    trustTitle: "ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ", 
    trustText: "ನಿಮ್ಮ ವಿವರಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ. ನಾವು ಸಾರ್ವಜನಿಕ ಒಳಿತಿಗಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ." 
  },
  or: { 
    title: "ଆମ ବିଷୟରେ", 
    sub: "ମିଳିତ ଭାବେ ସହରକୁ ସୁନ୍ଦର କରିବା", 
    missionTitle: "ଆମର ଲକ୍ଷ୍ୟ", 
    missionText: "ଭଙ୍ଗା ରାସ୍ତା କିମ୍ବା ମଇଳା ସମସ୍ୟା ସିଧାସଳଖ ଜଣାଇବାକୁ ଆମେ ସାହାଯ୍ୟ କରୁ।", 
    trustTitle: "ସୁରକ୍ଷିତ ଏବଂ ବିଶ୍ୱାସଯୋଗ୍ୟ", 
    trustText: "ଆପଣଙ୍କ ତଥ୍ୟ ସୁରକ୍ଷିତ ଅଛି।" 
  },
  ml: { 
    title: "ഞങ്ങളെക്കുറിച്ച്", 
    sub: "നമ്മുടെ നഗരത്തെ മെച്ചപ്പെടുത്തുക", 
    missionTitle: "ഞങ്ങളുടെ ലക്ഷ്യം", 
    missionText: "തകർന്ന റോഡുകളോ അഴുക്കോ നേരിട്ട് റിപ്പോർട്ട് ചെയ്യാൻ ഞങ്ങൾ സഹായിക്കുന്നു.", 
    trustTitle: "സുരക്ഷിതം", 
    trustText: "നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമാണ്." 
  },
  pa: { 
    title: "ਸਾਡੇ बारे ਵਿੱਚ", 
    sub: "ਰਲ के शहर नूं वधिया बनाना", 
    missionTitle: "ਸਾਡਾ ਟੀਚਾ", 
    missionText: "अਸੀਂ ਟੁੱਟੀਆਂ ਸੜਕਾਂ या गंदगी दी सीधा शिकायत ਕਰਨ ਵਿਚ मदद ਕਰਦੇ हाँ.", 
    trustTitle: "सुरक्षित और भरोसेमंद", 
    trustText: "आपकी जानकारी सुरक्षित है।" 
  },
  as: { 
    title: "আমাৰ বিষয়ে", 
    sub: "আমাৰ চহৰখন উন্নত কৰা", 
    missionTitle: "আমাৰ লক্ষ্য", 
    missionText: "ভঙା ৰাস্তা বা লেতেৰা সমস্যা পোনপটীয়াকৈ জনোৱাত আমি সহায় কৰোঁ।", 
    trustTitle: "নিৰাপদ আৰু বিশ্বাসযোগ্য", 
    trustText: "আপোনাৰ তথ্য সুৰক্ষিত।" 
  }
};

const About = () => {
  const { language } = useTranslation();

  const tLocal = (key) => {
    const langData = aboutTranslations[language] || aboutTranslations['en'];
    return langData[key] || aboutTranslations['en'][key];
  };

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

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0B243B] mb-2">
              {tLocal('missionTitle')}
            </h2>
            <p className="text-gray-600 font-medium text-sm leading-relaxed">
              {tLocal('missionText')}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-[#0B243B] mb-2">
              {tLocal('trustTitle')}
            </h2>
            <p className="text-gray-600 font-medium text-sm leading-relaxed">
              {tLocal('trustText')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;