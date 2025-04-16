import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog, FaLock, FaEnvelope } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
`;

const LoginContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const LoginIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #00d9f5;
`;

const LoginTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const LoginSubtitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #aaa;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00d9f5;
    box-shadow: 0 0 0 2px rgba(0, 217, 245, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  color: #1a1a2e;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff5757;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(255, 87, 87, 0.1);
`;

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, navigate, role]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    
    // Mock login - in a real app, this would call an API
    setTimeout(() => {
      const success = login({
        email: formData.email,
        name: formData.email.split('@')[0], // Mock name from email
      }, role);
      
      if (success) {
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          case 'student':
            navigate('/student/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid email or password');
      }
      
      setLoading(false);
    }, 1000);
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'admin':
        return <FaUserCog />;
      case 'teacher':
        return <FaChalkboardTeacher />;
      case 'student':
        return <FaUserGraduate />;
      default:
        return <FaUserGraduate />;
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Login';
      case 'teacher':
        return 'Teacher Login';
      case 'student':
        return 'Student Login';
      default:
        return 'Login';
    }
  };

  const getRoleSubtitle = () => {
    switch (role) {
      case 'admin':
        return 'Access your admin dashboard';
      case 'teacher':
        return 'View and manage your teaching schedule';
      case 'student':
        return 'Check your class timetable';
      default:
        return 'Sign in to continue';
    }
  };

  return (
    <LoginContainer>
      <Navbar />
      <LoginContent>
        <LoginCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginIcon>
            {getRoleIcon()}
          </LoginIcon>
          <LoginTitle>{getRoleTitle()}</LoginTitle>
          <LoginSubtitle>{getRoleSubtitle()}</LoginSubtitle>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <SubmitButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </SubmitButton>
          </Form>
        </LoginCard>
      </LoginContent>
      <Footer />
    </LoginContainer>
  );
};

export default LoginPage;