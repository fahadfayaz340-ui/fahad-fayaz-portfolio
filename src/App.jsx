import React, { useState } from 'react'
import Header from './components/Header'
import DashboardOverview from './components/DashboardOverview'
import ProjectsShowcase from './components/ProjectsShowcase'
import AiProjectAuditor from './components/AiProjectAuditor'
import AiResumeGenerator from './components/AiResumeGenerator'
import WebGLSandbox from './components/WebGLSandbox'
import InterviewPrep from './components/InterviewPrep'
import CodeActivity from './components/CodeActivity'
import AddProjectModal from './components/AddProjectModal'
import { initialProjects, userProfile } from './data/mockData'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState(initialProjects)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects])
  }

  return (
    <div className="app-container">
      {/* Top Navbar Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            projects={projects} 
            onSelectTab={setActiveTab} 
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsShowcase 
            projects={projects} 
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'auditor' && (
          <AiProjectAuditor />
        )}

        {activeTab === 'resume' && (
          <AiResumeGenerator />
        )}

        {activeTab === 'sandbox' && (
          <WebGLSandbox />
        )}

        {activeTab === 'interview' && (
          <InterviewPrep />
        )}

        {activeTab === 'activity' && (
          <CodeActivity />
        )}
      </main>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Footer */}
      <footer className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span>© 2026 {userProfile.name} • Casual Tech Candidate & Software Engineering Portfolio</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href={userProfile.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>GitHub @{userProfile.githubUsername}</a>
          <a href={userProfile.instagramUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-rose)', textDecoration: 'none' }}>Instagram {userProfile.instagramHandle}</a>
          <span>Status: <strong style={{ color: 'var(--accent-emerald)' }}>● Live Server Ready</strong></span>
        </div>
      </footer>
    </div>
  )
}
