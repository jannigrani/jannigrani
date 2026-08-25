import React from 'react';

// Strips local EXIF metadata and device tags from images using HTML5 Canvas
export const stripExifAndCompress = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to sanitize image data.'));
            return;
          }
          const sanitizedFile = new File([blob], file.name || 'secure_upload.jpg', {
            type: file.type || 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(sanitizedFile);
        }, file.type || 'image/jpeg', 0.90);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Masks user ID to protect reporter identity
export const maskUserId = (uid) => {
  if (!uid) return 'ANON-GUEST';
  return `ANON-${uid.substring(0, 6).toUpperCase()}`;
};

const ProtectedReporterMode = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

export default ProtectedReporterMode;