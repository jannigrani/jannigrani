import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import GlowingCard from '../components/ui/GlowingCard';

const Feed = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for Verified reports only
    const q = query(
      collection(db, 'reports'),
      where('status', '==', 'Verified')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReports = [];
      snapshot.forEach((doc) => {
        fetchedReports.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort by newest first on the device to avoid needing complex database indexes
      fetchedReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setReports(fetchedReports);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-citizenNavy mb-2">
            {t('feedTitle', 'Verified Reports')}
          </h1>
          <p className="text-gray-600 font-medium">
            {t('feedSubtitle', 'Real updates from your city')}
          </p>
        </div>
        
        {loading && (
          <div className="text-center text-gray-500 font-medium p-8">
            {t('loading', 'Loading reports...')}
          </div>
        )}
        
        {!loading && reports.length === 0 && (
          <div className="text-center text-gray-500 font-medium p-8 bg-white rounded-2xl border border-gray-200">
            {t('noReports', 'No verified reports found at this time.')}
          </div>
        )}

        <div className="space-y-6">
          {reports.map((report) => (
            <GlowingCard key={report.id} glowColor="blue">
              <div className="flex flex-col space-y-4">
                
                <div className="flex justify-between items-center">
                  <span className="bg-[#E8F1F8] text-citizenNavy text-xs font-bold px-4 py-2 rounded-extreme-pill">
                    {t('verified', 'Verified')}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-citizenNavy capitalize">
                  {t(report.category, report.category)}
                </h3>
                
                {report.mediaUrl && (
                  <img 
                    src={report.mediaUrl} 
                    alt="Report Evidence" 
                    className="w-full h-64 object-cover rounded-xl border border-gray-100" 
                  />
                )}
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm font-medium text-gray-600">
                    {t('location', 'Location Data')}:
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {report.latitude?.toFixed(6)}, {report.longitude?.toFixed(6)}
                  </p>
                </div>

              </div>
            </GlowingCard>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Feed;