import React, { useState, useRef, useEffect } from 'react';
import { fahadProfile, fortuneQuotes } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function TerminalApp({ onOpenApp }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'cat welcome_message.txt', type: 'cmd' },
    { text: `Welcome to FAHAD-OS [Version 5.0.2026]`, type: 'output' },
    { text: `(c) Fahad Fayaz Corp. All rights reserved.`, type: 'output' },
    { text: '', type: 'output' },
    { text: `System Status: ONLINE`, type: 'output' },
    { text: `Memory: 640KB OK`, type: 'output' },
    { text: `Role: ${fahadProfile.title}`, type: 'output' },
    { text: `Location: ${fahadProfile.location}`, type: 'output' },
    { text: '', type: 'output' },
    { text: 'sh ./init_portfolio.sh', type: 'cmd' },
    { text: 'Portfolio initialized successfully! ✓', type: 'success' },
    { text: '', type: 'output' },
    { text: "Type 'help' for commands. Shortcuts: Ctrl+T, Ctrl+E, Alt+F4. Try 'sudo hire-me'!", type: 'info' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    retroAudio.playKeypress();
    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newHistory = [...history, { text: raw, type: 'cmd' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `
AVAILABLE COMMANDS:
  projects      - Open Projects & Case Studies
  experience    - Open Experience logs
  skills        - Open Tech Stack & Skills Radar
  certs         - Open Certifications & Achievements
  resume        - Open Resume
  files         - Open File Manager
  playground    - Open Code Playground
  timeline      - Open Career Timeline
  tetris        - Play Tetris
  snake         - Play Snake
  contact       - Show contact info
  display       - Display Settings / Themes
  clear         - Clear terminal
  neofetch      - System info
  whoami        - Who am I?
  ls            - List windows & files
  cowsay [msg]  - ASCII Cow talking
  fortune       - Random fortune cookie
  coffee        - Brew virtual coffee ☕
  sudo hire-me  - Special easter egg!
`
        });
        break;

      case 'projects':
        onOpenApp('projects');
        newHistory.push({ type: 'success', text: 'Opening PROJECTS.EXE...' });
        break;

      case 'experience':
      case 'timeline':
        onOpenApp('timeline');
        newHistory.push({ type: 'success', text: 'Opening CAREER_TIMELINE.EXE...' });
        break;

      case 'skills':
      case 'radar':
        onOpenApp('skills');
        newHistory.push({ type: 'success', text: 'Opening SKILLS_RADAR.EXE...' });
        break;

      case 'certs':
      case 'awards':
      case 'achievements':
        onOpenApp('certs');
        newHistory.push({ type: 'success', text: 'Opening ACHIEVEMENTS.EXE...' });
        break;

      case 'resume':
        onOpenApp('about');
        newHistory.push({ type: 'success', text: 'Opening ABOUT_ME.INFO / Resume...' });
        break;

      case 'playground':
      case 'code':
        onOpenApp('code');
        newHistory.push({ type: 'success', text: 'Opening CODE_PLAYGROUND.JS...' });
        break;

      case 'snake':
        onOpenApp('snake');
        newHistory.push({ type: 'success', text: 'Launching SNAKE.EXE...' });
        break;

      case 'tetris':
        onOpenApp('tetris');
        newHistory.push({ type: 'success', text: 'Launching TETRIS.EXE...' });
        break;

      case 'display':
        onOpenApp('display');
        newHistory.push({ type: 'success', text: 'Opening DISPLAY_SETTINGS.CFG...' });
        break;

      case 'contact':
        onOpenApp('contact');
        newHistory.push({ type: 'success', text: 'Opening CONTACT.EXE...' });
        break;

      case 'about':
        onOpenApp('about');
        newHistory.push({ type: 'success', text: 'Opening ABOUT_ME.INFO...' });
        break;

      case 'files':
        onOpenApp('files');
        newHistory.push({ type: 'success', text: 'Opening FILE_MANAGER.EXE...' });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${fahadProfile.name} - ${fahadProfile.title}\n${fahadProfile.bio}`
        });
        break;

      case 'neofetch':
        newHistory.push({
          type: 'output',
          text: `
  /\/\        OS: FAHAD-OS v5.0 x86_64
 /  \ \       Host: Quantum V8 Engine
/ /\ \ \      Kernel: 5.0.2026-fahad-release
\/  \ \ \     Uptime: 99.99%
     \/\      Packages: React 19, Vite 8, WebGL, Node.js
              Shell: FAHAD_SH v1.0
              Resolution: ${window.innerWidth}x${window.innerHeight}
              CPU: 8-Core Virtual Processor
              Memory: 640KB / 16384MB OK
`
        });
        break;

      case 'fortune':
        const randomFortune = fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)];
        newHistory.push({ type: 'info', text: `FORTUNE COOKIE =\n${randomFortune}` });
        break;

      case 'cowsay':
        const msg = args || 'Moo! Hire Fahad Fayaz!';
        newHistory.push({
          type: 'output',
          text: `
 _________________________________________
< ${msg} >
 -----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )/\\
                ||----w |
                ||     ||
`
        });
        break;

      case 'coffee':
        newHistory.push({
          type: 'output',
          text: `
      (  )   (   )  )
       ) (   )  (  (
      ( )  (    ) )
      _____________
     |             |===|
     |  JAVA COFFEE|   |
     |   HOT & FRESH|===|
     |_____________|
     \\_____________/
`
        });
        break;

      case 'sudo':
        if (args === 'hire-me' || args === 'hireme') {
          retroAudio.playSuccess();
          newHistory.push({
            type: 'success',
            text: `
🎉 [OFFER CONFIRMED] You executed 'sudo hire-me'!
Fahad Fayaz is ready to build exceptional software with your team.
Email: ${fahadProfile.email}
GitHub: ${fahadProfile.github}
`
          });
        } else {
          newHistory.push({ type: 'output', text: `sudo: ${args}: command not found. Try 'sudo hire-me'!` });
        }
        break;

      case 'ls':
        newHistory.push({
          type: 'output',
          text: 'welcome_message.txt  init_portfolio.sh  projects.exe  snake.exe  tetris.exe  resume.pdf  display.cfg'
        });
        break;

      case 'cat':
        if (args.includes('welcome')) {
          newHistory.push({ type: 'output', text: `Welcome to FAHAD-OS [Version 5.0.2026]\nRole: ${fahadProfile.role}` });
        } else {
          newHistory.push({ type: 'output', text: `cat: ${args || 'file'}: No such file or directory` });
        }
        break;

      default:
        newHistory.push({ type: 'output', text: `command not found: ${cmd}. Type 'help' for command list.` });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div className="terminal-app-container">
      {/* Header Info */}
      <div className="terminal-ascii-title">
        FAHAD-OS TERMINAL v1.0
      </div>

      <div className="terminal-logs">
        {history.map((item, idx) => (
          <div key={idx} className={`terminal-line ${item.type}`}>
            {item.type === 'cmd' && <span className="prompt-label">root@fahad:~$ </span>}
            <span className="line-text">{item.text}</span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div className="terminal-input-row">
        <span className="prompt-label">root@fahad:~$ </span>
        <input
          type="text"
          className="terminal-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
