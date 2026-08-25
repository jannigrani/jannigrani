import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import PillButton from '../components/ui/PillButton';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full flex flex-col items-center space-y-10 animate-fade-up">
        
        <h1 className="font-serif text-5xl md:text-8xl font-black text-citizenNavy tracking-tight leading-none">
          {t('homeTitle', 'Make an Impact')}
        </h1>

        <p className="text-gray-600 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
          {t('homeSubtitle', 'Submit real reports to improve your city. Fast, secure, and direct.')}
        </p>

        <div className="pt-6 w-full flex justify-center">
          <PillButton navigateTo="/add-report" className="px-12 py-5 text-lg shadow-lg">
            {t('reportButton', 'Report')}
          </PillButton>
        </div>

      </div>
    </div>
  );
};

export default Home;