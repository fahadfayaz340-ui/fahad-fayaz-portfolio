import React from 'react'
import { LayoutDashboard, FolderGit2, Cpu, BrainCircuit, Activity, Plus, Sparkles, Code2, FileText, Monitor } from 'lucide-react'
import { userProfile } from '../data/mockData'

const InstagramIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function Header({ activeTab, setActiveTab, onOpenAddModal }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2 },
    { id: 'auditor', label: 'AI Code Auditor', icon: Cpu },
    { id: 'resume', label: 'AI Resume', icon: FileText },
    { id: 'sandbox', label: '3D Sandbox', icon: Monitor },
    { id: 'interview', label: 'Interview Prep', icon: BrainCircuit },
    { id: 'activity', label: 'Activity', icon: Activity },
  ]

  return (
    <header className="navbar glass-panel">
      <div className="brand">
        <div className="brand-icon glow-primary">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="brand-title text-gradient-primary">{userProfile.name}</span>
            <span className="brand-badge">Dev Portfolio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
            <a 
              href={userProfile.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--primary-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Code2 size={13} />
              <span>{userProfile.githubUsername}</span>
            </a>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>•</span>
            <a 
              href={userProfile.instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--accent-rose)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <InstagramIcon size={13} />
              <span>{userProfile.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="nav-links">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              className={`nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="header-actions">
        <button className="btn-primary" onClick={onOpenAddModal}>
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>
    </header>
  )
}
