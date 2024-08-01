import { useEffect, useState } from 'react'
import Routes from './Routes'
import JoblyApi from '../assets/api'
import { useLocalStorage } from '../assets/hooks'
import { jwtDecode } from 'jwt-decode'

const App = () => {
  const[token, setToken] = useLocalStorage('token', null);
  const[user, setUser] = useState(null);
 
  useEffect(() => {
    const fetchUser = async() =>{
      try{
        if (token) {
          JoblyApi.setToken(token);
          const userData = jwtDecode(token);
          const currUser = await JoblyApi.getUser(userData.username);
          setUser(currUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [token]);

  const applyToJob = async (jobId) => {
    try{
      await JoblyApi.applyToJob(user.username, jobId);
      const updatedUser = await JoblyApi.getUser(user.username);
      setUser(updatedUser);
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <>
      <Routes 
        user={user} 
        setToken={setToken} 
        setUser={setUser}
        applyToJob={applyToJob}
      />
    </>
  )
}

export default App
