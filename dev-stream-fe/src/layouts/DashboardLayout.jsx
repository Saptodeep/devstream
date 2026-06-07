import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardLayout.css"

const DashboardLayout = () => {
    return (
        <>
            <div className="layout">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;