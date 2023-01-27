import { Navigate } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('cogoportAdminKey')
  return <Navigate to="/" />
}

export default Logout;