import React, { useState } from 'react';
import { fahadProfile } from '../../data/portfolioData';
import { retroAudio } from '../../utils/audio';

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    retroAudio.playSuccess();
    setSent(true);
  };

  return (
    <div className="contact-app-container">
      <div className="contact-header">
        <h2>CONTACT & INQUIRIES</h2>
        <p>Send a message directly or connect via social links</p>
      </div>

      <div className="contact-links-grid">
        <a href={`mailto:${fahadProfile.email}`} className="contact-tile">
          <span className="tile-icon">✉️</span>
          <strong>Email</strong>
          <small>{fahadProfile.email}</small>
        </a>
        <a href={fahadProfile.github} target="_blank" rel="noreferrer" className="contact-tile">
          <span className="tile-icon">💻</span>
          <strong>GitHub</strong>
          <small>@{fahadProfile.githubUsername}</small>
        </a>
        <a href={fahadProfile.instagram} target="_blank" rel="noreferrer" className="contact-tile">
          <span className="tile-icon">📸</span>
          <strong>Instagram</strong>
          <small>{fahadProfile.instagramHandle}</small>
        </a>
      </div>

      <div className="contact-form-card">
        <h3>Direct Transmission Form:</h3>
        {sent ? (
          <div className="transmission-success">
            ✓ Message transmitted to {fahadProfile.email}! Thank you for reaching out.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="retro-form">
            <div className="form-group">
              <label>Your Name / Organization:</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Hiring Team / Tech Lead"
              />
            </div>
            <div className="form-group">
              <label>Your Email Address:</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="name@company.com"
              />
            </div>
            <div className="form-group">
              <label>Transmission Message:</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Write your project or role proposal here..."
              />
            </div>
            <button type="submit" className="submit-trans-btn">
              ▶ TRANSMIT MESSAGE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
