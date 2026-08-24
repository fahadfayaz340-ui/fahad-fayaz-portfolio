import React, { useState, useRef, useEffect } from 'react';
import { retroAudio } from '../utils/audio';

export default function WindowFrame({
  id,
  title,
  icon = '💻',
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  defaultPos = { x: 120, y: 60 },
  defaultSize = { width: 720, height: 500 },
  children
}) {
  const [pos, setPos] = useState(defaultPos);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDownHeader = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        setPos({
          x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y))
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`retro-window ${isMaximized ? 'maximized' : ''}`}
      style={{
        zIndex: zIndex,
        left: isMaximized ? 0 : `${pos.x}px`,
        top: isMaximized ? 0 : `${pos.y}px`,
        width: isMaximized ? '100vw' : `${defaultSize.width}px`,
        height: isMaximized ? 'calc(100vh - 42px)' : `${defaultSize.height}px`
      }}
      onClick={onFocus}
    >
      {/* Retro Titlebar */}
      <div
        className="retro-window-header"
        onMouseDown={handleMouseDownHeader}
      >
        <div className="retro-window-title">
          <span className="window-icon">{icon}</span>
          <span className="window-text">{title}</span>
        </div>

        <div className="retro-window-controls">
          <button
            className="ctrl-btn minimize"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick();
              onMinimize();
            }}
          >
            _
          </button>
          <button
            className="ctrl-btn maximize"
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick();
              onMaximize();
            }}
          >
            {isMaximized ? '🗗' : '☐'}
          </button>
          <button
            className="ctrl-btn close"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.playClick();
              onClose();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Retro Window Content */}
      <div className="retro-window-content">
        {children}
      </div>
    </div>
  );
}
