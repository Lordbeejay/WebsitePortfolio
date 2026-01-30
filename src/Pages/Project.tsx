import React, { useState } from 'react';
import '../Styling/Project.css';
import tagpuanimage from "../assets/Tagpuan.jpg";
import HelmetLogo from "../assets/Helmet.jpg";
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
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop', // Farm/agriculture with phone
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // Motorcycle/helmet
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 3,
    title: 'Push Guys',
    description: 'A 3D block-puzzle game inspired by Tetris mechanics...',
    category: 'Game Development',
    technologies: ['Unity', 'C#', '3D Physics'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop', // Gaming/3D blocks
    githubUrl: 'https://github.com/Lordbeejay/Push_Guys.git',
    featured: false
  },
  {
    id: 4,
    title: 'FitTrack Pro',
    description: 'A fitness tracking web application designed to help users monitor workouts...',
    category: 'Mobile App',
    technologies: ['React', 'TypeScript', 'CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=600&fit=crop', // Fitness tracking/smartwatch
    githubUrl: 'https://github.com/Lordbeejay/FitTrackPro_FinalProject.git',
    featured: false
  },
  {
    id: 5,
    title: 'Balay Balayan',
    description: 'A dormitory management system designed to streamline room assignments...',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Firebase', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop', // Modern dorm/apartment building
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
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop', // Motion/gesture gaming
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    id: 7,
    title: 'Coastline 5023',
    description: 'A modern landing page for Coastline 5023, focusing on Incubatees',
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', // Business/startup/laptop
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

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="projects-main-title">MY PROJECTS</h1>
          <p className="projects-subtitle">Explore my latest work and creative endeavors</p>
        </div>

        {/* Category Filter */}
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              onClick={() => openProjectDetails(project)}
            >
              {project.featured && <span className="featured-badge">Featured</span>}
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>

              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Popup */}
      {selectedProject && (
        <div className="project-popup-overlay" onClick={closeProjectDetails}>
          <div className="project-popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeProjectDetails}>×</button>
            
            <div className="popup-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="popup-content">
              <span className="popup-category">{selectedProject.category}</span>
              <h2 className="popup-title">{selectedProject.title}</h2>
              <p className="popup-description">{selectedProject.description}</p>

              <div className="popup-technologies">
                <h4>Technologies Used:</h4>
                <div className="popup-tech-list">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="popup-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="popup-actions">
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="popup-btn live-btn"
                  >
                    <span>Live Demo</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="popup-btn github-btn"
                  >
                    <span>GitHub</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Project;