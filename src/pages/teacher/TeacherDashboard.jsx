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

const TimetableSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
`;

const TimetableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TimetableTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  color: #1a1a2e;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  }
`;

const Tab = styled.button`
  background: ${props => props.active ? 'linear-gradient(90deg, #00f5a0, #00d9f5)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#1a1a2e' : '#fff'};
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(90deg, #00f5a0, #00d9f5)' : 'rgba(255, 255, 255, 0.2)'};
  }

  @media (max-width: 768px) {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

const TimetableGrid = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
`;

const TimetableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr 1fr 1.2fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    border-bottom: none;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
`;

const TimetableHeaderCell = styled.div`
  padding: 1rem;
  font-weight: 600;
  color: #00d9f5;
  background: rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimetableCell = styled.div`
  padding: 1rem;
  color: #fff;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;

    &:before {
      content: attr(data-label);
      font-weight: 600;
      color: #00d9f5;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const TodayClassesSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
`;

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ClassCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 3px solid #00d9f5;
`;

const ClassTime = styled.div`
  font-size: 0.9rem;
  color: #00d9f5;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ClassSubject = styled.h4`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ClassDetails = styled.div`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Full Timetable Grid Styles
const FullTimetableSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
`;

const FullTimetableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

const FullTimetableTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const FullTimetableTh = styled.th`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.3);
  color: #00d9f5;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FullTimetableTd = styled.td`
  padding: 1rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: top;
  height: 80px;

  &.lunch {
    background: rgba(0, 217, 245, 0.1);
    font-weight: bold;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  &.time-header {
    font-weight: 600;
    background: rgba(0, 0, 0, 0.2);
  }
  
  &.day-header {
    font-weight: 600;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const ClassBlock = styled.div`
  background: rgba(0, 217, 245, 0.1);
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  border-left: 3px solid #00d9f5;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ClassInfo = styled.div`
  margin-top: 0.25rem;
  opacity: 0.7;
  font-size: 0.75rem;
`;

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeDay, setActiveDay] = useState('monday');
  const [currentDayName, setCurrentDayName] = useState('');
  const fullTimetableRef = useRef(null);

  // Mock data for the timetable
  const mockTimetable = {
    monday: [
      { time: '9:00 - 10:00', subject: 'Database Management', room: 'CS-201', class: 'BCA 5th Sem' },
      { time: '11:00 - 12:00', subject: 'Software Engineering', room: 'CS-301', class: 'MCA 1st Sem' },
      { time: '2:00 - 3:00', subject: 'Project Guidance', room: 'Lab-4', class: 'BCA 6th Sem' },
    ],
    tuesday: [
      { time: '9:00 - 11:00', subject: 'Web Technologies Lab', room: 'Lab-3', class: 'BCA 4th Sem' },
      { time: '1:00 - 2:00', subject: 'DBMS', room: 'CS-201', class: 'BCA 3rd Sem' },
    ],
    wednesday: [
      { time: '10:00 - 11:00', subject: 'Data Structures', room: 'CS-102', class: 'BCA 2nd Sem' },
      { time: '11:00 - 1:00', subject: 'Software Engineering Lab', room: 'Lab-2', class: 'MCA 1st Sem' },
      { time: '2:00 - 3:00', subject: 'Faculty Meeting', room: 'Conference Room', class: '' },
    ],
    thursday: [
      { time: '9:00 - 10:00', subject: 'Database Management', room: 'CS-201', class: 'BCA 5th Sem' },
      { time: '11:00 - 1:00', subject: 'DBMS Lab', room: 'Lab-1', class: 'BCA 3rd Sem' },
    ],
    friday: [
      { time: '9:00 - 10:00', subject: 'SOFTWARE ENGINEERING', room: 'CS-301', class: 'MCA 1st Sem' },
      { time: '10:00 - 11:00', subject: 'Data Structures', room: 'CS-102', class: 'BCA 2nd Sem' },
      { time: '2:00 - 4:00', subject: 'Department Meeting', room: 'Seminar Hall', class: '' },
    ],
    saturday: [
      { time: '9:00 - 10:00', subject: 'CLASSROOM TRAINING', room: 'CS-105', class: 'BCA All Semesters' },
      { time: '10:00 - 11:00', subject: 'PLACEMENT TRAINING', room: 'CS-102', class: 'Final Year Students' },
    ],
  };

  // Time slots for the full grid timetable
  const timeSlots = [
    '9:00-10:00', 
    '10:00-11:00', 
    '11:00-12:00', 
    '12:00-1:00', 
    '1:00-2:00', 
    '2:00-3:00', 
    '3:00-4:00', 
    '4:00-5:00'
  ];
  
  // Days for the full grid timetable
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Map classes to time slots for the full grid timetable
  const getClassForTimeSlot = (day, timeSlot) => {
    const dayLowerCase = day.toLowerCase();
    const [startTime] = timeSlot.split('-');
    
    if (timeSlot === '12:00-1:00') {
      return { isLunch: true };
    }
    
    for (const classItem of mockTimetable[dayLowerCase] || []) {
      const classStartTime = classItem.time.split(' - ')[0];
      if (classStartTime === startTime.replace('-', ':')) {
        return { class: classItem };
      }
    }
    return null;
  };



  useEffect(() => {
    // Get current day name
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    setCurrentDayName(today);
    setActiveDay(today === 'sunday' ? 'monday' : today);
  }, []);

  const handleDownloadTimetable = async () => {
    if (fullTimetableRef.current) {
      try {
        const canvas = await html2canvas(fullTimetableRef.current, {
          backgroundColor: '#16213e',
          scale: 2, // Higher quality
        });
        
        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating timetable image:', error);
        alert('Failed to download timetable as image');
      }
    }
  };

  const handlePrintTimetable = () => {
    if (fullTimetableRef.current) {
      const printWindow = window.open('', '_blank');
      
      const styles = `
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #fff; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
          .lunch { background-color: #e6f7ff; font-weight: bold; }
          .class-block { border-left: 3px solid #0099cc; padding: 5px; margin-bottom: 5px; background: #f7f7f7; }
          .class-info { font-size: 12px; color: #666; }
          h1 { text-align: center; margin-bottom: 20px; }
          .print-btn { display: block; margin: 20px auto; padding: 10px 20px; cursor: pointer; }
          @media print {
            .print-btn { display: none; }
          }
        </style>
      `;
      
      let printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Weekly Timetable</title>
          ${styles}
        </head>
        <body>
          <button class="print-btn" onclick="window.print()">Print Timetable</button>
          <h1>Weekly Timetable - ${user?.name || 'Teacher'}</h1>
          <table>
            <tr>
              <th></th>
              ${timeSlots.map(slot => `<th>${slot}</th>`).join('')}
            </tr>
      `;
      
      days.forEach(day => {
        printContent += `
          <tr>
            <th>${day}</th>
            ${timeSlots.map(timeSlot => {
              const classData = getClassForTimeSlot(day, timeSlot);
              
              if (classData?.isLunch) {
                return `<td class="lunch">LUNCH</td>`;
              } else if (classData?.class) {
                const { subject, room, class: className } = classData.class;
                return `
                  <td>
                    <div class="class-block">
                      ${subject}
                      <div class="class-info">${room} | ${className}</div>
                    </div>
                  </td>
                `;
              } else {
                return `<td></td>`;
              }
            }).join('')}
          </tr>
        `;
      });
      
      printContent += `
          </table>
        </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <DashboardContainer>
      <Navbar />
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome, {user?.name || 'Teacher'}</WelcomeTitle>
          <WelcomeText>
            This is your dashboard for the Resource Allocation Management system. 
            From here, you can view your timetable, access class resources, and manage your schedule.
          </WelcomeText>
        </WelcomeSection>
        
        <TodayClassesSection>
          <TimetableHeader>
            <TimetableTitle>Today's Classes</TimetableTitle>
          </TimetableHeader>
          
          {mockTimetable[currentDayName] && mockTimetable[currentDayName].length > 0 ? (
            <ClassesGrid>
              {mockTimetable[currentDayName].map((classItem, index) => (
                <ClassCard key={index}>
                  <ClassTime>
                    <FaClock /> {classItem.time}
                  </ClassTime>
                  <ClassSubject>{classItem.subject}</ClassSubject>
                  <ClassDetails>
                    <FaSchool /> {classItem.room}
                  </ClassDetails>
                  {classItem.class && (
                    <ClassDetails>
                      <FaUserCircle /> {classItem.class}
                    </ClassDetails>
                  )}
                </ClassCard>
              ))}
            </ClassesGrid>
          ) : (
            <p style={{ color: '#aaa' }}>No classes scheduled for today.</p>
          )}
        </TodayClassesSection>
        
        <TimetableSection>
          <TimetableHeader>
            <TimetableTitle>Weekly Timetable</TimetableTitle>
            <ActionButton 
              onClick={handleDownloadTimetable}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Timetable
            </ActionButton>
          </TimetableHeader>
          
          <TabContainer>
            {Object.keys(mockTimetable).map((day) => (
              <Tab 
                key={day}
                active={activeDay === day}
                onClick={() => setActiveDay(day)}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Tab>
            ))}
          </TabContainer>
          
          <TimetableGrid>
            <TimetableRow>
              <TimetableHeaderCell>Time</TimetableHeaderCell>
              <TimetableHeaderCell>Subject</TimetableHeaderCell>
              <TimetableHeaderCell>Room</TimetableHeaderCell>
              <TimetableHeaderCell>Class</TimetableHeaderCell>
            </TimetableRow>
            
            {mockTimetable[activeDay] && mockTimetable[activeDay].map((classItem, index) => (
              <TimetableRow key={index}>
                <TimetableCell data-label="Time">{classItem.time}</TimetableCell>
                <TimetableCell data-label="Subject">{classItem.subject}</TimetableCell>
                <TimetableCell data-label="Room">{classItem.room}</TimetableCell>
                <TimetableCell data-label="Class">{classItem.class}</TimetableCell>
              </TimetableRow>
            ))}
          </TimetableGrid>
        </TimetableSection>
        
        <FullTimetableSection>
          <TimetableHeader>
            <TimetableTitle>Complete TimeTable ⏳</TimetableTitle>
            <ButtonsContainer>
              <ActionButton 
                onClick={handlePrintTimetable}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPrint /> Print Schedule
              </ActionButton>
              <ActionButton 
                onClick={handleDownloadTimetable}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download Schedule
              </ActionButton>
            </ButtonsContainer>
          </TimetableHeader>
          
          <FullTimetableContainer ref={fullTimetableRef}>
            <FullTimetableTable>
              <thead>
                <tr>
                  <FullTimetableTh></FullTimetableTh>
                  {timeSlots.map((slot, index) => (
                    <FullTimetableTh key={index}>{slot}</FullTimetableTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <FullTimetableTd className="day-header">{day}</FullTimetableTd>
                    {timeSlots.map((timeSlot, slotIndex) => {
                      const classData = getClassForTimeSlot(day, timeSlot);
                      
                      if (classData?.isLunch) {
                        return <FullTimetableTd key={slotIndex} className="lunch">LUNCH</FullTimetableTd>;
                      } else if (classData?.class) {
                        const { subject, room, class: className } = classData.class;
                        return (
                          <FullTimetableTd key={slotIndex}>
                            <ClassBlock>
                              {subject}
                              <ClassInfo>{room} | {className}</ClassInfo>
                            </ClassBlock>
                          </FullTimetableTd>
                        );
                      } else {
                        return <FullTimetableTd key={slotIndex}></FullTimetableTd>;
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </FullTimetableTable>
          </FullTimetableContainer>
        </FullTimetableSection>
      </DashboardContent>
      <Footer />
    </DashboardContainer>
  );
};

export default TeacherDashboard;