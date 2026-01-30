import '../Styling/Bio.css'
import React, { useEffect } from 'react';
{/* Bio Section */}
      

export const Bio: React.FC = () => (
  <div className="bio-wrapper">
    <div className="card">
      <h2 style={{ color: 'var(--accent-lime)' }}>WHO AM I?</h2>
      <p>
        I am a computer science student at UP Visayas.
        Specializing in React and Angular development with a focus on
        scalable and high-performance UIs.
      </p>
    </div>
  </div>
);
