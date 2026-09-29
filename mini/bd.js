const $ = (s) => document.querySelector(s);

/* Hide any image that is not in assets yet (no broken-icon boxes) */
(function hideMissingImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.visibility = "hidden";
    });
  });
})();

/* ============================================================
   BACKGROUND CANVAS
   Stars, occasional shooting stars, falling petals.
   ============================================================ */
(function drawNightSky() {
  const canvas = document.getElementById("bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, stars = [], petals = [], shots = [];
  const R = Math.random;

  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * d;
    canvas.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    stars = Array.from({ length: Math.floor((w * h) / 5500) }, () => ({
      x: R() * w,
      y: R() * h * 0.75,
      r: 0.4 + R() * 1.5,
      s: R() * 6,
      f: 0.5 + R() * 2,
    }));
    petals = Array.from({ length: Math.min(26, Math.floor(w / 22)) }, () => newPetal(true));
  }

  function newPetal(anywhere) {
    return {
      x: R() * w,
      y: anywhere ? R() * h : -20,
      s: 7 + R() * 9,
      vy: 0.5 + R() * 0.9,
      vx: 0.3 + R() * 0.8,
      a: R() * 6,
      va: (R() - 0.5) * 0.03,
      f: R() * 6,
      ff: 0.02 + R() * 0.03,
      h: 330 + R() * 20,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.a);
    ctx.scale(Math.cos(p.f), 1);
    const g = ctx.createLinearGradient(0, -p.s, 0, p.s);
    g.addColorStop(0, `hsl(${p.h},100%,92%)`);
    g.addColorStop(1, `hsl(${p.h},85%,72%)`);
    ctx.fillStyle = g;
    ctx.shadowColor = "rgba(255,150,200,.7)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, -p.s);
    ctx.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.9, p.s * 0.6, 0, p.s);
    ctx.bezierCurveTo(-p.s * 0.9, p.s * 0.6, -p.s, -p.s * 0.6, 0, -p.s);
    ctx.fill();
    ctx.restore();
  }

  let last = 0;
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const a = 0.35 + 0.65 * Math.abs(Math.sin((t / 1000) * s.f + s.s));
      ctx.fillStyle = `rgba(255,250,235,${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 7);
      ctx.fill();
    }
    if (t - last > 3500 + R() * 3000) {
      last = t;
      shots.push({ x: R() * w * 0.8 + w * 0.2, y: R() * h * 0.3, l: 0 });
    }
    shots = shots.filter((s) => s.l < 1);
    for (const s of shots) {
      s.l += 0.018;
      const px = s.x - s.l * 260;
      const py = s.y + s.l * 140;
      const g = ctx.createLinearGradient(px, py, px + 90, py - 49);
      g.addColorStop(0, "rgba(255,255,255," + (1 - s.l) + ")");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + 90, py - 49);
      ctx.stroke();
    }
    for (const p of petals) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(t / 900 + p.f) * 0.6;
      p.a += p.va;
      p.f += p.ff;
      if (p.y > h + 20 || p.x > w + 30) Object.assign(p, newPetal(false), { x: R() * w - w * 0.2 });
      drawPetal(p);
    }
    requestAnimationFrame(draw);
  }

  addEventListener("resize", size);
  size();
  requestAnimationFrame(draw);
})();

/* ============================================================
   MUSIC
   HBA.mp3 plays at full page volume (1.0).
   WB.m4a plays at half (0.5).
   Both loop. If the device volume is 40, HBA is 40 and WB is 20.
   Browsers require a tap before sound can start.
   ============================================================ */
(function music() {
  const hba = $("#trackHba");
  const wb = $("#trackWb");
  const gate = $("#startGate");
  if (!hba || !wb) return;

  hba.loop = true;
  wb.loop = true;
  hba.volume = 1;
  wb.volume = 0.5;

  async function startTracks() {
    try {
      await Promise.all([hba.play(), wb.play()]);
    } catch (err) {
      // Autoplay still blocked — visitor can tap again
    }
    if (gate) gate.classList.add("gone");
  }

  if (gate) {
    gate.addEventListener("click", startTracks, { once: true });
  } else {
    startTracks();
  }
})();

/* ============================================================
   TYPEWRITER under the portrait
   ============================================================ */
(function typewriter() {
  const el = $("#typewriter");
  if (!el) return;
  const text = "Happy Birthday";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  (async function loop() {
    await sleep(1500);
    for (;;) {
      for (let i = 1; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        await sleep(110 + Math.random() * 40 - 20);
      }
      await sleep(1800);
      for (let i = text.length; i >= 0; i--) {
        el.textContent = text.slice(0, i);
        await sleep(55);
      }
      await sleep(350);
    }
  })();
})();

/* ============================================================
   SCROLL REVEAL for [data-r] sections
   ============================================================ */
(function revealOnScroll() {
  const els = document.querySelectorAll("[data-r]");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((e) => io.observe(e));
})();

/* ============================================================
   POINTER TILT on .tilt elements
   ============================================================ */
(function tilt() {
  const root = document.documentElement;
  const tilts = [...document.querySelectorAll(".tilt")];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  addEventListener(
    "pointermove",
    (e) => {
      root.style.setProperty("--mx", clamp(e.clientX / innerWidth - 0.5, -0.5, 0.5).toFixed(3));
      root.style.setProperty("--my", clamp(e.clientY / innerHeight - 0.5, -0.5, 0.5).toFixed(3));
      for (const t of tilts) {
        const r = t.getBoundingClientRect();
        if (e.clientY < r.top - 80 || e.clientY > r.bottom + 80 || e.clientX < r.left - 80 || e.clientX > r.right + 80) {
          t.style.transform = "";
          continue;
        }
        const px = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5);
        const py = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
        t.style.transform = `perspective(900px) rotateY(${(px * 16).toFixed(1)}deg) rotateX(${(-py * 16).toFixed(1)}deg)`;
      }
    },
    { passive: true }
  );
  addEventListener("pointerleave", () => tilts.forEach((t) => (t.style.transform = "")));
  document.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch") tilts.forEach((t) => (t.style.transform = ""));
  });
})();

/* ============================================================
   PHOTO CAROUSEL (polaroid stack)
   ============================================================ */
(function photoStack() {
  const cards = [...document.querySelectorAll(".polaroid")];
  const n = cards.length;
  const stack = $("#stack");
  const count = $("#count");
  if (!n || !stack) return;
  let idx = 0;
  let timer;

  function render() {
    cards.forEach((c, i) => {
      let o = ((i - idx) % n + n) % n;
      if (o > n / 2) o -= n;
      const a = Math.abs(o);
      c.style.zIndex = 10 - a;
      c.style.opacity = a > 1 ? 0 : 1;
      c.style.pointerEvents = a > 1 ? "none" : "auto";
      c.style.filter = a ? "brightness(.6)" : "none";
      c.style.transform = `translateX(${o * 62}%) translateZ(${-a * 170}px) rotateY(${-o * 42}deg) rotateZ(${o * 2}deg)`;
      c.dataset.o = o;
    });
    if (count) count.textContent = `${idx + 1} / ${n}`;
  }

  const go = (d) => {
    idx = ((idx + d) % n + n) % n;
    render();
  };
  const user = (d) => {
    go(d);
    clearInterval(timer);
    timer = setInterval(() => go(1), 5500);
  };

  const next = $("#nextImg");
  const prev = $("#prevImg");
  if (next) next.onclick = () => user(1);
  if (prev) prev.onclick = () => user(-1);
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") user(1);
    if (e.key === "ArrowLeft") user(-1);
  });

  let sx = null;
  let target = null;
  stack.addEventListener("pointerdown", (e) => {
    sx = e.clientX;
    target = e.target.closest(".polaroid");
  });
  stack.addEventListener("pointerup", (e) => {
    if (sx === null) return;
    const d = e.clientX - sx;
    sx = null;
    if (Math.abs(d) > 40) user(d < 0 ? 1 : -1);
    else {
      const o = target ? +target.dataset.o : 0;
      user(o || 1);
    }
  });
  stack.addEventListener("pointercancel", () => (sx = null));
  render();
  timer = setInterval(() => go(1), 5500);
})();

/* ============================================================
   FLIP CARD
   ============================================================ */
(function flipCard() {
  const card = $("#card");
  if (!card) return;
  const flip = () => card.classList.toggle("flipped");
  const btn = $("#toggleButton");
  const wrap = $("#cardContainer");
  if (btn) btn.addEventListener("click", (e) => {
    e.stopPropagation();
    flip();
  });
  if (wrap) wrap.addEventListener("click", flip);
})();

/* ============================================================
   WISH BUTTON: confetti + lanterns + rotating messages
   ============================================================ */
(function wishes() {
  const cols = ["#ffd27a", "#ff7eb6", "#7fe7ff", "#ffffff"];
  const boom = () => {
    if (typeof confetti === "function") {
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.17 }, colors: cols });
    }
  };
  if (document.readyState === "complete") boom();
  else addEventListener("load", boom);

  const msg = $("#wishMsg");
  const btn = $("#wishBtn");
  if (!btn) return;
  const lines = [
    "wish sent, it will come true",
    "close your eyes and think of it",
    "the candles are out, make it big",
  ];
  let k = 0;
  btn.addEventListener("click", () => {
    if (msg) {
      msg.textContent = lines[k++ % lines.length];
      msg.classList.remove("pop");
      void msg.offsetWidth;
      msg.classList.add("pop");
    }
    if (typeof confetti === "function") {
      [0, 1].forEach((s) =>
        confetti({ particleCount: 90, angle: s ? 120 : 60, spread: 65, origin: { x: s, y: 0.75 }, colors: cols })
      );
    }
    const box = $("#lanterns");
    if (!box) return;
    for (let i = 0; i < 8; i++) {
      const l = document.createElement("span");
      l.className = "lantern";
      l.style.left = 6 + Math.random() * 88 + "%";
      l.style.setProperty("--t", 5 + Math.random() * 4 + "s");
      l.style.setProperty("--x", (Math.random() - 0.5) * 120 + "px");
      l.style.animationDelay = Math.random() * 1.2 + "s";
      box.appendChild(l);
      l.addEventListener("animationend", () => l.remove());
    }
  });
})();
