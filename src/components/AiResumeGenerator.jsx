import React, { useState } from 'react'
import { FileText, Copy, Check, Download, Sparkles, UserCheck, Briefcase, Award } from 'lucide-react'
import { userProfile, initialProjects } from '../data/mockData'

export default function AiResumeGenerator() {
  const [targetRole, setTargetRole] = useState('Full Stack 3D Developer')
  const [copied, setCopied] = useState(false)

  const resumeData = {
    summary: `Innovative Full Stack & 3D Web Software Engineer with hands-on expertise building production WebGL graphics, real-time WebSocket router telemetry dashboards, and multi-page web applications. Proven track record in optimizing 60fps canvas performance and low-latency Node.js backends.`,
    highlights: [
      `Architected & deployed 'Login Computers', a multi-page IT services web platform featuring custom Three.js 3D WebGL renders and a real-time price estimator (github.com/${userProfile.githubUsername}/login-computers).`,
      `Engineered a real-time WiFi Router Dashboard with Node.js & WebSockets for live IP device tracking, bandwidth analytics, and firewall rules management.`,
      `Optimized low-latency vision surface rendering for the RuView framework (sub-10ms buffer frame latency).`,
      `Solved 210+ LeetCode / Data Structures problems with focus on graph algorithms, concurrency, and memory optimization.`
    ],
    skills: {
      frontend: ['React 19', 'Three.js', 'WebGL', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Vite', 'Tailwind / Glassmorphism'],
      backend: ['Node.js', 'Express', 'WebSockets', 'REST APIs', 'Chart.js', 'Git / GitHub']
    }
  }

  const generateMarkdown = () => {
    return `# ${userProfile.name}
**${targetRole}** | GitHub: ${userProfile.githubUrl} | Instagram: ${userProfile.instagramHandle}

## Summary
${resumeData.summary}

## Key Engineering Achievements
${resumeData.highlights.map(h => `- ${h}`).join('\n')}

## Technical Skills
- **Frontend & 3D:** ${resumeData.skills.frontend.join(', ')}
- **Backend & Systems:** ${resumeData.skills.backend.join(', ')}
`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="brand-badge">
            <Sparkles size={12} /> AI Career & Resume Engine
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px' }}>
            Instant Tailored Resume & Portfolio Brief
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Automatically compiled from Fahad Fayaz's real GitHub projects & engineering metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={handleCopy}>
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Resume Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-muted)' }}>Tailor Resume For Target Role:</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Full Stack 3D Developer', 'Node.js Backend Engineer', 'Frontend Systems Specialist'].map((role) => (
            <button
              key={role}
              className={`filter-pill ${targetRole === role ? 'active' : ''}`}
              onClick={() => setTargetRole(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Resume Card */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{userProfile.name}</h2>
            <div className="text-gradient-primary" style={{ fontWeight: '700', fontSize: '1.05rem', marginTop: '2px' }}>
              {targetRole}
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'right' }}>
            <div>GitHub: <a href={userProfile.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)' }}>@{userProfile.githubUsername}</a></div>
            <div>Instagram: <a href={userProfile.instagramUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-rose)' }}>{userProfile.instagramHandle}</a></div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} className="text-indigo-400" /> Executive Summary
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.92rem' }}>
            {resumeData.summary}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} className="text-teal-400" /> Production Project Achievements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resumeData.highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-main)', background: 'rgba(15,23,42,0.5)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--primary-light)', fontWeight: '800' }}>0{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} className="text-amber-400" /> Verified Core Stack
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>Frontend & 3D WebGL</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {resumeData.skills.frontend.map((s, i) => (
                  <span key={i} className="tech-tag" style={{ color: 'var(--primary-light)' }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>Backend & Networking</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {resumeData.skills.backend.map((s, i) => (
                  <span key={i} className="tech-tag" style={{ color: 'var(--accent-teal)' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
