import { Outlet } from "react-router-dom";
import Index from "../Index";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <Index.Box className="admin-layout">
      <AdminSidebar />
      <Index.Box className="header-outlet">
        <AdminHeader />
        <Index.Box className="outlet">
          <Outlet />
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default AdminLayout;
