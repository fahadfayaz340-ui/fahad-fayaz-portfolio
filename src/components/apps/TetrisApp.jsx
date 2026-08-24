import React, { useState, useEffect, useRef } from 'react';
import { retroAudio } from '../../utils/audio';

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]]  // Z
];

const COLORS = ['#00ffff', '#ffff00', '#aa00ff', '#ffaa00', '#0000ff', '#00ff00', '#ff0000'];

export default function TetrisApp() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const canvasRef = useRef(null);

  const gridRef = useRef(Array.from({ length: 20 }, () => Array(10).fill(0)));
  const pieceRef = useRef(null);
  const posRef = useRef({ x: 3, y: 0 });

  const spawnPiece = () => {
    const idx = Math.floor(Math.random() * SHAPES.length);
    pieceRef.current = {
      shape: SHAPES[idx],
      color: COLORS[idx]
    };
    posRef.current = { x: 3, y: 0 };

    if (checkCollision(posRef.current.x, posRef.current.y, pieceRef.current.shape)) {
      setGameState('gameover');
    }
  };

  const checkCollision = (px, py, shape) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const nx = px + c;
          const ny = py + r;
          if (nx < 0 || nx >= 10 || ny >= 20) return true;
          if (ny >= 0 && gridRef.current[ny][nx]) return true;
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const { shape, color } = pieceRef.current;
    const { x, y } = posRef.current;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && y + r >= 0) {
          gridRef.current[y + r][x + c] = color;
        }
      }
    }

    // Clear lines
    let cleared = 0;
    for (let r = 19; r >= 0; r--) {
      if (gridRef.current[r].every(cell => cell !== 0)) {
        gridRef.current.splice(r, 1);
        gridRef.current.unshift(Array(10).fill(0));
        cleared++;
        r++;
      }
    }
    if (cleared > 0) {
      retroAudio.playSuccess();
      setLines(prev => prev + cleared);
      setScore(prev => prev + cleared * 100);
    }
  };

  const startGame = () => {
    retroAudio.playClick();
    gridRef.current = Array.from({ length: 20 }, () => Array(10).fill(0));
    setScore(0);
    setLines(0);
    setGameState('playing');
    spawnPiece();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing' || !pieceRef.current) return;
      const key = e.key.toLowerCase();
      const { x, y } = posRef.current;
      const shape = pieceRef.current.shape;

      if (key === 'arrowleft' || key === 'a') {
        if (!checkCollision(x - 1, y, shape)) posRef.current.x -= 1;
      } else if (key === 'arrowright' || key === 'd') {
        if (!checkCollision(x + 1, y, shape)) posRef.current.x += 1;
      } else if (key === 'arrowdown' || key === 's') {
        if (!checkCollision(x, y + 1, shape)) posRef.current.y += 1;
      } else if (key === 'arrowup' || key === 'w') {
        // Rotate
        const rotated = shape[0].map((_, index) => shape.map(row => row[index]).reverse());
        if (!checkCollision(x, y, rotated)) pieceRef.current.shape = rotated;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / 10;

    const gameLoop = setInterval(() => {
      if (!pieceRef.current) return;
      const { x, y } = posRef.current;
      const shape = pieceRef.current.shape;

      if (!checkCollision(x, y + 1, shape)) {
        posRef.current.y += 1;
      } else {
        mergePiece();
        spawnPiece();
      }

      // Render
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Grid
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 10; c++) {
          if (gridRef.current[r][c]) {
            ctx.fillStyle = gridRef.current[r][c];
            ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }
      }

      // Render Active Piece
      if (pieceRef.current) {
        ctx.fillStyle = pieceRef.current.color;
        const p = pieceRef.current.shape;
        const px = posRef.current.x;
        const py = posRef.current.y;
        for (let r = 0; r < p.length; r++) {
          for (let c = 0; c < p[r].length; c++) {
            if (p[r][c] && py + r >= 0) {
              ctx.fillRect((px + c) * cellSize + 1, (py + r) * cellSize + 1, cellSize - 2, cellSize - 2);
            }
          }
        }
      }
    }, 400);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  return (
    <div className="tetris-app-container">
      <div className="tetris-header">
        <h2>|| TETRIS v1.0 ||</h2>
        <div className="tetris-stats-row">
          <span>SCORE: {score}</span>
          <span>LINES: {lines}</span>
        </div>
      </div>

      <div className="tetris-canvas-wrapper">
        <canvas ref={canvasRef} width={240} height={480} className="tetris-canvas" />

        {gameState !== 'playing' && (
          <div className="tetris-overlay-menu">
            {gameState === 'gameover' && <h3 className="gameover-text">GAME OVER!</h3>}
            <p>Arrow keys to move/rotate</p>
            <button className="start-tetris-btn" onClick={startGame}>
              [ {gameState === 'gameover' ? 'RESTART TETRIS' : 'START TETRIS'} ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
