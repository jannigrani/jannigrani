import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import DashedSelection from '../components/ui/DashedSelection';
import PillButton from '../components/ui/PillButton';

const Welcome = () => {
  const { t } = useTranslation();
  const [selectedConcern, setSelectedConcern] = useState(null);

  const concernOptions = [
    { id: 'pollution', textKey: 'pollution' },
    { id: 'safety', textKey: 'safety' },
    { id: 'civic', textKey: 'civic' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl w-full flex flex-col items-center space-y-16">
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-citizenNavy tracking-tight leading-tight">
          {t('welcomeHeadline', "Let's keep our cities safer")}
        </h1>

        <div className="w-full flex flex-col items-center">
          <p className="text-gray-600 mb-8 text-lg font-medium">
            {t('selectConcern', "Select your main focus area")}
          </p>
          
          <DashedSelection
            options={concernOptions}
            selectedId={selectedConcern}
            onChange={setSelectedConcern}
          />
        </div>

        <div className="pt-8 transition-opacity duration-300">
          <PillButton 
            navigateTo="/dashboard" 
            className={selectedConcern ? "opacity-100" : "opacity-50 pointer-events-none"}
          >
            {t('continue', "Continue")}
          </PillButton>
        </div>

      </div>
    </div>
  );
};

export default Welcome;