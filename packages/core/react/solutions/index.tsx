import { Navigate } from 'react-router-dom'
import useSolver from '../useSolver'

export default function RootRedirect() {
  const { urlDay, urlSolver } = useSolver()

  return <Navigate to={`${urlSolver}${urlDay}`} replace />
}
