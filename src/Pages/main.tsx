import { motion, type Variants } from 'framer-motion';
import { Hero } from '../Components/Hero';
import { Navbar } from '../Components/navbar';
import '../App.css';

const Main = () => {
  const mainVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const heroVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  return (
    <motion.main 
      style={{ 
        maxWidth: '100%',
        width: '100vw',
        margin: '0 auto',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
      variants={mainVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={heroVariants}>
        <Hero />
      </motion.div>
    </motion.main>
  );
}

export default Main;