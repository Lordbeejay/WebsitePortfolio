import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import '../Styling/Project.css';

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

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: 'Tagpuan',
    description: 'A digital contract farming and agricultural marketplace platform...',
    category: 'Mobile App',
    technologies: ['React', 'Firebase', 'Node.js', 'Maps API', 'Data Analytics'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    liveUrl: 'https://tagpuan.xyz',
    githubUrl: 'https://github.com/yourusername/tagpuan',
    featured: true
  },
  {
    id: 2,
    title: 'Helmet Detection System',
    description: 'An AI-powered computer vision system that detects whether riders are wearing helmets in real time...',
    category: 'Computer Vision / AI',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'YOLO'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 3,
    title: 'Push Guys',
    description: 'A 3D block-puzzle game inspired by Tetris mechanics...',
    category: 'Game Development',
    technologies: ['Unity', 'C#', '3D Physics'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/Lordbeejay/Push_Guys.git',
    featured: false
  },
  {
    id: 4,
    title: 'FitTrack Pro',
    description: 'A fitness tracking web application designed to help users monitor workouts...',
    category: 'Mobile App',
    technologies: ['React', 'TypeScript', 'CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/Lordbeejay/FitTrackPro_FinalProject.git',
    featured: false
  },
  {
    id: 5,
    title: 'Balay Balayan',
    description: 'A dormitory management system designed to streamline room assignments...',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Firebase', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
    liveUrl: 'https://balaybalayan.vercel.app/',
    githubUrl: 'https://github.com/herbert-cane/balaybalayan.git',
    featured: false
  },
  {
    id: 6,
    title: 'WOAH Game',
    description: 'A single-player interactive game powered by computer vision that tracks player movements in real-time...',
    category: 'Computer Vision / Game Development',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'PyGame'],
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    id: 7,
    title: 'Coastline 5023',
    description: 'A modern landing page for Coastline 5023, focusing on Incubatees',
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    liveUrl: 'https://coastline5023.vercel.app/',
    featured: true
  }
];

const Project: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  const openProjectDetails = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      }
    }
  };

  const filterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    })
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const popupVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const popupCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="projects-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="projects-container">
        <motion.div className="projects-header" variants={headerVariants}>
          <h1 className="projects-main-title">MY PROJECTS</h1>
          <p className="projects-subtitle">Explore my latest work and creative endeavors</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="projects-filter"
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              custom={index}
              variants={filterVariants}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={`project-card ${project.featured ? 'featured' : ''}`}
                onClick={() => openProjectDetails(project)}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(56, 189, 248, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                {project.featured && (
                  <motion.span 
                    className="featured-badge"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1 + 0.3,
                      type: "spring" as const,
                      stiffness: 200 
                    }}
                  >
                    Featured
                  </motion.span>
                )}
                
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <motion.div 
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="view-details">View Details</span>
                  </motion.div>
                </div>

                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + techIndex * 0.05 + 0.4 
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span 
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.55 }}
                      >
                        +{project.technologies.length - 3}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-popup-overlay" 
            onClick={closeProjectDetails}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="project-popup-card" 
              onClick={(e) => e.stopPropagation()}
              variants={popupCardVariants}
            >
              <motion.button 
                className="popup-close" 
                onClick={closeProjectDetails}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              
              <motion.div 
                className="popup-image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src={selectedProject.image} alt={selectedProject.title} />
              </motion.div>

              <motion.div 
                className="popup-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="popup-category">{selectedProject.category}</span>
                <h2 className="popup-title">{selectedProject.title}</h2>
                <p className="popup-description">{selectedProject.description}</p>

                <div className="popup-technologies">
                  <h4>Technologies Used:</h4>
                  <div className="popup-tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        className="popup-tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="popup-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {selectedProject.liveUrl && (
                    <motion.a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="popup-btn live-btn"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Live Demo</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="popup-btn github-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>GitHub</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Project;