import Api from "../config/Api";
import Dataservice from "../config/Dataservice";
import { toast } from "react-toastify";
import axios from "axios";

interface userSignupInterface {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  type: string;
}

interface userSocialSignupInterface {
  name: string | null;
  email: string | null;
  mobile: string | null;
  role: string;
  type: string;
}

interface userLoginInterface {
  email: string;
  password: string;
}
interface emailInterface {
  email: string;
}
interface otpInterface {
  email: string;
  otp: string;
}
interface passwordInterface {
  password: string;
}

export const adminLogin = async (data: userLoginInterface) => {
  try {
    const response = await Dataservice.post(Api.ADMIN_LOGIN, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const adminForgotPassword = async (data: emailInterface) => {
  try {
    const response = await Dataservice.post(Api.ADMIN_FORGOT_PASSWORD, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
export const adminVerifyOtp = async (data: otpInterface) => {
  try {
    const response = await Dataservice.post(Api.ADMIN_VERIFY_OTP, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
export const adminResetPassword = async (data: passwordInterface) => {
  try {
    const response = await Dataservice.post(Api.ADMIN_RESET_PASSWORD, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const userSignup = async (data: userSignupInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_SIGNUP, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const userSocialSignup = async (data: userSocialSignupInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_SIGNUP, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const userLogin = async (data: userLoginInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_LOGIN, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const userForgotPassword = async (data: emailInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_FORGOT_PASSWORD, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
export const userVerifyOtp = async (data: otpInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_VERIFY_OTP, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
export const userResetPassword = async (data: passwordInterface) => {
  try {
    const response = await Dataservice.post(Api.USER_RESET_PASSWORD, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const getAllUser = async () => {
  try {
    const response = await Dataservice.get(Api.GET_ALL_USER);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
