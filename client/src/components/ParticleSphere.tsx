import { useRef, useEffect } from 'react';

interface Props {
  size?: number;
  className?: string;
}

const BANDS = 12;
const PPB = 40;
const R = 220;

interface Particle {
  basePhi: number;
  baseTheta: number;
  band: number;
  idx: number;
  dPhi: number;
  dTheta: number;
  dR: number;
  speed: number;
  phase: number;
}

export default function ParticleSphere({ size = 400, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Initialize particles on latitude bands
    const pts: Particle[] = [];
    for (let b = 0; b < BANDS; b++) {
      const phi = Math.PI * (b + 1) / (BANDS + 1);
      for (let p = 0; p < PPB; p++) {
        const theta = 2 * Math.PI * p / PPB;
        pts.push({
          basePhi: phi, baseTheta: theta,
          band: b, idx: p,
          dPhi: (Math.random() - 0.5) * 0.15,
          dTheta: (Math.random() - 0.5) * 0.15,
          dR: (Math.random() - 0.5) * 20,
          speed: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    particles.current = pts;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    canvas.width = 560 * dpr;
    canvas.height = 560 * dpr;
    ctx.scale(dpr, dpr);

    function draw() {
      if (!ctx) return;
      const W = 560, H = 560, cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      timeRef.current += 0.012;
      const t = timeRef.current;

      const rotY = t * 0.7;
      const rotX = Math.sin(t * 0.3) * 0.4 + 0.3;
      const rotZ = Math.sin(t * 0.2) * 0.15;

      // Project particles to 2D
      const projected: { x: number; y: number; z: number; alpha: number; size: number; band: number; idx: number }[] = [];
      for (const pt of particles.current) {
        const morph = Math.sin(t * pt.speed + pt.phase) * 0.18;
        const phi = pt.basePhi + pt.dPhi + morph;
        const theta = pt.baseTheta + pt.dTheta + rotY * pt.speed;
        const r = R + pt.dR + Math.sin(t * 1.5 + pt.phase) * 14;

        let x = r * Math.sin(phi) * Math.cos(theta);
        let y = r * Math.cos(phi);
        let z = r * Math.sin(phi) * Math.sin(theta);

        // Rotate X
        let y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
        y = y2; z = z2;

        // Rotate Z
        let x2 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
        y2 = x * Math.sin(rotZ) + y * Math.cos(rotZ);
        x = x2; y = y2;

        const depth = (z + R) / (2 * R);
        projected.push({
          x: cx + x, y: cy + y, z,
          alpha: 0.15 + depth * 0.6,
          size: 1.0 + depth * 2.5,
          band: pt.band, idx: pt.idx
        });
      }

      projected.sort((a, b) => a.z - b.z);

      // Draw band mesh lines
      for (let b = 0; b < BANDS; b++) {
        const bandPts = projected.filter(p => p.band === b).sort((a, b2) => a.idx - b2.idx);
        if (bandPts.length > 2) {
          ctx.beginPath();
          ctx.moveTo(bandPts[0].x, bandPts[0].y);
          for (let j = 1; j < bandPts.length; j++) {
            const prev = bandPts[j - 1], curr = bandPts[j];
            ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
          }
          const last = bandPts[bandPts.length - 1], first = bandPts[0];
          ctx.quadraticCurveTo(last.x, last.y, (last.x + first.x) / 2, (last.y + first.y) / 2);
          ctx.closePath();

          const avgZ = bandPts.reduce((s, p) => s + p.z, 0) / bandPts.length;
          const bandDepth = (avgZ + R) / (2 * R);
          const lineAlpha = 0.08 + bandDepth * 0.28;
          const fillAlpha = 0.02 + bandDepth * 0.1;
          const hue = b % 2 === 0 ? '180,210,230' : '140,220,200';

          ctx.strokeStyle = `rgba(${hue},${lineAlpha})`;
          ctx.lineWidth = 1.0 + bandDepth * 1.0;
          ctx.stroke();
          ctx.fillStyle = `rgba(200,230,245,${fillAlpha})`;
          ctx.fill();
        }
      }

      // Draw particle dots
      for (const pt2 of projected) {
        ctx.beginPath();
        ctx.arc(pt2.x, pt2.y, pt2.size, 0, Math.PI * 2);
        const c = pt2.band % 3 === 0 ? '180,220,240' : pt2.band % 3 === 1 ? '200,235,250' : '160,210,230';
        ctx.fillStyle = `rgba(${c},${pt2.alpha})`;
        ctx.fill();
      }

      // Center glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7);
      grd.addColorStop(0, 'rgba(180,225,240,0.1)');
      grd.addColorStop(0.5, 'rgba(52,211,153,0.04)');
      grd.addColorStop(1, 'rgba(180,225,240,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}