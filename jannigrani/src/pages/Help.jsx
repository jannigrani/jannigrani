import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';

const helpTranslations = {
  en: { 
    title: "Help and Support", 
    sub: "Emergency contacts and simple reporting guide", 
    emergencyTitle: "Emergency Helplines", 
    police: "Police Helpline", 
    ambulance: "Ambulance", 
    fire: "Fire Station", 
    civic: "City Helpdesk", 
    call: "Call Now",
    guideTitle: "How to Report", 
    step1: "1. Take a clear photo of the problem area", 
    step2: "2. Select the correct category for the issue", 
    step3: "3. Submit and track your repair progress" 
  },
  hi: { 
    title: "सहायता और समर्थन", 
    sub: "आपातकालीन नंबर और सरल रिपोर्टिंग गाइड", 
    emergencyTitle: "आपातकालीन हेल्पलाइन", 
    police: "पुलिस हेल्पलाइन", 
    ambulance: "एम्बुलेंस", 
    fire: "दुकान / दमकल केंद्र", 
    civic: "नगर निगम हेल्पडेस्क", 
    call: "कॉल करें",
    guideTitle: "शिकायत कैसे करें", 
    step1: "1. समस्या की स्पष्ट फोटो लें", 
    step2: "2. सही श्रेणी चुनें", 
    step3: "3. जमा करें और सुधार ट्रैक करें" 
  },
  mr: { 
    title: "मदत आणि समर्थन", 
    sub: "आपत्कालीन नंबर आणि साधे मार्गदर्शक", 
    emergencyTitle: "आपत्कालीन हेल्पलाइन", 
    police: "पोलिस हेल्पलाइन", 
    ambulance: "रुग्णवाहिका", 
    fire: "अग्निशामक दल", 
    civic: "शहर मदत कक्ष", 
    call: "कॉल करा",
    guideTitle: "तक्रार कशी करावी", 
    step1: "1. समस्येचा स्पष्ट फोटो ਕਾਢਾ", 
    step2: "2. योग्य वर्ग निवडा", 
    step3: "3. पाठवा आणि प्रगती तपासा" 
  },
  bn: { 
    title: "সহায়তা এবং সমর্থন", 
    sub: "জরুরী নম্বর এবং সহজ নির্দেশিকা", 
    emergencyTitle: "জরুরী হেল্পলাইন", 
    police: "পুলিশ হেল্পলাইন", 
    ambulance: "অ্যাম্বুলেন্স", 
    fire: "দমকল বাহিনী", 
    civic: "শহর সহায়তা কেন্দ্র", 
    call: "কল করুন",
    guideTitle: "কীভাবে রিপোর্ট করবেন", 
    step1: "১. সমস্যার পরিষ্কার ছবি তুলুন", 
    step2: "২. সঠিক বিভাগ নির্বাচন করুন", 
    step3: "৩. জমা দিন এবং কাজ দেখুন" 
  },
  te: { 
    title: "సహాయం మరియు మద్దతు", 
    sub: "అత్యవసర నంబర్లు మరియు సాధారణ మార్గదర్శకం", 
    emergencyTitle: "అత్యవసర హెల్ప్‌లైన్‌లు", 
    police: "పోలీసు హెల్ప్‌లైన్", 
    ambulance: "అంబులెన్స్", 
    fire: "అగ్నిమాపక కేంద్రం", 
    civic: "నగర సహాయ కేంద్రం", 
    call: "కాల్ చేయండి",
    guideTitle: "రిపోర్ట్ చేయడం ఎలా", 
    step1: "1. సమస్య యొక్క స్పష్టమైన ఫోటో తీయండి", 
    step2: "2. సరైన వర్గాన్ని ఎంచుకోండి", 
    step3: "3. సమర్పించండి మరియు ట్రాక్ చేయండి" 
  },
  ta: { 
    title: "உதவி மற்றும் ஆதரவு", 
    sub: "அவசர எண்கள் மற்றும் எளிய வழிகாட்டி", 
    emergencyTitle: "அவசர உதவி எண்கள்", 
    police: "காவல்துறை உதவி", 
    ambulance: "ஆம்புலன்ஸ்", 
    fire: "தீயணைப்பு துறை", 
    civic: "நகர உதவி மையம்", 
    call: "அழையுங்கள்",
    guideTitle: "புகார் அளிப்பது எப்படி", 
    step1: "1. பிரச்சனையின் தெளிவான படத்தை எடு", 
    step2: "2. சரியான வகையை தேர்ந்தெடு", 
    step3: "3. சமர்ப்பித்து கண்காணிக்கவும்" 
  },
  gu: { 
    title: "મદદ અને સપોર્ટ", 
    sub: "કટોકટી નંબરો અને સરળ માર્ગદર્શિકા", 
    emergencyTitle: "કટોકટી હેલ્પલાઇન", 
    police: "પોલીસ હેલ્પલાઇન", 
    ambulance: "એમ્બ્યુલન્સ", 
    fire: "ફાયર સ્ટેશન", 
    civic: "સિટી હેલ્પડેસ્ક", 
    call: "કોલ કરો",
    guideTitle: "ફરિયાદ કેવી રીતે કરવી", 
    step1: "1. સમસ્યાનો સ્પષ્ટ ફોટો લો", 
    step2: "2. સાચી શ્રેણી પસંદ કરો", 
    step3: "3. સબમિટ કરો અને પ્રગતિ જુઓ" 
  },
  ur: { 
    title: "مدد اور معاونت", 
    sub: "ہنگامی نمبر اور آسان گائیڈ", 
    emergencyTitle: "ہنگامی ہیلپ لائنز", 
    police: "پولیس ہیلپ لائن", 
    ambulance: "ایمبولینس", 
    fire: "فائر اسٹیشن", 
    civic: "سٹی ہیلپ ڈیسک", 
    call: "কল کریں",
    guideTitle: "رپورٹ کیسے کریں", 
    step1: "1. مسئلہ کی واضح تصویر لیں", 
    step2: "2. درست زمرہ منتخب کریں", 
    step3: "3. جمع کروائیں اور پیش رفت دیکھیں" 
  },
  kn: { 
    title: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ", 
    sub: "ತುರ್ತು ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಸರಳ ಮಾರ್ಗದರ್ಶಿ", 
    emergencyTitle: "ತುರ್ತು ಸಹಾಯವಾಣಿ", 
    police: "ಪೋಲಿಸ್ ಸಹಾಯವಾಣಿ", 
    ambulance: "ಆಂಬ್ಯುಲೆನ್ಸ್", 
    fire: "ಅಗ್ನಿಶಾಮಕ ದಳ", 
    civic: "ನಗರ ಸಹಾಯ ಕೇಂದ್ರ", 
    call: "ಕರೆ ಮಾಡಿ",
    guideTitle: "ವರದಿ ಮಾಡುವುದು ಹೇಗೆ", 
    step1: "1. ಸಮಸ್ಯೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ", 
    step2: "2. ಸರಿಯಾದ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ", 
    step3: "3. ಸಲ್ಲಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ" 
  },
  or: { 
    title: "ସାହାଯ୍ୟ ଏବଂ ସମର୍ଥନ", 
    sub: "ଜରୁରୀକାଳୀନ ନମ୍ବର ଏବଂ ସରଳ ଗାଇଡ୍", 
    emergencyTitle: "ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ୍", 
    police: "ପୋଲିସ୍ ହେଲ୍ପଲାଇନ୍", 
    ambulance: "ଆମ୍ବୁଲାନ୍ସ", 
    fire: "ଦମକଳ କେନ୍ଦ୍ର", 
    civic: "ସହର ସହାୟତା କେନ୍ଦ୍ର", 
    call: "କଲ୍ କରନ୍ତୁ",
    guideTitle: "କିପରି ରିପୋର୍ଟ କରିବେ", 
    step1: "1. ସମସ୍ୟାର ସ୍ପଷ୍ଟ ଫଟୋ ନିଅନ୍ତୁ", 
    step2: "2. ସଠିକ୍ ବର୍ଗ ବାଛନ୍ତୁ", 
    step3: "3. ଦାଖଲ କରନ୍ତୁ ଏବଂ ଟ୍ରାକ୍ କରନ୍ତୁ" 
  },
  ml: { 
    title: "സഹായവും പിന്തുണയും", 
    sub: "അടിയന്തര നമ്പറുകളും ലളിതമായ ഗൈഡും", 
    emergencyTitle: "അടിയന്തര ഹെൽപ്പ്‌ലൈനുകൾ", 
    police: "പോലീസ് ഹെൽപ്പ്‌ലൈൻ", 
    ambulance: "ആംബുലൻസ്", 
    fire: "ഫയർ സ്റ്റേഷൻ", 
    civic: "നഗര സഹായ കേന്ദ്രം", 
    call: "കോൾ ചെയ്യുക",
    guideTitle: "എങ്ങനെ റിപ്പോർട്ട് ചെയ്യാം", 
    step1: "1. പ്രശ്നത്തിന്റെ വ്യക്തമായ ഫോട്ടോ എടുക്കുക", 
    step2: "2. ശരിയായ വിഭാഗം തിരഞ്ഞെടുക്കുക", 
    step3: "3. സമർപ്പിച്ച് ട്രാക്ക് ചെയ്യുക" 
  },
  pa: { 
    title: "ਮਦਦ ਅਤੇ ਸਮਰਥਨ", 
    sub: "ਆਪात्ਕਾਲੀ ਨੰਬਰ ਅਤੇ ਸਰਲ ਗਾਈਡ", 
    emergencyTitle: "ਆਪात्ਕਾਲੀ ਹੈਲਪਲਾਈਨ", 
    police: "ਪੁਲਿਸ ਹੈਲਪਲਾਈਨ", 
    ambulance: "ਐਂਬुलेंस", 
    fire: "ਫਾਇਰ ਸਟੇਸ਼ਨ", 
    civic: "ਸਿਟੀ ਹੈਲਪਡੈਸਕ", 
    call: "ਕਾਲ ਕਰੋ",
    guideTitle: "ਰਿਪੋਰਟ ਕਿਵੇਂ ਕਰੀਏ", 
    step1: "1. ਸਮੱਸਿਆ ਦੀ ਸਾਫ਼ ਫੋਟੋ ਲਓ", 
    step2: "2. ਸਹੀ ਸ਼੍ਰੇਣੀ ਚੁਣੋ", 
    step3: "3. ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਟਰੈਕ ਕਰੋ" 
  },
  as: { 
    title: "সহায় আৰু সমৰ্থন", 
    sub: "জৰুৰীকালীন নম্বৰ আৰু সহজ নিৰ্দেশিকা", 
    emergencyTitle: "জৰুৰীকালীন হেল্পলাইন", 
    police: "আক্ষরিক পুলিচ হেল্পলাইন", 
    ambulance: "এম্বুলেঞ্চ", 
    fire: "আগ্নেয়গিরি বিভাগ", 
    civic: "চহৰ সহায় কেন্দ্র", 
    call: "কল কৰক",
    guideTitle: "কিদৰে ৰিপৰ্ট কৰিব", 
    step1: "1. সমস্যাটোৰ পৰিষ্কাৰ ফটো তোলক", 
    step2: "2. সঠিক শ্ৰেণী বাছক", 
    step3: "3. জমা দিয়ক আৰু ট্ৰেক কৰক" 
  }
};

const Help = () => {
  const { language } = useTranslation();

  const tLocal = (key) => {
    const langData = helpTranslations[language] || helpTranslations['en'];
    return langData[key] || helpTranslations['en'][key];
  };

  const emergencyContacts = [
    { title: tLocal('police'), number: "112" },
    { title: tLocal('ambulance'), number: "102" },
    { title: tLocal('fire'), number: "101" },
    { title: tLocal('civic'), number: "1800-000-111" }
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

        {/* Emergency Contacts Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B243B] px-1">
            {tLocal('emergencyTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#0B243B]">
                    {contact.title}
                  </h3>
                  <p className="text-lg font-black text-[#00A9F7] mt-0.5">
                    {contact.number}
                  </p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="bg-[#0B243B] text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-[#174A7E] transition-all"
                >
                  {tLocal('call')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reporting Guide Section */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-[#0B243B] px-1">
            {tLocal('guideTitle')}
          </h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#E8F1F8] text-[#00A9F7] font-bold flex items-center justify-center flex-shrink-0">1</div>
              <p className="text-sm font-medium text-gray-700 pt-1">{tLocal('step1')}</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#E8F1F8] text-[#00A9F7] font-bold flex items-center justify-center flex-shrink-0">2</div>
              <p className="text-sm font-medium text-gray-700 pt-1">{tLocal('step2')}</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#E8F1F8] text-[#00A9F7] font-bold flex items-center justify-center flex-shrink-0">3</div>
              <p className="text-sm font-medium text-gray-700 pt-1">{tLocal('step3')}</p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Help;