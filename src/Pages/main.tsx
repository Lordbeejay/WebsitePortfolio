import {
  motion,
  type Variants,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Work',    path: '/projects' },
  { label: 'About',   path: '/about' },
  { label: 'Skills',  path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  root: {
    background: '#020207',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Syne', sans-serif",
    cursor: 'none',
  },
  cursor: {
    position: 'fixed',
    top: 0, left: 0,
    width: 12, height: 12,
    borderRadius: '50%',
    background: '#E8A87C',
    pointerEvents: 'none',
    zIndex: 9999,
    mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
  },
  cursorRing: {
    position: 'fixed',
    top: 0, left: 0,
    width: 40, height: 40,
    borderRadius: '50%',
    border: '1.5px solid rgba(232,168,124,0.5)',
    pointerEvents: 'none',
    zIndex: 9998,
  },
  noise: {
    position: 'fixed',
    inset: 0,
    opacity: 0.04,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: '200px 200px',
    pointerEvents: 'none',
    zIndex: 1,
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
    `,
    backgroundSize: '80px 80px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  orb1: {
    position: 'absolute',
    width: 700, height: 700,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(232,168,124,0.12) 0%, transparent 70%)',
    top: '-200px', right: '-100px',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: 500, height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(120,80,200,0.1) 0%, transparent 70%)',
    bottom: '0px', left: '-100px',
    pointerEvents: 'none',
  },
  scanline: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(232,168,124,0.15), transparent)',
    pointerEvents: 'none',
  },
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px 60px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    background: 'rgba(2,2,7,0.6)',
  },
  navLogo: {
    fontSize: 13,
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex', gap: 40,
    listStyle: 'none', margin: 0, padding: 0,
  },
  navLink: {
    fontSize: 12,
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontFamily: "'Syne', sans-serif",
  },
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '0 60px',
    paddingTop: 100,
    zIndex: 2,
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0,
    zIndex: 3,
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 100,
    border: '1px solid rgba(232,168,124,0.3)',
    background: 'rgba(232,168,124,0.06)',
    width: 'fit-content',
    marginBottom: 36,
  },
  statusDot: {
    width: 6, height: 6,
    borderRadius: '50%',
    background: '#E8A87C',
    flexShrink: 0,
  },
  statusText: {
    fontSize: 11,
    letterSpacing: '0.2em',
    color: 'rgba(232,168,124,0.8)',
    textTransform: 'uppercase' as const,
  },
  headingWrap: { overflow: 'hidden', marginBottom: 6 },
  h1Line: {
    fontSize: 'clamp(52px, 6vw, 96px)',
    fontWeight: 800,
    lineHeight: 0.92,
    color: '#fff',
    display: 'block',
  },
  h1Accent: {
    fontSize: 'clamp(52px, 6vw, 96px)',
    fontWeight: 800,
    lineHeight: 0.92,
    background: 'linear-gradient(135deg, #E8A87C 0%, #f0c49a 40%, #d4784a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'block',
  },
  subtext: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 1.8,
    maxWidth: 380,
    marginTop: 32,
    marginBottom: 52,
    letterSpacing: '0.02em',
  },
  ctaRow: { display: 'flex', alignItems: 'center', gap: 28 },
  ctaPrimary: {
    padding: '16px 36px',
    background: '#E8A87C',
    color: '#0a0600',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Syne', sans-serif",
    textDecoration: 'none',
    display: 'inline-block',
  },
  ctaSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 12,
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontFamily: "'Syne', sans-serif",
  },
  rightCol: {
    position: 'relative' as const,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasWrap: {
    position: 'relative' as const,
    width: '100%',
    height: '80vh',
  },
  cornerTag: {
    position: 'absolute' as const,
    fontSize: 9,
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.15)',
    textTransform: 'uppercase' as const,
  },
  statsRow: {
    position: 'absolute' as const,
    bottom: 60, left: 60, right: 60,
    display: 'flex',
    gap: 60,
    zIndex: 3,
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: 32,
  },
  statItem: { display: 'flex', flexDirection: 'column' as const, gap: 6 },
  statNum: { fontSize: 32, fontWeight: 800, color: '#fff', lineHeight: 1 },
  statLabel: {
    fontSize: 11,
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.25)',
    textTransform: 'uppercase' as const,
  },
  scrollIndicator: {
    position: 'absolute' as const,
    right: 60,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 8,
    zIndex: 3,
  },
  scrollLine: {
    width: 1, height: 60,
    background: 'linear-gradient(to bottom, rgba(232,168,124,0.6), transparent)',
  },
  scrollText: {
    fontSize: 9,
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.2)',
    textTransform: 'uppercase' as const,
    writingMode: 'vertical-rl' as const,
  },
};

// ─── THREE VIEWER ─────────────────────────────────────────────────────────────
const ThreeViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    let animId = 0;
    let isMounted = true;

    const scene = new THREE.Scene();
    const W = el.clientWidth;
    const H = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000);
    camera.position.set(0, 0.8, 4.5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xe8a87c, 3);
    key.position.set(2, 4, 3);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7850c8, 2);
    rim.position.set(-3, 2, -2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(0, -2, 3);
    scene.add(fill);

    // Placeholder
    const mat = new THREE.MeshStandardMaterial({
      color: 0xe8a87c, roughness: 0.3, metalness: 0.1,
      emissive: 0xe8a87c, emissiveIntensity: 0.05,
    });
    const placeholder = new THREE.Group();
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.8, 8, 16), mat);
    torso.position.y = 0.7;
    const headM = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), mat);
    headM.position.y = 1.42;
    placeholder.add(torso, headM);
    scene.add(placeholder);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshStandardMaterial({ color: 0xe8a87c, transparent: true, opacity: 0.04 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Particles
    const count = 100;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = Math.random() * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xe8a87c, size: 0.012, transparent: true, opacity: 0.35 })
    );
    scene.add(particles);

    // Load model
    let mixer: THREE.AnimationMixer | null = null;
    let model: THREE.Group | null = null;

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    loader.load(
      'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
      (gltf: GLTF) => {
        if (!isMounted) return;
        scene.remove(placeholder);
        model = gltf.scene as THREE.Group;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) child.castShadow = true;
        });
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.set(-center.x, -box.min.y, -center.z);
        scene.add(model);
        const h = size.y;
        camera.position.set(0, h * 0.45, h * 1.8);
        camera.lookAt(0, h * 0.45, 0);
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const clip =
            THREE.AnimationClip.findByName(gltf.animations, 'Wave') ||
            THREE.AnimationClip.findByName(gltf.animations, 'Dance') ||
            gltf.animations[0];
          mixer.clipAction(clip).play();
        }
      },
      undefined,
      (err: unknown) => console.error('Model load error:', err)
    );

    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      mixer?.update(delta);
      const active = model ?? placeholder;
      active.rotation.y = elapsed * 0.25;
      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < arr.length; i += 3) {
        arr[i] += 0.003;
        if (arr[i] > 4) arr[i] = 0;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      draco.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 500, damping: 30 });
  const sy = useSpring(cy, { stiffness: 500, damping: 30 });
  const rx = useSpring(cx, { stiffness: 150, damping: 20 });
  const ry = useSpring(cy, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { cx.set(e.clientX - 6); cy.set(e.clientY - 6); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cx, cy]);

  return (
    <>
      <motion.div style={{ ...S.cursor, x: sx, y: sy }} />
      <motion.div style={{ ...S.cursorRing, x: rx, y: ry, translateX: -14, translateY: -14 }} />
    </>
  );
};

// ─── COUNTER ──────────────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = to / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setCount(to); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [to]);
  return <span>{count}{suffix}</span>;
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scanY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.12 } },
  };
  const slideUp: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
  };
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #020207; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .nl:hover { color: rgba(232,168,124,0.9) !important; }
        .cp:hover  { background: #f0c49a !important; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          /* Hide custom cursor on touch devices */
          body { cursor: auto !important; }

          /* Nav */
          .main-nav {
            padding: 18px 20px !important;
          }
          .main-nav-logo {
            font-size: 11px !important;
            letter-spacing: 0.2em !important;
          }
          .main-nav-links {
            display: none !important;
          }
          .main-nav-status {
            display: none !important;
          }

          /* Hero: stack columns */
          .main-hero {
            grid-template-columns: 1fr !important;
            padding: 0 20px !important;
            padding-top: 90px !important;
            min-height: auto !important;
            padding-bottom: 280px !important;
          }

          /* Left col */
          .main-left-col {
            align-items: flex-start;
          }
          .main-status-badge {
            margin-bottom: 24px !important;
          }
          .main-heading-wrap {
            margin-bottom: 4px !important;
          }
          .main-subtext {
            font-size: 13px !important;
            margin-top: 20px !important;
            margin-bottom: 36px !important;
            max-width: 100% !important;
          }
          .main-cta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .main-cta-primary {
            padding: 14px 28px !important;
            font-size: 11px !important;
          }

          /* Right col: 3D viewer below text */
          .main-right-col {
            height: 280px !important;
            position: relative !important;
            margin-top: 32px !important;
          }
          .main-canvas-wrap {
            height: 100% !important;
          }
          .main-orbit-ring {
            display: none !important;
          }

          /* Scroll indicator: hide on mobile */
          .main-scroll-indicator {
            display: none !important;
          }

          /* Stats row: make it static, not absolute */
          .main-stats-row {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 0 20px !important;
            padding: 24px 0 40px !important;
            flex-wrap: wrap !important;
            gap: 24px !important;
          }
          .main-stat-num {
            font-size: 24px !important;
          }
          .main-stat-social {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .main-nav {
            padding: 16px 16px !important;
          }
          .main-hero {
            padding: 0 16px !important;
            padding-top: 80px !important;
            padding-bottom: 240px !important;
          }
          .main-stats-row {
            margin: 0 16px !important;
          }
        }
      `}</style>

      <CustomCursor />

      <motion.div
        ref={containerRef}
        style={S.root}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div style={S.noise} />
        <div style={S.gridOverlay} />
        <div style={S.orb1} />
        <div style={S.orb2} />
        <motion.div style={{ ...S.scanline, top: scanY }} />

        {/* ── NAV ── */}
        <motion.nav style={S.nav} variants={fadeIn} className="main-nav">
          <Link to="/" style={S.navLogo} className="nl main-nav-logo">Portfolio</Link>

          <ul style={S.navLinks} className="main-nav-links">
            {NAV_ITEMS.map(({ label, path }) => (
              <li key={label}>
                <Link to={path} style={S.navLink} className="nl">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="main-nav-status">
            <div style={{ ...S.statusDot, animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}>
              AVAILABLE FOR HIRE
            </span>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section style={S.hero} className="main-hero">
          <div style={S.leftCol} className="main-left-col">
            <motion.div variants={slideUp}>
              <div style={S.statusBadge} className="main-status-badge">
                <div style={S.statusDot} />
                <span style={S.statusText}>Creative Developer</span>
              </div>
            </motion.div>

            <motion.div variants={slideUp}>
              <div style={S.headingWrap} className="main-heading-wrap"><span style={S.h1Line}>Crafting</span></div>
              <div style={S.headingWrap} className="main-heading-wrap"><span style={S.h1Accent}>Digital</span></div>
              <div style={S.headingWrap} className="main-heading-wrap"><span style={S.h1Line}>Experiences</span></div>
            </motion.div>

            <motion.p style={S.subtext} variants={slideUp} className="main-subtext">
              Blending code and design to create immersive, interactive experiences
              that live at the edge of what's possible on the web.
            </motion.p>

            <motion.div style={S.ctaRow} variants={slideUp} className="main-cta-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/projects" style={S.ctaPrimary} className="cp main-cta-primary">
                  View My Work
                </Link>
              </motion.div>

              <a
  href="/cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none' }}
>
  <button style={S.ctaSecondary}>
    <span>Download CV</span>
    <motion.span
      animate={{ x: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      →
    </motion.span>
  </button>
</a>

            </motion.div>
          </div>

          {/* 3D Viewer */}
          <motion.div style={S.rightCol} variants={fadeIn} className="main-right-col">
            {[500, 380].map((size, i) => (
              <motion.div
                key={size}
                className="main-orbit-ring"
                style={{
                  position: 'absolute',
                  width: size, height: size,
                  borderRadius: '50%',
                  border: `1px solid rgba(232,168,124,${i === 0 ? 0.07 : 0.05})`,
                }}
                animate={{ rotate: i === 0 ? 360 : -360 }}
                transition={{ duration: i === 0 ? 30 : 20, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            <div style={S.canvasWrap} className="main-canvas-wrap">
              <ThreeViewer />
              <span style={{ ...S.cornerTag, top: 16, left: 16 }}>[ 3D MODEL ]</span>
              <span style={{ ...S.cornerTag, top: 16, right: 16 }}>v1.0</span>
              <span style={{ ...S.cornerTag, bottom: 16, left: 16 }}>INTERACTIVE</span>
              <span style={{ ...S.cornerTag, bottom: 16, right: 16 }}>THREE.JS</span>
              <div style={{
                position: 'absolute', bottom: 0,
                left: '20%', right: '20%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(232,168,124,0.4), transparent)',
              }} />
            </div>
          </motion.div>

          <div style={S.scrollIndicator} className="main-scroll-indicator">
            <div style={S.scrollLine} />
            <span style={S.scrollText}>Scroll</span>
          </div>
        </section>

        {/* ── STATS ── */}
        <motion.div style={S.statsRow} variants={slideUp} className="main-stats-row">
          {[
            { num: 15, suffix: '+',    label: 'Projects Completed' },
            { num: 2,  suffix: ' + yrs', label: 'Experience' },
            { num: 98, suffix: '%',    label: 'Client Satisfaction' },
            { num: 12, suffix: '+',    label: 'Technologies' },
          ].map((s) => (
            <div key={s.label} style={S.statItem}>
              <span style={S.statNum} className="main-stat-num"><Counter to={s.num} suffix={s.suffix} /></span>
              <span style={S.statLabel}>{s.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 24, alignItems: 'center' }} className="main-stat-social">
            {['GitHub', 'LinkedIn', 'Dribbble'].map((s) => (
              <a key={s} href="#" className="nl" style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}>{s}</a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Main;