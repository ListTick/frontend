import React from 'react';
import './ColorItem.scss'

export const ColorItem: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="color-item">
    <span>{label}</span>
    <div style={{ backgroundColor: color, color: 'transparent', borderRadius: '10px',
      width: '50px', height: '20px', textAlign: 'center' }}>A</div>
  </div>
);
