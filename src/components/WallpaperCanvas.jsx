import React, { useEffect, useRef } from 'react';

export default function WallpaperCanvas({ wallpaperMode = 'starfield', theme = 'green' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color maps based on theme
    const getThemeColor = () => {
      switch (theme) {
        case 'amber': return '#ffb000';
        case 'white': return '#ffffff';
        case 'matrix': return '#00ff66';
        case 'blue': return '#3399ff';
        case 'green':
        default: return '#00ff41';
      }
    };

    // 1. STARFIELD ANIMATION
    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width,
      pz: 0
    }));

    const renderStarfield = () => {
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const themeColor = getThemeColor();
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        star.z -= 4;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
          star.pz = star.z;
        }

        const k = 256 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          const pk = 256 / star.pz;
          const ppx = star.x * pk + cx;
          const ppy = star.y * pk + cy;

          const size = Math.max(0.5, (1 - star.z / canvas.width) * 3);
          const alpha = Math.min(1, Math.max(0.1, 1 - star.z / canvas.width));

          ctx.beginPath();
          ctx.strokeStyle = themeColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = size;
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(px, py, size, size);
        }
      });
      ctx.globalAlpha = 1.0;
    };

    // 2. MATRIX RAIN ANIMATION
    const matrixChars = '0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ$#@%&*+-/<>~';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(5, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = getThemeColor();
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // 3. RETRO GRID ANIMATION
    let gridOffset = 0;
    const renderRetroGrid = () => {
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const horizon = canvas.height * 0.5;
      const themeColor = getThemeColor();

      ctx.strokeStyle = themeColor;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1;

      // Perspective vertical lines
      const focalX = canvas.width / 2;
      const lineCount = 30;
      for (let i = -lineCount; i <= lineCount; i++) {
        const xStart = focalX + i * 40;
        ctx.beginPath();
        ctx.moveTo(focalX + i * 5, horizon);
        ctx.lineTo(xStart, canvas.height);
        ctx.stroke();
      }

      // Horizontal moving grid lines
      gridOffset = (gridOffset + 1.5) % 30;
      for (let y = horizon; y < canvas.height; y += 15) {
        const dy = y + gridOffset;
        if (dy < canvas.height) {
          ctx.beginPath();
          ctx.moveTo(0, dy);
          ctx.lineTo(canvas.width, dy);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;
    };

    // 4. CYBER RAIN
    const cyberDrops = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 8 + 4
    }));

    const renderCyberRain = () => {
      ctx.fillStyle = 'rgba(8, 12, 24, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = getThemeColor();
      ctx.lineWidth = 1.5;

      cyberDrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
    };

    // 5. SOLID / FALLBACK
    const renderSolid = () => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Main animation loop switcher
    const loop = () => {
      switch (wallpaperMode) {
        case 'starfield':
          renderStarfield();
          break;
        case 'matrix':
        case 'matrix_rain':
          renderMatrix();
          break;
        case 'retro_grid':
          renderRetroGrid();
          break;
        case 'cyber_rain':
          renderCyberRain();
          break;
        default:
          renderSolid();
          break;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [wallpaperMode, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
