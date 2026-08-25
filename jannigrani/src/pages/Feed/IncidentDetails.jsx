import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../config/firebase';
import GlowingCard from '../../components/ui/GlowingCard';
import PillButton from '../../components/ui/PillButton';

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    // Real-time listener for this specific report
    const docRef = doc(db, 'reports', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setReport({ id: docSnap.id, ...docSnap.data() });
      } else {
        setReport(null);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSupportClick = async () => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const docRef = doc(db, 'reports', id);
      // Add one support vote to the database in real-time
      await updateDoc(docRef, {
        upvotes: increment(1)
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <p className="text-gray-500 font-medium">{t('loading', 'Loading details...')}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-500 font-medium mb-6">{t('notFound', 'Report not found.')}</p>
        <PillButton onClick={() => navigate(-1)}>{t('back', 'Go Back')}</PillButton>
      </div>
    );
  }

  const currentVotes = report.upvotes || 0;

  return (
    <div className="min-h-screen bg-[#F5F8FA] pb-32">
      {/* Top Image Section */}
      <div className="relative w-full h-80 bg-gray-200">
        {report.mediaUrl ? (
          <img 
            src={report.mediaUrl} 
            alt="Report Evidence" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">{t('noImage', 'No image provided')}</span>
          </div>
        )}
        
        {/* Back Button Overlay */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/80 backdrop-blur-md text-citizenNavy px-4 py-2 rounded-extreme-pill font-bold shadow-sm"
        >
          {t('back', 'Back')}
        </button>
      </div>

      {/* Details Section */}
      <div className="max-w-2xl mx-auto px-6 -mt-12 relative z-10 space-y-6">
        
        {/* Impact Score Card */}
        <GlowingCard glowColor="blue" className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-citizenNavy">
                +{currentVotes}
              </span>
              <span className="text-sm font-medium text-gray-500 mt-1">
                {t('impactScore', 'Community Support')}
              </span>
            </div>
            
            <button 
              onClick={handleSupportClick}
              disabled={isVoting}
              className="bg-nigraniBlue text-white px-6 py-3 rounded-extreme-pill font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isVoting ? t('saving', 'Saving...') : t('supportThis', 'Support This')}
            </button>
          </div>
        </GlowingCard>

        {/* Information Card */}
        <div className="bg-white rounded-3xl p-8 shadow-floating-card space-y-6">
          <div>
            <span className="bg-[#E8F1F8] text-citizenNavy text-xs font-bold px-4 py-2 rounded-extreme-pill uppercase">
              {t(report.category, report.category)}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-citizenNavy mb-2">
              {t('status', 'Current Status')}
            </h2>
            <p className="text-gray-600 font-medium">
              {t(report.status, report.status)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 mb-2">
              {t('location', 'Location Coordinates')}
            </h2>
            <p className="text-gray-700 font-mono">
              {report.latitude?.toFixed(6)}, {report.longitude?.toFixed(6)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 mb-2">
              {t('dateReported', 'Date Reported')}
            </h2>
            <p className="text-gray-700 font-medium">
              {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IncidentDetails;