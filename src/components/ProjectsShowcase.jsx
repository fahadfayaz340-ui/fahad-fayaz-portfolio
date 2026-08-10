import React, { useState } from 'react'
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Code2, 
  Star, 
  GitFork, 
  ChevronRight, 
  BrainCircuit, 
  Layers,
  CheckCircle,
  Plus
} from 'lucide-react'

export default function ProjectsShowcase({ projects, onOpenAddModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProjectModal, setSelectedProjectModal] = useState(null)

  const categories = ['All', 'Systems/Rust', 'AI/ML', 'Full Stack', 'React/Node']

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div className="projects-filter-bar glass-panel" style={{ padding: '20px 24px' }}>
        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', maxWidth: '360px', marginLeft: 'auto' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', width: '100%' }}
            />
          </div>
          <button className="btn-primary" onClick={onOpenAddModal} style={{ whiteSpace: 'nowrap' }}>
            <Plus size={16} /> New
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-panel project-card">
            <div>
              <div className="project-header">
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: '700' }}>
                    {project.category}
                  </span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {project.complexity}
                </div>
              </div>

              <p className="project-desc" style={{ margin: '10px 0 16px' }}>{project.tagline}</p>

              <div className="tech-tags" style={{ marginBottom: '16px' }}>
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-ai-score">
                <div className="ai-score-label">
                  <Sparkles size={14} className="text-purple-400" />
                  <span>AI Recruiter Alignment:</span>
                </div>
                <div className="ai-score-value">{project.aiScore}/100</div>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-stats">
                <div className="project-stat-item">
                  <Star size={14} className="text-amber-400" />
                  <span>{project.stars}</span>
                </div>
                <div className="project-stat-item">
                  <GitFork size={14} className="text-sky-400" />
                  <span>{project.forks}</span>
                </div>
              </div>

              <div className="project-actions">
                <button className="icon-btn" title="View Code Repository" onClick={() => window.open(project.repoUrl, '_blank')}>
                  <Code2 size={16} />
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  onClick={() => setSelectedProjectModal(project)}
                >
                  <span>Interview Insights</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Insights Drawer / Modal */}
      {selectedProjectModal && (
        <div className="modal-overlay" onClick={() => setSelectedProjectModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <div>
                <span className="brand-badge">{selectedProjectModal.category}</span>
                <h2 className="modal-title" style={{ marginTop: '6px' }}>{selectedProjectModal.title}</h2>
              </div>
              <button className="icon-btn" onClick={() => setSelectedProjectModal(null)}>✕</button>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {selectedProjectModal.tagline}
            </p>

            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} className="text-sky-400" /> Key Engineering Highlights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedProjectModal.keyFeatures?.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <CheckCircle size={16} className="text-emerald-400" style={{ shrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="interview-question-box">
              <div className="question-badge">
                <BrainCircuit size={16} /> Predicted Interview Discussion Questions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProjectModal.interviewQuestions?.map((q, idx) => (
                  <div key={idx} style={{ background: 'rgba(10,15,26,0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Q{idx + 1}: {q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedProjectModal(null)}>
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
