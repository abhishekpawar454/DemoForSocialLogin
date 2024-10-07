import "./App.css";
import "../src/container/admin/auth/auth.css";
import "../src/container/user/auth/auth.css";
import "../src/component/admin/AdminLayout.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Routes";

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
