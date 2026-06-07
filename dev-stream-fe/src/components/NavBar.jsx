import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const NavBar = () => {
    return (
        <div>
            <h1>Dev Stream</h1>
            <div className="navbar-container">
                <NavLink to="/" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>About</NavLink>
                <NavLink to="/courses" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Courses</NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Login</NavLink>
            </div>
        </div>
    )
}

export default NavBar;