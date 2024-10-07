import Index from "../Index";

const AdminSidebar = () => {
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const [isOpen, setIsOpen] = Index.useState(true);
  return (
    <Index.Box className={isOpen ? "sidebar-active" : "sidebar-deactive"}>
      <Index.Box className="sidebar-items-container">
        <Index.Box
          onClick={() => navigate("/admin/dashboard")}
          className="sidebar-items-logo"
        >
          <Index.Box className="logo-box">
            <img
              src="https://t3.ftcdn.net/jpg/03/65/42/00/360_F_365420014_xjsSDkKzrhq4gr9GFzP6S97H7MJyNI5B.jpg"
              alt=""
            />
          </Index.Box>
          <Index.Typography
            className={isOpen ? "logo-text" : "logo-text-deactive"}
            variant="h6"
          >
            Demo
          </Index.Typography>
        </Index.Box>
        <Index.Box
          onClick={() => navigate("/admin/dashboard")}
          className={
            location.pathname == "/admin/dashboard"
              ? "sidebar-items-active"
              : "sidebar-items"
          }
        >
          <Index.DashboardIcon className="sidebar-icons" />
          <Index.Typography
            className={isOpen ? "text-active" : "text-deactive"}
          >
            Dashboard
          </Index.Typography>
        </Index.Box>
        <Index.Box
          onClick={() => navigate("/admin/user-list")}
          className={
            location.pathname.includes("/admin/user-list")
              ? "sidebar-items-active"
              : "sidebar-items"
          }
        >
          <Index.GroupIcon className="sidebar-icons" />
          <Index.Typography
            className={isOpen ? "text-active" : "text-deactive"}
          >
            Users
          </Index.Typography>
        </Index.Box>
      </Index.Box>
      <Index.Box onClick={() => setIsOpen(!isOpen)} className="arrow-icon-box">
        {isOpen ? (
          <Index.ArrowLeftIcon className="arrow-icons" />
        ) : (
          <Index.ArrowRightIcon className="arrow-icons" />
        )}
      </Index.Box>
    </Index.Box>
  );
};

export default AdminSidebar;
