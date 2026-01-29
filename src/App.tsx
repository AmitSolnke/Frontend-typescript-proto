import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import EmployeeForm from './components/employee-form/EmployeeForm';
import EmployeeGrid from './components/employee-form/EmployeeGrid';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Employee list */}
      <Route path="/employee" element={<EmployeeGrid />} />

      {/* Create employee */}
      <Route path="/createemployee" element={<EmployeeForm />} />

      {/* Edit / View employee */}
      <Route path="/editEmployeeForm/:id" element={<EmployeeForm />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
