import {
  Router,
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
} from "../Index.ts";
import verifyToken from "../middleware/Auth";
const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/reset-password", verifyToken, resetPassword);
userRoutes.post("/change-password", verifyToken, changePassword);

export default userRoutes;
