import { AddressBook } from './AddressBook'
import { Moment } from './Moment'
import { Talk, talkLoader } from './Talk'
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
      loader: talkLoader,
    },
    {
      path: 'address-book',
      element: <AddressBook />,
    },
    {
      path: 'moment',
      element: <Moment />,
    },
  ],
}
