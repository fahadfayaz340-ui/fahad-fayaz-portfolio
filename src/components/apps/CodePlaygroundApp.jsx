import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';

export default function CodePlaygroundApp() {
  const [code, setCode] = useState(`// Write JavaScript here!
// Press RUN to execute.

console.log("Hello from FAHAD-OS!");

const greet = (name) => \`Welcome, \${name}!\`;
console.log(greet("Visitor"));
`);
  const [output, setOutput] = useState([]);

  const handleRun = () => {
    retroAudio.playClick();
    const logs = [];

    // Custom console wrapper
    const customConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args) => logs.push(`[ERROR] ${args.join(' ')}`),
      warn: (...args) => logs.push(`[WARN] ${args.join(' ')}`)
    };

    try {
      const runFn = new Function('console', code);
      runFn(customConsole);
      setOutput(logs.length > 0 ? logs : ['[Code executed successfully with no console output]']);
    } catch (err) {
      setOutput([`Runtime Error: ${err.message}`]);
    }
  };

  const handleClear = () => {
    retroAudio.playClick();
    setOutput([]);
  };

  return (
    <div className="playground-app-container">
      <div className="playground-header">
        <code>CODE_PLAYGROUND.JS - WRITE & RUN JAVASCRIPT</code>
      </div>

      <textarea
        className="playground-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
      />

      <div className="playground-toolbar">
        <button className="run-btn" onClick={handleRun}>
          ▶ RUN
        </button>
        <button className="clear-btn" onClick={handleClear}>
          🗑️ CLEAR
        </button>
      </div>

      <div className="playground-output-box">
        <div className="output-header">Output:</div>
        {output.length === 0 ? (
          <div className="output-empty">Press RUN to execute your script...</div>
        ) : (
          output.map((line, i) => (
            <div key={i} className="output-line">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
