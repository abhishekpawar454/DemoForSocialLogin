import Index from "../../Index";
import PageIndex from "../../PageIndex";

interface loginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = Index.useNavigate();
  const [visibility, setVisibility] = Index.useState(false);

  let initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: loginInterface) => {
    const res = await PageIndex.userLogin(values);
    if (res?.status === 200) {
      Index.toast.success(res?.data?.message);
      navigate("/home");
    }
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
          <Index.Typography variant="h6">
            Login to your account
          </Index.Typography>
        </Index.Box>

        <Index.Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.loginValidation}
        >
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Index.Box
              className="login-textfields"
              component="form"
              onSubmit={handleSubmit}
            >
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
                  InputProps={{
                    startAdornment: (
                      <Index.InputAdornment position="start">
                        <Index.PersonIcon className="login-icons-user" />
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
                  type={visibility ? " text" : "password"}
                  className="login-textfield"
                  placeholder="Password"
                  size="small"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue("password", e.target.value.trim())
                  }
                  InputProps={{
                    startAdornment: (
                      <Index.InputAdornment position="start">
                        <Index.KeyIcon className="login-icons-user" />
                      </Index.InputAdornment>
                    ),
                    endAdornment: (
                      <Index.InputAdornment position="end">
                        <Index.Box
                          className="eye-icon"
                          onClick={() => setVisibility(!visibility)}
                        >
                          {visibility ? (
                            <Index.VisibilityOffIcon />
                          ) : (
                            <Index.VisibilityIcon />
                          )}
                        </Index.Box>
                      </Index.InputAdornment>
                    ),
                  }}
                />
                <Index.Typography className="error-message">
                  {touched?.password && errors?.password}
                </Index.Typography>
              </Index.Box>

              <Index.Box className="login-textbox">
                <Index.FormControlLabel
                  className="login-checkbox"
                  control={<Index.Checkbox />}
                  label="Remember Me"
                />
                <Index.Box
                  onClick={() => {
                    navigate("/forgot-password");
                    localStorage.setItem("isAdmin", "false");
                  }}
                  className="forgot-text"
                >
                  Forgot password ?
                </Index.Box>
              </Index.Box>
              <Index.Box className="login-button-user">
                <Index.Button type="submit" size="small" variant="contained">
                  Login
                </Index.Button>
              </Index.Box>
            </Index.Box>
          )}
        </Index.Formik>
        <Index.Typography className="lower-text" variant="h6">
          Don't have an account ?{" "}
          <Index.Link className="forgot-text" to={"/sign-up"}>
            Sign Up
          </Index.Link>
        </Index.Typography>
      </Index.Box>
    </Index.Box>
  );
};

export default Login;
