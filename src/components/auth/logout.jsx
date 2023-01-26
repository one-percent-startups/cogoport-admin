import { Navigate } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('cogoportKey')
  return <Navigate to="/" />
}

export default Logout;