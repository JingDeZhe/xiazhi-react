import { createBrowserRouter } from 'react-router-dom'
import { chatRoute } from '../pages/chat/route'
import { ErrorPage } from '../pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>main</div>,
    errorElement: <ErrorPage />,
  },
  chatRoute,
])
