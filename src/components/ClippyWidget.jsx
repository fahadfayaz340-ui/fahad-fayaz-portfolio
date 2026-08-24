import React, { useState } from 'react';
import { clippyTips } from '../data/portfolioData';
import { retroAudio } from '../utils/audio';

export default function ClippyWidget() {
  const [tipIndex, setTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        className="clippy-reopen-btn"
        title="Summon Clippy"
        onClick={() => {
          retroAudio.playClick();
          setDismissed(false);
        }}
      >
        📎
      </button>
    );
  }

  const handleNextTip = () => {
    retroAudio.playClick();
    setTipIndex((prev) => (prev + 1) % clippyTips.length);
  };

  const handleDismiss = () => {
    retroAudio.playClick();
    setDismissed(true);
  };

  return (
    <div className="clippy-container">
      <div className="clippy-bubble">
        <div className="clippy-header">Clippy</div>
        <div className="clippy-content">
          <p>{clippyTips[tipIndex]}</p>
        </div>
        <div className="clippy-actions">
          <button onClick={handleNextTip}>Next Tip</button>
          <button onClick={handleDismiss}>Go Away</button>
        </div>
      </div>
      <div className="clippy-avatar">
        📎
      </div>
    </div>
  );
}
