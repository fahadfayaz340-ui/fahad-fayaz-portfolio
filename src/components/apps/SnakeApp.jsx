import React, { useState, useEffect, useRef } from 'react';
import { retroAudio } from '../../utils/audio';

export default function SnakeApp() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [snakeLen, setSnakeLen] = useState(1);
  const canvasRef = useRef(null);

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });

  const gridCount = 20;

  const spawnFood = () => {
    foodRef.current = {
      x: Math.floor(Math.random() * gridCount),
      y: Math.floor(Math.random() * gridCount)
    };
  };

  const startGame = () => {
    retroAudio.playClick();
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    spawnFood();
    setScore(0);
    setSnakeLen(2);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      const key = e.key.toLowerCase();
      const currentDir = dirRef.current;

      if ((key === 'arrowup' || key === 'w') && currentDir.y !== 1) {
        nextDirRef.current = { x: 0, y: -1 };
      } else if ((key === 'arrowdown' || key === 's') && currentDir.y !== -1) {
        nextDirRef.current = { x: 0, y: 1 };
      } else if ((key === 'arrowleft' || key === 'a') && currentDir.x !== 1) {
        nextDirRef.current = { x: -1, y: 0 };
      } else if ((key === 'arrowright' || key === 'd') && currentDir.x !== -1) {
        nextDirRef.current = { x: 1, y: 0 };
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

    const cellSize = canvas.width / gridCount;

    const gameLoop = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = { ...snakeRef.current[0] };
      head.x += dirRef.current.x;
      head.y += dirRef.current.y;

      // Wall collision check
      if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
        setGameState('gameover');
        clearInterval(gameLoop);
        return;
      }

      // Self collision check
      for (let segment of snakeRef.current) {
        if (segment.x === head.x && segment.y === head.y) {
          setGameState('gameover');
          clearInterval(gameLoop);
          return;
        }
      }

      snakeRef.current.unshift(head);

      // Food check
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        retroAudio.playKeypress();
        setScore(prev => prev + 10);
        setSnakeLen(prev => prev + 1);
        spawnFood();
      } else {
        snakeRef.current.pop();
      }

      // Render
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Food
      ctx.fillStyle = '#ff3366';
      ctx.fillRect(foodRef.current.x * cellSize + 1, foodRef.current.y * cellSize + 1, cellSize - 2, cellSize - 2);

      // Render Snake
      snakeRef.current.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#00ff66' : '#00cc44';
        ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
      });
    }, 120);

    return () => clearInterval(gameLoop);
  }, [gameState]);

  return (
    <div className="snake-app-container">
      <div className="snake-header">
        <h2>|| SNAKE v1.0 ||</h2>
        <div className="snake-stats-row">
          <span>SCORE: {score}</span>
          <span>LEN: {snakeLen}</span>
        </div>
      </div>

      <div className="snake-canvas-wrapper">
        <canvas ref={canvasRef} width={360} height={360} className="snake-canvas" />

        {gameState !== 'playing' && (
          <div className="snake-overlay-menu">
            {gameState === 'gameover' && <h3 className="gameover-text">GAME OVER!</h3>}
            <p>Arrow keys or WASD to move</p>
            <button className="start-snake-btn" onClick={startGame}>
              [ {gameState === 'gameover' ? 'RESTART GAME' : 'START GAME'} ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
