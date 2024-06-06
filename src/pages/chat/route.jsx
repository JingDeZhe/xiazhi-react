import { redirect } from 'react-router-dom'
import { AddressBook, addressBookLoader } from './AddressBook'
import { Moment } from './Moment'
import { Talk, talkLoader } from './Talk'
import { Chat } from './main'
import { db } from './db/main'

/**
 * @type {import('react-router-dom').RouteObject}
 */
export const chatRoute = {
  path: '/chat',
  loader: async ({ params }) => {
    if (!params.userId) {
      const user = await db.users.orderBy('username').first()
      return redirect(`/chat/${user.id}`)
    } else {
      return null
    }
  },
  children: [
    {
      path: ':userId',
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
          loader: addressBookLoader,
        },
        {
          path: 'moment',
          element: <Moment />,
        },
      ],
    },
  ],
}
