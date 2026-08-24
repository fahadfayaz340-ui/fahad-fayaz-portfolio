import React, { useState } from 'react';
import { fahadProjects, fahadProfile } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function FileManagerApp({ onOpenApp }) {
  const [selectedPath, setSelectedPath] = useState('/home/fahad');

  const files = [
    { name: 'projects/', type: 'dir', size: '<DIR>', action: () => onOpenApp('projects') },
    { name: 'welcome_message.txt', type: 'file', size: '1.2 KB', text: `Welcome to ${fahadProfile.name}'s Portfolio!` },
    { name: 'init_portfolio.sh', type: 'file', size: '4.8 KB', text: 'Portfolio system initialization script.' },
    { name: 'resume.pdf', type: 'file', size: '240 KB', action: () => onOpenApp('about') },
    { name: 'snake.exe', type: 'file', size: '48 KB', action: () => onOpenApp('snake') },
    { name: 'tetris.exe', type: 'file', size: '64 KB', action: () => onOpenApp('tetris') },
    { name: 'display.cfg', type: 'file', size: '0.8 KB', action: () => onOpenApp('display') }
  ];

  return (
    <div className="filemanager-app-container">
      <div className="filemanager-path-bar">
        <span>Location:</span> <code>{selectedPath}</code>
      </div>

      <div className="filemanager-table">
        <div className="filemanager-header-row">
          <span>Name</span>
          <span>Type</span>
          <span>Size</span>
        </div>
        {files.map((f, idx) => (
          <div
            key={idx}
            className="filemanager-row"
            onDoubleClick={() => {
              retroAudio.playClick();
              if (f.action) f.action();
            }}
            onClick={() => retroAudio.playClick()}
          >
            <span className="file-name">{f.type === 'dir' ? '📁' : '📄'} {f.name}</span>
            <span className="file-type">{f.type.toUpperCase()}</span>
            <span className="file-size">{f.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
