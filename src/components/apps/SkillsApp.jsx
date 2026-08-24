import React, { useState } from 'react';
import { fahadSkills, fahadProfile } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Languages', 'Frontend', '3D & Graphics', 'Backend', 'DevOps'];

  const filtered = activeCategory === 'All'
    ? fahadSkills
    : fahadSkills.filter(s => s.category === activeCategory);

  return (
    <div className="skills-app-container">
      <div className="skills-header">
        <h2>TECH STACK & SKILLS RADAR</h2>
        <div className="skills-overview-pills">
          <span>Role: {fahadProfile.role}</span>
          <span>Commits: {fahadProfile.stats.commits}</span>
          <span>AI Score: {fahadProfile.stats.aiScore}</span>
        </div>
      </div>

      <div className="skills-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              retroAudio.playClick();
              setActiveCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-bars-list">
        {filtered.map((sk, idx) => (
          <div key={idx} className="skill-bar-row">
            <div className="skill-info">
              <span className="skill-name">{sk.name}</span>
              <span className="skill-percent">{sk.level}%</span>
            </div>
            <div className="skill-track">
              <div
                className="skill-fill"
                style={{ width: `${sk.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
