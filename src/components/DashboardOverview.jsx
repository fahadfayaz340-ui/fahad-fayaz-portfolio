import React from 'react'
import { 
  Trophy, 
  Code2, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit,
  Terminal,
  Zap
} from 'lucide-react'
import { userStats, interviewCategoryProgress, userProfile } from '../data/mockData'

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function DashboardOverview({ projects, onSelectTab }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero Welcome banner */}
      <div className="glass-panel" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="trend-badge positive">
                <Sparkles size={14} /> Verified Developer Profile
              </span>
              <a 
                href={userProfile.instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ fontSize: '0.8rem', color: 'var(--accent-pink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
              >
                <InstagramIcon size={14} /> {userProfile.instagramHandle}
              </a>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
              Welcome back, <span className="text-gradient-cyan">{userProfile.name}</span> 👋
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '680px' }}>
              {userProfile.bio} Currently evaluated at <strong style={{ color: 'var(--accent-emerald)' }}>92% Interview Readiness</strong> for Full-Stack & 3D Web Systems Roles.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={() => window.open(userProfile.githubUrl, '_blank')}>
              <Code2 size={18} />
              <span>GitHub @{userProfile.githubUsername}</span>
            </button>
            <button className="btn-secondary" onClick={() => onSelectTab('projects')}>
              <span>View All {projects.length} Real Projects</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">Interview Readiness</span>
            <div className="stat-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--primary)' }}>
              <Trophy size={20} />
            </div>
          </div>
          <div className="stat-value text-gradient-cyan">{userStats.interviewScore}%</div>
          <div className="stat-footer">
            <span className="trend-badge positive"><TrendingUp size={12} /> Top Candidate</span>
            <span>Software Engineering Benchmark</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">Live GitHub Repos</span>
            <div className="stat-icon" style={{ background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)' }}>
              <Code2 size={20} />
            </div>
          </div>
          <div className="stat-value text-gradient-purple">{projects.length}</div>
          <div className="stat-footer">
            <span>Login Computers & WiFi Router Apps</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">DSA & Problem Solving</span>
            <div className="stat-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: 'var(--accent-amber)' }}>
              <Flame size={20} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>{userStats.dsaSolved}</div>
          <div className="stat-footer">
            <span className="trend-badge positive">{userStats.streakDays} Day Streak</span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span className="stat-title">AI Code Audit Rating</span>
            <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="stat-value text-gradient-emerald">{userStats.codeQualityRating}</div>
          <div className="stat-footer">
            <span>Verified 3D WebGL & Node Architecture</span>
          </div>
        </div>
      </div>

      {/* Split Content Section */}
      <div className="content-grid">
        {/* Left Column: Interview Topic Progress */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="section-header">
            <h2 className="section-title">
              <BrainCircuit className="text-sky-400" size={22} />
              Domain & Technical Skill Mastery
            </h2>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => onSelectTab('interview')}>
              Practice Flashcards
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {interviewCategoryProgress.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>{item.topic}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '10px' }}>
                      {item.target}
                    </span>
                    <span className="text-gradient-cyan">{item.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: `${item.progress}%`,
                      background: item.progress > 90 
                        ? 'linear-gradient(90deg, #38bdf8, #34d399)'
                        : 'linear-gradient(90deg, #c084fc, #38bdf8)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Project Highlights & Tech Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.06), rgba(192, 132, 252, 0.06))' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap className="text-amber-400" size={18} />
              Fahad Fayaz's Portfolio Highlights
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} className="text-emerald-400" style={{ shrink: 0, marginTop: '2px' }} />
                <span><strong>Login Computers E-Commerce:</strong> Built multi-page IT platform with Three.js 3D WebGL visuals & repair cost estimator.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} className="text-sky-400" style={{ shrink: 0, marginTop: '2px' }} />
                <span><strong>WiFi Router Manager:</strong> Real-time Node.js dashboard monitoring connected client IPs & firewall security rules.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} className="text-purple-400" style={{ shrink: 0, marginTop: '2px' }} />
                <span><strong>Instagram & Social:</strong> Connect with Fahad on Instagram <a href={userProfile.instagramUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-pink)', fontWeight: '600' }}>@fahaad.ffp</a>.</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} className="text-sky-400" />
              Primary Technical Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Three.js 3D', 'WebGL', 'React 19', 'JavaScript (ES6+)', 'Node.js & Express', 'WebSockets', 'HTML5 & CSS3', 'Vite', 'Git & GitHub'].map((skill, idx) => (
                <span key={idx} className="tech-tag" style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
