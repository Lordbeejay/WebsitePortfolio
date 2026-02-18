import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ProjectData {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: 'Tagpuan',
    description: 'A digital contract farming and agricultural marketplace platform connecting farmers with buyers through smart contracts and real-time analytics.',
    category: 'Mobile App',
    technologies: ['React', 'Firebase', 'Node.js', 'Maps API', 'Data Analytics'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    liveUrl: 'https://tagpuan.xyz',
    githubUrl: 'https://github.com/yourusername/tagpuan',
    featured: true,
  },
  {
    id: 2,
    title: 'Helmet Detection System',
    description: 'An AI-powered computer vision system that detects whether riders are wearing helmets in real time using deep learning and YOLO architecture.',
    category: 'Computer Vision / AI',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'YOLO'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Push Guys',
    description: 'A 3D block-puzzle game inspired by Tetris mechanics with physics-based interactions and progressive difficulty levels.',
    category: 'Game Development',
    technologies: ['Unity', 'C#', '3D Physics'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/Lordbeejay/Push_Guys.git',
    featured: false,
  },
  {
    id: 4,
    title: 'FitTrack Pro',
    description: 'A fitness tracking web application designed to help users monitor workouts, visualize progress, and maintain healthy habits.',
    category: 'Mobile App',
    technologies: ['React', 'TypeScript', 'CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/Lordbeejay/FitTrackPro_FinalProject.git',
    featured: false,
  },
  {
    id: 5,
    title: 'Balay Balayan',
    description: 'A dormitory management system designed to streamline room assignments, tenant records, and payment tracking.',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Firebase', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
    liveUrl: 'https://balaybalayan.vercel.app/',
    githubUrl: 'https://github.com/herbert-cane/balaybalayan.git',
    featured: false,
  },
  {
    id: 6,
    title: 'WOAH Game',
    description: 'A single-player interactive game powered by computer vision that tracks player movements in real-time for immersive gameplay.',
    category: 'Computer Vision / AI',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'PyGame'],
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 7,
    title: 'Coastline 5023',
    description: 'A modern landing page for Coastline 5023, focusing on Incubatees with clean UI and responsive design.',
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    liveUrl: 'https://coastline5023.vercel.app/',
    featured: true,
  },
];

const NAV_ITEMS = [
  { label: 'Work',    path: '/projects' },
  { label: 'About',   path: '/about' },
  { label: 'Skills',  path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Mobile App':                    '#E8A87C',
  'Computer Vision / AI':          '#a78bfa',
  'Game Development':              '#34d399',
  'Web Development':               '#60a5fa',
  'Computer Vision / Game Development': '#f472b6',
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
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, width: 12, height: 12,
        borderRadius: '50%', background: '#E8A87C', pointerEvents: 'none',
        zIndex: 9999, mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
        x: sx, y: sy,
      }} />
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, width: 40, height: 40,
        borderRadius: '50%', border: '1.5px solid rgba(232,168,124,0.5)',
        pointerEvents: 'none', zIndex: 9998,
        x: rx, y: ry, translateX: -14, translateY: -14,
      }} />
    </>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 60px',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(2,2,7,0.85)' : 'transparent',
          transition: 'all 0.4s ease',
        }}
        className="proj-nav"
      >
        <Link to="/" style={{
          fontSize: 13, letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
          fontWeight: 700, textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
        }}>
          Portfolio
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }} className="proj-nav-links">
          {NAV_ITEMS.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={label}>
                <Link
                  to={path}
                  style={{
                    fontSize: 11, letterSpacing: '0.25em',
                    color: isActive ? '#E8A87C' : 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase', textDecoration: 'none',
                    fontFamily: "'Syne', sans-serif",
                    position: 'relative', paddingBottom: 4,
                    transition: 'color 0.3s',
                  }}
                  className="nav-link-project"
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: -2, left: 0, right: 0,
                        height: 1, background: '#E8A87C',
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="proj-nav-status">
          <div style={{
            width: 6, height: 6, borderRadius: '50%', background: '#E8A87C',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', fontFamily: "'Syne', sans-serif" }}>
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="proj-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 9 : 0 }}
            style={{ display: 'block', width: 22, height: 1.5, background: 'rgba(255,255,255,0.6)', transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            style={{ display: 'block', width: 22, height: 1.5, background: 'rgba(255,255,255,0.6)' }}
          />
          <motion.span
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -9 : 0 }}
            style={{ display: 'block', width: 22, height: 1.5, background: 'rgba(255,255,255,0.6)', transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 65,
              left: 0, right: 0,
              zIndex: 99,
              background: 'rgba(2,2,7,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '20px 20px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 13, letterSpacing: '0.25em',
                    color: isActive ? '#E8A87C' : 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', textDecoration: 'none',
                    fontFamily: "'Syne', sans-serif",
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'block',
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8A87C', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', fontFamily: "'Syne', sans-serif" }}>
                AVAILABLE FOR HIRE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project, index, onClick,
}: { project: ProjectData; index: number; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const accentColor = CATEGORY_COLORS[project.category] ?? '#E8A87C';

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, scale: 0.88, y: 30, transition: { duration: 0.25 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(circle at 50% 0%, ${accentColor}12 0%, transparent 60%)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Featured badge */}
      {project.featured && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 + 0.3 }}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 3,
            padding: '4px 10px',
            background: '#E8A87C',
            color: '#0a0600',
            fontSize: 9, fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Featured
        </motion.div>
      )}

      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          animate={{ opacity: hovered ? 0.7 : 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #020207 0%, transparent 60%)',
          }}
        />
        {/* View prompt */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            padding: '10px 24px',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            fontSize: 11, letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: "'Syne', sans-serif",
            backdropFilter: 'blur(8px)',
            background: 'rgba(0,0,0,0.3)',
          }}>
            View Details →
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
          <span style={{
            fontSize: 10, letterSpacing: '0.25em',
            color: accentColor, textTransform: 'uppercase',
            fontFamily: "'Syne', sans-serif",
          }}>
            {project.category}
          </span>
        </div>

        <h3 style={{
          margin: '0 0 10px',
          fontSize: 18, fontWeight: 800,
          color: '#fff', fontFamily: "'Syne', sans-serif",
          lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        <p style={{
          margin: '0 0 20px',
          fontSize: 13,
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.7,
          flex: 1,
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} style={{
              padding: '3px 10px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 10, letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Syne', sans-serif",
            }}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span style={{
              padding: '3px 10px',
              border: `1px solid ${accentColor}40`,
              fontSize: 10, letterSpacing: '0.1em',
              color: accentColor,
              fontFamily: "'Syne', sans-serif",
            }}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }: { project: ProjectData; onClose: () => void }) => {
  const accentColor = CATEGORY_COLORS[project.category] ?? '#E8A87C';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(2,2,7,0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="proj-modal-inner"
        style={{
          background: '#0c0c14',
          border: `1px solid ${accentColor}25`,
          borderRadius: 2,
          width: '100%', maxWidth: 840,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
        }}
      >
        {/* Close */}
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ×
        </motion.button>

        {/* Image side */}
        <div className="proj-modal-image" style={{ position: 'relative', overflow: 'hidden', minHeight: 400 }}>
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${accentColor}20, transparent 50%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }} />
        </div>

        {/* Content side */}
        <div className="proj-modal-content" style={{ padding: '40px 36px', overflowY: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />
              <span style={{
                fontSize: 10, letterSpacing: '0.25em',
                color: accentColor, textTransform: 'uppercase',
                fontFamily: "'Syne', sans-serif",
              }}>
                {project.category}
              </span>
            </div>

            <h2 style={{
              margin: '0 0 16px',
              fontSize: 28, fontWeight: 800,
              color: '#fff', fontFamily: "'Syne', sans-serif",
              lineHeight: 1.1,
            }}>
              {project.title}
            </h2>

            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8, marginBottom: 28,
            }}>
              {project.description}
            </p>

            {/* Technologies */}
            <div style={{ marginBottom: 32 }}>
              <p style={{
                fontSize: 10, letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
                fontFamily: "'Syne', sans-serif", marginBottom: 12,
              }}>
                Technologies
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    style={{
                      padding: '5px 14px',
                      border: `1px solid ${accentColor}30`,
                      fontSize: 11, letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'Syne', sans-serif",
                      cursor: 'default',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    flex: 1, padding: '12px 20px',
                    background: '#E8A87C', color: '#0a0600',
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  Live Demo →
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    flex: 1, padding: '12px 20px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  GitHub
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── MAIN PROJECT PAGE ────────────────────────────────────────────────────────
const Project: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #020207; cursor: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .nav-link-project:hover { color: rgba(232,168,124,0.9) !important; }
        .filter-hover:hover { 
          border-color: rgba(232,168,124,0.4) !important; 
          color: rgba(255,255,255,0.8) !important;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020207; }
        ::-webkit-scrollbar-thumb { background: rgba(232,168,124,0.3); border-radius: 2px; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          body { cursor: auto !important; }

          /* Nav */
          .proj-nav {
            padding: 18px 20px !important;
          }
          .proj-nav-links {
            display: none !important;
          }
          .proj-nav-status {
            display: none !important;
          }
          .proj-hamburger {
            display: flex !important;
          }

          /* Page container */
          .proj-page-container {
            padding: 0 20px 80px !important;
          }

          /* Header title */
          .proj-header {
            margin-bottom: 40px !important;
          }

          /* Stats row: wrap and reduce gap */
          .proj-stats-row {
            gap: 28px !important;
            margin-bottom: 36px !important;
            padding-bottom: 28px !important;
          }
          .proj-stat-num {
            font-size: 22px !important;
          }

          /* Filter buttons: allow horizontal scroll */
          .proj-filters {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            margin-bottom: 32px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .proj-filters::-webkit-scrollbar {
            display: none;
          }
          .proj-filter-btn {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }

          /* Grid: single column on mobile */
          .proj-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Modal: stack vertically */
          .proj-modal-inner {
            grid-template-columns: 1fr !important;
            max-height: 92vh !important;
            overflow-y: auto !important;
          }
          .proj-modal-image {
            min-height: 220px !important;
            max-height: 220px !important;
          }
          .proj-modal-content {
            padding: 28px 24px 32px !important;
          }
        }

        @media (max-width: 480px) {
          .proj-nav {
            padding: 16px 16px !important;
          }
          .proj-page-container {
            padding: 0 16px 60px !important;
          }
          .proj-stats-row {
            gap: 20px !important;
          }
        }
      `}</style>

      <CustomCursor />
      <Navbar />

      <motion.div
        ref={containerRef}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        style={{
          minHeight: '100vh',
          background: '#020207',
          fontFamily: "'Syne', sans-serif",
          paddingTop: 100,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorations */}
        <div style={{
          position: 'fixed', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'fixed', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,168,124,0.07) 0%, transparent 70%)',
          top: '-100px', right: '-100px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'fixed', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,80,200,0.07) 0%, transparent 70%)',
          bottom: '100px', left: '-100px', pointerEvents: 'none',
        }} />

        <div
          className="proj-page-container"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px 120px', position: 'relative', zIndex: 1 }}
        >
          {/* Header */}
          <motion.div
            className="proj-header"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 64 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#E8A87C' }} />
              <span style={{
                fontSize: 10, letterSpacing: '0.35em',
                color: 'rgba(232,168,124,0.7)', textTransform: 'uppercase',
              }}>
                Selected Work
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(40px, 8vw, 88px)',
              fontWeight: 800, margin: 0,
              color: '#fff', lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}>
              MY<br />
              <span style={{
                background: 'linear-gradient(135deg, #E8A87C 0%, #f0c49a 40%, #d4784a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                PROJECTS
              </span>
            </h1>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.3)',
              marginTop: 20, maxWidth: 400, lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}>
              A curated selection of work spanning web, mobile, AI, and game development.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="proj-stats-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'flex', gap: 48, marginBottom: 52,
              paddingBottom: 36,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              { num: PROJECTS.length, label: 'Total Projects' },
              { num: PROJECTS.filter(p => p.featured).length, label: 'Featured' },
              { num: categories.length - 1, label: 'Categories' },
            ].map((s) => (
              <div key={s.label}>
                <div className="proj-stat-num" style={{ fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="proj-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}
          >
            {categories.map((cat, i) => {
              const isActive = selectedCategory === cat;
              const accentColor = cat === 'All' ? '#E8A87C' : (CATEGORY_COLORS[cat] ?? '#E8A87C');
              return (
                <motion.button
                  key={cat}
                  className="proj-filter-btn"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={() => setSelectedCategory(cat)}
                  onHoverStart={() => setHoveredCategory(cat)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '8px 20px',
                    border: `1px solid ${isActive ? accentColor : 'rgba(255,255,255,0.1)'}`,
                    background: isActive ? `${accentColor}18` : 'transparent',
                    color: isActive ? accentColor : hoveredCategory === cat ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                    transition: 'all 0.25s',
                  }}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      style={{
                        display: 'inline-block', width: 4, height: 4,
                        borderRadius: '50%', background: accentColor,
                        marginLeft: 8, verticalAlign: 'middle',
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="proj-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)' }}
            >
              <div style={{ fontSize: 48 }}>—</div>
              <p style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>No projects found</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Project;