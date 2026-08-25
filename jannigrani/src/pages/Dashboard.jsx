import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import GlowingCard from '../components/ui/GlowingCard';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    categories: { pollution: 0, safety: 0, civic: 0 }
  });

  useEffect(() => {
    // Real-time listener fetching all reports to build live analytics
    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
      let totalCount = 0;
      let verifiedCount = 0;
      let catCounts = { pollution: 0, safety: 0, civic: 0 };

      snapshot.forEach((doc) => {
        totalCount++;
        const data = doc.data();
        
        if (data.status === 'Verified') {
          verifiedCount++;
        }
        
        if (data.category && catCounts[data.category] !== undefined) {
          catCounts[data.category]++;
        }
      });

      setStats({
        total: totalCount,
        verified: verifiedCount,
        categories: catCounts
      });
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  // Circular Progress Math
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const verifiedPercentage = stats.total > 0 ? (stats.verified / stats.total) * 100 : 0;
  const strokeDashoffset = circumference - (verifiedPercentage / 100) * circumference;

  // Bar Chart Math
  const maxCategoryValue = Math.max(stats.categories.pollution, stats.categories.safety, stats.categories.civic, 1);

  return (
    <div className="min-h-screen bg-[#F5F8FA] p-6 pb-32">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-citizenNavy mb-2">
            {t('dashboardTitle', 'Your Impact')}
          </h1>
          <p className="text-gray-600 font-medium">
            {t('dashboardSubtitle', 'Live analytics of city reports')}
          </p>
        </div>

        {/* Progress Ring Card */}
        <GlowingCard glowColor="blue">
          <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-lg font-bold text-citizenNavy mb-6">
              {t('verificationProgress', 'Verification Progress')}
            </h3>
            
            <div className="relative flex items-center justify-center">
              {/* Background Ring */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E8F1F8"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Animated Foreground Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#10B981" 
                  strokeWidth="12"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-citizenNavy">
                  {stats.total}
                </span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('totalReports', 'Total')}
                </span>
              </div>
            </div>

            <div className="flex justify-between w-full max-w-xs mt-8 px-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
                <span className="text-xs text-gray-500">{t('submitted', 'Submitted')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-500">{stats.verified}</span>
                <span className="text-xs text-gray-500">{t('verified', 'Verified')}</span>
              </div>
            </div>
          </div>
        </GlowingCard>

        {/* Bar Chart Card */}
        <GlowingCard glowColor="purple">
          <div className="p-4">
            <h3 className="text-lg font-bold text-citizenNavy mb-6 text-center">
              {t('categoryBreakdown', 'Reports by Category')}
            </h3>
            
            <div className="flex items-end justify-around h-48 mt-4 border-b-2 border-gray-100 pb-2">
              
              {/* Pollution Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.pollution}</span>
                <motion.div 
                  className="w-full bg-nigraniBlue rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.pollution / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('pollution', 'Pollution')}
                </span>
              </div>

              {/* Safety Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.safety}</span>
                <motion.div 
                  className="w-full bg-citizenNavy rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.safety / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('safety', 'Safety')}
                </span>
              </div>

              {/* Civic Bar */}
              <div className="flex flex-col items-center w-1/4">
                <span className="text-sm font-bold text-gray-600 mb-2">{stats.categories.civic}</span>
                <motion.div 
                  className="w-full bg-gray-400 rounded-t-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.categories.civic / maxCategoryValue) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                ></motion.div>
                <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full text-center">
                  {t('civic', 'Civic')}
                </span>
              </div>

            </div>
          </div>
        </GlowingCard>

      </div>
    </div>
  );
};

export default Dashboard;