import React from 'react';
import '../Styling/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-left-section">
        <div className="about-gif-box">
          <h2 className="about-section-title">Josaiah L. Borres</h2>
          <div className="about-gif-placeholder">
            <img 
              src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" 
              alt="Coding animation"
              className="about-gif"
            />
          </div>
        </div>
      </div>

      <div className="about-right-section">
        <div className="about-me-box">
          <h2 className="about-section-title">ABOUT ME</h2>
          <p className="about-text">
            I'm a passionate full-stack developer with a love for creating elegant solutions 
            to complex problems. With expertise in modern web technologies, I specialize in 
            building responsive, user-friendly applications that make a difference.
          </p>
          <p className="about-text">
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>

        <div className="about-languages-box">
          <h3 className="about-sub-title">Languages</h3>
          <div className="about-skills-grid">
            <span className="about-skill-tag" data-skill="javascript">JavaScript</span>
            <span className="about-skill-tag" data-skill="typescript">TypeScript</span>
            <span className="about-skill-tag" data-skill="python">Python</span>
            <span className="about-skill-tag" data-skill="java">Java</span>
            <span className="about-skill-tag" data-skill="html">HTML/CSS</span>
            <span className="about-skill-tag" data-skill="sql">SQL</span>
          </div>
        </div>

        <div className="about-courses-box">
          <h3 className="about-sub-title">Courses Taken</h3>
          <ul className="about-course-list">
            <li className="about-course-item">Web Development Bootcamp</li>
            <li className="about-course-item">Advanced React & Redux</li>
            <li className="about-course-item">Data Structures & Algorithms</li>
            <li className="about-course-item">Cloud Computing with AWS</li>
            <li className="about-course-item">Mobile App Development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;