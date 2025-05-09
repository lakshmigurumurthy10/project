import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

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

// Feature Highlights Component Styling
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.8rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #00d9f5;
    font-weight: 600;
  }
  
  p {
    color: #bbb;
    line-height: 1.6;
  }
  
  &:hover {
    border: 1px solid rgba(0, 217, 245, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 217, 245, 0.1);
  }
`;

const FeatureIntro = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  
  p {
    max-width: 800px;
    margin: 0 auto;
    color: #aaa;
    line-height: 1.6;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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
const FeatureHighlights = () => {
  const featureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      title: "Smart Scheduling",
      description: "Automated algorithms create optimal timetables considering all constraints"
    },
    {
      title: "Real-time Updates",
      description: "Changes reflect instantly across all user interfaces"
    },
    {
      title: "Conflict Detection",
      description: "Automatically identifies and resolves scheduling conflicts"
    },
    {
      title: "User-friendly",
      description: "Intuitive interface designed for all technical levels"
    }
  ];
  
  return (
    <FeaturesSection ref={featureRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <FeatureIntro variants={itemVariants}>
          <motion.h2 variants={itemVariants}>About RAM</motion.h2>
          <motion.p variants={itemVariants}>
            Welcome to RAM – Resource Allocation Management, a smart timetable generator for BMS College for Women. 
            Our tool automates scheduling, simplifying the process for both teachers and students.
          </motion.p>
        </FeatureIntro>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </motion.div>
    </FeaturesSection>
  );
};