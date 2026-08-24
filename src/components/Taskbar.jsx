import React, { useState, useEffect } from 'react';
import { retroAudio } from '../utils/audio';

export default function Taskbar({
  openWindows,
  activeWindowId,
  onToggleWindow,
  onOpenApp,
  theme,
  setTheme,
  crtScanlines,
  setCrtScanlines,
  audioEnabled,
  setAudioEnabled,
  onReboot
}) {
  const [timeStr, setTimeStr] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = (e) => {
    e.stopPropagation();
    retroAudio.playClick();
    setIsStartOpen(prev => !prev);
  };

  const handleAppSelect = (appId) => {
    setIsStartOpen(false);
    onOpenApp(appId);
  };

  return (
    <footer className="retro-taskbar" onClick={() => setIsStartOpen(false)}>
      {/* Start Button & Menu */}
      <div className="taskbar-start-container">
        <button
          className={`taskbar-start-btn ${isStartOpen ? 'active' : ''}`}
          onClick={handleStartClick}
        >
          <span className="start-icon">💻</span>
          <span className="start-text">FAHAD-OS</span>
        </button>

        {isStartOpen && (
          <div className="start-dropdown-menu" onClick={e => e.stopPropagation()}>
            <div className="start-menu-header">
              <div className="start-user-avatar">PY</div>
              <div className="start-user-info">
                <strong>FAHAD FAYAZ</strong>
                <small>Software Engineer</small>
              </div>
            </div>
            <div className="start-menu-divider" />
            <div className="start-menu-items">
              <button onClick={() => handleAppSelect('terminal')}>
                <span>&gt;_</span> Terminal CLI
              </button>
              <button onClick={() => handleAppSelect('about')}>
                <span>👤</span> About Me.info
              </button>
              <button onClick={() => handleAppSelect('projects')}>
                <span>📁</span> Projects & Code
              </button>
              <button onClick={() => handleAppSelect('skills')}>
                <span>📊</span> Tech Stack & Skills
              </button>
              <button onClick={() => handleAppSelect('timeline')}>
                <span>📅</span> Career Timeline
              </button>
              <button onClick={() => handleAppSelect('certs')}>
                <span>🏆</span> Awards & Certs
              </button>
              <button onClick={() => handleAppSelect('code')}>
                <span>📝</span> Code Playground
              </button>
              <button onClick={() => handleAppSelect('snake')}>
                <span>🐍</span> Play Snake.exe
              </button>
              <button onClick={() => handleAppSelect('tetris')}>
                <span>🧱</span> Play Tetris.exe
              </button>
              <button onClick={() => handleAppSelect('display')}>
                <span>⚙️</span> Display Settings
              </button>
              <div className="start-menu-divider" />
              <button className="reboot-btn" onClick={() => { setIsStartOpen(false); onReboot(); }}>
                <span>🔄</span> Reboot BIOS...
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Open Window Pills */}
      <div className="taskbar-windows-list">
        {openWindows.map(win => (
          <button
            key={win.id}
            className={`taskbar-window-pill ${activeWindowId === win.id && !win.isMinimized ? 'active' : ''}`}
            onClick={() => {
              retroAudio.playClick();
              onToggleWindow(win.id);
            }}
          >
            <span className="pill-icon">{win.icon}</span>
            <span className="pill-title">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="taskbar-tray">
        <button
          className="tray-icon-btn"
          title={`Audio: ${audioEnabled ? 'ON' : 'OFF'}`}
          onClick={() => {
            setAudioEnabled(!audioEnabled);
            retroAudio.enabled = !audioEnabled;
          }}
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>

        <button
          className={`tray-icon-btn ${crtScanlines ? 'active' : ''}`}
          title="Toggle CRT Monitor Scanlines"
          onClick={() => setCrtScanlines(!crtScanlines)}
        >
          📺 CRT
        </button>

        <div className="tray-clock">
          {timeStr}
        </div>
      </div>
    </footer>
  );
}
