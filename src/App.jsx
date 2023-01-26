import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './components/protected routes/ProtectedRoutes'
import Auth from './pages/auth/auth'
import  Dashboard  from './pages/dashboard'
import  StudentList  from './pages/studentlist'
import Logout from './components/auth/logout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="logout" element={<Logout />} />
      <Route element={<ProtectedRoutes />}>   
      <Route path="dashboard" element={<Dashboard/>} />  
      <Route path="studentlist" element={<StudentList />} /> 
      </Route>
    </Routes>
  )
}

export default App
