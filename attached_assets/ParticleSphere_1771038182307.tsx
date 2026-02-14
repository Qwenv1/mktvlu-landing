// ParticleSphere.tsx — Enhanced AI visualization for MKTVLU landing page
// Features: morphing wireframe sphere, revolving feature text, mouse/touch interactivity
// Usage: <ParticleSphere size={400} interactive showText />

import { useRef, useEffect, useCallback } from 'react';

interface Props {
  size?: number;
  className?: string;
  interactive?: boolean;
  showText?: boolean;
}

const BANDS = 12;
const PPB = 40;
const R = 220;
const ARC_CHAR_SPACING = 0.058;
const ARC_GAP_SPACING = 0.15;

// Revolving feature phrases — cycles through product capabilities
const FEATURE_PHRASES = [
  'Scanning Product...',
  'AI Vision Processing',
  'Cross-Platform Search',
  'Aggregating Prices',
  'Statistical Filtering',
  'Calculating MRP',
  'Condition Assessment',
  'VLU Certified',
  'Price DNA Analysis',
  'Market Intelligence',
];

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

interface ArcSegment {
  target: string;
  text: string;
  complete: boolean;
  opacity: number;
}

export default function ParticleSphere({
  size = 400,
  className = '',
  interactive = true,
  showText = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);

  // Mouse/touch interaction state
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });

  // Arc text state
  const arcRef = useRef<{
    segments: ArcSegment[];
    phraseIdx: number;
    charIdx: number;
    timer: number;
    lastSwap: number;
  }>({
    segments: [],
    phraseIdx: 0,
    charIdx: 0,
    timer: 0,
    lastSwap: 0,
  });

  // Handle mouse/touch movement
  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !interactive) return;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize to -1..1 range from center
      targetRotRef.current = {
        x: ((clientY - cy) / (rect.height / 2)) * 0.4,
        y: ((clientX - cx) / (rect.width / 2)) * 0.6,
      };
      mouseRef.current.active = true;
    },
    [interactive]
  );

  useEffect(() => {
    // Initialize particles on latitude bands
    const pts: Particle[] = [];
    for (let b = 0; b < BANDS; b++) {
      const phi = (Math.PI * (b + 1)) / (BANDS + 1);
      for (let p = 0; p < PPB; p++) {
        const theta = (2 * Math.PI * p) / PPB;
        pts.push({
          basePhi: phi,
          baseTheta: theta,
          band: b,
          idx: p,
          dPhi: (Math.random() - 0.5) * 0.15,
          dTheta: (Math.random() - 0.5) * 0.15,
          dR: (Math.random() - 0.5) * 20,
          speed: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
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

    // Initialize first arc text segment
    if (showText) {
      const arc = arcRef.current;
      arc.segments = [
        { target: FEATURE_PHRASES[0], text: '', complete: false, opacity: 1 },
      ];
      arc.phraseIdx = 0;
      arc.charIdx = 0;
      arc.lastSwap = 0;
    }

    // Pointer event handlers
    const onMouseMove = (e: MouseEvent) =>
      handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('touchmove', onTouchMove, { passive: true });
      canvas.addEventListener('mouseleave', onLeave);
      canvas.addEventListener('touchend', onLeave);
    }

    function draw() {
      if (!ctx) return;
      const W = 560,
        H = 560,
        cx = W / 2,
        cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      timeRef.current += 0.012;
      const t = timeRef.current;

      // ─── MOUSE/TOUCH INTERACTION ───
      // Smooth lerp toward target, drift back when inactive
      const lerp = 0.04;
      const cur = currentRotRef.current;
      const tgt = targetRotRef.current;

      if (mouseRef.current.active) {
        cur.x += (tgt.x - cur.x) * lerp;
        cur.y += (tgt.y - cur.y) * lerp;
      } else {
        cur.x += (0 - cur.x) * 0.02;
        cur.y += (0 - cur.y) * 0.02;
      }

      // Base auto-rotation + mouse offset
      const rotY = t * 0.7 + cur.y;
      const rotX = Math.sin(t * 0.3) * 0.4 + 0.3 + cur.x;
      const rotZ = Math.sin(t * 0.2) * 0.15;

      // ─── PROJECT PARTICLES ───
      const projected: {
        x: number;
        y: number;
        z: number;
        alpha: number;
        size: number;
        band: number;
        idx: number;
      }[] = [];

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
        y = y2;
        z = z2;

        // Rotate Z
        let x2 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
        y2 = x * Math.sin(rotZ) + y * Math.cos(rotZ);
        x = x2;
        y = y2;

        const depth = (z + R) / (2 * R);
        projected.push({
          x: cx + x,
          y: cy + y,
          z,
          alpha: 0.15 + depth * 0.6,
          size: 1.0 + depth * 2.5,
          band: pt.band,
          idx: pt.idx,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      // ─── DRAW BAND MESH LINES ───
      for (let b = 0; b < BANDS; b++) {
        const bandPts = projected
          .filter((p) => p.band === b)
          .sort((a, b2) => a.idx - b2.idx);
        if (bandPts.length > 2) {
          ctx.beginPath();
          ctx.moveTo(bandPts[0].x, bandPts[0].y);
          for (let j = 1; j < bandPts.length; j++) {
            const prev = bandPts[j - 1],
              curr = bandPts[j];
            ctx.quadraticCurveTo(
              prev.x,
              prev.y,
              (prev.x + curr.x) / 2,
              (prev.y + curr.y) / 2
            );
          }
          const last = bandPts[bandPts.length - 1],
            first = bandPts[0];
          ctx.quadraticCurveTo(
            last.x,
            last.y,
            (last.x + first.x) / 2,
            (last.y + first.y) / 2
          );
          ctx.closePath();

          const avgZ =
            bandPts.reduce((s, p) => s + p.z, 0) / bandPts.length;
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

      // ─── DRAW PARTICLE DOTS ───
      for (const pt2 of projected) {
        ctx.beginPath();
        ctx.arc(pt2.x, pt2.y, pt2.size, 0, Math.PI * 2);
        const c =
          pt2.band % 3 === 0
            ? '180,220,240'
            : pt2.band % 3 === 1
              ? '200,235,250'
              : '160,210,230';
        ctx.fillStyle = `rgba(${c},${pt2.alpha})`;
        ctx.fill();
      }

      // ─── CENTER GLOW ───
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7);
      grd.addColorStop(0, 'rgba(180,225,240,0.1)');
      grd.addColorStop(0.5, 'rgba(52,211,153,0.04)');
      grd.addColorStop(1, 'rgba(180,225,240,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ─── REVOLVING ARC TEXT ───
      if (showText) {
        const arc = arcRef.current;

        // Type out current segment character by character
        arc.timer += 0.012;
        if (arc.segments.length > 0) {
          const lastSeg = arc.segments[arc.segments.length - 1];
          if (!lastSeg.complete) {
            if (Math.floor(arc.timer * 33) > arc.charIdx) {
              if (lastSeg.text.length < lastSeg.target.length) {
                lastSeg.text += lastSeg.target.charAt(lastSeg.text.length);
                arc.charIdx = Math.floor(arc.timer * 33);
              } else {
                lastSeg.complete = true;
              }
            }
          }
        }

        // Swap to next phrase every ~3.5 seconds
        if (t - arc.lastSwap > 3.5) {
          arc.lastSwap = t;
          if (arc.segments.length > 0) {
            arc.segments[arc.segments.length - 1].complete = true;
          }
          if (arc.segments.length >= 3) {
            arc.segments.shift();
          }
          arc.phraseIdx = (arc.phraseIdx + 1) % FEATURE_PHRASES.length;
          arc.segments.push({
            target: FEATURE_PHRASES[arc.phraseIdx],
            text: '',
            complete: false,
            opacity: 1,
          });
          arc.charIdx = 0;
          arc.timer = t;
        }

        // Fade older segments
        for (let i = 0; i < arc.segments.length - 1; i++) {
          arc.segments[i].opacity = Math.max(
            0.15,
            1.0 - (arc.segments.length - 1 - i) * 0.3
          );
        }

        // Draw arc text
        const arcR = R + 36;
        const arcOffset = t * 0.12;
        const baseAngle = Math.PI * 0.25 + arcOffset;

        ctx.save();
        ctx.font = '600 18px Inter, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let runAngle = baseAngle;
        for (let si = 0; si < arc.segments.length; si++) {
          const seg = arc.segments[si];
          const txt = seg.text;
          const isLast = si === arc.segments.length - 1;
          const segAlpha = isLast ? 1.0 : seg.opacity;

          for (let ci = 0; ci < txt.length; ci++) {
            const angle = runAngle + ci * ARC_CHAR_SPACING;
            const tx = cx + Math.cos(angle) * arcR;
            const ty = cy + Math.sin(angle) * arcR;
            const posFade = Math.sin(angle) * 0.5 + 0.5;
            const alpha =
              Math.max(0.1, Math.min(0.9, posFade * 0.7 + 0.2)) * segAlpha;

            ctx.save();
            ctx.translate(tx, ty);
            ctx.rotate(angle + Math.PI / 2);
            ctx.fillStyle = `rgba(52,211,153,${alpha.toFixed(2)})`;
            ctx.fillText(txt.charAt(ci), 0, 0);
            ctx.restore();
          }

          runAngle += txt.length * ARC_CHAR_SPACING + ARC_GAP_SPACING;
        }

        // Glowing leading dot
        const dotAngle = baseAngle - ARC_CHAR_SPACING * 1.5;
        const dotX = cx + Math.cos(dotAngle) * arcR;
        const dotY = cy + Math.sin(dotAngle) * arcR;
        const dotGlow = ctx.createRadialGradient(
          dotX, dotY, 0, dotX, dotY, 10
        );
        dotGlow.addColorStop(
          0,
          `rgba(52,211,153,${(0.5 + Math.sin(t * 3) * 0.2).toFixed(2)})`
        );
        dotGlow.addColorStop(1, 'rgba(52,211,153,0)');
        ctx.fillStyle = dotGlow;
        ctx.fillRect(dotX - 10, dotY - 10, 20, 20);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#34D399';
        ctx.fill();

        // Blinking cursor after last segment
        const lastSeg = arc.segments[arc.segments.length - 1];
        if (lastSeg && !lastSeg.complete) {
          const cursorAngle = runAngle - ARC_GAP_SPACING;
          const cursorX = cx + Math.cos(cursorAngle) * arcR;
          const cursorY = cy + Math.sin(cursorAngle) * arcR;
          const cursorBlink = Math.sin(t * 6) > 0 ? 0.7 : 0;
          ctx.save();
          ctx.translate(cursorX, cursorY);
          ctx.rotate(cursorAngle + Math.PI / 2);
          ctx.fillStyle = `rgba(52,211,153,${cursorBlink})`;
          ctx.fillRect(-1, -10, 2, 20);
          ctx.restore();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      if (interactive) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('mouseleave', onLeave);
        canvas.removeEventListener('touchend', onLeave);
      }
    };
  }, [interactive, showText, handlePointerMove]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: size,
        height: size,
        touchAction: interactive ? 'none' : 'auto',
        cursor: interactive ? 'grab' : 'default',
      }}
    />
  );
}
