import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaArrowLeft } from 'react-icons/fa';
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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const SearchIcon = styled.div`
  color: #aaa;
  margin-right: 0.5rem;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
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

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #00d9f5 0%, #00adb5 100%);
  border: none;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 20px rgba(0, 217, 245, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 217, 245, 0.4);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const TeachersTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 120px;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr 1fr 120px;
  }
`;

const HeaderCell = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
`;

const TableBody = styled.div``;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 120px;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr 1fr 120px;
  }
`;

const TableCell = styled.div`
  color: #ddd;
  display: flex;
  align-items: center;
`;

const ActionCell = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.color || '#aaa'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.hoverColor || '#fff'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
`;

const PageNumber = styled.button`
  background: ${props => props.active ? 'rgba(0, 217, 245, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00d9f5' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#00d9f5' : '#aaa'};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin: 0 0.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 217, 245, 0.1);
    color: #00d9f5;
  }
`;

// Modal components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #aaa;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 0.8rem 1rem;
  color: #fff;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00d9f5;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #00d9f5 0%, #00adb5 100%)' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? 'linear-gradient(135deg, #00c2dc 0%, #00969e 100%)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

// Sample teacher data (would normally come from a database)
const initialTeachers = [
  { id: 'T001', name: 'Dr. John Smith', department: 'Computer Science', specialization: 'AI & Machine Learning' },
  { id: 'T002', name: 'Prof. Sarah Johnson', department: 'Electrical Engineering', specialization: 'Power Systems' },
  { id: 'T003', name: 'Dr. Michael Williams', department: 'Civil Engineering', specialization: 'Structural Design' },
  { id: 'T004', name: 'Prof. Emily Davis', department: 'Mechanical Engineering', specialization: 'Thermodynamics' },
  { id: 'T005', name: 'Dr. Robert Brown', department: 'Computer Science', specialization: 'Cybersecurity' },
  { id: 'T006', name: 'Prof. Lisa Miller', department: 'Electronics & Communication', specialization: 'VLSI Design' },
  { id: 'T007', name: 'Dr. David Wilson', department: 'Information Technology', specialization: 'Database Systems' },
  { id: 'T008', name: 'Prof. Jennifer Taylor', department: 'Electrical Engineering', specialization: 'Control Systems' },
];

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    specialization: ''
  });
  
  const teachersPerPage = 5;
  
  // Calculate pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  
  // Handle search
  useEffect(() => {
    const results = teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(results);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, teachers]);
  
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Open add teacher modal
  const handleAddTeacher = () => {
    setFormData({
      id: `T${String(teachers.length + 1).padStart(3, '0')}`,
      name: '',
      department: '',
      specialization: ''
    });
    setShowAddModal(true);
  };
  
  // Open edit teacher modal
  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      id: teacher.id,
      name: teacher.name,
      department: teacher.department,
      specialization: teacher.specialization
    });
    setShowEditModal(true);
  };
  
  // Open delete teacher modal
  const handleDeleteTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };
  
  // Submit add teacher form
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: formData.id,
      name: formData.name,
      department: formData.department,
      specialization: formData.specialization
    };
    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
    // Here you would typically make an API call to add to the DB
  };
  
  // Submit edit teacher form
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTeachers = teachers.map(teacher => 
      teacher.id === selectedTeacher.id ? formData : teacher
    );
    setTeachers(updatedTeachers);
    setShowEditModal(false);
    // Here you would typically make an API call to update in the DB
  };
  
  // Confirm teacher deletion
  const handleDeleteConfirm = () => {
    const updatedTeachers = teachers.filter(teacher => 
      teacher.id !== selectedTeacher.id
    );
    setTeachers(updatedTeachers);
    setShowDeleteModal(false);
    // Here you would typically make an API call to delete from the DB
  };

  // Page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PageContainer>
      <Navbar />
      <PageContent>
        <HeaderSection>
          <PageTitle>Manage Teachers</PageTitle>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search teachers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeaderSection>
        
        <ActionButtons>
          <BackButton 
            as={Link} 
            to="/admin/dashboard"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonIcon><FaArrowLeft /></ButtonIcon>
            Back to Dashboard
          </BackButton>
          
          <AddButton
            onClick={handleAddTeacher}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonIcon><FaPlus /></ButtonIcon>
            Add New Teacher
          </AddButton>
        </ActionButtons>
        
        <TeachersTable>
          <TableHeader>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Department</HeaderCell>
            <HeaderCell>Specialization</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </TableHeader>
          
          <TableBody>
            {currentTeachers.map((teacher, index) => (
              <TableRow
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.specialization}</TableCell>
                <TableCell>
                  <ActionCell>
                    <ActionButton 
                      color="#00d9f5" 
                      hoverColor="#00d9f5" 
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      color="#ff6b6b" 
                      hoverColor="#ff6b6b" 
                      onClick={() => handleDeleteTeacher(teacher)}
                    >
                      <FaTrash />
                    </ActionButton>
                  </ActionCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TeachersTable>
        
        {totalPages > 1 && (
          <Pagination>
            {pageNumbers.map(number => (
              <PageNumber
                key={number}
                active={currentPage === number}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PageNumber>
            ))}
          </Pagination>
        )}
      </PageContent>
      
      {/* Add Teacher Modal */}
      {showAddModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <ModalTitle>Add New Teacher</ModalTitle>
            <Form onSubmit={handleAddSubmit}>
              <FormGroup>
                <Label>Teacher ID</Label>
                <Input 
                  type="text" 
                  name="id" 
                  value={formData.id} 
                  onChange={handleInputChange}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label>Full Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Department</Label>
                <Input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Specialization</Label>
                <Input 
                  type="text" 
                  name="specialization" 
                  value={formData.specialization} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <ModalButtons>
                <ModalButton 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton type="submit" primary>
                  Add Teacher
                </ModalButton>
              </ModalButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Edit Teacher Modal */}
      {showEditModal && selectedTeacher && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <ModalTitle>Edit Teacher</ModalTitle>
            <Form onSubmit={handleEditSubmit}>
              <FormGroup>
                <Label>Teacher ID</Label>
                <Input 
                  type="text" 
                  name="id" 
                  value={formData.id} 
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label>Full Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Department</Label>
                <Input 
                  type="text" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Specialization</Label>
                <Input 
                  type="text" 
                  name="specialization" 
                  value={formData.specialization} 
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <ModalButtons>
                <ModalButton 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton type="submit" primary>
                  Save Changes
                </ModalButton>
              </ModalButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTeacher && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <ModalTitle>Confirm Deletion</ModalTitle>
            <p style={{ color: '#ddd', marginBottom: '1.5rem' }}>
              Are you sure you want to delete teacher <strong>{selectedTeacher.name}</strong> ({selectedTeacher.id})? 
              This action cannot be undone.
            </p>
            <ModalButtons>
              <ModalButton 
                type="button" 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </ModalButton>
              <ModalButton 
                type="button" 
                onClick={handleDeleteConfirm}
                style={{ background: '#ff6b6b', border: 'none' }}
              >
                Delete
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      
      <Footer />
    </PageContainer>
  );
};

export default ManageTeachers;