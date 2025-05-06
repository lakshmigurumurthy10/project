import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

// Import pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageTeachers from './pages/admin/ManageTeachers';
import LabTimetable from './pages/admin/LabTimetable';
import Syllabus from './pages/admin/Syllabus';

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
// import StudentViewTimetable from './pages/student/ViewTimetable';

// Import missing pages (you'll need to create these)
// import ManageClasses from './pages/admin/ManageClasses';
// import GenerateTimetable from './pages/admin/GenerateTimetable';

// Protected Route component
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to={`/auth/${role}`} />;
  }
  
  if (user.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:role" element={<AuthPage />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/classes" 
          element={
            <ProtectedRoute role="admin">
              {/* <ManageClasses /> */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/manage-teachers" 
          element={
            <ProtectedRoute role="admin">
              <ManageTeachers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/lab-timetable" 
          element={
            <ProtectedRoute role="admin">
              <LabTimetable />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/syllabus" 
          element={
            <ProtectedRoute role="admin">
              <Syllabus />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/generate" 
          element={
            <ProtectedRoute role="admin">
              {/* <GenerateTimetable /> */}
            </ProtectedRoute>
          } 
        />
        
        {/* Teacher routes */}
        <Route 
          path="/teacher/dashboard" 
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/syllabus" 
          element={
            <ProtectedRoute role="teacher">
              {/* Add Syllabus component when ready */}
              <div>Syllabus Page - Coming Soon</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/profile" 
          element={
            <ProtectedRoute role="teacher">
              {/* Add Profile component when ready */}
              <div>Profile Page - Coming Soon</div>
            </ProtectedRoute>
          } 
        />
        
        {/* Student routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;