import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../container/admin/auth/Login";
import VerifyOtp from "../container/admin/auth/VerifyOtp";
import ForgotPassword from "../container/admin/auth/ForgotPassword";
import ResetPassword from "../container/admin/auth/ResetPassword";
import UserLogin from "../container/user/auth/Login";
import UserSignUp from "../container/user/auth/Signup";
import AdminLayout from "../component/admin/AdminLayout";
import Dashboard from "../container/user/pages/dashboard/Dashboard";
import UserList from "../container/user/pages/users/UserList";
import AddUser from "../container/user/pages/users/AddUser";
import HomePage from "../container/user/pages/home/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="user-list/add-edit-user" element={<AddUser />} />
        </Route>

        <Route path="/" element={<UserLogin />} />
        <Route path="sign-up" element={<UserSignUp />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
