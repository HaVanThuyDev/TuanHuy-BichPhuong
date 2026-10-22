import React, { useEffect, useRef, useState } from 'react';
import { Flower2, Sparkles } from 'lucide-react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petals = [];
    const petalCount = window.innerWidth < 768 ? 20 : 38;

    // Petal types: Sakura petal, heart, rose petal
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 9,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.2 + 0.9,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.5 - 0.75,
        opacity: Math.random() * 0.55 + 0.35,
        type: Math.random() > 0.4 ? 'petal' : 'heart',
        color: Math.random() > 0.3 ? '#fecdd3' : '#fda4af'
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'heart') {
        // Draw delicate heart
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        const topCurveHeight = p.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(
          0, 0, 
          -p.size / 2, 0, 
          -p.size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          -p.size / 2, (p.size + topCurveHeight) / 2, 
          0, (p.size + topCurveHeight) / 1.2, 
          0, p.size
        );
        ctx.bezierCurveTo(
          0, (p.size + topCurveHeight) / 1.2, 
          p.size / 2, (p.size + topCurveHeight) / 2, 
          p.size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          p.size / 2, 0, 
          0, 0, 
          0, topCurveHeight
        );
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw soft sakura petal
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size, 0);
        ctx.quadraticCurveTo(p.size / 2, p.size / 2, 0, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30"
        />
      )}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? "Tắt hiệu ứng cánh hoa" : "Bật hiệu ứng cánh hoa"}
        className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-white/80 hover:bg-white text-rose-600 shadow-lg backdrop-blur-md border border-rose-200 transition-all hover:scale-110 active:scale-95 group"
      >
        <Flower2 className={`w-5 h-5 transition-transform duration-700 ${isEnabled ? 'rotate-180 text-rose-500' : 'text-stone-400'}`} />
        <span className="sr-only">Toggle petals</span>
      </button>
    </>
  );
}
