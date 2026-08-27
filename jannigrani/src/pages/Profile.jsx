import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import { useTranslation } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const GRADIO_API_URL = "https://your-username-your-space.hf.space/api/predict";

const translations = {
  en: {
    title: "Your Profile",
    nameLabel: "Full Name",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    uploadBtn: "Upload Picture",
    saveBtn: "Save Details",
    logoutBtn: "Logout",
    saving: "Saving...",
    uploading: "Uploading...",
    success: "Profile saved successfully.",
    error: "Failed to save. Please try. Again."
  },
  hi: {
    title: "आपकी प्रोफ़ाइल",
    nameLabel: "पूरा नाम",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल पता",
    uploadBtn: "फोटो बदलें",
    saveBtn: "जानकारी सेव करें",
    logoutBtn: "लॉग आउट",
    saving: "सेव हो रहा है...",
    uploading: "अपलोड हो रहा है...",
    success: "प्रोफ़ाइल सेव हो गई।",
    error: "सेव नहीं हुआ। फिर से प्रयास करें।"
  },
  bn: {
    title: "আপনার প্রোফাইল",
    nameLabel: "পুরো নাম",
    phoneLabel: "ফোন নম্বর",
    emailLabel: "ইমেইল ঠিকানা",
    uploadBtn: "ছবি আপলোড করুন",
    saveBtn: "তথ্য সেভ করুন",
    logoutBtn: "লগ আউট",
    saving: "সেভ হচ্ছে...",
    uploading: "আপলোড হচ্ছে...",
    success: "প্রোফাইল সেভ হয়েছে।",
    error: "সেভ করা যায়নি। আবার চেষ্টা করুন।"
  },
  te: {
    title: "మీ ప్రొఫైల్",
    nameLabel: "పూర్తి పేరు",
    phoneLabel: "ఫోన్ నంబర్",
    emailLabel: "ఇమెయిల్",
    uploadBtn: "ఫోటో మార్చండి",
    saveBtn: "వివరాలను సేవ్ చేయండి",
    logoutBtn: "లాగ్ అవుట్",
    saving: "సేవ్ అవుతోంది...",
    uploading: "అప్‌లోడ్ అవుతోంది...",
    success: "ప్రొఫైల్ సేవ్ చేయబడింది.",
    error: "సేవ్ కాలేదు. మళ్ళీ ప్రయత్నించండి."
  },
  mr: {
    title: "तुमचे प्रोफाईल",
    nameLabel: "पूर्ण नाव",
    phoneLabel: "फोन नंबर",
    emailLabel: "ईमेल",
    uploadBtn: "फोटो अपलोड करा",
    saveBtn: "माहिती सेव्ह करा",
    logoutBtn: "बाहेर पडा",
    saving: "सेव्ह होत आहे...",
    uploading: "अपलोड होत आहे...",
    success: "प्रोफाईल सेव्ह झाले.",
    error: "सेव्ह झाले नाही. पुन्हा प्रयत्न करा."
  },
  ta: {
    title: "உங்கள் விவரம்",
    nameLabel: "முழு பெயர்",
    phoneLabel: "தொலைபேசி எண்",
    emailLabel: "மின்னஞ்சல்",
    uploadBtn: "படம் பதிவேற்று",
    saveBtn: "தகவலை சேமி",
    logoutBtn: "வெளியேறு",
    saving: "சேமிக்கப்படுகிறது...",
    uploading: "பதிவேற்றுகிறது...",
    success: "விவரம் சேமிக்கப்பட்டது.",
    error: "சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்."
  },
  gu: {
    title: "તમારી પ્રોફાઇલ",
    nameLabel: "પૂરું નામ",
    phoneLabel: "ફોન નંબર",
    emailLabel: "ઈમેલ",
    uploadBtn: "ફોટો અપલોડ કરો",
    saveBtn: "માહિતી સેવ કરો",
    logoutBtn: "બહાર નીકળો",
    saving: "સેવ થઈ રહ્યું છે...",
    uploading: "અપલોડ થઈ રહ્યું છે...",
    success: "પ્રોફાઇલ સેવ થઈ ગઈ.",
    error: "સેવ નિષ્ફળ. ફરી પ્રયાસ કરો."
  },
  kn: {
    title: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್",
    nameLabel: "ಪೂರ್ಣ ಹೆಸರು",
    phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
    emailLabel: "ಇಮೇಲ್",
    uploadBtn: "ಫೋಟೋ ಹಾಕಿ",
    saveBtn: "ಮಾಹಿತಿ ಉಳಿಸಿ",
    logoutBtn: "ಹೊರಬನ್ನಿ",
    saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    uploading: "ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    success: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ.",
    error: "ಉಳಿಸಲು ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
  },
  or: {
    title: "ଆପଣଙ୍କ ପ୍ରୋଫାଇଲ୍",
    nameLabel: "ପୁରା ନାମ",
    phoneLabel: "ଫୋନ୍ ନମ୍ବର",
    emailLabel: "ଇମେଲ୍",
    uploadBtn: "ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
    saveBtn: "ତଥ୍ୟ ସେଭ୍ କରନ୍ତୁ",
    logoutBtn: "ଲଗ୍ ଆଉଟ୍",
    saving: "ସେଭ୍ ହେଉଛି...",
    uploading: "ଅପଲୋଡ୍ ହେଉଛି...",
    success: "ପ୍ରୋଫାଇଲ୍ ସେଭ୍ ହୋଇଗଲା।",
    error: "ସେଭ୍ ହେଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"
  },
  ml: {
    title: "നിങ്ങളുടെ പ്രൊഫൈൽ",
    nameLabel: "മുഴുവൻ പേര്",
    phoneLabel: "ഫോൺ നമ്പർ",
    emailLabel: "ഇമെയിൽ",
    uploadBtn: "ഫോട്ടോ നൽകുക",
    saveBtn: "വിവരങ്ങൾ സംരക്ഷിക്കുക",
    logoutBtn: "പുറത്തിറങ്ങുക",
    saving: "സംരക്ഷിക്കുന്നു...",
    uploading: "അപ്‌ലോഡ് ചെയ്യുന്നു...",
    success: "പ്രൊഫൈൽ സംരക്ഷിച്ചു.",
    error: "സംരക്ഷിച്ചില്ല. വീണ്ടും ശ്രമിക്കുക."
  },
  pa: {
    title: "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ",
    nameLabel: "ਪੂਰਾ ਨਾਮ",
    phoneLabel: "ਫੋਨ ਨੰਬਰ",
    emailLabel: "ਈਮੇਲ",
    uploadBtn: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
    saveBtn: "ਜਾਣਕਾਰੀ ਸੇਵ ਕਰੋ",
    logoutBtn: "ਬਾਹਰ ਜਾਓ",
    saving: "ਸੇਵ ਹੋ ਰਿਹਾ ਹੈ...",
    uploading: "ਅਪਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    success: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਹੋ ਗਈ।",
    error: "ਸੇਵ ਨਹੀਂ ਹੋਇਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
  },
  as: {
    title: "আপোনাৰ প্ৰোফাইল",
    nameLabel: "সম্পূৰ্ণ নাম",
    phoneLabel: "ফোন নম্বৰ",
    emailLabel: "ইমেইল",
    uploadBtn: "ফটো আপলোড কৰক",
    saveBtn: "তথ্য চেভ কৰক",
    logoutBtn: "লগ আউট",
    saving: "চেভ হৈ আছে...",
    uploading: "আপলোড হৈ আছে...",
    success: "প্ৰোফাইল চেভ কৰা হ'ল।",
    error: "চেভ কৰিব পৰা নগ'ল। পুনৰ চেষ্টা কৰক।"
  },
  ur: {
    title: "آپ کی پروفائل",
    nameLabel: "پورا نام",
    phoneLabel: "فون نمبر",
    emailLabel: "ای میل",
    uploadBtn: "تصویر اپ لوڈ کریں",
    saveBtn: "معلومات محفوظ کریں",
    logoutBtn: "لاگ آؤٹ",
    saving: "محفوظ ہو رہا ہے...",
    uploading: "اپ لوڈ ہو رہا ہے...",
    success: "پروفائل محفوظ ہو گئی۔",
    error: "محفوظ نہیں ہو سکا۔ دوبارہ کوشش کریں۔"
  }
};

const Profile = () => {
  const { language } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const t = (key) => translations[language]?.[key] || translations['en'][key];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setProfilePic(data.profilePic || '');
        } else {
          await setDoc(docRef, {
            email: currentUser.email || '',
            name: currentUser.displayName || '',
            phone: '',
            profilePic: '',
            createdAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (error) {
        console.error("Error fetching or initializing profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      
      try {
        const response = await fetch(GRADIO_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [base64Image]
          })
        });
        
        const result = await response.json();
        
        if (result && result.data && result.data[0]) {
          setProfilePic(result.data[0]);
        }
      } catch (error) {
        console.error("Gradio upload failed:", error);
        alert(t('error'));
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, {
        name: name,
        phone: phone,
        profilePic: profilePic,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      alert(t('success'));
    } catch (error) {
      console.error(error);
      alert(t('error'));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-[#0B243B] font-bold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#0B243B] mb-2">
            {t('title')}
          </h1>
        </div>

        <div className="bg-white rounded-[32px] shadow-[0_20px_40px_-10px_rgba(11,36,59,0.15)] p-8 flex flex-col items-center border border-[#E8F1F8]">
          
          {/* Profile Picture Section */}
          <div className="relative w-32 h-32 mb-6">
            <div className="w-full h-full rounded-full bg-[#E8F1F8] overflow-hidden border-4 border-white shadow-md flex items-center justify-center">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#174A7E] font-black text-3xl">
                  {name ? name.charAt(0).toUpperCase() : '?'}
                </span>
              )}
            </div>
            
            {/* FIXED: SVG viewBox attribute corrected here */}
            <label className="absolute bottom-0 right-0 bg-[#00A9F7] text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-[#174A7E] active:scale-95 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                disabled={uploading}
              />
            </label>
          </div>
          
          {uploading && (
            <p className="text-[#00A9F7] text-sm font-bold mb-4">{t('uploading')}</p>
          )}

          {/* Form Fields */}
          <div className="w-full space-y-5">
            
            <div className="flex flex-col text-left">
              <label className="text-sm font-bold text-[#0B243B] mb-2">{t('emailLabel')}</label>
              <input 
                type="email" 
                value={currentUser?.email || ''} 
                disabled 
                className="w-full p-4 bg-[#F2F4F7] border border-[#E8F1F8] rounded-2xl text-[#111111] cursor-not-allowed font-bold"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-sm font-bold text-[#0B243B] mb-2">{t('nameLabel')}</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-white border-2 border-[#E8F1F8] rounded-2xl focus:border-[#00A9F7] focus:outline-none transition-all font-bold text-[#0B243B] shadow-sm"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-sm font-bold text-[#0B243B] mb-2">{t('phoneLabel')}</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 bg-white border-2 border-[#E8F1F8] rounded-2xl focus:border-[#00A9F7] focus:outline-none transition-all font-bold text-[#0B243B] shadow-sm"
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={saving || uploading}
              className="w-full mt-6 bg-[#0B243B] text-white font-bold py-4 rounded-full shadow-lg hover:bg-[#174A7E] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? t('saving') : t('saveBtn')}
            </button>

            <button 
              onClick={handleLogout}
              className="w-full mt-3 bg-red-50 text-red-600 border border-red-200 font-bold py-4 rounded-full shadow-sm hover:bg-red-100 active:scale-[0.98] transition-all"
            >
              {t('logoutBtn')}
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;