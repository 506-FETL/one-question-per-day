/* eslint-disable react-refresh/only-export-components */
import { Navigate } from 'react-router-dom'

export default function RootRedirect() {
  const urlDay = localStorage.getItem('urlDay') || '01'

  return <Navigate to={urlDay} replace />
}

export const allProblems = [
  {
    day: '01',
    title: '请你实现一个 Button 按钮',
    url: '/01',
  },
]
