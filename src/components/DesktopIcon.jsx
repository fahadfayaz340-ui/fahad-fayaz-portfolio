import React from 'react';
import { retroAudio } from '../utils/audio';

export default function DesktopIcon({ id, title, icon, onClick, isSelected, badge }) {
  const handleClick = (e) => {
    e.stopPropagation();
    retroAudio.playClick();
    onClick(id);
  };

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleClick}
    >
      <div className="desktop-icon-symbol">
        {icon}
        {badge && <span className="desktop-icon-badge">{badge}</span>}
      </div>
      <span className="desktop-icon-label">{title}</span>
    </div>
  );
}
