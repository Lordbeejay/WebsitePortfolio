import React, { useState } from 'react';
import '../Styling/Skills.css';

interface SkillData {
  name: string;
  description: string;
  category: string;
  dataSkill: string;
  experience:string;
}

const SKILLS: SkillData[] = [
  { 
    name: 'React', 
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    category: 'Frontend Framework',
    dataSkill: 'react',
    experience: "2 years"
  },
  { 
    name: 'Angular', 
    description: 'A platform for building mobile and desktop web applications using TypeScript.',
    category: 'Frontend Framework',
    dataSkill: 'angular',
    experience: "2 years"
  },
  { 
    name: 'Python', 
    description: 'A high-level programming language known for its simplicity and versatility.',
    category: 'Programming Language',
    dataSkill: 'python',
    experience: "2 years"
  },
  { 
    name: 'JavaScript', 
    description: 'The programming language of the web, enabling interactive and dynamic content.',
    category: 'Programming Language',
    dataSkill: 'javascript',
    experience: "2 years"
  },
  { 
    name: 'SQL', 
    description: 'Structured Query Language for managing and manipulating relational databases.',
    category: 'Database',
    dataSkill: 'sql',
    experience: "2 years"
  },
  { 
    name: 'C++', 
    description: 'A powerful general-purpose programming language supporting object-oriented programming.',
    category: 'Programming Language',
    dataSkill: 'cpp',
    experience: "2 years"
  },
  { 
    name: 'React Native', 
    description: 'A framework for building native mobile applications using React and JavaScript.',
    category: 'Mobile Framework',
    dataSkill: 'reactnative',
    experience: "2 years"
  },
  { 
    name: 'PHP', 
    description: 'A server-side scripting language designed for web development.',
    category: 'Backend Language',
    dataSkill: 'php',
    experience: "2 years"
  },
  { 
    name: 'Node.js', 
    description: 'A JavaScript runtime built on Chrome\'s V8 engine for building scalable applications.',
    category: 'Backend Runtime',
    dataSkill: 'nodejs',
    experience: "2 years"
  },
  { 
    name: 'Figma', 
    description: 'A collaborative interface design tool for creating UI/UX designs and prototypes.',
    category: 'Design Tool',
    dataSkill: 'figma',
    experience: "2 years"
  }
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);

  const handleSkillClick = (skill: SkillData) => {
    setSelectedSkill(skill);
  };

  const closePopup = () => {
    setSelectedSkill(null);
  };

  return (
    <section className="skills-section">
      <div className="skills-showcase-container">
        <h2 className="skills-title">MY SKILLS</h2>
        
        <div className="skills-box">
          <div className="card-3d">
            {SKILLS.map((skill, i) => (
              <div 
                key={i} 
                style={{ '--i': i } as React.CSSProperties}
                className="carousel-item"
                data-skill={skill.dataSkill}
                onClick={() => handleSkillClick(skill)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        <p className="skills-subtitle">Click on any skill to learn more</p>
      </div>

      {/* Popup Card */}
      {selectedSkill && (
        <div className="skill-popup-overlay" onClick={closePopup}>
          <div className="skill-popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-icon" data-skill={selectedSkill.dataSkill}></div>
            <h3 className="popup-title">{selectedSkill.name}</h3>
            <span className="popup-category">{selectedSkill.category}</span>
            <p className="popup-description">{selectedSkill.description}</p>
            <p className="popup-descriptions">Experience : {selectedSkill.experience}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;