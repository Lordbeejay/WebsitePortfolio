import React from 'react';
import "../Styling/Hero.css"; 
import { DialogueBox } from './Dialouge';

export const Hero: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="overlay-content">
        
        {/* Main Identity */}
        <h1 className="main-title">
          <span className="intro">I'm</span> 
          <span className="gradient-text"> Josaiah Borres</span>
        </h1>
        <p className="sub-title">
          B.S. Computer Science student at UP Visayas.
        </p>

        {/* Repositioned Dialogue Box */}
        <div className="hero-dialogue-wrapper">
          <DialogueBox />
        </div>

        {/* Expertise Section */}
        
              
          \
      </div>
    </section>
  );
};