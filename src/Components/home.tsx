import React from 'react';
import '../Styling/Home.css';

const SKILLS = [
  { name: 'React', icon: '⚛️' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🛢️' },
  { name: 'React Native', icon: '📱' }
];

export const Home: React.FC = () => {
  return (
    <div className="glow-gradient">
      {/* Hero Section */}
      <section className="hero">
        <div className="badge">FRONT-END DEVELOPER</div>
        <h1 className="Title">
        <span className="intro">I'm</span> 
        <span className="gradient-text">Josaiah Borres</span>
        </h1>

        <h2 className="subtitle">Building responsive, user-centric web applications [cite: 3]</h2>
        
        <div className="statsCard">
          <p style={{ color: 'var(--accent-blue)' }}>MY EXPERTISE</p>
          <div className="statLine">FRONTEND <span>95%</span></div>
          <div className="statLine">BACKEND <span>80%</span></div>
          <div className="statLine">CMS <span>90%</span></div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '4rem 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>MY SKILLS</h2>
        <div className="skillGrid">
          {SKILLS.map(skill => (
            <div key={skill.name} className="skillBox">
              <div className="icon">{skill.icon}</div>
              <div style={{ fontSize: '0.8rem' }}>{skill.name}</div>
            </div>
          ))}
          <div className="expBox">
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>2+</div>
            <div style={{ fontSize: '0.7rem' }}>Years Experience [cite: 16]</div>
          </div>
        </div>
      </section>
    </div>
  );
};
