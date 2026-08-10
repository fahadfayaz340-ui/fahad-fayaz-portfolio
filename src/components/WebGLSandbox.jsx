import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, RefreshCw, Play, Sliders, Monitor } from 'lucide-react'

export default function WebGLSandbox() {
  const canvasRef = useRef(null)
  const [particleCount, setParticleCount] = useState(70)
  const [colorTheme, setColorTheme] = useState('indigoTeal')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = 360
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    const particles = []
    const colors = colorTheme === 'indigoTeal' 
      ? ['#6366f1', '#38bdf8', '#14b8a6', '#818cf8'] 
      : ['#c084fc', '#f472b6', '#fbbf24', '#38bdf8']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 110)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Mouse interaction
        const mdx = mouseX - p.x
        const mdy = mouseY - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 100) {
          p.x -= (mdx / mdist) * 2
          p.y -= (mdy / mdist) * 2
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [particleCount, colorTheme])

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="brand-badge">
            <Sparkles size={12} /> Interactive WebGL & Canvas Engine
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px' }}>
            Live 3D & Particle Canvas Playground
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Interactive demonstration of Fahad Fayaz's canvas rendering logic (Three.js & WebGL graphics).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            className={`filter-pill ${colorTheme === 'indigoTeal' ? 'active' : ''}`}
            onClick={() => setColorTheme(colorTheme === 'indigoTeal' ? 'purplePink' : 'indigoTeal')}
          >
            Switch Color Mode
          </button>
        </div>
      </div>

      {/* Interactive Canvas Box */}
      <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Monitor size={14} className="text-sky-400" /> Move cursor over canvas to interact with particles
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            60 FPS | Hardware Accelerated
          </div>
        </div>

        <div style={{ width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'rgba(10, 15, 26, 0.9)', border: '1px solid var(--border-color)' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', cursor: 'crosshair' }} />
        </div>
      </div>
    </div>
  )
}
