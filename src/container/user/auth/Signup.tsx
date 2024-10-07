import { auth } from "../../../config/Firebase";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import {
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

interface userSignupInterface {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface userFormInterface {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  type: string;
}

interface userFormInterfaceForSocial {
  name: string | null;
  email: string | null;
  mobile: string | null;
  role: string;
  type: string;
}

const UserSignUp = () => {
  const navigate = Index.useNavigate();
  const [password, setPassword] = Index.useState(false);
  const [confirmPassword, setConfirmPassword] = Index.useState(false);

  let initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values: userSignupInterface) => {
    const formData: userFormInterface = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      role: "User",
      type: "Input",
    };
    const res = await PageIndex.userSignup(formData);
    if (res?.status === 201) {
      Index.toast.success(res?.data?.message);
      navigate("/");
    }
  };

  const handleLogin = async (): Promise<void> => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken as string;
        localStorage.setItem("token", accessToken);
        const userData = result.user.providerData;
        console.log(userData);
        if (localStorage.getItem("token")) {
          const formData: userFormInterfaceForSocial = {
            name: userData[0].displayName,
            email: userData[0].email,
            mobile: userData[0]?.phoneNumber,
            role: "User",
            type: "Social",
          };
          PageIndex.userSocialSignup(formData)
            .then((res) => {
              if (res?.status === 201 || res?.status === 200) {
                Index.toast.success(res?.data?.message);
                localStorage.setItem("user", JSON.stringify(res?.data?.data));
                navigate("/home");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLoginTwitter = async (): Promise<void> => {
    const twitterProvider = new TwitterAuthProvider();
    twitterProvider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken as string;
        const userData = result.user.providerData;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log(accessToken, userData);
        if (localStorage.getItem("token")) {
          Index.toast.success("User logged in through social site");
          navigate("/home");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <Index.Box className="login-container-user">
      <Index.Box className="login-form">
        <Index.Box className="login-box">
          <Index.Box className="login-image">
            <img
              src="https://www.svgrepo.com/show/221028/user-avatar.svg"
              alt=""
            />
          </Index.Box>
          <Index.Typography variant="h6">Create an account</Index.Typography>
        </Index.Box>

        <Index.Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.signupValidation}
        >
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Index.Box component="form" onSubmit={handleSubmit}>
              <Index.Box className="login-textfields-signup">
                <Index.Box className="login-textfield-box">
                  <Index.TextField
                    type="text"
                    className="login-textfield"
                    placeholder="Name"
                    size="small"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                        setFieldValue(
                          "name",
                          inputValue.replace(/^\s+/, "").replace(/\s+/g, " ")
                        );
                      }
                    }}
                    inputProps={{ maxLength: 40 }}
                    InputProps={{
                      startAdornment: (
                        <Index.InputAdornment position="start">
                          <Index.PersonIcon className="login-icons-user" />
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                  <Index.Typography variant="h6" className="error-message">
                    {touched?.name && errors?.name}
                  </Index.Typography>
                </Index.Box>

                <Index.Box className="login-textfield-box">
                  <Index.TextField
                    type="text"
                    className="login-textfield"
                    placeholder="Email"
                    size="small"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("email", e.target.value.trim())
                    }
                    inputProps={{ maxLength: 40 }}
                    InputProps={{
                      startAdornment: (
                        <Index.InputAdornment position="start">
                          <Index.EmailIcon className="login-icons-user" />
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                  <Index.Typography variant="h6" className="error-message">
                    {touched?.email && errors?.email}
                  </Index.Typography>
                </Index.Box>

                <Index.Box className="login-textfield-box">
                  <Index.TextField
                    type="text"
                    className="login-textfield"
                    placeholder="Mobile Number"
                    size="small"
                    name="mobile"
                    value={values.mobile}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^[0-9\s]*$/.test(inputValue)) {
                        setFieldValue("mobile", inputValue.trim());
                      }
                    }}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <Index.InputAdornment position="start">
                          <Index.CallIcon className="login-icons-user" />
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                  <Index.Typography variant="h6" className="error-message">
                    {touched?.mobile && errors?.mobile}
                  </Index.Typography>
                </Index.Box>

                <Index.Box className="login-textfield-box">
                  <Index.TextField
                    type={password ? " text" : "password"}
                    className="login-textfield"
                    placeholder="Password"
                    size="small"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("password", e.target.value.trim())
                    }
                    inputProps={{ maxLength: 16 }}
                    InputProps={{
                      startAdornment: (
                        <Index.InputAdornment position="start">
                          <Index.LockIcon className="login-icons-user" />
                        </Index.InputAdornment>
                      ),
                      endAdornment: (
                        <Index.InputAdornment position="end">
                          <Index.Box
                            className="eye-icon"
                            onClick={() => setPassword(!password)}
                          >
                            {password ? (
                              <Index.VisibilityOffIcon />
                            ) : (
                              <Index.VisibilityIcon />
                            )}
                          </Index.Box>
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                  <Index.Typography variant="h6" className="error-message">
                    {touched?.password && errors?.password}
                  </Index.Typography>
                </Index.Box>

                <Index.Box className="login-textfield-box">
                  <Index.TextField
                    type={confirmPassword ? " text" : "password"}
                    className="login-textfield"
                    placeholder="Confirm Password"
                    size="small"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={(e) =>
                      setFieldValue("confirmPassword", e.target.value.trim())
                    }
                    inputProps={{ maxLength: 16 }}
                    InputProps={{
                      startAdornment: (
                        <Index.InputAdornment position="start">
                          <Index.LockIcon className="login-icons-user" />
                        </Index.InputAdornment>
                      ),
                      endAdornment: (
                        <Index.InputAdornment position="end">
                          <Index.Box
                            className="eye-icon"
                            onClick={() => setConfirmPassword(!confirmPassword)}
                          >
                            {confirmPassword ? (
                              <Index.VisibilityOffIcon />
                            ) : (
                              <Index.VisibilityIcon />
                            )}
                          </Index.Box>
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                  <Index.Typography variant="h6" className="error-message">
                    {touched?.confirmPassword && errors?.confirmPassword}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>

              <Index.Box className="login-button-user">
                <Index.Button type="submit" size="small" variant="contained">
                  Register
                </Index.Button>
                <Index.Box className="button-box-signup">
                  <Index.Typography>Or sign up with</Index.Typography>
                  <Index.GoogleIcon
                    onClick={() => {
                      handleLogin();
                    }}
                    className="sign-icons"
                  />
                  <Index.TwitterIcon
                    onClick={() => {
                      handleLoginTwitter();
                    }}
                    className="sign-icons"
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          )}
        </Index.Formik>
        <Index.Typography className="lower-text" variant="h6">
          Already have an account ?{" "}
          <Index.Link className="forgot-text" to={"/"}>
            Log In
          </Index.Link>
        </Index.Typography>
      </Index.Box>
    </Index.Box>
  );
};

export default UserSignUp;
