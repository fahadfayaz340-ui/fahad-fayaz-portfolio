import React from 'react'
import { Flame, GitCommit, Calendar, TrendingUp, Sparkles } from 'lucide-react'

export default function CodeActivity() {
  // Generate 112 tiles for heatmap (28 columns x 4 rows)
  const heatmapLevels = Array.from({ length: 112 }, (_, i) => {
    // Make realistic activity clusters
    const r = Math.random()
    if (r > 0.85) return 'level-4'
    if (r > 0.65) return 'level-3'
    if (r > 0.45) return 'level-2'
    if (r > 0.25) return 'level-1'
    return ''
  })

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel heatmap-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="brand-badge">
              <Sparkles size={12} /> Real-Time Git Contribution Tracking
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px' }}>
              Commit Consistency & Code Activity
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Consistency is the #1 signal recruiters look for in junior and mid-level engineering candidates.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.25)', padding: '10px 18px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Streak</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={18} /> 14 Days
              </div>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '10px 18px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Commits (2026)</div>
              <div className="text-gradient-cyan" style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                342 Commits
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="heatmap-grid">
          {heatmapLevels.map((lvl, idx) => (
            <div key={idx} className={`heatmap-cell ${lvl}`} title={`Day ${idx + 1}: ${lvl ? 'Active commits' : 'No commits'}`} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          <span>Less</span>
          <div className="heatmap-cell" style={{ width: '12px', height: '12px' }}></div>
          <div className="heatmap-cell level-1" style={{ width: '12px', height: '12px' }}></div>
          <div className="heatmap-cell level-2" style={{ width: '12px', height: '12px' }}></div>
          <div className="heatmap-cell level-3" style={{ width: '12px', height: '12px' }}></div>
          <div className="heatmap-cell level-4" style={{ width: '12px', height: '12px' }}></div>
          <span>More</span>
        </div>
      </div>

      {/* Commit Feed */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitCommit size={18} className="text-sky-400" /> Recent Git Activity
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { msg: 'feat(raft): implement leader heartbeats & election timeout jitter', project: 'Distributed Key-Value Store', time: '2 hours ago', hash: 'e9f4a1c' },
            { msg: 'fix(crdt): optimize vector clock sync payload by 40%', project: 'Real-Time Collaborative Code Editor', time: 'Yesterday', hash: 'b31d87a' },
            { msg: 'refactor(llm): add AST parser fallback for malformed Python files', project: 'AI Code Reviewer Agent', time: '3 days ago', hash: '7c4092b' },
            { msg: 'ci(k8s): configure canary deployment health check probes', project: 'DevOps K8s Deployment Bot', time: '5 days ago', hash: '8f12a3d' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,15,26,0.5)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', background: 'rgba(56,189,248,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                  {item.hash}
                </span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{item.msg}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{item.project}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
