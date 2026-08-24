import React, { useState } from 'react';
import { fahadExperience, fahadProfile } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function TimelineApp() {
  const [expandedId, setExpandedId] = useState(1);

  const toggleExpand = (id) => {
    retroAudio.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="timeline-app-container">
      <div className="timeline-header">
        <h2>CAREER & EDUCATION TIMELINE</h2>
        <p>Click any milestone to expand details</p>
      </div>

      <div className="timeline-list">
        {fahadExperience.map(exp => (
          <div
            key={exp.id}
            className={`timeline-item ${expandedId === exp.id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(exp.id)}
          >
            <div className="timeline-item-header">
              <div className="timeline-title-group">
                <span className="timeline-dot" />
                <strong>{exp.role}</strong>
                <span className="timeline-company"> @ {exp.company}</span>
              </div>
              <span className="timeline-period">{exp.period}</span>
            </div>

            {expandedId === exp.id && (
              <div className="timeline-item-body">
                <div className="timeline-location">📍 {exp.location}</div>
                <ul>
                  {exp.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Education Item */}
        <div className="timeline-item education">
          <div className="timeline-item-header">
            <div className="timeline-title-group">
              <span className="timeline-dot edu" />
              <strong>{fahadProfile.education[0].degree}</strong>
              <span className="timeline-company"> @ {fahadProfile.education[0].institution}</span>
            </div>
            <span className="timeline-period">{fahadProfile.education[0].period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
