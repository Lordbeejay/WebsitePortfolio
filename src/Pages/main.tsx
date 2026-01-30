
import { Hero } from '../Components/Hero';

import { Navbar } from '../Components/navbar';
import '../App.css';
const Main = () => {
  return (
      <main style={{ 
        maxWidth: '100%',
        width: '100vw',
        margin: '0 auto',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <Hero />
      </main>
    );
}

export default Main