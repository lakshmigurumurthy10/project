import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;

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
`;

const LoginOptionsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const LoginOption = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const LoginIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #00d9f5;
`;

const LoginTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const LoginDescription = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: #aaa;
`;

const HomePage = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showContent, setShowContent] = useState(false);
  
  const greetings = [
    { text: 'Welcome', language: 'English' },
    { text: 'नमस्ते', language: 'Hindi' },
    { text: 'ಸುಸ್ವಾಗತ', language: 'Kannada' },
    { text: 'Bienvenue', language: 'French' },
    { text: '欢迎', language: 'Chinese' },
  ];

  useEffect(() => {
    // Show initial title animation
    setTimeout(() => {
      setShowContent(true);
    }, 3000);

    // Cycle through greetings
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HomeContainer>
      <Navbar />
      <HeroSection>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Title
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
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
              transition={{ delay: 1 }}
            >
              Welcome to RAM – Resource Allocation Management, a smart timetable generator for BMS College for Women. 
              Our tool automates scheduling, simplifying the process for both teachers and students. 
              With a user-friendly interface, RAM streamlines complex tasks, enhancing productivity. 
              Say goodbye to manual planning and enjoy efficient, hassle-free timetable management!
            </Description>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h2>Choose Your Login</h2>
            </motion.div>

            <LoginOptionsContainer
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, staggerChildren: 0.2 }}
            >
              <LoginOption
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                as={Link}
                to="/login/admin"
              >
                <LoginIcon>
                  <FaUserCog />
                </LoginIcon>
                <LoginTitle>Admin</LoginTitle>
                <LoginDescription>Manage timetables and resources</LoginDescription>
              </LoginOption>

              <LoginOption
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                as={Link}
                to="/login/teacher"
              >
                <LoginIcon>
                  <FaChalkboardTeacher />
                </LoginIcon>
                <LoginTitle>Teacher</LoginTitle>
                <LoginDescription>View and manage your schedule</LoginDescription>
              </LoginOption>

              <LoginOption
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                as={Link}
                to="/login/student"
              >
                <LoginIcon>
                  <FaUserGraduate />
                </LoginIcon>
                <LoginTitle>Student</LoginTitle>
                <LoginDescription>Access your class timetable</LoginDescription>
              </LoginOption>
            </LoginOptionsContainer>
          </>
        )}
      </HeroSection>
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;