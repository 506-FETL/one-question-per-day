import { defaultUrlDay } from '@one-question-per-day/shared'
import { Navigate } from 'react-router-dom'

export default function RootRedirect() {
  const urlDay = localStorage.getItem('urlDay') || defaultUrlDay

  return <Navigate to={urlDay} replace />
}
