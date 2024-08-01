import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setUser}) => {
  const navigate = useNavigate();

  useEffect(()=> {
    setUser(null);
    localStorage.removeItem('token')
    navigate('/home')
  }, []);

  return null;
};

export default Logout;