import React from 'react';
import Contact from './Pages/Contact';
import  Skills from './Pages/Skills';
import { Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Main from './Pages/main';
import Project from './Pages/Project';
const App: React.FC = () => {
  return (
    <main style={{ 
      maxWidth: '100%',
      width: '100vw',
      margin: '0 auto',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
};

export default App;