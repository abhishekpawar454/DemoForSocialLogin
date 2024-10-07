import Index from "../../Index";
import PageIndex from "../../PageIndex";

interface passwordInterface {
  password: string;
}

const ResetPassword = () => {
  const navigate = Index.useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const [password, setPassword] = Index.useState(false);
  const [confirmPassword, setConfirmPassword] = Index.useState(false);

  let initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values: passwordInterface) => {
    const formData: passwordInterface = {
      password: values.password,
    };
    let res;
    if (isAdmin == "true") {
      res = await PageIndex.adminResetPassword(formData);
    } else {
      res = await PageIndex.userResetPassword(formData);
    }
    if (res?.status === 200) {
      Index.toast.success(res?.data?.message);
      {
        localStorage.getItem("isAdmin") == "true"
          ? navigate("/admin/login")
          : navigate("/");
      }
    }
  };
  return (
    <Index.Box
      className={isAdmin == "true" ? "login-container" : "login-container-user"}
    >
      <Index.Box className="login-form">
        <Index.Box className="login-box">
          <Index.Box className="login-image">
            <img
              src="https://www.svgrepo.com/show/221028/user-avatar.svg"
              alt=""
            />
          </Index.Box>
          <Index.Typography>Set up a new password</Index.Typography>
        </Index.Box>
        <Index.Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.resetPasswordValidation}
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
                        <Index.KeyIcon
                          className={
                            isAdmin == "true"
                              ? "login-icons"
                              : "login-icons-user"
                          }
                        />
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
                        <Index.KeyIcon
                          className={
                            isAdmin == "true"
                              ? "login-icons"
                              : "login-icons-user"
                          }
                        />
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

              <Index.Box
                className={
                  isAdmin == "true" ? "login-button" : "login-button-user"
                }
              >
                <Index.Button type="submit" size="small" variant="contained">
                  Reset
                </Index.Button>
              </Index.Box>
            </Index.Box>
          )}
        </Index.Formik>
      </Index.Box>
    </Index.Box>
  );
};

export default ResetPassword;
