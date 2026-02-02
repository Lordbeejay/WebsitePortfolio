import React from 'react';
import { motion, type Variants } from 'framer-motion';
import '../Styling/About.css';

const About: React.FC = () => {
  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Left section animation
  const leftSectionVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20
      }
    }
  };

  // Right section boxes animation
  const boxVariants: Variants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 15
      }
    }
  };

  // Skill tag animation
  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    })
  };

  // Course item animation
  const courseVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1
      }
    })
  };

  const skills = [
    { name: "JavaScript", skill: "javascript" },
    { name: "TypeScript", skill: "typescript" },
    { name: "Python", skill: "python" },
    { name: "Java", skill: "java" },
    { name: "HTML/CSS", skill: "html" },
    { name: "SQL", skill: "sql" }
  ];

  const courses = [
    "Web Development Bootcamp",
    "Advanced React & Redux",
    "Data Structures & Algorithms",
    "Cloud Computing with AWS",
    "Mobile App Development"
  ];

  return (
    <motion.div 
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="about-left-section"
        variants={leftSectionVariants}
      >
        <div className="about-gif-box">
          <motion.h2 
            className="about-section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Josaiah L. Borres
          </motion.h2>
          <div className="about-gif-placeholder">
            <motion.img 
              src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" 
              alt="Coding animation"
              className="about-gif"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      <div className="about-right-section">
        <motion.div 
          className="about-me-box"
          variants={boxVariants}
        >
          <h2 className="about-section-title">ABOUT ME</h2>
          <motion.p 
            className="about-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            I'm a passionate full-stack developer with a love for creating elegant solutions 
            to complex problems. With expertise in modern web technologies, I specialize in 
            building responsive, user-friendly applications that make a difference.
          </motion.p>
          <motion.p 
            className="about-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </motion.p>
        </motion.div>

        <motion.div 
          className="about-languages-box"
          variants={boxVariants}
        >
          <h3 className="about-sub-title">Languages</h3>
          <div className="about-skills-grid">
            {skills.map((skill, index) => (
              <motion.span
                key={skill.skill}
                className="about-skill-tag"
                data-skill={skill.skill}
                custom={index}
                variants={skillVariants}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="about-courses-box"
          variants={boxVariants}
        >
          <h3 className="about-sub-title">Courses Taken</h3>
          <ul className="about-course-list">
            {courses.map((course, index) => (
              <motion.li
                key={index}
                className="about-course-item"
                custom={index}
                variants={courseVariants}
                whileHover={{ x: 10, color: "#38bdf8" }}
              >
                {course}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;