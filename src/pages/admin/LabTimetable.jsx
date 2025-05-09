// Simplified LabTimetable.jsx — Mock data + view/download
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaArrowLeft, FaEye, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 7rem 2rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;
`;

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #00d9f5;
  text-decoration: none;
  font-weight: bold;
`;

const ErrorText = styled.p`
  color: salmon;
`;

const StyledTable = styled.table`
  width: 100%;
  color: #fff;
  margin-top: 2rem;
  border-collapse: collapse;

  th, td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.75rem 1rem;
    text-align: center;
  }

  th {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FileCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  background: ${props => props.primary ? '#00d9f5' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};

  &:hover {
    background: ${props => props.primary ? '#00c2dc' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const LabTimetable = () => {
  const [labData, setLabData] = useState([]);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockData = {
          entries: [
            { year: 1, section: 'b', day: 'Monday', time: '11:00 - 14:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'Java' },
            { year: 1, section: 'b', day: 'Monday', time: '11:00 - 14:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'DBMS' },
            { year: 1, section: 'c', day: 'Monday', time: '14:00 - 17:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'Java' },
            { year: 1, section: 'c', day: 'Monday', time: '14:00 - 17:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'DBMS' },
            { year: 1, section: 'a', day: 'Monday', time: '08:00 - 11:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'Java' },
            { year: 1, section: 'a', day: 'Monday', time: '08:00 - 11:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'DBMS' },
            { year: 1, section: 'a', day: 'Tuesday', time: '11:00 - 14:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'DBMS' },
            { year: 1, section: 'a', day: 'Tuesday', time: '11:00 - 14:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'Java' },
            { year: 1, section: 'b', day: 'Tuesday', time: '14:00 - 17:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'DBMS' },
            { year: 1, section: 'b', day: 'Tuesday', time: '14:00 - 17:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'Java' },
            { year: 1, section: 'd', day: 'Tuesday', time: '08:00 - 11:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'Java' },
            { year: 1, section: 'd', day: 'Tuesday', time: '08:00 - 11:00', batch: 'Batch 2', lab: 'Lab 2', subject: 'DBMS' },
            { year: 1, section: 'd', day: 'Wednesday', time: '11:00 - 14:00', batch: 'Batch 1', lab: 'Lab 1', subject: 'DBMS' }
          ],
          fileUrl: '/sample/lab-timetable.pdf'
        };

        setLabData(mockData.entries);
        setFileUrl(mockData.fileUrl);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch lab timetable.');
      }
    };

    fetchTimetable();
  }, []);

  return (
    <Container>
      <Navbar />
      <Content>
        <BackButton to="/admin/dashboard">← Back to Dashboard</BackButton>
        <Header>Lab Timetable</Header>

        {error && <ErrorText>{error}</ErrorText>}

        {labData.length > 0 && (
          <StyledTable>
            <thead>
              <tr>
                <th>Year</th>
                <th>Section</th>
                <th>Day</th>
                <th>Time Slot</th>
                <th>Batch</th>
                <th>Lab</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {labData.map((item, index) => (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td>{item.section}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>{item.batch}</td>
                  <td>{item.lab}</td>
                  <td>{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        )}

        {fileUrl && (
          <FileCard>
            <p>Click below to view or download the lab timetable PDF:</p>
            <ButtonGroup>
              <ActionButton href={fileUrl} target="_blank">
                <FaEye style={{ marginRight: '0.5rem' }} /> View
              </ActionButton>
              <ActionButton href={fileUrl} download primary>
                <FaDownload style={{ marginRight: '0.5rem' }} /> Download
              </ActionButton>
            </ButtonGroup>
          </FileCard>
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default LabTimetable;
