import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, type Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_qll6vxv';
const EMAILJS_TEMPLATE_ID = 'template_pv62ey6';
const EMAILJS_PUBLIC_KEY  = 'xRwV4sHgnza1AHiEv';

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Work',    path: '/projects' },
  { label: 'About',   path: '/about' },
  { label: 'Skills',  path: '/skills' },
  { label: 'Contact', path: '/contact' },
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="contact-nav"
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 60px',borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'1px solid transparent',backdropFilter:scrolled?'blur(20px)':'none',background:scrolled?'rgba(2,2,7,0.85)':'transparent',transition:'all 0.4s ease' }}
      >
        <Link to="/" style={{ fontSize:13,letterSpacing:'0.3em',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',fontWeight:700,textDecoration:'none',fontFamily:"'Syne',sans-serif" }}>
          Portfolio
        </Link>

        <ul className="contact-nav-links" style={{ display:'flex',gap:40,listStyle:'none',margin:0,padding:0 }}>
          {NAV_ITEMS.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <li key={label}>
                <Link to={path} className="nav-lnk-c" style={{ fontSize:11,letterSpacing:'0.25em',color:active?'#E8A87C':'rgba(255,255,255,0.35)',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",position:'relative',paddingBottom:4,transition:'color 0.3s' }}>
                  {label}
                  {active && <motion.div layoutId="nav-ul-c" style={{ position:'absolute',bottom:-2,left:0,right:0,height:1,background:'#E8A87C' }} />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="contact-nav-status" style={{ display:'flex',alignItems:'center',gap:8 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:'#E8A87C',animation:'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize:11,color:'rgba(255,255,255,0.25)',letterSpacing:'0.15em',fontFamily:"'Syne',sans-serif" }}>AVAILABLE FOR HIRE</span>
        </div>

        {/* Hamburger */}
        <button
          className="contact-hamburger"
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

// ─── ANIMATED INPUT ───────────────────────────────────────────────────────────
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  delay: number;
  error?: string;
}

const FloatingInput: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, textarea, delay, error }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', marginBottom: error ? 28 : 20 }}
    >
      <motion.label
        animate={{
          y: lifted ? -22 : 0,
          fontSize: lifted ? '9px' : '13px',
          color: focused ? '#E8A87C' : error ? '#f87171' : 'rgba(255,255,255,0.3)',
          letterSpacing: lifted ? '0.2em' : '0.05em',
        }}
        transition={{ duration: 0.2 }}
        style={{ position:'absolute',left:0,top:14,pointerEvents:'none',fontFamily:"'Syne',sans-serif",textTransform:lifted?'uppercase':'none',zIndex:1 }}
      >
        {label}
      </motion.label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          style={{ width:'100%',background:'transparent',border:'none',borderBottom:`1px solid ${error?'rgba(248,113,113,0.5)':focused?'rgba(232,168,124,0.6)':'rgba(255,255,255,0.1)'}`,padding:'14px 0 10px',color:'#fff',fontSize:14,fontFamily:"'Syne',sans-serif",resize:'none',outline:'none',transition:'border-color 0.3s',boxSizing:'border-box' }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width:'100%',background:'transparent',border:'none',borderBottom:`1px solid ${error?'rgba(248,113,113,0.5)':focused?'rgba(232,168,124,0.6)':'rgba(255,255,255,0.1)'}`,padding:'14px 0 10px',color:'#fff',fontSize:14,fontFamily:"'Syne',sans-serif",outline:'none',transition:'border-color 0.3s',boxSizing:'border-box' }}
        />
      )}

      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ position:'absolute',bottom:0,left:0,right:0,height:1,background:'linear-gradient(90deg,#E8A87C,transparent)',transformOrigin:'left' }}
      />

      {error && (
        <motion.span initial={{ opacity:0,y:-4 }} animate={{ opacity:1,y:0 }}
          style={{ position:'absolute',bottom:-20,left:0,fontSize:10,color:'#f87171',letterSpacing:'0.1em',fontFamily:"'Syne',sans-serif" }}>
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

// ─── CONTACT INFO CARD ────────────────────────────────────────────────────────
const InfoCard = ({ icon, label, value, href, delay }: { icon: React.ReactNode; label: string; value: string; href?: string; delay: number }) => (
  <motion.a
    href={href ?? '#'}
    target={href ? '_blank' : undefined}
    rel="noopener noreferrer"
    initial={{ opacity:0, x:-20 }}
    animate={{ opacity:1, x:0 }}
    transition={{ delay, duration:0.6, ease:[0.16,1,0.3,1] }}
    whileHover={{ x:6, borderColor:'rgba(232,168,124,0.3)' }}
    style={{ display:'flex',alignItems:'center',gap:16,padding:'16px 20px',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)',textDecoration:'none',transition:'border-color 0.3s',cursor:'pointer' }}
  >
    <div style={{ width:36,height:36,borderRadius:'50%',background:'rgba(232,168,124,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'#E8A87C' }}>
      {icon}
    </div>
    <div style={{ minWidth:0, flex:1 }}>
      <div style={{ fontSize:9,letterSpacing:'0.25em',color:'rgba(255,255,255,0.25)',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:13,color:'rgba(255,255,255,0.7)',fontFamily:"'Syne',sans-serif",whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{value}</div>
    </div>
    <div style={{ marginLeft:'auto',color:'rgba(255,255,255,0.15)',fontSize:16,flexShrink:0 }}>→</div>
  </motion.a>
);

// ─── SOCIAL BUTTON ────────────────────────────────────────────────────────────
const SocialBtn = ({ href, label, delay }: { href: string; label: string; delay: number }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity:0, scale:0.8 }}
    animate={{ opacity:1, scale:1 }}
    transition={{ delay, type:'spring', stiffness:200 }}
    whileHover={{ y:-4, borderColor:'rgba(232,168,124,0.4)', color:'#E8A87C' }}
    whileTap={{ scale:0.95 }}
    style={{ padding:'10px 20px',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.35)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',fontFamily:"'Syne',sans-serif",transition:'all 0.3s',cursor:'pointer' }}
  >
    {label}
  </motion.a>
);

// ─── SUCCESS OVERLAY ──────────────────────────────────────────────────────────
const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity:0, scale:0.9 }}
    animate={{ opacity:1, scale:1 }}
    exit={{ opacity:0, scale:0.9 }}
    transition={{ type:'spring', stiffness:200, damping:20 }}
    style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 40px',textAlign:'center',gap:20 }}
  >
    <motion.div
      initial={{ scale:0 }}
      animate={{ scale:1 }}
      transition={{ delay:0.1, type:'spring', stiffness:300, damping:20 }}
      style={{ width:72,height:72,borderRadius:'50%',background:'rgba(232,168,124,0.1)',border:'1px solid rgba(232,168,124,0.3)',display:'flex',alignItems:'center',justifyContent:'center' }}
    >
      <motion.svg width="28" height="28" viewBox="0 0 28 28" fill="none" initial={{ pathLength:0 }} animate={{ pathLength:1 }}>
        <motion.path d="M5 14L11 20L23 8" stroke="#E8A87C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ delay:0.3, duration:0.6 }} />
      </motion.svg>
    </motion.div>
    <motion.h3 initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}
      style={{ fontSize:22,fontWeight:800,color:'#fff',margin:0,fontFamily:"'Syne',sans-serif" }}>
      Message Sent!
    </motion.h3>
    <motion.p initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}
      style={{ fontSize:13,color:'rgba(255,255,255,0.35)',lineHeight:1.7,maxWidth:280,margin:0 }}>
      Thanks for reaching out. I'll get back to you as soon as possible.
    </motion.p>
    <motion.button
      initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.5 }}
      onClick={onReset}
      whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
      style={{ marginTop:8,padding:'12px 32px',background:'transparent',border:'1px solid rgba(232,168,124,0.3)',color:'rgba(232,168,124,0.7)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',cursor:'pointer',fontFamily:"'Syne',sans-serif",transition:'all 0.3s' }}
    >
      Send Another
    </motion.button>
  </motion.div>
);

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormData>({ from_name:'', from_email:'', subject:'', message:'' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.from_name.trim())   e.from_name  = 'Name is required';
    if (!form.from_email.trim())  e.from_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) e.from_email = 'Invalid email address';
    if (!form.subject.trim())     e.subject    = 'Subject is required';
    if (!form.message.trim())     e.message    = 'Message is required';
    else if (form.message.length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setForm({ from_name:'', from_email:'', subject:'', message:'' });
    setErrors({});
    setStatus('idle');
  };

  const slideUp: Variants = {
    hidden: { opacity:0, y:30 },
    visible: (d: number) => ({ opacity:1, y:0, transition:{ delay:d, duration:0.6, ease:[0.16,1,0.3,1] } }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #020207; cursor: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .nav-lnk-c:hover { color: rgba(232,168,124,0.9) !important; }
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #020207 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020207; }
        ::-webkit-scrollbar-thumb { background: rgba(232,168,124,0.3); border-radius: 2px; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          body { cursor: auto !important; }

          /* Nav */
          .contact-nav { padding: 18px 20px !important; }
          .contact-nav-links { display: none !important; }
          .contact-nav-status { display: none !important; }
          .contact-hamburger { display: flex !important; }

          /* Page container */
          .contact-page-container { padding: 40px 20px 80px !important; }

          /* Header */
          .contact-header { margin-bottom: 44px !important; }

          /* Two-col: stack vertically */
          .contact-two-col {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          /* Name + Email side by side → stack */
          .contact-name-email-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          /* Info cards: truncate long values gracefully */
          .contact-info-value {
            font-size: 12px !important;
          }

          /* Socials row: wrap freely */
          .contact-socials-row {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }

          /* Location/timezone bar */
          .contact-location-bar {
            padding: 16px 18px !important;
          }

          /* Success state padding */
          .contact-success {
            padding: 44px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .contact-nav { padding: 16px 16px !important; }
          .contact-page-container { padding: 32px 16px 60px !important; }
        }
      `}</style>

      <CustomCursor />
      <Navbar />

      <div style={{ minHeight:'100vh', background:'#020207', fontFamily:"'Syne',sans-serif", paddingTop:100, position:'relative', overflow:'hidden' }}>

        {/* BG decorations */}
        <div style={{ position:'fixed',inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)`,backgroundSize:'80px 80px',pointerEvents:'none',zIndex:0 }} />
        <div style={{ position:'fixed',inset:0,opacity:0.04,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'200px 200px',pointerEvents:'none',zIndex:0 }} />
        <div style={{ position:'fixed',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,124,0.08) 0%,transparent 70%)',top:'-100px',right:'-100px',pointerEvents:'none' }} />
        <div style={{ position:'fixed',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(120,80,200,0.07) 0%,transparent 70%)',bottom:'0',left:'-80px',pointerEvents:'none' }} />

        <div
          className="contact-page-container"
          style={{ maxWidth:1200, margin:'0 auto', padding:'60px 60px 120px', position:'relative', zIndex:1 }}
        >
          {/* Header */}
          <motion.div
            className="contact-header"
            custom={0.1} variants={slideUp} initial="hidden" animate="visible"
            style={{ marginBottom:72 }}
          >
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
              <div style={{ width:32,height:1,background:'#E8A87C' }} />
              <span style={{ fontSize:10,letterSpacing:'0.35em',color:'rgba(232,168,124,0.7)',textTransform:'uppercase' }}>Get In Touch</span>
            </div>
            <h1 style={{ fontSize:'clamp(40px,8vw,88px)',fontWeight:800,margin:0,lineHeight:0.9,letterSpacing:'-0.02em' }}>
              <span style={{ color:'#fff' }}>LET'S</span><br />
              <span style={{ background:'linear-gradient(135deg,#E8A87C,#f0c49a,#d4784a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                WORK TOGETHER
              </span>
            </h1>
            <p style={{ fontSize:14,color:'rgba(255,255,255,0.3)',marginTop:20,maxWidth:440,lineHeight:1.8,letterSpacing:'0.02em' }}>
              Have a project in mind? Looking to collaborate? Or just want to say hi?
              My inbox is always open — I'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Two-col layout */}
          <div
            className="contact-two-col"
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}
          >
            {/* LEFT — Form */}
            <div>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    className="contact-success"
                    style={{ border:'1px solid rgba(232,168,124,0.15)',background:'rgba(232,168,124,0.03)' }}>
                    <SuccessState onReset={resetForm} />
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <form ref={formRef} onSubmit={handleSubmit} noValidate>
                      {/* Name + Email: side by side on desktop, stacked on mobile */}
                      <div
                        className="contact-name-email-row"
                        style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}
                      >
                        <FloatingInput label="Your Name" name="from_name" value={form.from_name} onChange={handleChange} delay={0.2} error={errors.from_name} />
                        <FloatingInput label="Email Address" name="from_email" type="email" value={form.from_email} onChange={handleChange} delay={0.25} error={errors.from_email} />
                      </div>
                      <FloatingInput label="Subject" name="subject" value={form.subject} onChange={handleChange} delay={0.3} error={errors.subject} />
                      <FloatingInput label="Message" name="message" value={form.message} onChange={handleChange} textarea delay={0.35} error={errors.message} />

                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                            style={{ padding:'12px 16px',border:'1px solid rgba(248,113,113,0.3)',background:'rgba(248,113,113,0.08)',color:'#f87171',fontSize:12,letterSpacing:'0.05em',marginBottom:20 }}>
                            Something went wrong. Please check your EmailJS config or try again.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                        transition={{ delay:0.4,duration:0.6,ease:[0.16,1,0.3,1] }}
                        style={{ marginTop:32 }}
                      >
                        <motion.button
                          type="submit"
                          disabled={status === 'sending'}
                          whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                          whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                          style={{ width:'100%',padding:'18px 32px',background:status==='sending'?'rgba(232,168,124,0.6)':'#E8A87C',color:'#0a0600',fontSize:12,fontWeight:700,letterSpacing:'0.25em',textTransform:'uppercase',border:'none',cursor:status==='sending'?'default':'pointer',fontFamily:"'Syne',sans-serif",position:'relative',overflow:'hidden',transition:'background 0.3s' }}
                        >
                          {status === 'sending' ? (
                            <span style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:10 }}>
                              <motion.span
                                animate={{ rotate:360 }}
                                transition={{ duration:1,repeat:Infinity,ease:'linear' }}
                                style={{ display:'inline-block',width:14,height:14,border:'2px solid #0a0600',borderTopColor:'transparent',borderRadius:'50%' }}
                              />
                              Sending...
                            </span>
                          ) : 'Send Message →'}
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT — Info */}
            <div style={{ display:'flex',flexDirection:'column',gap:16 }}>

              {/* Availability card */}
              <motion.div
                custom={0.2} variants={slideUp} initial="hidden" animate="visible"
                style={{ padding:'28px 28px',border:'1px solid rgba(232,168,124,0.15)',background:'rgba(232,168,124,0.04)',marginBottom:8 }}
              >
                <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12 }}>
                  <motion.div
                    animate={{ scale:[1,1.3,1] }}
                    transition={{ duration:2,repeat:Infinity }}
                    style={{ width:8,height:8,borderRadius:'50%',background:'#4ade80' }}
                  />
                  <span style={{ fontSize:11,color:'rgba(255,255,255,0.5)',letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:"'Syne',sans-serif" }}>
                    Currently Available
                  </span>
                </div>
                <p style={{ fontSize:13,color:'rgba(255,255,255,0.3)',lineHeight:1.7,margin:0 }}>
                  Open to full-time roles, freelance projects, and collaborations. Response time is usually within 24 hours.
                </p>
              </motion.div>

              {/* Contact info cards */}
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                label="Email" value="borres34.jb@gmail.com"
                href="mailto:borres34.jb@gmail.com" delay={0.3}
              />
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>}
                label="GitHub" value="github.com/Lordbeejay"
                href="https://github.com/JosaiahBorres1" delay={0.35}
              />
              <InfoCard
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                label="LinkedIn" value="linkedin.com/in/josaiah-borres"
                href="https://www.linkedin.com/in/josaiah-borres-723182246/" delay={0.4}
              />

              {/* Socials row */}
              <motion.div
                className="contact-socials-row"
                custom={0.5} variants={slideUp} initial="hidden" animate="visible"
                style={{ display:'flex',gap:8,marginTop:8,flexWrap:'wrap' }}
              >
                <SocialBtn href="https://github.com/Lordbeejay"          label="GitHub"   delay={0.5} />
                <SocialBtn href="https://linkedin.com/in/josaiah-borres" label="LinkedIn" delay={0.55} />
              </motion.div>

              {/* Location / timezone */}
              <motion.div
                className="contact-location-bar"
                custom={0.6} variants={slideUp} initial="hidden" animate="visible"
                style={{ marginTop:16,padding:'20px 24px',border:'1px solid rgba(255,255,255,0.05)',background:'rgba(255,255,255,0.01)',display:'flex',alignItems:'center',gap:16 }}
              >
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:10,letterSpacing:'0.2em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",marginBottom:4 }}>Based In</div>
                  <div style={{ fontSize:14,color:'rgba(255,255,255,0.5)',fontFamily:"'Syne',sans-serif",fontWeight:600 }}>Iloilo City, Philippines 🇵🇭</div>
                </div>
                <div style={{ width:1,height:40,background:'rgba(255,255,255,0.07)',flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:10,letterSpacing:'0.2em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',fontFamily:"'Syne',sans-serif",marginBottom:4 }}>Timezone</div>
                  <div style={{ fontSize:14,color:'rgba(255,255,255,0.5)',fontFamily:"'Syne',sans-serif",fontWeight:600 }}>GMT+8 (PHT)</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;