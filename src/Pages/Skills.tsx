import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from 'framer-motion';
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
        initial={{ y:-80,opacity:0 }}
        animate={{ y:0,opacity:1 }}
        transition={{ duration:0.6,ease:[0.16,1,0.3,1] }}
        className="skills-nav"
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 60px',borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'1px solid transparent',backdropFilter:scrolled?'blur(20px)':'none',background:scrolled?'rgba(2,2,7,0.85)':'transparent',transition:'all 0.4s ease' }}
      >
        <Link to="/" style={{ fontSize:13,letterSpacing:'0.3em',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',fontWeight:700,textDecoration:'none',fontFamily:"'Syne',sans-serif" }}>Portfolio</Link>

        <ul className="skills-nav-links" style={{ display:'flex',gap:40,listStyle:'none',margin:0,padding:0 }}>
          {NAV_ITEMS.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <li key={label}>
                <Link to={path} className="nav-lnk-s" style={{ fontSize:11,letterSpacing:'0.25em',color:active?'#E8A87C':'rgba(255,255,255,0.35)',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",position:'relative',paddingBottom:4,transition:'color 0.3s' }}>
                  {label}
                  {active && <motion.div layoutId="nav-ul-s" style={{ position:'absolute',bottom:-2,left:0,right:0,height:1,background:'#E8A87C' }} />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="skills-nav-status" style={{ display:'flex',alignItems:'center',gap:8 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#E8A87C',animation:'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize:11,color:'rgba(255,255,255,0.25)',letterSpacing:'0.15em',fontFamily:"'Syne',sans-serif" }}>AVAILABLE FOR HIRE</span>
        </div>

        {/* Hamburger */}
        <button
          className="skills-hamburger"
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

// ─── DATA ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  category: string;
  level: number;
  description: string;
  experience: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name:'React',        category:'Frontend',   level:90, description:'Component-based UI library for building interactive web applications with hooks and state management.',  experience:'2 years', color:'#61DAFB' },
  { name:'TypeScript',   category:'Language',   level:82, description:'Strongly-typed JavaScript superset that improves code quality and developer experience.',                experience:'2 years', color:'#3178C6' },
  { name:'Python',       category:'Language',   level:85, description:'Versatile high-level language used for AI/ML, scripting, backend services, and data analysis.',        experience:'2 years', color:'#F7D44C' },
  { name:'JavaScript',   category:'Language',   level:88, description:'The language of the web — used across frontend, backend (Node.js), and mobile (React Native).',       experience:'2 years', color:'#F7DF1E' },
  { name:'Node.js',      category:'Backend',    level:78, description:'JavaScript runtime for building scalable server-side applications and REST APIs.',                     experience:'2 years', color:'#68A063' },
  { name:'SQL',          category:'Database',   level:80, description:'Structured Query Language for managing relational databases and complex queries.',                    experience:'2 years', color:'#E8A87C' },
  { name:'React Native', category:'Mobile',     level:75, description:'Cross-platform mobile framework using React for building native iOS and Android apps.',               experience:'2 years', color:'#61DAFB' },
  { name:'TensorFlow',   category:'AI / ML',    level:72, description:'Open-source ML framework used for building neural networks, image classifiers, and YOLO models.',    experience:'1 year',  color:'#FF6F00' },
  { name:'OpenCV',       category:'AI / ML',    level:70, description:'Computer vision library used for image processing, object detection, and real-time video analysis.', experience:'1 year',  color:'#5C3EE8' },
  { name:'Unity',        category:'Game Dev',   level:74, description:'Cross-platform game engine used to build 3D and 2D games with C# scripting and physics.',            experience:'1 year',  color:'#AAAAAA' },
  { name:'C#',           category:'Language',   level:72, description:'Object-oriented language primarily used with Unity and .NET for building robust applications.',       experience:'1 year',  color:'#9B4993' },
  { name:'Figma',        category:'Design',     level:80, description:'Collaborative interface design tool for creating UI/UX wireframes, prototypes, and design systems.',  experience:'2 years', color:'#F24E1E' },
  { name:'Firebase',     category:'Backend',    level:78, description:'Googles BaaS platform providing auth, real-time database, Firestore, and cloud functions.',         experience:'2 years', color:'#FFCA28' },
  { name:'PHP',          category:'Backend',    level:65, description:'Server-side scripting language widely used for web development and CMS platforms.',                  experience:'1 year',  color:'#777BB4' },
  { name:'C++',          category:'Language',   level:68, description:'Systems-level language with fine-grained memory control, used in games, OS, and embedded systems.',  experience:'1 year',  color:'#00599C' },
];

const CATEGORIES = ['All', ...Array.from(new Set(SKILLS.map(s => s.category)))];

const CAT_COLOR: Record<string, string> = {
  'Frontend':'#61DAFB', 'Language':'#E8A87C', 'Backend':'#68A063',
  'Database':'#F7D44C', 'Mobile':'#a78bfa', 'AI / ML':'#f472b6',
  'Game Dev':'#34d399', 'Design':'#F24E1E',
};

// ─── SKILL CARD ───────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index, onClick }: { skill: Skill; index: number; onClick: () => void }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity:0, y:40, scale:0.9 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay: index * 0.05, duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ perspective:800, height:160, cursor:'pointer' }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
        style={{ width:'100%',height:'100%',position:'relative',transformStyle:'preserve-3d' }}
      >
        {/* FRONT */}
        <div style={{ position:'absolute',inset:0,backfaceVisibility:'hidden',background:'rgba(255,255,255,0.02)',border:`1px solid rgba(255,255,255,0.07)`,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:20 }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
            <span style={{ fontSize:9,letterSpacing:'0.25em',color:CAT_COLOR[skill.category]??'#E8A87C',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>
              {skill.category}
            </span>
            <span style={{ fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.1em',fontFamily:"'Syne',sans-serif" }}>
              {skill.experience}
            </span>
          </div>
          <div style={{ fontSize:18,fontWeight:800,color:'#fff',fontFamily:"'Syne',sans-serif" }}>{skill.name}</div>
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
              <span style={{ fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>Proficiency</span>
              <span style={{ fontSize:9,color:skill.color,fontFamily:"'Syne',sans-serif",fontWeight:700 }}>{skill.level}%</span>
            </div>
            <div style={{ height:2,background:'rgba(255,255,255,0.07)',overflow:'hidden' }}>
              <motion.div
                initial={{ width:0 }}
                animate={{ width:`${skill.level}%` }}
                transition={{ delay:index*0.05+0.3,duration:0.8,ease:[0.16,1,0.3,1] }}
                style={{ height:'100%',background:skill.color,boxShadow:`0 0 8px ${skill.color}60` }}
              />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div style={{ position:'absolute',inset:0,backfaceVisibility:'hidden',transform:'rotateY(180deg)',background:`linear-gradient(135deg,${skill.color}18,rgba(2,2,7,0.9))`,border:`1px solid ${skill.color}30`,display:'flex',flexDirection:'column',justifyContent:'center',padding:20,gap:12 }}>
          <div style={{ fontSize:14,fontWeight:800,color:'#fff',fontFamily:"'Syne',sans-serif" }}>{skill.name}</div>
          <p style={{ fontSize:11,color:'rgba(255,255,255,0.4)',lineHeight:1.7,margin:0 }}>{skill.description}</p>
          <span style={{ fontSize:9,color:skill.color,letterSpacing:'0.2em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>Click to expand →</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── RADAR CHART ─────────────────────────────────────────────────────────────
const RadarChart = ({ skills }: { skills: Skill[] }) => {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const top5 = skills.slice(0, 6);
  const count = top5.length;

  const getPoint = (i: number, pct: number) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const dist = (pct / 100) * r;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  };

  const webPath = top5.map((s, i) => {
    const { x, y } = getPoint(i, s.level);
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ') + ' Z';

  return (
    <svg width={size} height={size} style={{ overflow:'visible' }}>
      {[25,50,75,100].map(pct => (
        <polygon key={pct}
          points={top5.map((_, i) => { const { x, y } = getPoint(i, pct); return `${x},${y}`; }).join(' ')}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1}
        />
      ))}
      {top5.map((_, i) => {
        const { x, y } = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
      })}
      <motion.path d={webPath} fill="rgba(232,168,124,0.12)" stroke="#E8A87C" strokeWidth={2}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5,duration:0.6 }} />
      {top5.map((s, i) => {
        const { x, y } = getPoint(i, s.level);
        return <motion.circle key={i} cx={x} cy={y} r={4} fill="#E8A87C" initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.6+i*0.06 }} />;
      })}
      {top5.map((s, i) => {
        const { x, y } = getPoint(i, 120);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize={10} fill="rgba(255,255,255,0.4)" fontFamily="'Syne',sans-serif" letterSpacing="0.1em">
            {s.name}
          </text>
        );
      })}
    </svg>
  );
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
const SkillModal = ({ skill, onClose }: { skill: Skill; onClose: () => void }) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed',inset:0,zIndex:500,background:'rgba(2,2,7,0.9)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,overflowY:'auto' }}>
      <motion.div
        initial={{ opacity:0,y:60,scale:0.9 }}
        animate={{ opacity:1,y:0,scale:1 }}
        exit={{ opacity:0,y:40,scale:0.94 }}
        transition={{ type:'spring',stiffness:300,damping:30 }}
        onClick={e => e.stopPropagation()}
        className="skills-modal-inner"
        style={{ background:'#0c0c14',border:`1px solid ${skill.color}30`,maxWidth:440,width:'100%',padding:40,position:'relative' }}
      >
        <motion.button onClick={onClose} whileHover={{ rotate:90,scale:1.1 }} whileTap={{ scale:0.9 }}
          style={{ position:'absolute',top:16,right:16,width:32,height:32,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.15)',background:'rgba(255,255,255,0.05)',color:'#fff',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>
          ×
        </motion.button>

        <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
          <div style={{ width:8,height:8,borderRadius:'50%',background:skill.color,boxShadow:`0 0 12px ${skill.color}` }} />
          <span style={{ fontSize:10,letterSpacing:'0.25em',color:skill.color,textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>{skill.category}</span>
        </div>

        <h2 style={{ fontSize:32,fontWeight:800,color:'#fff',margin:'0 0 8px',fontFamily:"'Syne',sans-serif" }}>{skill.name}</h2>
        <p style={{ fontSize:13,color:'rgba(255,255,255,0.4)',lineHeight:1.8,marginBottom:28 }}>{skill.description}</p>

        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
            <span style={{ fontSize:10,color:'rgba(255,255,255,0.25)',letterSpacing:'0.2em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>Proficiency</span>
            <span style={{ fontSize:12,color:skill.color,fontWeight:700,fontFamily:"'Syne',sans-serif" }}>{skill.level}%</span>
          </div>
          <div style={{ height:3,background:'rgba(255,255,255,0.07)',overflow:'hidden' }}>
            <motion.div initial={{ width:0 }} animate={{ width:`${skill.level}%` }} transition={{ delay:0.2,duration:0.8,ease:[0.16,1,0.3,1] }}
              style={{ height:'100%',background:`linear-gradient(90deg,${skill.color},${skill.color}90)`,boxShadow:`0 0 12px ${skill.color}60` }} />
          </div>
        </div>

        <div style={{ display:'flex',gap:12 }}>
          <div style={{ flex:1,padding:'14px 16px',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",marginBottom:4 }}>Experience</div>
            <div style={{ fontSize:14,fontWeight:700,color:'#fff',fontFamily:"'Syne',sans-serif" }}>{skill.experience}</div>
          </div>
          <div style={{ flex:1,padding:'14px 16px',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize:9,color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",marginBottom:4 }}>Level</div>
            <div style={{ fontSize:14,fontWeight:700,color:skill.color,fontFamily:"'Syne',sans-serif" }}>{skill.level >= 85 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Learning'}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── SKILLS PAGE ─────────────────────────────────────────────────────────────
const Skills: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filtered = selectedCat === 'All' ? SKILLS : SKILLS.filter(s => s.category === selectedCat);

  const slideUp: Variants = {
    hidden: { opacity:0,y:30 },
    visible: (d:number) => ({ opacity:1,y:0,transition:{ delay:d,duration:0.6,ease:[0.16,1,0.3,1] } }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html,body{margin:0;padding:0;background:#020207;cursor:none;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .nav-lnk-s:hover{color:rgba(232,168,124,0.9)!important;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#020207;}
        ::-webkit-scrollbar-thumb{background:rgba(232,168,124,0.3);border-radius:2px;}

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          body { cursor: auto !important; }

          /* Nav */
          .skills-nav { padding: 18px 20px !important; }
          .skills-nav-links { display: none !important; }
          .skills-nav-status { display: none !important; }
          .skills-hamburger { display: flex !important; }

          /* Page container */
          .skills-page-container { padding: 40px 20px 80px !important; }

          /* Header */
          .skills-header { margin-bottom: 40px !important; }

          /* Two-col layout: stack */
          .skills-two-col {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          /* Left col: filters + cards */
          .skills-left { order: 1; }

          /* Filter pills: horizontal scroll */
          .skills-filters {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            margin-bottom: 28px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .skills-filters::-webkit-scrollbar { display: none; }
          .skills-filter-btn {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }

          /* Cards grid: 2 columns on mobile (cards are compact enough) */
          .skills-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }

          /* Right col: panels below cards */
          .skills-right {
            order: 2;
            position: static !important;
            top: auto !important;
            margin-top: 40px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }

          /* Radar chart: center and scale down slightly */
          .skills-radar-wrap {
            padding: 20px !important;
          }
          .skills-radar-wrap svg {
            max-width: 100%;
          }

          /* Modal: full-width with smaller padding */
          .skills-modal-inner {
            padding: 28px 20px 32px !important;
            max-width: 100% !important;
          }
          .skills-modal-inner h2 {
            font-size: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .skills-nav { padding: 16px 16px !important; }
          .skills-page-container { padding: 32px 16px 60px !important; }

          /* On very small screens, single column cards */
          .skills-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <CustomCursor />
      <Navbar />

      <div style={{ minHeight:'100vh',background:'#020207',fontFamily:"'Syne',sans-serif",paddingTop:100,position:'relative',overflow:'hidden' }}>

        {/* BG decorations */}
        <div style={{ position:'fixed',inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)`,backgroundSize:'80px 80px',pointerEvents:'none',zIndex:0 }} />
        <div style={{ position:'fixed',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,124,0.06) 0%,transparent 70%)',top:'-200px',right:'-150px',pointerEvents:'none' }} />
        <div style={{ position:'fixed',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(120,80,200,0.06) 0%,transparent 70%)',bottom:'-100px',left:'-100px',pointerEvents:'none' }} />

        <div
          className="skills-page-container"
          style={{ maxWidth:1200,margin:'0 auto',padding:'60px 60px 120px',position:'relative',zIndex:1 }}
        >
          {/* Header */}
          <motion.div
            className="skills-header"
            custom={0.1} variants={slideUp} initial="hidden" animate="visible"
            style={{ marginBottom:60 }}
          >
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
              <div style={{ width:32,height:1,background:'#E8A87C' }} />
              <span style={{ fontSize:10,letterSpacing:'0.35em',color:'rgba(232,168,124,0.7)',textTransform:'uppercase' }}>Technical Arsenal</span>
            </div>
            <h1 style={{ fontSize:'clamp(40px,8vw,88px)',fontWeight:800,margin:0,lineHeight:0.9,letterSpacing:'-0.02em' }}>
              <span style={{ color:'#fff' }}>MY</span>{' '}
              <span style={{ background:'linear-gradient(135deg,#E8A87C,#f0c49a,#d4784a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>SKILLS</span>
            </h1>
            <p style={{ fontSize:14,color:'rgba(255,255,255,0.3)',marginTop:20,maxWidth:400,lineHeight:1.8,letterSpacing:'0.02em' }}>
              {SKILLS.length} technologies across {CATEGORIES.length - 1} categories. Hover cards to flip, click to expand.
            </p>
          </motion.div>

          {/* Two-col layout */}
          <div
            className="skills-two-col"
            style={{ display:'grid',gridTemplateColumns:'1fr 340px',gap:60,alignItems:'start' }}
          >
            {/* LEFT */}
            <div className="skills-left">
              {/* Filter */}
              <motion.div
                className="skills-filters"
                custom={0.2} variants={slideUp} initial="hidden" animate="visible"
                style={{ display:'flex',flexWrap:'wrap',gap:8,marginBottom:40 }}
              >
                {CATEGORIES.map((cat, i) => {
                  const active = selectedCat === cat;
                  const color = cat === 'All' ? '#E8A87C' : (CAT_COLOR[cat] ?? '#E8A87C');
                  return (
                    <motion.button
                      key={cat}
                      className="skills-filter-btn"
                      initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2+i*0.04 }}
                      onClick={() => setSelectedCat(cat)}
                      onHoverStart={() => setHoveredCat(cat)}
                      onHoverEnd={() => setHoveredCat(null)}
                      whileTap={{ scale:0.95 }}
                      style={{ padding:'7px 18px',border:`1px solid ${active?color:'rgba(255,255,255,0.1)'}`,background:active?`${color}15`:'transparent',color:active?color:hoveredCat===cat?'rgba(255,255,255,0.6)':'rgba(255,255,255,0.3)',fontSize:9,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',cursor:'pointer',fontFamily:"'Syne',sans-serif",transition:'all 0.2s' }}>
                      {cat}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Cards grid */}
              <motion.div
                layout
                className="skills-cards-grid"
                style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12 }}
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} onClick={() => setSelectedSkill(skill)} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT — sticky panel */}
            <div
              className="skills-right"
              style={{ position:'sticky',top:120,display:'flex',flexDirection:'column',gap:24 }}
            >
              {/* Radar */}
              <motion.div
                className="skills-radar-wrap"
                custom={0.3} variants={slideUp} initial="hidden" animate="visible"
                style={{ border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',padding:28 }}
              >
                <div style={{ fontSize:10,letterSpacing:'0.25em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:20,fontFamily:"'Syne',sans-serif" }}>Top Skills Radar</div>
                <div style={{ display:'flex',justifyContent:'center' }}>
                  <RadarChart skills={SKILLS.slice(0,6)} />
                </div>
              </motion.div>

              {/* Category legend */}
              <motion.div custom={0.4} variants={slideUp} initial="hidden" animate="visible"
                style={{ border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',padding:24 }}>
                <div style={{ fontSize:10,letterSpacing:'0.25em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:16,fontFamily:"'Syne',sans-serif" }}>By Category</div>
                {Object.entries(CAT_COLOR).map(([cat, color]) => {
                  const count = SKILLS.filter(s => s.category === cat).length;
                  const pct = (count / SKILLS.length) * 100;
                  return (
                    <div key={cat} style={{ marginBottom:12 }}>
                      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
                        <span style={{ fontSize:10,color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em',fontFamily:"'Syne',sans-serif" }}>{cat}</span>
                        <span style={{ fontSize:10,color,fontFamily:"'Syne',sans-serif",fontWeight:700 }}>{count}</span>
                      </div>
                      <div style={{ height:2,background:'rgba(255,255,255,0.06)' }}>
                        <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ delay:0.5,duration:0.8,ease:[0.16,1,0.3,1] }}
                          style={{ height:'100%',background:color,boxShadow:`0 0 6px ${color}60` }} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Summary stat */}
              <motion.div custom={0.5} variants={slideUp} initial="hidden" animate="visible"
                style={{ border:'1px solid rgba(232,168,124,0.15)',background:'rgba(232,168,124,0.04)',padding:24,display:'flex',justifyContent:'space-between' }}>
                {[
                  { n: SKILLS.length,                              l:'Skills' },
                  { n: Math.round(SKILLS.reduce((a,s)=>a+s.level,0)/SKILLS.length), l:'Avg %' },
                  { n: SKILLS.filter(s=>s.level>=80).length,      l:'Advanced' },
                ].map(({ n, l }) => (
                  <div key={l} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:24,fontWeight:800,color:'#fff',fontFamily:"'Syne',sans-serif",lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:9,color:'rgba(255,255,255,0.25)',letterSpacing:'0.2em',textTransform:'uppercase',marginTop:4,fontFamily:"'Syne',sans-serif" }}>{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Skills;