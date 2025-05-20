import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  FaCalendarAlt, 
  FaBook,
  FaDownload,
  FaClock,
  FaSchool,
  FaUserCircle,
  FaGraduationCap,
  FaPrint
} from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Modal styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const ModalTitle = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00d9f5;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00d9f5;
  }
  
  option {
    background: #16213e;
    color: #fff;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(90deg, #00f5a0, #00d9f5);
  border: none;
  border-radius: 5px;
  padding: 0.75rem;
  color: #1a1a2e;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #00d9f5;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeDay, setActiveDay] = useState('monday');
  const [currentDayName, setCurrentDayName] = useState('');
  const fullTimetableRef = useRef(null);
  
  // States for the modal
  const [showModal, setShowModal] = useState(true);
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the timetable data
  const [timetableData, setTimetableData] = useState(null);

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

  // Mock data for the student timetable (will be replaced by API data)
  const mockTimetable = {
    monday: [
      { time: '9:00 - 10:00', subject: 'Database Management', room: 'CS-201', teacher: 'Prof. Johnson' },
      { time: '11:00 - 12:00', subject: 'Object Oriented Programming', room: 'CS-102', teacher: 'Prof. Williams' },
      { time: '2:00 - 3:00', subject: 'Web Development', room: 'Lab-4', teacher: 'Prof. Martinez' },
    ],
    tuesday: [
      { time: '9:00 - 11:00', subject: 'Web Technologies Lab', room: 'Lab-3', teacher: 'Prof. Martinez' },
      { time: '1:00 - 2:00', subject: 'Computer Networks', room: 'CS-301', teacher: 'Prof. Davis' },
    ],
    wednesday: [
      { time: '10:00 - 11:00', subject: 'Data Structures', room: 'CS-102', teacher: 'Prof. Smith' },
      { time: '11:00 - 1:00', subject: 'Operating Systems Lab', room: 'Lab-2', teacher: 'Prof. Thompson' },
      { time: '2:00 - 3:00', subject: 'Career Counseling', room: 'Seminar Hall', teacher: 'Prof. Johnson' },
    ],
    thursday: [
      { time: '9:00 - 10:00', subject: 'Database Management', room: 'CS-201', teacher: 'Prof. Johnson' },
      { time: '11:00 - 1:00', subject: 'DBMS Lab', room: 'Lab-1', teacher: 'Prof. Johnson' },
    ],
    friday: [
      { time: '9:00 - 10:00', subject: 'Computer Networks', room: 'CS-301', teacher: 'Prof. Davis' },
      { time: '10:00 - 11:00', subject: 'Data Structures', room: 'CS-102', teacher: 'Prof. Smith' },
      { time: '2:00 - 4:00', subject: 'Python Programming', room: 'Lab-4', teacher: 'Prof. Wilson' },
    ],
    saturday: [
      { time: '10:00 - 12:00', subject: 'Project Work', room: 'Lab-4', teacher: 'Prof. Martinez' },
    ],
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!year || !section) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Make API call to fetch timetable data
    try {
      const response = await fetch('http://localhost:5000/generate_timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year,
          section,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch timetable data');
      }
      
      const data = await response.json();
      setTimetableData(data);
      setShowModal(false);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
      setError('Failed to fetch timetable data. Please try again.');
      // Use mock data if API fails
      setTimetableData(mockTimetable);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Map classes to time slots for the full grid timetable
  const getClassForTimeSlot = (day, timeSlot) => {
    const dayLowerCase = day.toLowerCase();
    const [startTime] = timeSlot.split('-');
    
    if (timeSlot === '12:00-1:00') {
      return { isLunch: true };
    }
    
    const timetableToUse = timetableData || mockTimetable;
    
    for (const classItem of timetableToUse[dayLowerCase] || []) {
      const classStartTime = classItem.time.split(' - ')[0];
      if (classStartTime === startTime.replace('-', ':')) {
        return { class: classItem };
      }
    }
    return null;
  };

  const stats = [
    { icon: <FaCalendarAlt />, value: '18', label: 'Weekly Classes' },
    { icon: <FaBook />, value: '6', label: 'Subjects' },
    { icon: <FaGraduationCap />, value: `${year || 'BCA'} ${section || '5th'}`, label: 'Current Semester' },
  ];

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
    } else {
      // Create a hidden element to download the timetable
      const element = document.createElement('a');
      
      // Generate CSV content for the timetable
      let csvContent = 'Day,Time,Subject,Room,Teacher\n';
      
      const timetableToUse = timetableData || mockTimetable;
      
      Object.entries(timetableToUse).forEach(([day, classes]) => {
        classes.forEach(classItem => {
          csvContent += `${day},${classItem.time},"${classItem.subject}",${classItem.room},"${classItem.teacher}"\n`;
        });
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      element.href = URL.createObjectURL(blob);
      element.download = 'student_timetable.csv';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
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
          <h1>Weekly Timetable - ${user?.name || 'Student'}</h1>
          <p style="text-align: center;">${year || 'BCA'} ${section || '5th'} Semester</p>
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
                const { subject, room, teacher } = classData.class;
                return `
                  <td>
                    <div class="class-block">
                      ${subject}
                      <div class="class-info">${room} | ${teacher}</div>
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
    } else {
      // Create a new window with the timetable formatted for printing
      const printWindow = window.open('', '_blank');
      
      // Create a stylesheet for the print window
      const styles = `
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { text-align: center; margin-bottom: 20px; }
          .day-title { 
            margin-top: 20px; 
            font-size: 18px; 
            text-transform: capitalize; 
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 15px;
          }
          th { 
            background-color: #f2f2f2; 
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
          }
          td { 
            padding: 8px;
            border: 1px solid #ddd;
          }
          @media print {
            .no-print { display: none; }
            body { margin: 0; padding: 15px; }
          }
        </style>
      `;
      
      // Create the HTML content for printing
      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Student Timetable</title>
          ${styles}
        </head>
        <body>
          <button class="no-print" onclick="window.print();" style="padding: 10px; margin: 20px; cursor: pointer;">Print Timetable</button>
          <h1>Weekly Timetable - ${user?.name || 'Student'}</h1>
          <p style="text-align: center;">${year || 'BCA'} ${section || '5th'} Semester</p>
      `;
      
      const timetableToUse = timetableData || mockTimetable;
      
      // Add timetable for each day
      Object.entries(timetableToUse).forEach(([day, classes]) => {
        htmlContent += `
          <div class="day-title">${day}</div>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Room</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
        `;
        
        if (classes.length === 0) {
          htmlContent += `
            <tr>
              <td colspan="4">No classes scheduled</td>
            </tr>
          `;
        } else {
          classes.forEach(classItem => {
            htmlContent += `
              <tr>
                <td>${classItem.time}</td>
                <td>${classItem.subject}</td>
                <td>${classItem.room}</td>
                <td>${classItem.teacher}</td>
              </tr>
            `;
          });
        }
        
        htmlContent += `
            </tbody>
          </table>
        `;
      });
      
      htmlContent += `
        </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  };

  return (
    <DashboardContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ModalTitle>Welcome to Your Dashboard</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="year">Enter Your Year</Label>
                <Select 
                  id="year" 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="section">Enter Your Section</Label>
                <Select 
                  id="section" 
                  value={section} 
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                  <option value="E">Section E</option>
                </Select>
              </FormGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <SubmitButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Fetch Timetable'}
              </SubmitButton>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
      
      <Navbar />
      
      <DashboardContent>
        <WelcomeSection>
          <WelcomeTitle>Welcome back, {user?.name || 'Student'}!</WelcomeTitle>
          <WelcomeText>
            Here's your timetable for the {year || 'current'} {section || ''} semester. 
            Stay organized and don't miss any classes.
          </WelcomeText>
        </WelcomeSection>

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

        <TodayClassesSection>
          <TimetableHeader>
            <TimetableTitle>Today's Classes</TimetableTitle>
          </TimetableHeader>

          <ClassesGrid>
            {(timetableData || mockTimetable)[currentDayName]?.map((classItem, index) => (
              <ClassCard key={index}>
                <ClassTime>
                  <FaClock />
                  {classItem.time}
                </ClassTime>
                <ClassSubject>{classItem.subject}</ClassSubject>
                <ClassDetails>
                  <FaSchool />
                  {classItem.room}
                </ClassDetails>
                <ClassDetails>
                  <FaUserCircle />
                  {classItem.teacher}
                </ClassDetails>
              </ClassCard>
            )) || (
              <p style={{ color: '#aaa' }}>No classes scheduled for today</p>
            )}
          </ClassesGrid>
        </TodayClassesSection>

        <TimetableSection>
          <TimetableHeader>
            <TimetableTitle>Weekly Timetable</TimetableTitle>
            <ButtonsContainer>
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadTimetable}
              >
                <FaDownload /> Download
              </ActionButton>
              <ActionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrintTimetable}
              >
                <FaPrint /> Print
              </ActionButton>
            </ButtonsContainer>
          </TimetableHeader>

          <TabContainer>
            {Object.keys(timetableData || mockTimetable).map((day) => (
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
              <TimetableHeaderCell>Teacher</TimetableHeaderCell>
            </TimetableRow>

            {(timetableData || mockTimetable)[activeDay]?.length > 0 ? (
              (timetableData || mockTimetable)[activeDay].map((classItem, index) => (
                <TimetableRow key={index}>
                  <TimetableCell data-label="Time">{classItem.time}</TimetableCell>
                  <TimetableCell data-label="Subject">{classItem.subject}</TimetableCell>
                  <TimetableCell data-label="Room">{classItem.room}</TimetableCell>
                  <TimetableCell data-label="Teacher">{classItem.teacher}</TimetableCell>
                </TimetableRow>
              ))
            ) : (
              <TimetableRow>
                <TimetableCell colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No classes scheduled for this day
                </TimetableCell>
              </TimetableRow>
            )}
          </TimetableGrid>
        </TimetableSection>

        <FullTimetableSection>
          <TimetableHeader>
            <TimetableTitle>Full Week View</TimetableTitle>
          </TimetableHeader>
          
          <FullTimetableContainer ref={fullTimetableRef}>
            <FullTimetableTable>
              <thead>
                <tr>
                  <FullTimetableTh>Time / Day</FullTimetableTh>
                  {timeSlots.map((slot, index) => (
                    <FullTimetableTh key={index}>{slot}</FullTimetableTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <FullTimetableTd className="day-header">{day}</FullTimetableTd>
                    {timeSlots.map((timeSlot, timeIndex) => {
                      const classData = getClassForTimeSlot(day, timeSlot);
                      
                      if (classData?.isLunch) {
                        return <FullTimetableTd key={timeIndex} className="lunch">LUNCH BREAK</FullTimetableTd>;
                      } else if (classData?.class) {
                        const { subject, room, teacher } = classData.class;
                        return (
                          <FullTimetableTd key={timeIndex}>
                            <ClassBlock>
                              {subject}
                              <ClassInfo>{room} | {teacher}</ClassInfo>
                            </ClassBlock>
                          </FullTimetableTd>
                        );
                      } else {
                        return <FullTimetableTd key={timeIndex}></FullTimetableTd>;
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

export default StudentDashboard;