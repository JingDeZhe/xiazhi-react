import { createBrowserRouter } from 'react-router-dom'
import { chatRoute } from '../pages/chat/route'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '@/pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  chatRoute,
])
