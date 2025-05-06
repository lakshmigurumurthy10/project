// Syllabus.jsx — Updated with NEP and SEP categories, and dropdown sections
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaEye, FaFilePdf } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  flex: 1;
  padding: 7rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.2rem;
  color: #fff;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SectionTitle = styled.h2`
  color: #00d9f5;
  margin: 2rem 0 1rem;
`;

const DropdownContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const DropdownTitle = styled.h3`
  color: #fff;
  margin-bottom: 1rem;
`;

const FileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const FileName = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FileActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.a)`
  background: ${props => props.primary ? 'linear-gradient(135deg, #00d9f5 0%, #00adb5 100%)' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #00c2dc 0%, #00969e 100%)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Syllabus = () => {
  const nepSyllabus = [
    { label: '1st & 2nd Semester', url: 'https://www.sabs.ac.in/downloads/bca-syllabus-nep.pdf', filename: 'bca-syllabus-1st-2nd-year-nep.pdf' },
    { label: '3rd & 4th Semester', url: 'https://www.bcu.ac.in/documents/Syllabus-all/New%20UG%20NEP%202021-22/Science/3-4th-sem/BCA%20III%20_%20IV%20Semester%20Syllabus-min.pdf', filename: 'bca-syllabus-3rd-4th-year-nep.pdf' },
    { label: '5th & 6th Semester', url: 'https://www.bcu.ac.in/documents/Syllabus-all/New%20UG%20NEP%202021-22/Science/5th-6th/5th%20&%206th%20Sem%20BCA%20Syllabus.pdf', filename: 'bca-syllabus-5th-6th-year-nep.pdf' }
  ];

  const sepSyllabus = [
    { label: 'SEP BCA Syllabus', url: 'https://www.bcu.ac.in/documents/Syllabus-all/UG%20Syllabus%20as%20per%20SEP%20effective%20from%202024-45/Science/BCA.pdf', filename: 'bca-syllabus-sep.pdf' }
  ];

  // Function to handle file download
  const handleDownload = async (url, filename) => {
    try {
      // Fetch the file
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a temporary URL to the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      
      // Append to the document, click it and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file. Please try again later.');
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <PageContent>
        <HeaderSection>
          <PageTitle>Syllabus</PageTitle>
          <BackButton
            as={Link}
            to="/admin/dashboard"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back to Dashboard
          </BackButton>
        </HeaderSection>

        <SectionTitle>NEP Syllabus</SectionTitle>
        <DropdownContainer>
          {nepSyllabus.map((file, index) => (
            <FileCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <FileName>{file.label}</FileName>
              <FileActions>
                <ActionButton 
                  href={file.url} 
                  target="_blank"
                >
                  <FaEye /> View
                </ActionButton>
                <ActionButton 
                  as="div" 
                  primary 
                  onClick={() => handleDownload(file.url, file.filename)}
                >
                  <FaDownload /> Download
                </ActionButton>
              </FileActions>
            </FileCard>
          ))}
        </DropdownContainer>

        <SectionTitle>SEP Syllabus</SectionTitle>
        <DropdownContainer>
          {sepSyllabus.map((file, index) => (
            <FileCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <FileName>{file.label}</FileName>
              <FileActions>
                <ActionButton 
                  href={file.url} 
                  target="_blank"
                >
                  <FaEye /> View
                </ActionButton>
                <ActionButton 
                  as="div" 
                  primary 
                  onClick={() => handleDownload(file.url, file.filename)}
                >
                  <FaDownload /> Download
                </ActionButton>
              </FileActions>
            </FileCard>
          ))}
        </DropdownContainer>
      </PageContent>
      <Footer />
    </PageContainer>
  );
};

export default Syllabus;