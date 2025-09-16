import { Navigate } from 'react-router-dom'

export default function RootRedirect() {
  const urlSolver = localStorage.getItem('urlSolver') || '/seam'
  const urlDay = localStorage.getItem('urlDay') || '/01'

  return <Navigate to={`${urlSolver}${urlDay}`} replace />
}
