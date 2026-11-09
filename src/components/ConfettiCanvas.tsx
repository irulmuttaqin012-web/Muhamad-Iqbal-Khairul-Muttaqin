import React, { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  active: boolean;
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#0A2540', '#F4A213', '#E66926', '#0284C7', '#10B981', '#F59E0B'];
    const numberOfPieces = 130;
    const pieces: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < numberOfPieces; i++) {
      pieces.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 8 - 4,
        speedY: Math.random() * 3 + 2.5,
        speedX: Math.random() * 2 - 1,
        opacity: 1,
      });
    }

    let animationFrame: number;
    const start = performance.now();

    function render(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const elapsed = time - start;

      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (elapsed > 3000) {
          p.opacity = Math.max(0, 1 - (elapsed - 3000) / 1500);
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      if (elapsed < 4500) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      id="confettiCanvas"
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
    />
  );
};
