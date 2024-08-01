import { Link, NavLink, Outlet } from "react-router-dom";
import '../styles/NavBar.css'

const NavBar = ({user}) => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "NavBar-NavLink active" : "NavBar-NavLink";

  return(
    <>
      <div className="NavBar-nav-div">
        <Link className='NavBar-Link' to={'/home'}>
          Jobly
        </Link>

        <nav>
          {user ? (
            <>
              <NavLink className={getNavLinkClass} to={'/companies'}>
                Companies
              </NavLink>
              <NavLink className={getNavLinkClass} to={'/jobs'}>
                Jobs
              </NavLink>
              <NavLink className={getNavLinkClass} to={'/profile'}>
                Profile
              </NavLink>
              <NavLink className={getNavLinkClass} to={'/logout'}>
                Logout {user.username}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={getNavLinkClass} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={getNavLinkClass} to={'/signup'}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <div className="NavBar-body">
        <Outlet/>
      </div>
    </>
  )
}

export default NavBar;