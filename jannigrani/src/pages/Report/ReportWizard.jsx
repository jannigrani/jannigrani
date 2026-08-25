import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import pb from '../../config/pocketbase';
import PillButton from '../../components/ui/PillButton';

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

const ReportWizard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Real form data state
  const [category, setCategory] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [location, setLocation] = useState(null);

  // Step 1: Category Selection
  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setStep(2);
  };

  // Step 2: Media Upload Preparation
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  // Step 3: Real Device Geolocation
  const getLocation = () => {
    setIsProcessing(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsProcessing(false);
          setStep(4);
        },
        (error) => {
          console.error(error);
          setIsProcessing(false);
          alert(t('locationError', 'Could not get location. Please allow access.'));
        }
      );
    } else {
      setIsProcessing(false);
      alert(t('noLocation', 'Location is not supported by your device.'));
    }
  };

  // Step 4: Final Real Submission (PocketBase + Firestore)
  const submitReport = async () => {
    setIsProcessing(true);
    try {
      let fileUrl = '';
      
      // 1. Upload actual file to PocketBase
      if (mediaFile) {
        const formData = new FormData();
        formData.append('file', mediaFile);
        const record = await pb.collection('attachments').create(formData);
        fileUrl = `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${record.file}`;
      }

      // 2. Save complete record to Firebase
      await addDoc(collection(db, 'reports'), {
        category: category,
        mediaUrl: fileUrl,
        latitude: location?.lat || 0,
        longitude: location?.lng || 0,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      setIsProcessing(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert(t('submitError', 'Failed to submit report. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full relative h-[600px] flex flex-col bg-white rounded-3xl shadow-floating-card overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="bg-citizenNavy h-2 transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="flex-grow relative p-8">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-4">
                  {t('step1Title', 'What is the issue?')}
                </h2>
                <button onClick={() => handleCategorySelect('pollution')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('pollution', 'Pollution')}
                </button>
                <button onClick={() => handleCategorySelect('safety')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('safety', 'Safety Hazard')}
                </button>
                <button onClick={() => handleCategorySelect('civic')} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-nigraniBlue transition-colors font-medium text-gray-700">
                  {t('civic', 'Civic Damage')}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step2Title', 'Upload a Photo')}
                </h2>
                <p className="text-gray-500 mb-6">{t('step2Desc', 'Help us see the problem clearly.')}</p>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                
                <PillButton onClick={() => setStep(3)} className="w-full mt-auto">
                  {t('continue', 'Continue')}
                </PillButton>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step3Title', 'Set Location')}
                </h2>
                <p className="text-gray-500 mb-8">{t('step3Desc', 'We need to know where to send help.')}</p>
                
                <PillButton onClick={getLocation} className="w-full">
                  {isProcessing ? t('loading', 'Getting location...') : t('getLocation', 'Use My Current Location')}
                </PillButton>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-8 flex flex-col items-center text-center justify-center space-y-6"
              >
                <h2 className="text-2xl font-bold text-citizenNavy mb-2">
                  {t('step4Title', 'Ready to Submit')}
                </h2>
                <p className="text-gray-500 mb-8">{t('step4Desc', 'Your report is ready. Thank you for making the city safer.')}</p>
                
                <PillButton onClick={submitReport} className="w-full bg-nigraniBlue">
                  {isProcessing ? t('loading', 'Saving...') : t('submit', 'Submit Report')}
                </PillButton>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReportWizard;