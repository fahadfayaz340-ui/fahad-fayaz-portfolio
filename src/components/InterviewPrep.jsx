import React, { useState } from 'react'
import { BrainCircuit, Sparkles, HelpCircle, CheckCircle, Lightbulb, ChevronDown, ChevronUp, Award } from 'lucide-react'
import { sampleInterviewQuestions } from '../data/mockData'

export default function InterviewPrep() {
  const [expandedId, setExpandedId] = useState(1)
  const [solvedCount, setSolvedCount] = useState(14)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="brand-badge">
            <Award size={12} /> Tech Interview Simulator
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px' }}>
            System Design & Behavioral Flashcards
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Questions automatically derived from your active projects to prepare you for recruiter phone screens & technical loops.
          </p>
        </div>

        <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '12px 20px', borderRadius: 'var(--radius-md)', textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Questions Mastered</div>
          <div className="text-gradient-cyan" style={{ fontSize: '1.6rem', fontWeight: '800' }}>
            {solvedCount} / 20
          </div>
        </div>
      </div>

      {/* Question Accordion / Flashcards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sampleInterviewQuestions.map((q) => {
          const isExpanded = expandedId === q.id
          return (
            <div key={q.id} className="glass-panel" style={{ padding: '20px', transition: 'var(--transition)' }}>
              <div 
                onClick={() => toggleExpand(q.id)} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="tech-tag" style={{ color: 'var(--primary)', borderColor: 'rgba(56, 189, 248, 0.3)' }}>{q.category}</span>
                      <span className="tech-tag" style={{ color: 'var(--accent-amber)' }}>{q.difficulty}</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginTop: '4px' }}>
                      {q.question}
                    </h3>
                  </div>
                </div>

                <button className="icon-btn">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {isExpanded && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <div className="question-hint">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--accent-purple)', marginBottom: '6px' }}>
                      <Lightbulb size={16} /> Recommended Interview Strategy & Key Talking Points:
                    </div>
                    <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{q.hint}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                      onClick={() => setSolvedCount(solvedCount + 1)}
                    >
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span>Mark as Mastered</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
