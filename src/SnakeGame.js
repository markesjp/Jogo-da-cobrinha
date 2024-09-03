import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    document.addEventListener('keydown', changeDirection);
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', changeDirection);
    };
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    let head = { ...newSnake[0] };
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'UP') head.y -= 1;
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
    checkCollision(newSnake);
  };

  const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
  };

  const checkCollision = (newSnake) => {
    let head = newSnake[0];
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        setIsGameOver(true);
        setSnake([{ x: 10, y: 10 }]);
        setDirection('RIGHT');
        break;
      }
    }
    if (head.x >= 20 || head.x < 0 || head.y >= 20 || head.y < 0) {
      setIsGameOver(true);
      setSnake([{ x: 10, y: 10 }]);
      setDirection('RIGHT');
    }
  };

  return (
    <div className="snake-game">
      {isGameOver && <div className="game-over">Game Over</div>}
      <div className="grid">
        {Array.from(Array(20), (_, y) =>
          Array.from(Array(20), (_, x) => (
            <div
              key={`${x}-${y}`}
              className={`cell ${snake.some(segment => segment.x === x && segment.y === y) ? 'snake' : ''} ${food.x === x && food.y === y ? 'food' : ''}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
