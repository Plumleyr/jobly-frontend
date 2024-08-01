import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import CompanyList from './CompanyList';
import CompanyDetails from './CompanyDetails';
import JobList from './JobList';
import SignUp from './SignUp';
import Profile from './Profile';
import Logout from './Logout';

const Routes = ({user, setToken, setUser, applyToJob}) => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar user={user} />,
      children: [
        {
          path: '/home',
          element: <Home user={user} />
        },
        {
          path: '/login',
          element: <Login setToken={setToken} />
        },
        {
          path: '/companies',
          element: <CompanyList user={user} />
        },
        {
          path: '/companies/:company',
          element: <CompanyDetails user={user} applyToJob={applyToJob} />
        },
        {
          path: '/jobs',
          element: <JobList user={user} applyToJob={applyToJob} />
        },
        {
          path: '/signup',
          element: <SignUp setToken={setToken} />
        },
        {
          path: '/profile',
          element: <Profile user={user} setUser={setUser} />
        },
        {
          path: '/logout',
          element: <Logout setUser={setUser}/>
        },
        {
          path: "*",
          element: <Navigate to={"/home"} />,
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default Routes;