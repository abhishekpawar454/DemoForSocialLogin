import Index from "../../../Index";
import "../dashboard/Dashboard.css";
import { getAuth, signOut } from "firebase/auth";

const HomePage = () => {
  const navigate = Index.useNavigate();
  const user = localStorage.getItem("user");
  const userInfo = user ? JSON.parse(user) : null;
  console.log(userInfo);

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Index.toast.success("User logout successfully");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Index.Box className="main-container-home">
      <Index.Typography className="welcome-text">
        Welcome {userInfo && userInfo?.name?.split(" ")[0]}
      </Index.Typography>
      <br />
      <Index.Button onClick={logoutHandler}>Logout</Index.Button>
    </Index.Box>
  );
};

export default HomePage;
