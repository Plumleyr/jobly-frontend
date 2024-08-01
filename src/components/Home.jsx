import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = ({user}) => {
  return(
    <div className='Home-main'>
      <h1 className='Home-header'>Jobly</h1>
      <p className='Home-p'>All the jobs in one, convenient place.</p>
      {user ? (
        <p className='Home-p'>Welcome Back, {user.firstName} </p>
      ) : (
        <p>
          <Link className='Home-Link' to={'/login'}>Login</Link>
          <Link className='Home-Link' to={'/signup'}>Sign Up</Link>
        </p>
      )}
    </div>
  )
}

export default Home;