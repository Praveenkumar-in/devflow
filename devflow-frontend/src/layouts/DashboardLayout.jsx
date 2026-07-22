import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="d-flex">

      <Sidebar />

     
      <div
        className="main-content"
      
    >

        <Navbar />

        <div className="container-fluid p-4">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;