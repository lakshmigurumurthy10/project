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
  border-bottom: 2px solid ${props => props.active ? '#00d9f5' : 'transparent'};
`;


const ErrorMessage = styled.div`
  color: #ff5757;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(255, 87, 87, 0.1);
`;


const AuthPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useContext(AuthContext);


  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    id_number: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${role}/dashboard`);
    }
  }, [isAuthenticated, navigate, role]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);


    if (activeTab === 'login') {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }


      const success = await login({
        email: formData.email,
        password: formData.password
      }, role);


      if (success) {
        navigate(`/${role}/dashboard`);
      } else {
        setError('Invalid email or password');
      }


    } else {
      const { full_name, email, id_number, password, confirm_password } = formData;


      if (!full_name || !email || !id_number || !password || !confirm_password) {
        setError('Please fill out all fields');
        setLoading(false);
        return;
      }


      if (password !== confirm_password) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }


      const success = await register({
        full_name,
        email,
        id_number,
        password,
        confirm_password
      }, role);


      if (success) {
        navigate(`/${role}/dashboard`);
      } else {
        setError('Signup failed. Try a different email or ID.');
      }
    }


    setLoading(false);
  };


  const getRoleIcon = () => {
    switch (role) {
      case 'admin': return <FaUserCog />;
      case 'teacher': return <FaChalkboardTeacher />;
      case 'student': return <FaUserGraduate />;
      default: return <FaUserGraduate />;
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
          <AuthIcon>{getRoleIcon()}</AuthIcon>
          <AuthTitle>{activeTab === 'login' ? 'Login' : 'Sign Up'}</AuthTitle>
          <AuthSubtitle>{role?.toUpperCase()} Portal</AuthSubtitle>


          <TabContainer>
            <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login</Tab>
            <Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>Sign Up</Tab>
          </TabContainer>


          <Form onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <>
                <FormGroup>
                  <InputIcon><FaUser /></InputIcon>
                  <Input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>


                <FormGroup>
                  <InputIcon><FaIdCard /></InputIcon>
                  <Input
                    type="text"
                    name="id_number"
                    placeholder="ID Number"
                    value={formData.id_number}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </>
            )}


            <FormGroup>
              <InputIcon><FaEnvelope /></InputIcon>
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
              <InputIcon><FaLock /></InputIcon>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>


            {activeTab === 'signup' && (
              <FormGroup>
                <InputIcon><FaLock /></InputIcon>
                <Input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            )}


            {error && <ErrorMessage>{error}</ErrorMessage>}


            <SubmitButton whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} type="submit">
              {loading ? (activeTab === 'login' ? 'Logging in...' : 'Signing up...') : activeTab === 'login' ? 'Login' : 'Sign Up'}
            </SubmitButton>
          </Form>
        </AuthCard>
      </AuthContent>
      <Footer />
    </AuthContainer>
  );
};


export default AuthPage;



