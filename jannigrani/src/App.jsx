import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

// Import All Real Pages
import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import ReportWizard from './pages/Report/ReportWizard';
import Feed from './pages/Feed';
import IncidentDetails from './pages/Feed/IncidentDetails';
import Dashboard from './pages/Dashboard';
import Tutorial from './pages/Tutorial';
import Profile from './pages/Profile';
import More from './pages/More';
import MyReports from './pages/MyReports';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Help from './pages/Help';
import About from './pages/About';

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
        <p className="text-[#0B243B] font-bold text-lg">{t('loading')}</p>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Root Guard to prioritize Splash screen, then Onboarding, then Authentication
const RootGuard = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const flag = localStorage.getItem('hasSeenOnboarding');
    setHasSeenOnboarding(flag === 'true');
    setIsChecking(false);
  }, []);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  if (isChecking || loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-[#0B243B] font-bold text-lg">...</p>
      </div>
    );
  }

  // 1. Force Welcome screen if local storage flag is missing (e.g., first time or cache cleared)
  if (!hasSeenOnboarding) {
    return children;
  }

  // 2. If onboarding is complete and logged in, go to Home (Dashboard)
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  // 3. If onboarding is complete but not logged in, stay on Welcome to force login
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

  // Strictly hide Header on root, welcome, and tutorial routes
  const showHeader = !['/', '/welcome', '/tutorial'].includes(location.pathname);
  
  // Conditionally hide Bottom Navigation
  const showBottomNav = !['/', '/welcome', '/tutorial'].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#F5F8FA] text-[#111111] font-sans">
      
      {/* Conditionally Render Header Top Bar */}
      {showHeader && <Header />}

      {/* Page Routing Engine with Animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Public Starting Page guarded by RootGuard (handles Splash and Onboarding) */}
          <Route 
            path="/" 
            element={
              <RootGuard>
                <PageWrapper><Welcome /></PageWrapper>
              </RootGuard>
            } 
          />
          
          <Route 
            path="/welcome" 
            element={<PageWrapper><Welcome /></PageWrapper>} 
          />
          
          {/* Unprotected Tutorial Screen (Header is hidden) */}
          <Route path="/tutorial" element={<PageWrapper><Tutorial /></PageWrapper>} />

          {/* Secured Core Application Pages / Homepage mapped to Dashboard */}
          <Route path="/home" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          
          <Route path="/add-report" element={<ProtectedRoute><PageWrapper><ReportWizard /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><PageWrapper><Feed /></PageWrapper></ProtectedRoute>} />
          <Route path="/feed/:id" element={<ProtectedRoute><PageWrapper><IncidentDetails /></PageWrapper></ProtectedRoute>} />
          
          {/* Profile and Expansion Routes */}
          <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
          <Route path="/more" element={<ProtectedRoute><PageWrapper><More /></PageWrapper></ProtectedRoute>} />
          <Route path="/my-reports" element={<ProtectedRoute><PageWrapper><MyReports /></PageWrapper></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><PageWrapper><Settings /></PageWrapper></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><PageWrapper><Help /></PageWrapper></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><PageWrapper><About /></PageWrapper></ProtectedRoute>} />
          
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