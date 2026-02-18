import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Work',   path: '/projects' },
  { label: 'About',  path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact',path: '/contact' },
];

const CustomCursor = () => {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 500, damping: 30 });
  const sy = useSpring(cy, { stiffness: 500, damping: 30 });
  const rx = useSpring(cx, { stiffness: 150, damping: 20 });
  const ry = useSpring(cy, { stiffness: 150, damping: 20 });
  useEffect(() => {
    const m = (e: MouseEvent) => { cx.set(e.clientX - 6); cy.set(e.clientY - 6); };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, [cx, cy]);
  return (
    <>
      <motion.div style={{ position:'fixed',top:0,left:0,width:12,height:12,borderRadius:'50%',background:'#E8A87C',pointerEvents:'none',zIndex:9999,mixBlendMode:'difference' as React.CSSProperties['mixBlendMode'],x:sx,y:sy }} />
      <motion.div style={{ position:'fixed',top:0,left:0,width:40,height:40,borderRadius:'50%',border:'1.5px solid rgba(232,168,124,0.5)',pointerEvents:'none',zIndex:9998,x:rx,y:ry,translateX:-14,translateY:-14 }} />
    </>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        className="about-nav"
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 60px',borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'1px solid transparent',backdropFilter:scrolled?'blur(20px)':'none',background:scrolled?'rgba(2,2,7,0.85)':'transparent',transition:'all 0.4s ease' }}
      >
        <Link to="/" style={{ fontSize:13,letterSpacing:'0.3em',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',fontWeight:700,textDecoration:'none',fontFamily:"'Syne',sans-serif" }}>Portfolio</Link>

        <ul className="about-nav-links" style={{ display:'flex',gap:40,listStyle:'none',margin:0,padding:0 }}>
          {NAV_ITEMS.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <li key={label}>
                <Link to={path} className="nav-lnk" style={{ fontSize:11,letterSpacing:'0.25em',color:active?'#E8A87C':'rgba(255,255,255,0.35)',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",position:'relative',paddingBottom:4,transition:'color 0.3s' }}>
                  {label}
                  {active && <motion.div layoutId="nav-ul" style={{ position:'absolute',bottom:-2,left:0,right:0,height:1,background:'#E8A87C' }} />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="about-nav-status" style={{ display:'flex',alignItems:'center',gap:8 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#E8A87C',animation:'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize:11,color:'rgba(255,255,255,0.25)',letterSpacing:'0.15em',fontFamily:"'Syne',sans-serif" }}>AVAILABLE FOR HIRE</span>
        </div>

        {/* Hamburger */}
        <button
          className="about-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display:'none',flexDirection:'column',gap:5,background:'none',border:'none',cursor:'pointer',padding:4 }}
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 9 : 0 }}
            style={{ display:'block',width:22,height:1.5,background:'rgba(255,255,255,0.6)',transformOrigin:'center' }} />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }}
            style={{ display:'block',width:22,height:1.5,background:'rgba(255,255,255,0.6)' }} />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -9 : 0 }}
            style={{ display:'block',width:22,height:1.5,background:'rgba(255,255,255,0.6)',transformOrigin:'center' }} />
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity:0,y:-16 }}
          animate={{ opacity:1,y:0 }}
          exit={{ opacity:0,y:-16 }}
          style={{ position:'fixed',top:65,left:0,right:0,zIndex:99,background:'rgba(2,2,7,0.97)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'20px 20px 28px',display:'flex',flexDirection:'column',gap:4 }}
        >
          {NAV_ITEMS.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <Link key={label} to={path} onClick={() => setMobileOpen(false)}
                style={{ fontSize:13,letterSpacing:'0.25em',color:active?'#E8A87C':'rgba(255,255,255,0.5)',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',display:'block' }}>
                {label}
              </Link>
            );
          })}
          <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:16 }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#E8A87C',animation:'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize:10,color:'rgba(255,255,255,0.25)',letterSpacing:'0.15em',fontFamily:"'Syne',sans-serif" }}>AVAILABLE FOR HIRE</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

// ─── CANVAS BACKGROUND ────────────────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,168,124,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed',inset:0,pointerEvents:'none',zIndex:0 }} />;
};

// ─── TYPED TEXT ───────────────────────────────────────────────────────────────
const TypedText = ({ words }: { words: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1200);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((idx + 1) % words.length); }
      }
    }, deleting ? 50 : 90);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);
  return (
    <span style={{ color: '#E8A87C' }}>
      {text}<span style={{ animation: 'blink 1s step-end infinite', opacity: 1 }}>|</span>
    </span>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ num, label, delay }: { num: string; label: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(num);
  useEffect(() => {
    let v = 0;
    const step = target / 50;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16,1,0.3,1] }}
      whileHover={{ y: -4, borderColor: 'rgba(232,168,124,0.3)' }}
      className="about-stat-card"
      style={{ padding:'28px 32px',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',flex:1,transition:'border-color 0.3s' }}
    >
      <div style={{ fontSize:36,fontWeight:800,color:'#fff',lineHeight:1,fontFamily:"'Syne',sans-serif" }}>{isNaN(target) ? num : count}{isNaN(target)?'':num.replace(/[0-9]/g,'')}</div>
      <div style={{ fontSize:10,letterSpacing:'0.2em',color:'rgba(255,255,255,0.25)',textTransform:'uppercase',marginTop:6,fontFamily:"'Syne',sans-serif" }}>{label}</div>
    </motion.div>
  );
};

// ─── TIMELINE ITEM ────────────────────────────────────────────────────────────
const TimelineItem = ({ year, title, sub, delay }: { year: string; title: string; sub: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.16,1,0.3,1] }}
    style={{ display:'flex',gap:24,paddingBottom:32,position:'relative' }}
  >
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0 }}>
      <div style={{ width:10,height:10,borderRadius:'50%',background:'#E8A87C',border:'2px solid #020207',boxShadow:'0 0 12px rgba(232,168,124,0.5)',marginTop:4 }} />
      <div style={{ width:1,flex:1,background:'rgba(232,168,124,0.15)',marginTop:6 }} />
    </div>
    <div>
      <span style={{ fontSize:10,letterSpacing:'0.25em',color:'rgba(232,168,124,0.6)',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>{year}</span>
      <div style={{ fontSize:15,fontWeight:700,color:'#fff',marginTop:4,fontFamily:"'Syne',sans-serif" }}>{title}</div>
      <div style={{ fontSize:12,color:'rgba(255,255,255,0.3)',marginTop:4,lineHeight:1.6 }}>{sub}</div>
    </div>
  </motion.div>
);

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const skills = ['JavaScript','TypeScript','Python','Java','HTML/CSS','SQL','React','Node.js'];

  const slideUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.7, ease: [0.16,1,0.3,1] } }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html,body{margin:0;padding:0;background:#020207;cursor:none;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .nav-lnk:hover{color:rgba(232,168,124,0.9)!important;}
        .skill-pill:hover{background:rgba(232,168,124,0.12)!important;border-color:rgba(232,168,124,0.4)!important;color:#E8A87C!important;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#020207;}
        ::-webkit-scrollbar-thumb{background:rgba(232,168,124,0.3);border-radius:2px;}

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          body { cursor: auto !important; }

          /* Nav */
          .about-nav { padding: 18px 20px !important; }
          .about-nav-links { display: none !important; }
          .about-nav-status { display: none !important; }
          .about-hamburger { display: flex !important; }

          /* Hero row: single column */
          .about-hero-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 32px 20px 0 !important;
            min-height: auto !important;
          }

          /* Avatar section: shrink and center */
          .about-avatar-col {
            height: 320px !important;
            order: -1;
          }
          .about-avatar-rings {
            display: none !important;
          }
          .about-avatar-img {
            width: 180px !important;
            height: 180px !important;
          }
          .about-float-badge {
            display: none !important;
          }

          /* CTA row: stack */
          .about-cta-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .about-cta-row a {
            text-align: center !important;
          }

          /* Stats: 2x2 grid */
          .about-stats-wrap {
            padding: 32px 20px 0 !important;
          }
          .about-stats-row {
            flex-wrap: wrap !important;
            gap: 1px !important;
          }
          .about-stat-card {
            flex: 1 1 calc(50% - 1px) !important;
            padding: 20px 20px !important;
            min-width: 0 !important;
          }
          .about-stat-card div:first-child {
            font-size: 28px !important;
          }

          /* Two-col section: stack */
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
            padding: 52px 20px 80px !important;
          }
        }

        @media (max-width: 480px) {
          .about-nav { padding: 16px 16px !important; }
          .about-hero-row { padding: 24px 16px 0 !important; }
          .about-stats-wrap { padding: 28px 16px 0 !important; }
          .about-two-col { padding: 40px 16px 60px !important; }
        }
      `}</style>

      <CustomCursor />
      <ParticleCanvas />
      <Navbar />

      <div style={{ minHeight:'100vh',background:'#020207',fontFamily:"'Syne',sans-serif",paddingTop:100,position:'relative',zIndex:1 }}>

        {/* ── HERO ROW ── */}
        <div
          className="about-hero-row"
          style={{ maxWidth:1200,margin:'0 auto',padding:'60px 60px 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',minHeight:'80vh' }}
        >
          {/* LEFT — identity */}
          <div>
            <motion.div custom={0.1} variants={slideUp} initial="hidden" animate="visible"
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',border:'1px solid rgba(232,168,124,0.25)',background:'rgba(232,168,124,0.05)',marginBottom:32 }}>
              <div style={{ width:5,height:5,borderRadius:'50%',background:'#E8A87C',animation:'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize:10,letterSpacing:'0.3em',color:'rgba(232,168,124,0.8)',textTransform:'uppercase' }}>Full Stack Developer</span>
            </motion.div>

            <motion.h1 custom={0.2} variants={slideUp} initial="hidden" animate="visible"
              style={{ fontSize:'clamp(40px,5vw,72px)',fontWeight:800,margin:'0 0 8px',lineHeight:0.95,color:'#fff' }}>
              Josaiah L.
            </motion.h1>
            <motion.h1 custom={0.3} variants={slideUp} initial="hidden" animate="visible"
              style={{ fontSize:'clamp(40px,5vw,72px)',fontWeight:800,margin:'0 0 28px',lineHeight:0.95,background:'linear-gradient(135deg,#E8A87C,#f0c49a,#d4784a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Borres
            </motion.h1>

            <motion.div custom={0.4} variants={slideUp} initial="hidden" animate="visible"
              style={{ fontSize:18,color:'rgba(255,255,255,0.5)',marginBottom:32,fontWeight:400 }}>
              I build{' '}
              <TypedText words={['web applications.','mobile apps.','AI systems.','game experiences.']} />
            </motion.div>

            <motion.p custom={0.5} variants={slideUp} initial="hidden" animate="visible"
              style={{ fontSize:14,color:'rgba(255,255,255,0.35)',lineHeight:1.9,maxWidth:460,marginBottom:28 }}>
              I'm a passionate full-stack developer with a love for creating elegant solutions
              to complex problems. I specialize in building responsive, user-friendly applications
              that make a real difference — from web platforms to AI-powered systems.
            </motion.p>

            <motion.p custom={0.55} variants={slideUp} initial="hidden" animate="visible"
              style={{ fontSize:14,color:'rgba(255,255,255,0.25)',lineHeight:1.9,maxWidth:460,marginBottom:40 }}>
              When I'm not coding, you'll find me exploring new tech, contributing to open-source,
              or sharing knowledge with the dev community.
            </motion.p>

            <motion.div custom={0.6} variants={slideUp} initial="hidden" animate="visible"
              className="about-cta-row"
              style={{ display:'flex',gap:12 }}>
              <Link to="/projects"
                style={{ padding:'13px 32px',background:'#E8A87C',color:'#0a0600',fontSize:11,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",display:'inline-block' }}>
                View Work
              </Link>
              <a href="/contact"
                style={{ padding:'13px 32px',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",display:'inline-block',transition:'border-color 0.3s' }}>
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* RIGHT — avatar */}
          <motion.div
            className="about-avatar-col"
            initial={{ opacity:0,scale:0.9 }}
            animate={{ opacity:1,scale:1 }}
            transition={{ delay:0.3,duration:0.8,ease:[0.16,1,0.3,1] }}
            style={{ position:'relative',display:'flex',alignItems:'center',justifyContent:'center',height:480 }}
          >
            <motion.div className="about-avatar-rings" animate={{ rotate:360 }} transition={{ duration:20,repeat:Infinity,ease:'linear' }}
              style={{ position:'absolute',width:420,height:420,borderRadius:'50%',border:'1px solid rgba(232,168,124,0.08)' }} />
            <motion.div className="about-avatar-rings" animate={{ rotate:-360 }} transition={{ duration:15,repeat:Infinity,ease:'linear' }}
              style={{ position:'absolute',width:320,height:320,borderRadius:'50%',border:'1px solid rgba(232,168,124,0.05)' }} />
            <div style={{ position:'absolute',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,124,0.15) 0%,transparent 70%)' }} />

            <motion.div
              className="about-avatar-img"
              style={{ position:'relative',width:240,height:240,borderRadius:'50%',overflow:'hidden',border:'2px solid rgba(232,168,124,0.2)',boxShadow:'0 0 60px rgba(232,168,124,0.12)',animation:'float 4s ease-in-out infinite' }}>
              <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                alt="Coding"
                style={{ width:'100%',height:'100%',objectFit:'cover' }} />
              <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(232,168,124,0.15),transparent 60%)' }} />
            </motion.div>

            {[
              { label:'React',  top:'8%',  left:'2%',  delay:0.6 },
              { label:'Python', top:'12%', right:'0%', delay:0.7 },
              { label:'AI/ML',  bottom:'18%',left:'0%',delay:0.8 },
              { label:'Unity',  bottom:'12%',right:'2%',delay:0.9 },
            ].map(({ label, delay, ...pos }) => (
              <motion.div key={label}
                className="about-float-badge"
                initial={{ opacity:0,scale:0 }}
                animate={{ opacity:1,scale:1 }}
                transition={{ delay,type:'spring',stiffness:200 }}
                style={{ position:'absolute',...pos,padding:'6px 14px',border:'1px solid rgba(232,168,124,0.25)',background:'rgba(2,2,7,0.9)',backdropFilter:'blur(8px)',fontSize:10,letterSpacing:'0.15em',color:'rgba(232,168,124,0.8)',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── STATS ── */}
        <div className="about-stats-wrap" style={{ maxWidth:1200,margin:'0 auto',padding:'60px 60px 0' }}>
          <div className="about-stats-row" style={{ display:'flex',gap:1,borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:48 }}>
            {[
              { num:'7+',  label:'Projects Built' },
              { num:'5',   label:'Cert. Courses' },
              { num:'3',   label:'Years Learning' },
              { num:'10+', label:'Technologies' },
            ].map((s,i) => <StatCard key={s.label} num={s.num} label={s.label} delay={0.1*i+0.3} />)}
          </div>
        </div>

        {/* ── TWO-COL: TIMELINE + SKILLS ── */}
        <div
          className="about-two-col"
          style={{ maxWidth:1200,margin:'0 auto',padding:'80px 60px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80 }}
        >
          {/* Timeline */}
          <div>
            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
              style={{ marginBottom:36 }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:6 }}>
                <div style={{ width:24,height:1,background:'#E8A87C' }} />
                <span style={{ fontSize:10,letterSpacing:'0.3em',color:'rgba(232,168,124,0.6)',textTransform:'uppercase' }}>Timeline</span>
              </div>
              <h2 style={{ fontSize:24,fontWeight:800,color:'#fff',margin:0 }}>My Journey</h2>
            </motion.div>

            {[
              { year:'2025',title:'Capstone: Tagpuan',sub:'Built a full agricultural marketplace with Firebase, Maps API, and data analytics.', delay:0.3 },
              { year:'2024',title:'AI & Computer Vision',sub:'Developed helmet detection and WOAH game using TensorFlow, YOLO, and OpenCV.', delay:0.4 },
              { year:'2023',title:'Game Development',sub:'Created Push Guys — a 3D physics-based block puzzle game in Unity with C#.', delay:0.5 },
              { year:'2022',title:'Started CS Degree',sub:'Began Bachelor of Science in Computer Science, diving into web, mobile, and algorithms.', delay:0.6 },
            ].map(item => <TimelineItem key={item.year} {...item} />)}
          </div>

          {/* Skills + Courses */}
          <div>
            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
              style={{ marginBottom:36 }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:6 }}>
                <div style={{ width:24,height:1,background:'#E8A87C' }} />
                <span style={{ fontSize:10,letterSpacing:'0.3em',color:'rgba(232,168,124,0.6)',textTransform:'uppercase' }}>Arsenal</span>
              </div>
              <h2 style={{ fontSize:24,fontWeight:800,color:'#fff',margin:0 }}>Languages & Tools</h2>
            </motion.div>

            <div style={{ display:'flex',flexWrap:'wrap',gap:8,marginBottom:52 }}>
              {skills.map((s,i) => (
                <motion.span key={s}
                  className="skill-pill"
                  initial={{ opacity:0,scale:0.8 }}
                  animate={{ opacity:1,scale:1 }}
                  transition={{ delay:0.3+i*0.06,type:'spring',stiffness:200 }}
                  whileHover={{ y:-3 }}
                  style={{ padding:'8px 18px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.03)',color:'rgba(255,255,255,0.5)',fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",cursor:'default',transition:'all 0.2s' }}>
                  {s}
                </motion.span>
              ))}
            </div>

            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}
              style={{ marginBottom:24 }}>
              <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:6 }}>
                <div style={{ width:24,height:1,background:'#E8A87C' }} />
                <span style={{ fontSize:10,letterSpacing:'0.3em',color:'rgba(232,168,124,0.6)',textTransform:'uppercase' }}>Education</span>
              </div>
              <h2 style={{ fontSize:24,fontWeight:800,color:'#fff',margin:0 }}>Courses Taken</h2>
            </motion.div>

            {[
              'Web Development Bootcamp',
              'Advanced React & Redux',
              'Data Structures & Algorithms',
              'Cloud Computing with AWS',
              'Mobile App Development',
            ].map((c, i) => (
              <motion.div key={c}
                initial={{ opacity:0,x:-20 }}
                animate={{ opacity:1,x:0 }}
                transition={{ delay:0.5+i*0.08 }}
                whileHover={{ x:8,color:'#E8A87C' }}
                style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.4)',fontSize:13,letterSpacing:'0.05em',cursor:'default',transition:'color 0.2s' }}>
                <span style={{ fontSize:9,color:'rgba(232,168,124,0.5)',letterSpacing:'0.2em',fontFamily:"'Syne',sans-serif",flexShrink:0 }}>0{i+1}</span>
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;