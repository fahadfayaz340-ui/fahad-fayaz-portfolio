import React, { useState, useEffect } from 'react';
import BiosBootScreen from './components/BiosBootScreen';
import WallpaperCanvas from './components/WallpaperCanvas';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
import WindowFrame from './components/WindowFrame';
import ClippyWidget from './components/ClippyWidget';

import TerminalApp from './components/apps/TerminalApp';
import AboutApp from './components/apps/AboutApp';
import ProjectsApp from './components/apps/ProjectsApp';
import DisplaySettingsApp from './components/apps/DisplaySettingsApp';
import CodePlaygroundApp from './components/apps/CodePlaygroundApp';
import SnakeApp from './components/apps/SnakeApp';
import TetrisApp from './components/apps/TetrisApp';
import TimelineApp from './components/apps/TimelineApp';
import AchievementsApp from './components/apps/AchievementsApp';
import SkillsApp from './components/apps/SkillsApp';
import FileManagerApp from './components/apps/FileManagerApp';
import ContactApp from './components/apps/ContactApp';

import './App.css';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState('green'); // green, amber, white, matrix, blue
  const [wallpaperMode, setWallpaperMode] = useState('starfield');
  const [crtScanlines, setCrtScanlines] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const [highestZ, setHighestZ] = useState(100);
  const [activeWindowId, setActiveWindowId] = useState('terminal');
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);

  // Load preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('fahad_theme');
    const savedWallpaper = localStorage.getItem('fahad_wallpaper');
    if (savedTheme) setTheme(savedTheme);
    if (savedWallpaper) setWallpaperMode(savedWallpaper);
  }, []);

  useEffect(() => {
    localStorage.setItem('fahad_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fahad_wallpaper', wallpaperMode);
  }, [wallpaperMode]);

  // Initial Window Registry
  const [windows, setWindows] = useState([
    {
      id: 'terminal',
      title: 'TERMINAL_V1.0.EXE',
      icon: '>_',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPos: { x: 140, y: 50 },
      defaultSize: { width: 740, height: 480 }
    },
    {
      id: 'about',
      title: 'ABOUT_ME.INFO',
      icon: '👤',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      defaultPos: { x: 180, y: 70 },
      defaultSize: { width: 600, height: 500 }
    },
    {
      id: 'projects',
      title: 'PROJECTS.EXE',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      defaultPos: { x: 220, y: 60 },
      defaultSize: { width: 780, height: 520 }
    },
    {
      id: 'display',
      title: 'DISPLAY_SETTINGS.CFG',
      icon: '⚙️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      defaultPos: { x: 260, y: 80 },
      defaultSize: { width: 680, height: 490 }
    },
    {
      id: 'code',
      title: 'CODE_PLAYGROUND.JS',
      icon: '📝',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      defaultPos: { x: 200, y: 75 },
      defaultSize: { width: 660, height: 500 }
    },
    {
      id: 'snake',
      title: 'SNAKE.EXE',
      icon: '🐍',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      defaultPos: { x: 300, y: 90 },
      defaultSize: { width: 440, height: 510 }
    },
    {
      id: 'tetris',
      title: 'TETRIS.EXE',
      icon: '🧱',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      defaultPos: { x: 320, y: 40 },
      defaultSize: { width: 420, height: 600 }
    },
    {
      id: 'timeline',
      title: 'CAREER_TIMELINE.EXE',
      icon: '📅',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      defaultPos: { x: 240, y: 60 },
      defaultSize: { width: 640, height: 520 }
    },
    {
      id: 'certs',
      title: 'ACHIEVEMENTS.EXE',
      icon: '🏆',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      defaultPos: { x: 280, y: 70 },
      defaultSize: { width: 650, height: 500 }
    },
    {
      id: 'skills',
      title: 'SKILLS_RADAR.EXE',
      icon: '📊',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      defaultPos: { x: 210, y: 65 },
      defaultSize: { width: 660, height: 490 }
    },
    {
      id: 'files',
      title: 'FILE_MANAGER.EXE',
      icon: '📂',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      defaultPos: { x: 190, y: 80 },
      defaultSize: { width: 620, height: 450 }
    },
    {
      id: 'contact',
      title: 'CONTACT.EXE',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      defaultPos: { x: 250, y: 85 },
      defaultSize: { width: 620, height: 510 }
    }
  ]);

  const desktopIconsList = [
    { id: 'terminal', title: 'Terminal', icon: '>_' },
    { id: 'projects', title: 'Projects', icon: '📁' },
    { id: 'about', title: 'About', icon: '👤' },
    { id: 'skills', title: 'Skills', icon: '📊' },
    { id: 'timeline', title: 'Timeline', icon: '📅' },
    { id: 'certs', title: 'Awards', icon: '🏆' },
    { id: 'code', title: 'Code', icon: '📝' },
    { id: 'display', title: 'Display', icon: '⚙️' },
    { id: 'snake', title: 'Snake', icon: '🐍' },
    { id: 'tetris', title: 'Tetris', icon: '🧱' },
    { id: 'files', title: 'Files', icon: '📂' },
    { id: 'contact', title: 'Contact', icon: '✉️' }
  ];

  const focusWindow = (id) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);

    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isOpen: true, isMinimized: false, zIndex: nextZ };
      }
      return w;
    }));
  };

  const openApp = (id) => {
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const toggleMaximizeWindow = (id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const toggleTaskbarWindow = (id) => {
    const target = windows.find(w => w.id === id);
    if (!target) return;

    if (target.isMinimized || activeWindowId !== id) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  };

  const handleStartTetrisFromBoot = () => {
    setIsBooting(false);
    openApp('tetris');
  };

  const handleResetPreferences = () => {
    setTheme('green');
    setWallpaperMode('starfield');
    setCrtScanlines(true);
    localStorage.removeItem('fahad_theme');
    localStorage.removeItem('fahad_wallpaper');
  };

  const renderAppContent = (id) => {
    switch (id) {
      case 'terminal': return <TerminalApp onOpenApp={openApp} />;
      case 'about': return <AboutApp />;
      case 'projects': return <ProjectsApp />;
      case 'display':
        return (
          <DisplaySettingsApp
            theme={theme}
            setTheme={setTheme}
            wallpaperMode={wallpaperMode}
            setWallpaperMode={setWallpaperMode}
            crtScanlines={crtScanlines}
            setCrtScanlines={setCrtScanlines}
            onResetPreferences={handleResetPreferences}
          />
        );
      case 'code': return <CodePlaygroundApp />;
      case 'snake': return <SnakeApp />;
      case 'tetris': return <TetrisApp />;
      case 'timeline': return <TimelineApp />;
      case 'certs': return <AchievementsApp />;
      case 'skills': return <SkillsApp />;
      case 'files': return <FileManagerApp onOpenApp={openApp} />;
      case 'contact': return <ContactApp />;
      default: return null;
    }
  };

  return (
    <div className={`fahad-os-theme-${theme} ${crtScanlines ? 'crt-scanlines-active' : ''}`}>
      {/* 1. BIOS Boot Overlay */}
      {isBooting ? (
        <BiosBootScreen
          onComplete={() => setIsBooting(false)}
          onStartTetris={handleStartTetrisFromBoot}
        />
      ) : (
        /* 2. Main Retro Desktop */
        <div
          className="retro-desktop-container"
          onClick={() => setSelectedDesktopIcon(null)}
        >
          {/* Animated Canvas Wallpaper */}
          <WallpaperCanvas wallpaperMode={wallpaperMode} theme={theme} />

          {/* Retro Desktop Icons Grid (Right & Left sides matching video) */}
          <div className="desktop-icons-container">
            {desktopIconsList.map(icon => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                title={icon.title}
                icon={icon.icon}
                isSelected={selectedDesktopIcon === icon.id}
                onClick={(id) => {
                  setSelectedDesktopIcon(id);
                  openApp(id);
                }}
              />
            ))}
          </div>

          {/* Render Active/Open Windows */}
          {windows.map(win => (
            <WindowFrame
              key={win.id}
              id={win.id}
              title={win.title}
              icon={win.icon}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              defaultPos={win.defaultPos}
              defaultSize={win.defaultSize}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => toggleMaximizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              {renderAppContent(win.id)}
            </WindowFrame>
          ))}

          {/* Floating Clippy Assistant */}
          <ClippyWidget />

          {/* Bottom Taskbar */}
          <Taskbar
            openWindows={windows.filter(w => w.isOpen)}
            activeWindowId={activeWindowId}
            onToggleWindow={toggleTaskbarWindow}
            onOpenApp={openApp}
            theme={theme}
            setTheme={setTheme}
            crtScanlines={crtScanlines}
            setCrtScanlines={setCrtScanlines}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            onReboot={() => setIsBooting(true)}
          />
        </div>
      )}
    </div>
  );
}
