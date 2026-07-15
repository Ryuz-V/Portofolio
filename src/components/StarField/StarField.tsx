'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  tail: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    // Resize canvas to fill viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate static stars
    const STAR_COUNT = 200;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Shooting stars pool
    const SHOOTING_COUNT = 3;
    const shootingStars: ShootingStar[] = Array.from({ length: SHOOTING_COUNT }, () =>
      createShootingStar()
    );

  function createShootingStar(): ShootingStar {
    const fromTop = Math.random() > 0.4;
    const angle = (Math.PI / 180) * (30 + Math.random() * 20);

    const depth = Math.random(); // buat variasi natural

    return {
      x: fromTop
        ? Math.random() * window.innerWidth
        : -Math.random() * 50,
      y: fromTop
        ? -Math.random() * 50
        : Math.random() * window.innerHeight * 0.5,

      length: Math.random() * 80 + 40, // lebih pendek biar cocok sama speed pelan
      speed: 0.2 + depth * 0.5, // pelan tapi tetap variatif
      angle,

      opacity: 0,
      active: false,

      tail: Math.random() * 50 + 20, // ekor lebih pendek biar realistis
    };
  }

  function resetShootingStar(s: ShootingStar) {
    const fromTop = Math.random() > 0.4;
    const depth = Math.random();

    s.x = fromTop
      ? Math.random() * window.innerWidth
      : -Math.random() * 50;

    s.y = fromTop
      ? -Math.random() * 50
      : Math.random() * window.innerHeight * 0.5;

    s.length = Math.random() * 80 + 40;

    // 🔥 FIX: speed pelan
    s.speed = 0.2 + depth * 0.5;

    s.angle = (Math.PI / 180) * (30 + Math.random() * 20);
    s.opacity = 0;
    s.active = false;
    s.tail = Math.random() * 50 + 20;
    }

    // Stagger initial activation
    shootingStars.forEach((s, i) => {
      setTimeout(() => { s.active = true; }, i * 1800 + Math.random() * 3000);
    });

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      time++;

      // Draw static stars with twinkle
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = Math.max(0.05, star.opacity + twinkle * 0.25);

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fill();
      }

      // Draw shooting stars
      for (const s of shootingStars) {
        if (!s.active) continue;

        // Fade in / out
        s.opacity = Math.min(1, s.opacity + 0.06);

        // Move
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        // Draw trail with gradient
        const tailX = s.x - Math.cos(s.angle) * s.tail;
        const tailY = s.y - Math.sin(s.angle) * s.tail;

        const grad = ctx!.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.7, `rgba(200, 200, 255, ${s.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(s.x, s.y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Draw bright head dot
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx!.fill();

        // Reset if off screen
        if (
          s.x > canvas!.width + 100 ||
          s.y > canvas!.height + 100
        ) {
          resetShootingStar(s);
          setTimeout(() => { s.active = true; }, 500 + Math.random() * 4000);
        }
      }

      animFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
