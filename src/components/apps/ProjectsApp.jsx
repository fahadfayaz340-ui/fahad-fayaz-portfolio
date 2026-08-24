import React, { useState } from 'react';
import { fahadProjects } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function ProjectsApp() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack / 3D Graphics', 'React / Node.js / WebSockets', 'Systems / Micro-optimizations'];

  const filtered = filter === 'All'
    ? fahadProjects
    : fahadProjects.filter(p => p.category.includes(filter) || filter.includes(p.category));

  return (
    <div className="projects-app-container">
      <div className="projects-toolbar">
        <span className="filter-label">Filter:</span>
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => {
              retroAudio.playClick();
              setFilter(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map(proj => (
          <div key={proj.id} className="project-card">
            <div className="project-card-header">
              <h3>{proj.title}</h3>
              <span className="project-score">AI Score: {proj.aiScore}%</span>
            </div>

            <p className="project-tagline">{proj.tagline}</p>
            <p className="project-description">{proj.description}</p>

            <div className="project-tech-tags">
              {proj.tech.map(t => (
                <span key={t} className="tech-tag">#{t}</span>
              ))}
            </div>

            <div className="project-features-list">
              <strong>Key Features:</strong>
              <ul>
                {proj.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <div className="project-actions">
              <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="proj-btn primary">
                ▶ Live Project / Demo
              </a>
              <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="proj-btn secondary">
                ⭐ GitHub ({proj.stars})
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
