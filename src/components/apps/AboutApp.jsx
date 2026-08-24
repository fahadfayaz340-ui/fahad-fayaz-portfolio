import React from 'react';
import { fahadProfile } from '../../data/portfolioData';

export default function AboutApp() {
  return (
    <div className="about-app-container">
      <div className="about-card">
        <div className="about-header-row">
          <div className="about-avatar-box">
            FF_01
          </div>
          <div className="about-title-box">
            <h2>{fahadProfile.name}</h2>
            <p className="about-role-tag">{fahadProfile.title}</p>
          </div>
        </div>

        <div className="about-bio-text">
          {fahadProfile.bio}
        </div>

        <div className="about-section">
          <h3>🎓 Education:</h3>
          <ul className="about-list">
            {fahadProfile.education.map((edu, idx) => (
              <li key={idx}>
                <strong>{edu.degree}</strong>
                <span> • {edu.institution} ({edu.period})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h3>📬 System Contact & Links:</h3>
          <div className="about-contact-grid">
            <div><strong>&gt; Email:</strong> <a href={`mailto:${fahadProfile.email}`}>{fahadProfile.email}</a></div>
            <div><strong>&gt; GitHub:</strong> <a href={fahadProfile.github} target="_blank" rel="noreferrer">@{fahadProfile.githubUsername}</a></div>
            <div><strong>&gt; Instagram:</strong> <a href={fahadProfile.instagram} target="_blank" rel="noreferrer">{fahadProfile.instagramHandle}</a></div>
            <div><strong>&gt; Node:</strong> {fahadProfile.location}</div>
          </div>
        </div>

        <div className="about-hint-box">
          Hint: Open Terminal and type <code className="retro-code">sudo hire-me</code>
        </div>
      </div>
    </div>
  );
}
