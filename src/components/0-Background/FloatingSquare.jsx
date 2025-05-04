import { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../Context/ThemeContext';

const SQUARE_COUNT = 16;
const LARGE_SQUARE_SIZE = 32;
const DEFAULT_SQUARE_SIZE = 30;
const COLLISION_DISTANCE = 45;

const FloatingSquares = () => {
  const { isDarkMode } = useTheme();
  const isRTL = document.documentElement.dir === 'rtl';
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  // Optimize initial squares creation with useMemo
  const initialSquares = useMemo(() => 
    Array(SQUARE_COUNT).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: i < 2 ? LARGE_SQUARE_SIZE : DEFAULT_SQUARE_SIZE,
      velocity: {
        x: (Math.random() - 0.5) * 0.5 * (isRTL ? -1 : 1),
        y: (Math.random() - 0.5) * 0.5
      },
      rotation: Math.random() * 360
    })), [isRTL]);

  const [squares, setSquares] = useState(initialSquares);

  useEffect(() => {
    const updateSquares = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      
      // Optimize frame rate
      if (deltaTime < 10) {
        animationRef.current = requestAnimationFrame(updateSquares);
        return;
      }

      setSquares(prevSquares => {
        return prevSquares.map(square => {
          let newX = square.x + square.velocity.x * deltaTime * 0.06;
          let newY = square.y + square.velocity.y * deltaTime * 0.06;
          let newVelocityX = square.velocity.x;
          let newVelocityY = square.velocity.y;

          // Boundary collision handling
          if (newX <= 0 || newX >= window.innerWidth - square.size) {
            newVelocityX *= -1;
            newX = newX <= 0 ? 0 : window.innerWidth - square.size;
          }
          
          if (newY <= 0 || newY >= window.innerHeight - square.size) {
            newVelocityY *= -1;
            newY = newY <= 0 ? 0 : window.innerHeight - square.size;
          }

          // Optimized collision detection
          prevSquares.forEach(other => {
            if (other.id !== square.id) {
              const dx = newX - other.x;
              const dy = newY - other.y;
              const distance = Math.hypot(dx, dy);

              if (distance < COLLISION_DISTANCE) {
                const angle = Math.atan2(dy, dx);
                const force = (COLLISION_DISTANCE - distance) / COLLISION_DISTANCE * 0.5;
                newVelocityX += Math.cos(angle) * force;
                newVelocityY += Math.sin(angle) * force;
              }
            }
          });

          return {
            ...square,
            x: newX,
            y: newY,
            velocity: { 
              x: Math.max(Math.min(newVelocityX, 1), -1),
              y: Math.max(Math.min(newVelocityY, 1), -1)
            },
            rotation: (square.rotation + deltaTime * 0.05) % 360
          };
        });
      });

      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(updateSquares);
    };

    animationRef.current = requestAnimationFrame(updateSquares);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="absolute h-[200vh] inset-0">
      {squares.map((square) => (
        <div
          key={square.id}
          style={{
            transform: `translate3d(${square.x * (isRTL ? -1 : 1)}px, ${square.y}px, 0) rotate(${square.rotation}deg)`,
            width: square.size,
            height: square.size,
            position: 'absolute',
            willChange: 'transform'
          }}
          className={`
            rounded-xl backdrop-blur-md
            bg-gradient-to-br ${
              isDarkMode
                ? 'from-violet-600/50 via-blue-500/30 to-cyan-500/50'
                : 'from-blue-500/40 via-blue-400/35 to-violet-500/50'
            }
            border-2 border-transparent
            ${
              isDarkMode
                ? 'border-blue-300/20  '
                : 'border-blue-500/40'
            }
          `}
        />
      ))}
    </div>
  );
};

export default FloatingSquares;
