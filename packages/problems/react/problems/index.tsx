import { Navigate } from 'react-router-dom'

export default function RootRedirect() {
  const urlDay = localStorage.getItem('urlDay') || '01'

  return <Navigate to={urlDay} replace />
}
