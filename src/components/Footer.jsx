import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: rgba(22, 33, 62, 0.8);
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterText = styled.p`
  color: #aaa;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #00d9f5;
    transform: translateY(-3px);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>RAM System</FooterLogo>
        <FooterText>
          Resource Allocation Management for BMS College for Women
        </FooterText>
        <FooterText>
          Made with <FaHeart style={{ color: '#00f5a0' }} /> in 2025
        </FooterText>
        <SocialLinks>
          <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;