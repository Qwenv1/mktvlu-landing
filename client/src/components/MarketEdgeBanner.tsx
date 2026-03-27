import { useEffect, useRef } from "react";

type Logo = { id: string; y: number };
type OutputNode = { label: string; sub: string; y: number; c: [number, number, number] };
type StreamParticle = { t: number; speed: number; size: number };
type LogoStream = { logo: Logo; pp: StreamParticle[]; tm: number };
type OutputStream = { out: OutputNode; pp: StreamParticle[]; tm: number };
type CoreStream = { pp: StreamParticle[]; tm: number };
type ScatterParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  dec: number;
  sz: number;
};

type TrailPoint = { x: number; y: number; d: number };

class OrbLine {
  private a: number;
  private b: number;
  private rX: number;
  private rY: number;
  private rZ: number;
  private ph: number;
  private sp: number;
  private t: number;
  private tr: TrailPoint[];
  private mx: number;

  constructor(
    private readonly CR: number,
    private readonly CX: number,
    private readonly CY: number
  ) {
    this.a = CR * (0.4 + Math.random() * 0.62);
    this.b = CR * (0.18 + Math.random() * 0.62);
    this.rX = Math.random() * Math.PI * 2;
    this.rY = Math.random() * Math.PI * 2;
    this.rZ = Math.random() * Math.PI * 2;
    this.ph = Math.random() * Math.PI * 2;
    this.sp = (Math.random() > 0.5 ? 1 : -1) * (0.007 + Math.random() * 0.013);
    this.t = Math.random() * Math.PI * 2;
    this.tr = [];
    this.mx = 52 + Math.floor(Math.random() * 66);
    for (let i = 0; i < this.mx; i++) this.step();
  }

  private step() {
    this.t += this.sp;
    const lx = this.a * Math.cos(this.t + this.ph);
    const ly = this.b * Math.sin(this.t + this.ph);
    const lz = 0;

    let x = lx * Math.cos(this.rZ) - ly * Math.sin(this.rZ);
    let y = lx * Math.sin(this.rZ) + ly * Math.cos(this.rZ);
    let z = lz;

    const y2 = y * Math.cos(this.rX) - z * Math.sin(this.rX);
    const z2 = y * Math.sin(this.rX) + z * Math.cos(this.rX);
    y = y2;
    z = z2;

    x = x * Math.cos(this.rY) + z2 * Math.sin(this.rY);

    this.tr.push({ x: this.CX + x, y: this.CY + y * 0.7, d: z2 / (this.CR * 1.5) });
    if (this.tr.length > this.mx) this.tr.shift();
  }

  update() {
    this.step();
  }

  draw(ctx: CanvasRenderingContext2D, mint: (a: number) => string) {
    if (this.tr.length < 2) return;
    const h = this.tr[this.tr.length - 1];
    ctx.beginPath();
    ctx.moveTo(this.tr[0].x, this.tr[0].y);
    for (let i = 1; i < this.tr.length; i++) ctx.lineTo(this.tr[i].x, this.tr[i].y);
    ctx.strokeStyle = mint(Math.min(0.048 + ((h.d + 1) * 0.5) * 0.22, 0.32));
    ctx.lineWidth = 0.72;
    ctx.stroke();

    if (h.d > 0.1) {
      ctx.shadowBlur = 7;
      ctx.shadowColor = mint(0.55);
    }
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.d > 0.05 ? 2.1 : 1.3, 0, Math.PI * 2);
    ctx.fillStyle = mint(Math.min(0.25 + ((h.d + 1) * 0.5) * 0.75, 1));
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export function MarketEdgeBanner() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !inner || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CANVAS_W = 1160;
    const CANVAS_H = 445;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    const W = CANVAS_W;
    const H = CANVAS_H;

    const T = (a: number) => `rgba(31,229,160,${a})`;

    const CX = 580;
    const CY = 222;
    const CR = 100;
    const LOGO_X = 168;
    const LOGO_R = 21;
    const CAM_X = 54;
    const CAM_Y = 42;
    const WEB_X = 54;
    const WEB_Y = H - 42;
    const L_CONV = 375;
    const R_CONV = 790;
    const R_NODE = 858;
    const VLU_X = 1082;
    const VLU_Y = CY;
    const VLU_R = 30;

    const LOGOS: Logo[] = [
      { id: "ebay", y: H * 0.16 },
      { id: "fbm", y: H * 0.29 },
      { id: "craigslist", y: H * 0.43 },
      { id: "amazon", y: H * 0.57 },
      { id: "chrono24", y: H * 0.71 },
    ];

    const OUTPUTS: OutputNode[] = [
      { label: "New / Retail", sub: "↑ High", y: H * 0.1, c: [31, 229, 160] },
      { label: "Like New", sub: "", y: H * 0.24, c: [31, 215, 148] },
      { label: "Good", sub: "", y: H * 0.39, c: [45, 190, 125] },
      { label: "Fair", sub: "", y: H * 0.54, c: [45, 165, 105] },
      { label: "Poor", sub: "↓ Low", y: H * 0.69, c: [45, 135, 82] },
      { label: "MRP™ Range", sub: "vs. Market", y: H * 0.84, c: [31, 229, 160] },
    ];

    const ARC_OUT = "REAL-TIME PRICE INDEXING  ·  MARKET DATA AGGREGATION  ·  ";
    const ARC_IN = "MAD FILTER  ·  MRP™ ENGINE  ·  CONDITION ANALYSIS  ·  ";
    const SCAN_LBLS = [
      "● Scanning listings…",
      "● Fetching real-time prices…",
      "● Filtering outliers (MAD)…",
      "● Condition-adjusting values…",
      "● Calculating MRP™…",
    ];

    const MAX_SC = 90;

    const orbs: OrbLine[] = [];
    for (let i = 0; i < 64; i++) orbs.push(new OrbLine(CR, CX, CY));

    const logoStreams: LogoStream[] = LOGOS.map((logo) => ({
      logo,
      pp: [],
      tm: Math.random() * 50,
    }));

    const camStream: CoreStream = { pp: [], tm: 40 };
    const webStream: CoreStream = { pp: [], tm: 65 };

    const outStreams: OutputStream[] = OUTPUTS.map((out) => ({
      out,
      pp: [],
      tm: 30 + Math.random() * 60,
    }));

    const vluStream: CoreStream = { pp: [], tm: 55 };
    const scatter: ScatterParticle[] = [];

    let arcAngle = 0;
    let scanIdx = 0;
    let scanTm = 0;
    let scanPulse = 0;
    let glowPulse = 0;
    let raf: number | null = null;

    function scaleCanvas() {
      const vw = wrap.offsetWidth;
      const scale = vw / 1160;
      inner.style.transform = `scale(${scale})`;
      inner.style.transformOrigin = "top center";
      wrap.style.height = `${CANVAS_H * scale}px`;
    }

    function withCtx(fn: () => void) {
      ctx.save();
      fn();
      ctx.restore();
    }

    function rrPath(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function bez(
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      t: number
    ) {
      const m = 1 - t;
      return {
        x: m * m * m * x0 + 3 * m * m * t * x1 + 3 * m * t * t * x2 + t * t * t * x3,
        y: m * m * m * y0 + 3 * m * m * t * y1 + 3 * m * t * t * y2 + t * t * t * y3,
      };
    }

    const logoPath = (logo: Logo, t: number) =>
      bez(
        LOGO_X + LOGO_R,
        logo.y,
        LOGO_X + LOGO_R + (L_CONV - LOGO_X - LOGO_R) * 0.58,
        logo.y,
        L_CONV,
        logo.y + (CY - logo.y) * 0.2,
        L_CONV,
        CY,
        t
      );

    const camPath = (t: number) => bez(CAM_X + 20, CAM_Y, CAM_X + 148, CAM_Y, L_CONV - 28, CY - 98, L_CONV, CY, t);
    const webPath = (t: number) => bez(WEB_X + 20, WEB_Y, WEB_X + 148, WEB_Y, L_CONV - 28, CY + 98, L_CONV, CY, t);
    const outPath = (o: OutputNode, t: number) =>
      bez(R_CONV, CY, R_CONV, CY + (o.y - CY) * 0.2, R_NODE - (R_NODE - R_CONV) * 0.6, o.y, R_NODE, o.y, t);
    const vluPath = (t: number) => bez(R_CONV, CY, R_CONV + 55, CY, VLU_X - 70, VLU_Y, VLU_X - VLU_R - 3, VLU_Y, t);

    function glassBox(x: number, y: number, w: number, h: number, l1: string, l2: string) {
      withCtx(() => {
        ctx.shadowBlur = 22;
        ctx.shadowColor = T(0.18);

        const gf = ctx.createLinearGradient(x, y, x, y + h);
        gf.addColorStop(0, "rgba(31,229,160,0.16)");
        gf.addColorStop(0.4, "rgba(31,229,160,0.08)");
        gf.addColorStop(1, "rgba(31,229,160,0.03)");
        rrPath(x, y, w, h, 7);
        ctx.fillStyle = gf;
        ctx.fill();
        ctx.shadowBlur = 0;

        const hs = ctx.createLinearGradient(x, y, x, y + h * 0.44);
        hs.addColorStop(0, "rgba(255,255,255,0.20)");
        hs.addColorStop(1, "rgba(255,255,255,0)");
        rrPath(x + 1, y + 1, w - 2, h * 0.44, 6);
        ctx.fillStyle = hs;
        ctx.fill();

        const bd = ctx.createLinearGradient(x, y, x, y + h);
        bd.addColorStop(0, T(0.72));
        bd.addColorStop(0.5, T(0.36));
        bd.addColorStop(1, T(0.12));
        rrPath(x, y, w, h, 7);
        ctx.strokeStyle = bd;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.shadowColor = T(0.35);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10.5px Helvetica Neue, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l1, x + w / 2, y + h * (l2 ? 0.36 : 0.5));
        if (l2) {
          ctx.fillStyle = T(0.82);
          ctx.font = "8.5px Helvetica Neue, Arial";
          ctx.fillText(l2, x + w / 2, y + h * 0.72);
        }
      });
    }

    function glassCircle(cx: number, cy: number, r: number, bg: string, drawContent: () => void) {
      withCtx(() => {
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255,255,255,0.08)";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.shadowBlur = 0;

        drawContent();

        const sp = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.38, 0, cx, cy, r);
        sp.addColorStop(0, "rgba(255,255,255,0.30)");
        sp.addColorStop(0.45, "rgba(255,255,255,0.07)");
        sp.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = sp;
        ctx.fill();

        const brd = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
        brd.addColorStop(0, "rgba(255,255,255,0.28)");
        brd.addColorStop(0.5, "rgba(255,255,255,0.10)");
        brd.addColorStop(1, "rgba(0,0,0,0.15)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = brd;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });
    }

    function glassNode(cx: number, cy: number, r: number, drawInner: (x: number, y: number, r: number) => void, label: string) {
      withCtx(() => {
        const gf = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.32, 0, cx, cy, r);
        gf.addColorStop(0, "rgba(31,229,160,0.20)");
        gf.addColorStop(0.6, "rgba(31,229,160,0.08)");
        gf.addColorStop(1, "rgba(31,229,160,0.02)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = gf;
        ctx.fill();

        drawInner(cx, cy, r);

        const bd = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
        bd.addColorStop(0, T(0.75));
        bd.addColorStop(1, T(0.18));
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = bd;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.fillStyle = T(0.72);
        ctx.font = "9px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, cx + r + 5, cy);
      });
    }

    function drawLogo(id: string, cx: number, cy: number) {
      const r = LOGO_R;
      ctx.save();
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      if (id === "ebay") {
        glassCircle(cx, cy, r, "#fff", () => {
          const fs = r * 0.62;
          ctx.font = `bold ${fs}px Arial`;
          ctx.fillStyle = "#e53238";
          ctx.fillText("e", cx - r * 0.33, cy + r * 0.03);
          ctx.fillStyle = "#0064d2";
          ctx.fillText("b", cx - r * 0.11, cy - r * 0.01);
          ctx.fillStyle = "#f5af02";
          ctx.fillText("a", cx + r * 0.12, cy + r * 0.03);
          ctx.fillStyle = "#86b817";
          ctx.fillText("y", cx + r * 0.35, cy + r * 0.06);
        });
      } else if (id === "fbm") {
        glassCircle(cx, cy, r, "#3b5998", () => {
          const W2 = r * 1.02;
          const atop = cy - r * 0.54;
          const scallH = r * 0.3;
          const bodyTop = cy - r * 0.22;
          const bodyH = r * 0.66;

          ctx.fillStyle = "#fff";
          ctx.fillRect(cx - W2 / 2, atop, W2, scallH);
          ctx.fillStyle = "#3b5998";
          const ns = 4;
          const sw = W2 / ns;
          for (let i = 0; i < ns; i++) {
            const bx = cx - W2 / 2 + sw * (i + 0.5);
            ctx.beginPath();
            ctx.arc(bx, atop + scallH, r * 0.115, Math.PI, 0, true);
            ctx.fill();
          }

          ctx.fillStyle = "#fff";
          const bxb = cx - r * 0.47;
          const byb = bodyTop;
          const bwb = r * 0.94;
          const bhb = bodyH;
          const rr = r * 0.12;
          rrPath(bxb, byb, bwb, bhb, rr);
          ctx.fill();

          ctx.fillStyle = "#3b5998";
          ctx.font = `bold ${r * 0.46}px Arial`;
          ctx.fillText("f", cx, cy + r * 0.22);
        });
      } else if (id === "craigslist") {
        glassCircle(cx, cy, r, "#7b2c8b", () => {
          const pr = r * 0.62;
          ctx.strokeStyle = "rgba(255,255,255,0.88)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(cx, cy, pr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - pr);
          ctx.lineTo(cx, cy + pr);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx - pr * Math.sin(Math.PI / 3), cy + pr * Math.cos(Math.PI / 3));
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + pr * Math.sin(Math.PI / 3), cy + pr * Math.cos(Math.PI / 3));
          ctx.stroke();
        });
      } else if (id === "amazon") {
        glassCircle(cx, cy, r, "#fff", () => {
          ctx.fillStyle = "#232F3E";
          ctx.font = `bold ${r * 0.38}px Arial`;
          ctx.fillText("amazon", cx, cy - r * 0.16);
          ctx.strokeStyle = "#FF9900";
          ctx.lineWidth = 2.3;
          ctx.beginPath();
          ctx.arc(cx, cy + r * 0.06, r * 0.45, 0.14, Math.PI - 0.14, false);
          ctx.stroke();
        });
      } else if (id === "chrono24") {
        glassCircle(cx, cy, r, "#f2ece0", () => {
          const cr = r * 0.7;
          const gapStart = Math.PI * 0.2;
          const gapEnd = Math.PI * 0.55;
          ctx.beginPath();
          ctx.arc(cx, cy, cr, gapEnd, gapStart + Math.PI * 2, false);
          ctx.strokeStyle = "#0c2b3d";
          ctx.lineWidth = r * 0.25;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx - r * 0.26, cy - r * 0.04);
          ctx.lineTo(cx - r * 0.01, cy + r * 0.24);
          ctx.lineTo(cx + r * 0.28, cy - r * 0.16);
          ctx.strokeStyle = "#b8892a";
          ctx.lineWidth = r * 0.22;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        });
      }

      ctx.restore();
    }

    function drawCameraNode() {
      glassNode(
        CAM_X,
        CAM_Y,
        18,
        (cx, cy, r) => {
          ctx.strokeStyle = "rgba(255,255,255,0.88)";
          ctx.lineWidth = 1.3;
          const bx = cx - r * 0.62;
          const by = cy - r * 0.33;
          const bw = r * 1.24;
          const bh = r * 0.76;
          ctx.strokeRect(bx, by, bw, bh);
          ctx.beginPath();
          ctx.arc(cx, cy + r * 0.06, r * 0.27, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeRect(cx - r * 0.18, by - r * 0.22, r * 0.36, r * 0.21);
        },
        "Camera Scan"
      );
    }

    function drawWebNode() {
      glassNode(
        WEB_X,
        WEB_Y,
        18,
        (cx, cy, r) => {
          const gr = r * 0.6;
          ctx.strokeStyle = "rgba(255,255,255,0.88)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx, cy, gr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx - gr, cy);
          ctx.lineTo(cx + gr, cy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - gr);
          ctx.lineTo(cx, cy + gr);
          ctx.stroke();
        },
        "Web Crawl"
      );
    }

    function drawVLUBadge() {
      const cx = VLU_X;
      const cy = VLU_Y;
      const r = VLU_R;
      withCtx(() => {
        const gf = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.35, 0, cx, cy, r);
        gf.addColorStop(0, "rgba(31,229,160,0.22)");
        gf.addColorStop(0.55, "rgba(31,229,160,0.09)");
        gf.addColorStop(1, "rgba(31,229,160,0.03)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = gf;
        ctx.fill();

        const bd = ctx.createLinearGradient(cx, cy - r, cx, cy + r);
        bd.addColorStop(0, T(0.85));
        bd.addColorStop(0.5, T(0.42));
        bd.addColorStop(1, T(0.14));
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = bd;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = "bold 13px Helvetica Neue, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("VLU", cx, cy - 6);
        ctx.fillStyle = T(0.88);
        ctx.font = "bold 6.5px monospace";
        ctx.fillText("CERTIFIED", cx, cy + 6);

        ctx.fillStyle = T(0.38);
        ctx.font = "7px monospace";
        ctx.fillText("VERIFIED OUTPUT", cx, cy + r + 13);
      });
    }

    function drawArcText(
      text: string,
      cx: number,
      cy: number,
      radius: number,
      startAngle: number,
      dir: number,
      fs: number,
      alpha: number
    ) {
      withCtx(() => {
        ctx.font = `${fs}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = T(alpha);
        const n = text.length;
        const apc = (Math.PI * 2) / n;
        for (let i = 0; i < n; i++) {
          const a = startAngle + dir * i * apc;
          ctx.save();
          ctx.translate(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
          ctx.rotate(a + (Math.PI / 2) * dir);
          ctx.fillText(text[i], 0, 0);
          ctx.restore();
        }
      });
    }

    function mkP(): StreamParticle {
      return { t: 0, speed: 0.0038 + Math.random() * 0.006, size: 1.2 + Math.random() * 1.1 };
    }

    function spawnScat(x: number, y: number) {
      if (scatter.length >= MAX_SC) return;
      const a = -Math.PI * 0.52 + (Math.random() - 0.5) * Math.PI * 0.85;
      const sp = 0.4 + Math.random() * 2;
      scatter.push({
        x,
        y,
        vx: Math.cos(a) * sp * 1.4,
        vy: Math.sin(a) * sp,
        life: 1,
        dec: 0.008 + Math.random() * 0.009,
        sz: 1 + Math.random() * 1.6,
      });
    }

    function pDot(x: number, y: number, sz: number, a: number) {
      ctx.beginPath();
      ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fillStyle = T(a);
      ctx.fill();
    }

    function tickStream<T extends CoreStream>(s: T, pathFn: (t: number) => { x: number; y: number }, onExit?: () => void) {
      s.tm--;
      if (s.tm <= 0) {
        s.pp.push(mkP());
        s.tm = 14 + Math.random() * 36;
      }

      for (let i = s.pp.length - 1; i >= 0; i--) {
        const p = s.pp[i];
        p.t += p.speed;
        if (p.t >= 1) {
          s.pp.splice(i, 1);
          if (onExit) onExit();
          continue;
        }
        const pos = pathFn(p.t);
        const a = p.t < 0.08 ? p.t / 0.08 : p.t > 0.88 ? (1 - p.t) / 0.12 : 1;
        pDot(pos.x, pos.y, p.size, a * 0.9);
      }
    }

    function drawBrackets() {
      const pad = 9;
      const bL = 18;
      const bx = CX - CR - pad;
      const by = CY - CR * 0.77 - pad;
      const bw = (CR + pad) * 2;
      const bh = (CR * 0.77 + pad) * 2;
      const a = 0.22 + 0.72 * Math.sin(scanPulse);

      ctx.strokeStyle = T(a);
      ctx.lineWidth = 2;
      [
        [bx, by, 1, 1],
        [bx + bw, by, -1, 1],
        [bx, by + bh, 1, -1],
        [bx + bw, by + bh, -1, -1],
      ].forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p[0], p[1] + p[3] * bL);
        ctx.lineTo(p[0], p[1]);
        ctx.lineTo(p[0] + p[2] * bL, p[1]);
        ctx.stroke();
      });

      const la = 0.18 + 0.82 * Math.abs(Math.sin(scanPulse * 0.72));
      const labelText = SCAN_LBLS[scanIdx];
      const labelY = CY - (CR + 32) - 18;

      withCtx(() => {
        ctx.font = "10px monospace";
        const tw = ctx.measureText(labelText).width;
        const pw = tw + 26;
        const ph = 21;
        const px2 = CX - pw / 2;
        const py2 = labelY - 14;

        const gf = ctx.createLinearGradient(px2, py2, px2, py2 + ph);
        gf.addColorStop(0, "rgba(31,229,160,0.13)");
        gf.addColorStop(1, "rgba(31,229,160,0.04)");
        rrPath(px2, py2, pw, ph, 10);
        ctx.fillStyle = gf;
        ctx.fill();

        rrPath(px2, py2, pw, ph, 10);
        ctx.strokeStyle = T(a * 0.45);
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.fillStyle = T(la);
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(labelText, CX, labelY);
      });
    }

    function junctionDot(x: number) {
      ctx.beginPath();
      ctx.arc(x, CY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = T(0.92);
      ctx.fill();
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      scanPulse += 0.022;
      arcAngle += 0.0017;
      glowPulse += 0.018;
      scanTm++;
      if (scanTm > 118) {
        scanTm = 0;
        scanIdx = (scanIdx + 1) % SCAN_LBLS.length;
      }

      // left streams
      LOGOS.forEach((l) => {
        ctx.beginPath();
        let f = true;
        for (let t = 0; t <= 1.001; t += 0.025) {
          const p = logoPath(l, Math.min(t, 1));
          if (f) {
            ctx.moveTo(p.x, p.y);
            f = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = T(0.036);
        ctx.stroke();
      });

      ctx.setLineDash([3, 5]);
      [camPath, webPath].forEach((fn) => {
        ctx.beginPath();
        let f = true;
        for (let t = 0; t <= 1.001; t += 0.025) {
          const p = fn(Math.min(t, 1));
          if (f) {
            ctx.moveTo(p.x, p.y);
            f = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = T(0.048);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      OUTPUTS.forEach((o) => {
        ctx.beginPath();
        let f = true;
        for (let t = 0; t <= 1.001; t += 0.025) {
          const p = outPath(o, Math.min(t, 1));
          if (f) {
            ctx.moveTo(p.x, p.y);
            f = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = T(0.036);
        ctx.stroke();
      });

      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      let fv = true;
      for (let tv = 0; tv <= 1.001; tv += 0.025) {
        const p = vluPath(Math.min(tv, 1));
        if (fv) {
          ctx.moveTo(p.x, p.y);
          fv = false;
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.strokeStyle = T(0.14);
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.setLineDash([]);

      drawArcText(ARC_OUT, CX, CY, CR + 32, arcAngle, 1, 9, 0.27);
      drawArcText(ARC_IN, CX, CY, CR + 14, -arcAngle * 1.3, -1, 7, 0.22);

      for (let i = 0; i < orbs.length; i++) {
        orbs[i].update();
        orbs[i].draw(ctx, T);
      }

      drawBrackets();

      logoStreams.forEach((s) => {
        tickStream(s, (t) => logoPath(s.logo, t));
      });
      tickStream(camStream, camPath);
      tickStream(webStream, webPath);

      outStreams.forEach((s) => {
        tickStream(
          s,
          (t) => outPath(s.out, t),
          () => {
            const p = outPath(s.out, 0.96);
            spawnScat(p.x, p.y);
          }
        );
      });

      tickStream(vluStream, vluPath);

      for (let i = scatter.length - 1; i >= 0; i--) {
        const sp = scatter[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.014;
        sp.life -= sp.dec;
        if (sp.life <= 0) {
          scatter.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.sz, 0, Math.PI * 2);
        ctx.fillStyle = T(sp.life * 0.52);
        ctx.fill();
      }

      junctionDot(L_CONV);
      junctionDot(R_CONV);

      LOGOS.forEach((l) => drawLogo(l.id, LOGO_X, l.y));
      drawCameraNode();
      drawWebNode();

      withCtx(() => {
        ctx.fillStyle = T(0.3);
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("▸ DATA SOURCES", LOGO_X, H * 0.08);
      });

      glassBox(CX - 63, CY + (CR + 32) + 14, 126, 40, "MRP™ Engine", "MAD Outlier Filter");

      OUTPUTS.forEach((o) => {
        const [r, g, b] = o.c;
        ctx.beginPath();
        ctx.arc(R_NODE, o.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},.75)`;
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${b},.85)`;
        ctx.font = "10.5px Helvetica Neue, Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(o.label, 968, o.y);
        if (o.sub) {
          ctx.fillStyle = "rgba(255,255,255,0.30)";
          ctx.font = "8.5px Helvetica Neue, Arial";
          ctx.fillText(o.sub, 968, o.y + 12);
        }
      });

      withCtx(() => {
        ctx.fillStyle = T(0.3);
        ctx.font = "8px monospace";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("CONDITION OUTPUT ▸", 968, H * 0.06);
      });

      drawVLUBadge();

      raf = requestAnimationFrame(render);
    }

    scaleCanvas();
    render();

    const onResize = () => scaleCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 max-w-[1400px] mx-auto">
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/70 backdrop-blur-[2px] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_85%,rgba(130,130,130,0.22)_0%,transparent_48%),radial-gradient(ellipse_at_80%_78%,rgba(147,63,0,0.28)_0%,transparent_42%),radial-gradient(ellipse_at_60%_12%,rgba(63,97,42,0.22)_0%,transparent_48%)]" />

        <h2 className="relative z-10 text-center font-sans not-italic tracking-[0.06em] text-[28px] md:text-[48px] text-white/90 mb-2">
          MKT-VLU. <span className="text-mint-gradient">The Market Edge.</span>
        </h2>

        <div ref={wrapRef} className="relative z-10 w-full overflow-hidden">
          <div ref={innerRef} className="relative w-[1160px] h-[445px] mx-auto">
            <canvas
              ref={canvasRef}
              className="block w-[1160px] h-[445px]"
              width={1160}
              height={445}
              aria-label="Market workflow animation"
            />
          </div>
        </div>

        <div className="relative z-10 text-center">
          <span className="font-serif italic text-[26px] md:text-[42px] text-mint/90 leading-none">
            MRP™ = ∫ f(Listings, Condition, Config) dMarket · MAD
            <sup className="text-[0.6em] align-super">−1</sup>
          </span>
        </div>
      </div>
    </section>
  );
}
