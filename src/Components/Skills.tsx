import React from 'react';
import '../Styling/Skills.css';

const SKILLS = ['React', 'Angular', 'Python', 'JavaScript', 'SQL', 'C++', 'React Native', 'PHP', 'Node.js', 'Figma'];

export const Skillss: React.FC = () => {
  return (
    <section className="skills-section">
      <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>MY SKILLS</h2>

      <div className="skills-box">
        <div className="card-3d">
          {SKILLS.map((skill, i) => (
            <div key={i} style={{ '--i': i } as React.CSSProperties}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
