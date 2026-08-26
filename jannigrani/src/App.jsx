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
import Tutorial from './pages/Tutorial';
import Profile from './pages/Profile';

// Import Navigation, Headers and Modals
import Header from './components/common/Header';
import FloatingBottomNav from './components/layout/FloatingBottomNav';
import AuthModal from './components/auth/AuthModal';

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
  const { currentUser } = useAuth();

  // Control visibility of Header and Bottom Navigation based on current route path
  const showHeader = !['/', '/welcome'].includes(location.pathname);
  const showBottomNav = !['/', '/welcome', '/tutorial'].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#F5F8FA] text-gray-900 font-sans">
      
      {/* Conditionally Render Header Top Bar */}
      {showHeader && <Header />}

      {/* Page Routing Engine with Animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Starting Page / Onboarding Welcome */}
          <Route 
            path="/" 
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <PageWrapper><Welcome /></PageWrapper>
            } 
          />
          
          <Route 
            path="/welcome" 
            element={<PageWrapper><Welcome /></PageWrapper>} 
          />
          
          {/* Secured Core Application Pages / Homepage */}
          <Route path="/tutorial" element={<ProtectedRoute><PageWrapper><Tutorial /></PageWrapper></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/add-report" element={<ProtectedRoute><PageWrapper><ReportWizard /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><PageWrapper><Feed /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed/:id" element={<ProtectedRoute><PageWrapper><IncidentDetails /></PageWrapper></ProtectedRoute>} />
          
          {/* Profile Route properly connected and protected */}
          <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
          
        </Routes>
      </AnimatePresence>

      {/* Conditional Bottom Menu */}
      {showBottomNav && <FloatingBottomNav />}
      
      {/* Global Auth Modal for app-wide authentication triggers */}
      <AuthModal />
      
    </div>
  );
};

export default App;