import React, { useState } from 'react'
import { Sparkles, Plus, Layers, Code2, Globe } from 'lucide-react'

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [category, setCategory] = useState('Full Stack')
  const [techInput, setTechInput] = useState('')
  const [complexity, setComplexity] = useState('High')
  const [repoUrl, setRepoUrl] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !tagline) return

    const techArray = techInput
      ? techInput.split(',').map((t) => t.trim())
      : ['React', 'TypeScript', 'Node.js']

    const calculatedAiScore = Math.min(99, Math.floor(82 + techArray.length * 3 + (complexity === 'High' ? 8 : 4)))

    const newProj = {
      id: Date.now().toString(),
      title,
      tagline,
      category,
      tech: techArray,
      aiScore: calculatedAiScore,
      complexity,
      interviewReadiness: 'System Architecture & Scale',
      stars: Math.floor(10 + Math.random() * 50),
      forks: Math.floor(2 + Math.random() * 10),
      demoUrl: repoUrl || 'https://github.com',
      repoUrl: repoUrl || 'https://github.com',
      keyFeatures: [
        `Built scalable backend architecture using ${techArray[0] || 'modern tech stack'}`,
        'Integrated real-time telemetry and state synchronization',
        'Optimized bundle size and render performance'
      ],
      interviewQuestions: [
        `Why did you choose ${techArray[0] || 'this stack'} over competing tools?`,
        `How does your project handle peak load spikes?`
      ]
    }

    onAddProject(newProj)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="brand-badge">
              <Sparkles size={12} /> Live AI Project Scorer
            </span>
            <h2 className="modal-title" style={{ marginTop: '4px' }}>Add New Project to Portfolio</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus Engine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Tagline & Engineering Hook *</label>
            <textarea
              required
              rows={2}
              placeholder="Describe the problem solved and core architecture..."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                <option value="Systems/Rust">Systems / Rust / Go</option>
                <option value="AI/ML">AI / Machine Learning</option>
                <option value="Full Stack">Full Stack</option>
                <option value="React/Node">React / Node.js</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Complexity Rating</label>
              <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="form-select">
                <option value="High">High (Architectural / Systems)</option>
                <option value="Medium">Medium (Full-Stack App)</option>
                <option value="Standard">Standard (Utility Tool)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Rust, Tokio, WebSockets, Redis, Docker"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Repository / Demo URL</label>
            <input
              type="url"
              placeholder="https://github.com/yourusername/project"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={18} />
              <span>Evaluate & Add Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
