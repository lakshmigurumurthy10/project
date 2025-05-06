import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog, FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  overflow-x: hidden;
  position: relative;
`;

// Modern Particle Background Component
const ParticleBackground = () => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                ${Math.floor(Math.random() * 100 + 155)}, 
                255, 
                ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Connect particles with lines if they're close enough
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(0, 217, 245, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #00d9f5;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Greeting = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: 300;
`;

const Description = styled(motion.p)`
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #aaa;
  font-size: 1.1rem;
  letter-spacing: 0.3px;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  svg {
    animation: bounce 2s infinite;
    margin-top: 0.5rem;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

// GlassMorphism styling for the login section
const GlassMorphism = styled.div`
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
  background: rgba(10, 10, 32, 0.4);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const LoginSection = styled(GlassMorphism)`
  margin: 2rem auto 4rem;
  padding: 3rem;
  max-width: 1200px;
  min-height: 500px; /* Ensure the section has minimum height */
  display: block; /* Always display this section */
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    background: linear-gradient(90deg, #00f5a0, #00d9f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
    
    h2 {
      font-size: 2rem;
    }
  }
`;

const LoginOptionsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const LoginOption = styled(motion(Link))`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(225deg, transparent 0%, rgba(0, 217, 245, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    border: 1px solid rgba(0, 217, 245, 0.3);
    box-shadow: 0 10px 30px rgba(0, 217, 245, 0.15);
    
    &:before {
      opacity: 1;
    }
    
    ${props => props.$glow && `
      box-shadow: 0 0 30px ${props.$glow};
    `}
  }
`;

const LoginIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(0, 217, 245, 0.5));
`;

const LoginTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 600;
`;

const LoginDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #bbb;
  line-height: 1.6;
`;

const FeatureHighlight = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #0a0a20;
`;

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const HomePage = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const loginSectionRef = useRef(null);
  
  const greetings = [
    { text: 'Welcome', language: 'English' },
    { text: 'नमस्ते', language: 'Hindi' },
    { text: 'ಸುಸ್ವಾಗತ', language: 'Kannada' },
    { text: 'Bienvenue', language: 'French' },
    { text: '欢迎', language: 'Chinese' },
  ];

  useEffect(() => {
    // Show initial title animation - significantly reduced time
    setTimeout(() => {
      setShowContent(true);
    }, 1000); // Reduced from 2500ms to 1000ms for faster loading

    // Cycle through greetings - slightly reduced time
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 1800); // Kept at 1800ms

    return () => clearInterval(interval);
  }, []);

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HomeContainer>
      <ParticleBackground />
      <Navbar />
      <HeroSection>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Title
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            RAM - Resource Allocation Management
          </Title>
        </motion.div>

        <Greeting
          key={currentGreeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {greetings[currentGreeting].text} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({greetings[currentGreeting].language})</span>
        </Greeting>

        {showContent && (
          <>
            <SubTitle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              BMS College for Women
            </SubTitle>

            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Welcome to RAM – Resource Allocation Management, an intelligent timetable generator for BMS College for Women. 
              Our tool automates complex scheduling tasks, simplifying the process for administrators, teachers and students. 
              With our intuitive interface, RAM transforms tedious planning into efficient, hassle-free timetable management!
            </Description>

            {/* Adding the scroll indicator from the first file */}
            <ScrollIndicator 
              onClick={scrollToLogin}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span>Select Your Role</span>
              <FaChevronDown />
            </ScrollIndicator>
          </>
        )}
      </HeroSection>

      {/* Login section with always visible content */}
      <LoginSection ref={loginSectionRef}>
        <motion.div
          variants={containerVariants}
          initial="visible" 
          animate="visible"
        >
          <motion.h2 variants={itemVariants}>Select Your Account Type</motion.h2>
          
          <LoginOptionsContainer>
            <LoginOption
              to="/auth/admin"
              $glow="rgba(0, 217, 245, 0.2)"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FeatureHighlight>Full Access</FeatureHighlight>
              <LoginIcon>
                <FaUserCog />
              </LoginIcon>
              <LoginTitle>Administrator</LoginTitle>
              <LoginDescription>
                Master control over timetables, resources, and system settings
              </LoginDescription>
            </LoginOption>

            <LoginOption
              to="/auth/teacher"
              $glow="rgba(0, 217, 245, 0.2)"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LoginIcon>
                <FaChalkboardTeacher />
              </LoginIcon>
              <LoginTitle>Faculty</LoginTitle>
              <LoginDescription>
                Access your teaching schedule and manage classroom resources
              </LoginDescription>
            </LoginOption>

            <LoginOption
              to="/auth/student"
              $glow="rgba(0, 217, 245, 0.2)"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LoginIcon>
                <FaUserGraduate />
              </LoginIcon>
              <LoginTitle>Student</LoginTitle>
              <LoginDescription>
                View your personalized class schedule and campus events
              </LoginDescription>
            </LoginOption>
          </LoginOptionsContainer>
        </motion.div>
      </LoginSection>
      
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;