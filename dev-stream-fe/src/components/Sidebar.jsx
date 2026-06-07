import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <h2>Dashboard</h2>
                <NavLink to={"/dashboard"} end className={({isActive}) => isActive ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                    Dashboard Home
                </NavLink>
                <NavLink to={"/dashboard/profile"} className={({isActive}) => isActive ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                    Profile
                </NavLink>
                <NavLink to={"/dashboard/settings"} className={({isActive}) => isActive ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                    Settings
                </NavLink>
                <NavLink to={"/dashboard/my-courses"} className={({isActive}) => isActive ? "sidebar-nav-item active" : "sidebar-nav-item"}>
                    My Courses
                </NavLink>
            </div>
        </>
    )
}

export default Sidebar;