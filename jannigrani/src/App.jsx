import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

// Import All Real Pages
import Welcome from './pages/Welcome';
import ReportWizard from './pages/Report/ReportWizard';
import Feed from './pages/Feed';
import IncidentDetails from './pages/Feed/IncidentDetails';
import Dashboard from './pages/Dashboard';

// Import Navigation
import FloatingBottomNav from './components/layout/FloatingBottomNav';

const translations = {
  en: { loading: 'Please wait...' },
  hi: { loading: 'कृपया प्रतीक्षा करें...' },
  bn: { loading: 'অনুগ্রহ করে অপেক্ষা করুন...' },
  te: { loading: 'దయచేసి వేచి ఉండండి...' },
  mr: { loading: 'कृपया प्रतीक्षा करा...' },
  ta: { loading: 'காத்திருக்கவும்...' },
  gu: { loading: 'કૃપા કરીને રાહ જુઓ...' },
  kn: { loading: 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ...' },
  or: { loading: 'ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...' },
  ml: { loading: 'ദയവായി കാത്തിരിക്കുക...' },
  pa: { loading: 'ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...' },
  as: { loading: 'অনুগ্ৰহ কৰি অপেক্ষা কৰক...' },
  ur: { loading: 'براہ کرم انتظار کریں...' }
};

// Security Guard for Protected Pages
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { language } = useTranslation();

  const t = (key) => translations[language]?.[key] || translations['en'][key];
  
  // Prevent premature redirection by showing a loading state if auth is still initializing
  if (loading || currentUser === undefined) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-gray-600 font-medium">{t('loading')}</p>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Animation Wrapper for Smooth Transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();
  const { language, changeLanguage } = useTranslation();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  // Do not show the bottom menu on the root Welcome starting screen
  const showBottomNav = !['/'].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#F5F8FA] text-gray-900 font-sans">
      
      {/* 13+ Language Universal Selector */}
      <div className="absolute top-4 right-4 z-50">
        <select
          onChange={handleLanguageChange}
          value={language || 'en'}
          className="bg-white border border-gray-200 text-sm font-medium text-citizenNavy rounded-full px-4 py-2 shadow-sm focus:outline-none focus:border-nigraniBlue transition-colors"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="ur">اردو (Urdu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="as">অসমীয়া (Assamese)</option>
        </select>
      </div>

      {/* Page Routing Engine with Animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Starting Page (Now Welcome) */}
          <Route path="/" element={<PageWrapper><Welcome /></PageWrapper>} />
          
          {/* Secured Core Application Pages */}
          <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/add-report" element={<ProtectedRoute><PageWrapper><ReportWizard /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><PageWrapper><Feed /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed/:id" element={<ProtectedRoute><PageWrapper><IncidentDetails /></PageWrapper></ProtectedRoute>} />
          
          {/* Profile Route to fix missing location error */}
          <Route path="/profile" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
          
        </Routes>
      </AnimatePresence>

      {/* Conditional Bottom Menu */}
      {showBottomNav && <FloatingBottomNav />}
      
    </div>
  );
};

export default App;