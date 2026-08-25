import React from 'react';
import { useTranslation } from 'react-i18next';

const GlowingCard = ({ titleKey, descriptionKey, children, glowColor = "blue", className = "" }) => {
  const { t } = useTranslation();

  const activeGlow = glowColor === "purple" ? "bg-purple-500/20" : "bg-nigraniBlue/20";

  return (
    <div className={`relative group ${className}`}>
      {/* Soft underlying colored orb */}
      <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-75 transition-opacity duration-500 group-hover:opacity-100 ${activeGlow}`}></div>
      
      {/* Pure White Card Surface */}
      <div className="relative bg-white rounded-3xl p-8 shadow-floating-card h-full flex flex-col">
        {titleKey && (
          <h3 className="text-2xl font-bold text-citizenNavy mb-3">
            {t(titleKey)}
          </h3>
        )}
        
        {descriptionKey && (
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            {t(descriptionKey)}
          </p>
        )}
        
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowingCard;