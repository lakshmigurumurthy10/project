import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaBook, 
  FaCog
} from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
  `;

const DashboardContent = styled.div`
  flex: 1;
  padding: 7rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeSection = styled.div`
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: #aaa;
  max-width: 800px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-right: 1.5rem;
  color: #00d9f5;
`;

const StatContent = styled.div``;

const StatValue = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #aaa;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ActionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ActionIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #00d9f5;
`;

const ActionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ActionDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
`;

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  
  const stats = [
    { icon: <FaUsers />, value: '42', label: 'Teachers' },
    { icon: <FaCalendarAlt />, value: '35', label: 'Active Timetables' },
    { icon: <FaBook />, value: '4 PDFs', label: 'Syllabus' }
  ];
  
  
  const actions = [
    {
      icon: <FaUsers />,
      title: 'Manage Teachers',
      description: 'View, add, edit, or delete teacher profiles from the system.',
      link: '/admin/manage-teachers'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Generate Timetable',
      description: 'Create and publish class timetables. (More to be added)',
      link: '/admin/generate'
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'View Lab Timetable',
      description: 'Access the lab timetable with view and download options.',
      link: '/admin/lab-timetable'
    },
    {
      icon: <FaBook />,
      title: 'Syllabus',
      description: 'Download semester-wise syllabus PDFs.',
      link: '/admin/syllabus'
    }
  ];
  

  return (
    <DashboardContainer>
      <Navbar />
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome, {user?.name || 'Admin'}</WelcomeTitle>
          <WelcomeText>
            This is your administrative dashboard for the Resource Allocation Management system. 
            From here, you can manage teachers, classes, and generate timetables.
          </WelcomeText>
        </WelcomeSection>
        
        <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Overview</h2>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatContent>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatContent>
            </StatCard>
          ))}
        </StatsGrid>
        
        <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Quick Actions</h2>
        <ActionsGrid>
          {actions.map((action, index) => (
            <ActionCard
              key={index}
              as={Link}
              to={action.link}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <ActionIcon>{action.icon}</ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
            </ActionCard>
          ))}
        </ActionsGrid>
      </DashboardContent>
      <Footer />
    </DashboardContainer>
  );
};

export default AdminDashboard;