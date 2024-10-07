import {
  adminForgotPassword,
  adminLogin,
  adminResetPassword,
  adminVerifyOtp,
  getAllUser,
  userForgotPassword,
  userLogin,
  userResetPassword,
  userSignup,
  userSocialSignup,
  userVerifyOtp,
} from "../redux/AdminService";

import {
  emailValidation,
  loginValidation,
  otpValidation,
  resetPasswordValidation,
  signupValidation,
  userValidationSchema,
} from "../validation/Validation";

export default {
  userSignup,
  userSocialSignup,
  userLogin,
  userForgotPassword,
  userVerifyOtp,
  userResetPassword,

  adminLogin,
  adminForgotPassword,
  adminVerifyOtp,
  adminResetPassword,

  signupValidation,
  loginValidation,
  emailValidation,
  otpValidation,
  resetPasswordValidation,
  userValidationSchema,

  getAllUser,
};
