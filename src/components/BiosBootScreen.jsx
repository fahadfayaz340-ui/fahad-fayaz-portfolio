import React, { useState, useEffect } from 'react';
import { retroAudio } from '../utils/audio';

export default function BiosBootScreen({ onComplete, onStartTetris }) {
  const [phase, setPhase] = useState('bios'); // 'bios' | 'splash'
  const [progress, setProgress] = useState(0);
  const [biosLogs, setBiosLogs] = useState([]);

  useEffect(() => {
    const logsSequence = [
      'FAHAD BIOS V3.14 - Fahad Fayaz Systems Inc.',
      'Checking RAM.......... 640KB OK',
      'Detecting drives.......',
      'C:\\ - FAHAD OS [HEALTHY]',
      'D:\\ - Portfolio Archive [MOUNTED]',
      'Loading FAHAD-OS Kernel............',
      'Initializing network interfaces... OK',
      'Starting display driver... CRT_MODE ACTIVE',
      'Loading subsystems: [About] [React] [3D WebGL] [Node]',
      'FAHAD-OS v5.0 - All Systems Operational!'
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logsSequence.length) {
        setBiosLogs(prev => [...prev, logsSequence[currentLogIndex]]);
        retroAudio.playKeypress();
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setPhase('splash');
            retroAudio.playBootBeep();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 90);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleExplore = () => {
    retroAudio.playSuccess();
    onComplete();
  };

  const handleTetris = () => {
    retroAudio.playSuccess();
    onStartTetris();
  };

  return (
    <div className="bios-overlay">
      {/* Skip Button */}
      <button className="bios-skip-btn" onClick={handleExplore}>
        [ SKIP BOOT ]
      </button>

      {phase === 'bios' ? (
        <div className="bios-terminal-box">
          <div className="bios-log-container">
            {biosLogs.map((log, i) => (
              <div key={i} className="bios-log-line">
                {log}
              </div>
            ))}
          </div>

          {/* Green Progress Bar */}
          <div className="bios-progress-container">
            <div className="bios-progress-label">
              LOADING... {progress}%
            </div>
            <div className="bios-progress-track">
              <div
                className="bios-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Splash Welcome Screen (Blue CRT Style) */
        <div className="bios-splash-container">
          <div className="bios-splash-card">
            <pre className="bios-ascii-logo">
{`
  ██████╗  █████╗ ██╗  ██╗██████╗ ██████╗  ██████╗ ███████╗
  ██╔══██╗██╔══██╗██║  ██║██╔══██╗██╔══██╗██╔═══██╗██╔════╝
  ██████╔╝███████║███████║██████╔╝██║  ██║██║   ██║███████╗
  ██╔═══╝ ██╔══██║██╔══██║██╔══██╗██║  ██║██║   ██║╚════██║
  ██║     ██║  ██║██║  ██║██║  ██║██████╔╝╚██████╔╝███████║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝
`}
            </pre>
            <h1 className="bios-splash-title">Welcome to FAHAD-OS v5.0</h1>
            <p className="bios-splash-subtitle">
              Software Engineer • 4+ yrs • Full Stack & Systems Architecture
            </p>

            <div className="bios-splash-actions">
              <button className="bios-action-btn primary" onClick={handleExplore}>
                <span className="btn-icon">▶</span> EXPLORE PORTFOLIO
              </button>
              <button className="bios-action-btn secondary" onClick={handleTetris}>
                <span className="btn-icon">▶</span> PLAY TETRIS
              </button>
            </div>

            <p className="bios-splash-footer">
              You can switch anytime using the taskbar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
