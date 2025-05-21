import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaDownload,
  FaBook,
  FaBell,
  FaUserCircle,
  FaClock,
  FaSchool,
  FaPrint
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


const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
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
  font-size: 2rem;
  margin-right: 1rem;
  color: #00d9f5;
`;


const StatContent = styled.div``;


const StatLabel = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0;
`;


const StatValue = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #fff;
`;


const TableWrapper = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;


const TableHeader = styled.th`
  padding: 8px;
  border: 1px solid #ccc;
  background: #f4f4f4;
`;


const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;


const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  const [timetableData, setTimetableData] = useState([]);


  useEffect(() => {
    async function fetchTimetable() {
      try {
        const response = await fetch(`http://localhost:5000/get_timetable_teacher?teacher=${user.full_name}`);
        const raw = await response.json();


        const parsed = raw.map(entry => {
          const data = JSON.parse(entry.timetable);
          return {
            id: entry.id,
            teacher: data.teacher,
            table_data: data.table_data
          };
        });


        setTimetableData(parsed);
      } catch (error) {
        console.error("Error fetching teacher timetable:", error);
      }
    }


    if (user?.full_name) {
      fetchTimetable();
    }
  }, [user]);


  return (
    <DashboardContainer>
      <Navbar />
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome, {user?.full_name || "Teacher"} 👋</WelcomeTitle>
          <WelcomeText>This is your personalized dashboard. Below you can find quick stats and your teaching schedule.</WelcomeText>
        </WelcomeSection>


        <StatsGrid>
          <StatCard whileHover={{ scale: 1.05 }}>
            <StatIcon><FaBook /></StatIcon>
            <StatContent>
              <StatLabel>Subjects</StatLabel>
              <StatValue>5</StatValue>
            </StatContent>
          </StatCard>


          <StatCard whileHover={{ scale: 1.05 }}>
            <StatIcon><FaCalendarAlt /></StatIcon>
            <StatContent>
              <StatLabel>Weekly Hours</StatLabel>
              <StatValue>18</StatValue>
            </StatContent>
          </StatCard>


          <StatCard whileHover={{ scale: 1.05 }}>
            <StatIcon><FaBell /></StatIcon>
            <StatContent>
              <StatLabel>Notifications</StatLabel>
              <StatValue>2</StatValue>
            </StatContent>
          </StatCard>
        </StatsGrid>


        {/* ✅ Complete TimeTable Section */}
        <SectionTitle>Complete TimeTable</SectionTitle>
{timetableData.length > 0 ? (
  (() => {
    const final = timetableData[timetableData.length - 1];


    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#00d9f5', color: '#1a1a2e' }}>
              {Object.keys(final.table_data[0]).map((header, i) => (
                <th key={i} style={{ padding: '12px', border: '1px solid #ccc' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {final.table_data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  })()
) : (
  <p style={{ color: 'white' }}>No timetable available.</p>
)}


      </DashboardContent>
      <Footer />
    </DashboardContainer>
  );
};


export default TeacherDashboard;



