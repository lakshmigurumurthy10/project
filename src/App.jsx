import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
// import ManageClasses from './pages/admin/ManageClasses';
// import ManageTeachers from './pages/admin/ManageTeachers';
// import GenerateTimetable from './pages/admin/GenerateTimetable';

// Teacher pages
// import TeacherDashboard from './pages/teacher/Dashboard';
// import TeacherViewSchedule from './pages/teacher/ViewSchedule';

// Student pages
// import StudentDashboard from './pages/student/Dashboard';
// import StudentViewTimetable from './pages/student/ViewTimetable';

// Protected Route component
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to={`/login/${role}`} />;
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
        <Route path="/login/:role" element={<LoginPage />} />
        
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
          path="/admin/teachers" 
          element={
            <ProtectedRoute role="admin">
              {/* <ManageTeachers /> */}
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
              {/* <TeacherDashboard /> */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/schedule" 
          element={
            <ProtectedRoute role="teacher">
              {/* <TeacherViewSchedule /> */}
            </ProtectedRoute>
          } 
        />
        
        {/* Student routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute role="student">
              {/* <StudentDashboard /> */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/timetable" 
          element={
            <ProtectedRoute role="student">
              {/* <StudentViewTimetable /> */}
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