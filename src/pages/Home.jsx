import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="home p-2">
      <Link to="/chat">Chat</Link>
    </div>
  )
}
