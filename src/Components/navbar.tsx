import React, { useState } from 'react';
import '../Styling/Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:borres34.jb@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal and reset form
    setIsContactOpen(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none', color: 'inherit' }}>
          <span className="box">JOSAIAH.</span>
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/about">
            <span className="box">ABOUT ME</span>
          </Link>
          <Link to="/skills">
            <span className='box'>SKILLS</span>
          </Link>
          <Link to="/projects">
            <span className='box'>PROJECTS</span>
          </Link>
        </div>

        <button 
          className='submit'
          onClick={() => setIsContactOpen(true)}
        >
          CONTACT ↗
        </button>
      </nav>

      {/* Contact Form Modal */}
      {isContactOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsContactOpen(false)}>
          <div style={styles.contactCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Get in Touch</h2>
              <button 
                style={styles.closeBtn}
                onClick={() => setIsContactOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="Your name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="What's this about?"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  style={styles.textarea}
                  placeholder="Your message here..."
                  rows={5}
                />
              </div>

              <button type="submit" className='submit' style={styles.submitBtn}>
                SEND MESSAGE ↗
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '2rem 5%',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: `
      inset 0 0 10px rgba(255, 255, 255, 0.3), 
      0 0 15px rgba(0, 0, 0, 0.4)
    `
  },
  navLinks: { 
    display: 'flex', 
    gap: '2rem', 
    fontSize: '0.9rem', 
    letterSpacing: '1px' 
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },
  contactCard: {
    backgroundColor: '#1a1a1a',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '15px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: `
      inset 0 0 20px rgba(255, 255, 255, 0.1),
      0 0 30px rgba(0, 0, 0, 0.5)
    `,
    animation: 'slideIn 0.3s ease-out'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    margin: 0,
    fontWeight: 'bold'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  label: {
    color: '#fff',
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
    fontWeight: '500'
  },
  input: {
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s'
  },
  textarea: {
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    transition: 'all 0.3s'
  },
  submitBtn: {
    marginTop: '1rem',
    width: '100%'
  }
};