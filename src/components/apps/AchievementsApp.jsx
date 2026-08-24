import React from 'react';
import { fahadAchievements } from '../../data/portfolioData';

export default function AchievementsApp() {
  return (
    <div className="achievements-app-container">
      <div className="achievements-header">
        <h2>ACHIEVEMENTS & CERTIFICATIONS</h2>
      </div>

      {fahadAchievements.map((sec, idx) => (
        <div key={idx} className="achievements-section">
          <h3>— {sec.category.toUpperCase()} —</h3>
          <div className="achievements-list">
            {sec.items.map((item, i) => (
              <div key={i} className="achievement-card">
                <div className="achievement-title-row">
                  <span className="checkmark">✓</span>
                  <strong>{item.title}</strong>
                  {item.date && <span className="achievement-date">({item.date})</span>}
                </div>
                {item.desc && <p className="achievement-desc">{item.desc}</p>}
                {item.org && <span className="achievement-org">Issued by: {item.org}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
