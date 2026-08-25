import React from 'react';
import { useTranslation } from 'react-i18next';

const DashedSelection = ({ options, selectedId, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => {
        const isActive = selectedId === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`px-6 py-3 rounded-extreme-pill border-2 border-dashed transition-all duration-300 ${
              isActive 
                ? 'bg-[#E8F1F8] border-nigraniBlue text-citizenNavy font-medium' 
                : 'bg-transparent border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {t(option.textKey)}
          </button>
        );
      })}
    </div>
  );
};

export default DashedSelection;