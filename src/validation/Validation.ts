import * as Yup from "yup";

export const signupValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name is too short, min 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter the valid email")
    .matches(
      /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter the valid email"
    ),
  mobile: Yup.string()
    .required("Mobile number is required")
    .min(10, "Please enter valid mobile number"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should be strong"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match. Please try again."),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is not valid"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Password should be strong"
    ),
});

export const emailValidation = loginValidation.omit(["password"]);

export const otpValidation = Yup.object().shape({
  otp: Yup.string()
    .required("Otp is required")
    .min(4, "Password must contain 4 digits"),
});

export const resetPasswordValidation = signupValidation.omit([
  "name",
  "email",
  "mobile",
]);

export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short, min 2 characters")
    .max(30, "Name is too long , max 30 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter the valid email")
    .matches(
      /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter the valid email"
    )
    .required("Email is required"),

  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .min(10, "Please enter valid mobile number")
    .max(10, "Please enter valid mobile number"),

  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password length should be minimum 8 character including one capital letter, one small letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match. Please try again."),
  profile: Yup.mixed().required("Image is required"),
  // .test("FileType", "Allow only jpg, jpeg, png file", (value) => {
  //   if (!value) return true;
  //   if (!value?.name) {
  //     const file = value.split(".")[1];
  //     return ["jpeg", "jpg", "png"].includes(file); //edit
  //   } else {
  //     return ["image/jpeg", "image/jpg", "image/png"].includes(value?.type); //add
  //   }
  // }),
});
