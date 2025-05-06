import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserCog, 
  FaLock, 
  FaEnvelope, 
  FaUser,
  FaIdCard
} from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
`;

const AuthContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const AuthCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const AuthIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #00d9f5;
`;

const AuthTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const AuthSubtitle = styled.h3`
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

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#00d9f5' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#00d9f5' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ErrorMessage = styled.div`
  color: #ff5757;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(255, 87, 87, 0.1);
`;

const SuccessMessage = styled.div`
  color: #00f5a0;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(0, 245, 160, 0.1);
`;

const AuthPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('login');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    idNumber: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    
    // Login using context
    setTimeout(() => {
      const success = login({
        email: loginData.email,
        name: loginData.email.split('@')[0], // Mock name from email
      }, role);
      
      if (!success) {
        setError('Invalid email or password. User may not exist.');
      }
      // Navigation is handled by the useEffect above when isAuthenticated changes
      
      setLoading(false);
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.idNumber) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    // Register using context
    setTimeout(() => {
      const success = register({
        name: registerData.name,
        email: registerData.email,
        idNumber: registerData.idNumber
      }, role);
      
      if (success) {
        setSuccess(`Registration successful! You can now login as a ${role}.`);
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          idNumber: ''
        });
        setActiveTab('login');
      } else {
        setError('Registration failed. Email may already be in use.');
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
        return 'Admin';
      case 'teacher':
        return 'Teacher';
      case 'student':
        return 'Student';
      default:
        return 'User';
    }
  };

  const getRoleSubtitle = () => {
    if (activeTab === 'login') {
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
    } else {
      switch (role) {
        case 'admin':
          return 'Create a new admin account';
        case 'teacher':
          return 'Register as a new teacher';
        case 'student':
          return 'Register as a new student';
        default:
          return 'Create a new account';
      }
    }
  };

  return (
    <AuthContainer>
      <Navbar />
      <AuthContent>
        <AuthCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthIcon>
            {getRoleIcon()}
          </AuthIcon>
          <AuthTitle>{getRoleTitle()} Portal</AuthTitle>
          <AuthSubtitle>{getRoleSubtitle()}</AuthSubtitle>
          
          <TabContainer>
            <Tab 
              active={activeTab === 'login'} 
              onClick={() => {
                setActiveTab('login');
                setError('');
                setSuccess('');
              }}
            >
              Login
            </Tab>
            <Tab 
              active={activeTab === 'register'} 
              onClick={() => {
                setActiveTab('register');
                setError('');
                setSuccess('');
              }}
            >
              Sign Up
            </Tab>
          </TabContainer>
          
          {activeTab === 'login' ? (
            <Form onSubmit={handleLoginSubmit}>
              <FormGroup>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={handleLoginChange}
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
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </FormGroup>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              
              <SubmitButton
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </SubmitButton>
            </Form>
          ) : (
            <Form onSubmit={handleRegisterSubmit}>
              <FormGroup>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <InputIcon>
                  <FaIdCard />
                </InputIcon>
                <Input
                  type="text"
                  name="idNumber"
                  placeholder={`${getRoleTitle()} ID Number`}
                  value={registerData.idNumber}
                  onChange={handleRegisterChange}
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
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </SubmitButton>
            </Form>
          )}
        </AuthCard>
      </AuthContent>
      <Footer />
    </AuthContainer>
  );
};

export default AuthPage;