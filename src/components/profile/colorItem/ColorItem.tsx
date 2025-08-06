import React from 'react';

export const ColorItem: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div>
    <span>{label}:</span>
    <div style={{ backgroundColor: color }}></div>
  </div>
);
