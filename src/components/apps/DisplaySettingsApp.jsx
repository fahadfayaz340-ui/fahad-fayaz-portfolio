import React from 'react';
import { retroAudio } from '../../utils/audio';

export default function DisplaySettingsApp({
  theme,
  setTheme,
  wallpaperMode,
  setWallpaperMode,
  crtScanlines,
  setCrtScanlines,
  onResetPreferences
}) {
  const themesList = [
    { id: 'green', name: 'Green Phosphor', bg: '#050f08', border: '#00ff41' },
    { id: 'amber', name: 'Amber', bg: '#0f0a02', border: '#ffb000' },
    { id: 'white', name: 'White', bg: '#0a0a0a', border: '#ffffff' },
    { id: 'matrix', name: 'Matrix', bg: '#020d06', border: '#00ff66' },
    { id: 'blue', name: 'Retro Blue', bg: '#0000aa', border: '#55ffff' }
  ];

  const wallpapersList = [
    { id: 'starfield', name: 'Starfield', icon: '✨' },
    { id: 'matrix', name: 'Matrix Rain', icon: '🌧️' },
    { id: 'retro_grid', name: 'Retro Grid', icon: '🌐' },
    { id: 'cyber_rain', name: 'Cyber Rain', icon: '⚡' },
    { id: 'solid', name: 'Solid Color', icon: '⬛' }
  ];

  return (
    <div className="display-app-container">
      <div className="display-section">
        <h3>THEME</h3>
        <div className="theme-options-grid">
          {themesList.map(t => (
            <label
              key={t.id}
              className={`theme-card ${theme === t.id ? 'active' : ''}`}
              onClick={() => {
                retroAudio.playClick();
                setTheme(t.id);
              }}
            >
              <input
                type="radio"
                name="theme"
                checked={theme === t.id}
                onChange={() => setTheme(t.id)}
              />
              <div className="theme-preview" style={{ background: t.bg, borderColor: t.border }}>
                <span style={{ color: t.border }}>root@fahad:~$</span>
              </div>
              <span className="theme-name">{t.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="display-section">
        <h3>WALLPAPER</h3>
        <div className="wallpaper-options-grid">
          {wallpapersList.map(w => (
            <div
              key={w.id}
              className={`wallpaper-card ${wallpaperMode === w.id ? 'active' : ''}`}
              onClick={() => {
                retroAudio.playClick();
                setWallpaperMode(w.id);
              }}
            >
              <div className="wallpaper-icon">{w.icon}</div>
              <span className="wallpaper-name">{w.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="display-section">
        <h3>CRT DISPLAY MONITOR</h3>
        <label className="crt-toggle-row">
          <input
            type="checkbox"
            checked={crtScanlines}
            onChange={(e) => {
              retroAudio.playClick();
              setCrtScanlines(e.target.checked);
            }}
          />
          <span>Enable Vintage CRT Scanlines Overlay</span>
        </label>
      </div>

      <div className="display-footer-row">
        <span>All preferences saved to localStorage.</span>
        <button
          className="reset-prefs-btn"
          onClick={() => {
            retroAudio.playClick();
            onResetPreferences();
          }}
        >
          Reset Preferences
        </button>
      </div>
    </div>
  );
}
