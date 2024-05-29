import { Talk } from './Talk'
import { Chat } from './main'

/**
 * @type {import('react-router-dom').RouteObject}
 */
export const chatRoute = {
  path: '/chat',
  element: <Chat />,
  children: [
    {
      path: 'talk',
      element: <Talk />,
    },
  ],
}
