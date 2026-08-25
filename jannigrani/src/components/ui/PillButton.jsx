import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PillButton = ({ textKey, children, onClick, navigateTo, className = "" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Run any custom click logic if provided
    if (onClick) {
      onClick(event);
    }
    // Navigate to a new page if a route link is provided
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-citizenNavy text-white rounded-extreme-pill px-8 py-4 font-medium transition-all shadow-floating-card hover:opacity-90 ${className}`}
    >
      {textKey ? t(textKey) : children}
    </button>
  );
};

export default PillButton;