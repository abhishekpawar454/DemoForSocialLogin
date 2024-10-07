import Index from "../../Index";
import PageIndex from "../../PageIndex";

interface emailInterface {
  email: string;
}

const ForgotPassword = () => {
  const navigate = Index.useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");

  let initialValues = {
    email: "",
  };

  const handleFormSubmit = async (values: emailInterface) => {
    let res;
    if (isAdmin == "true") {
      res = await PageIndex.adminForgotPassword(values);
    } else {
      res = await PageIndex.userForgotPassword(values);
    }
    if (res?.status === 200) {
      Index.toast.success(res?.data?.message);
      navigate("/verify-otp", { state: values.email });
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
          <Index.Typography>Enter your email to get otp</Index.Typography>
        </Index.Box>
        <Index.Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.emailValidation}
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
                        <Index.PersonIcon
                          className={
                            isAdmin == "true"
                              ? "login-icons"
                              : "login-icons-user"
                          }
                        />
                      </Index.InputAdornment>
                    ),
                  }}
                />

                <Index.Typography variant="h6" className="error-message">
                  {touched.email && errors?.email}
                </Index.Typography>
              </Index.Box>

              <Index.Box
                className={
                  isAdmin == "true" ? "login-button" : "login-button-user"
                }
              >
                <Index.Button type="submit" size="small" variant="contained">
                  Get Otp
                </Index.Button>
                <Index.Button
                  onClick={() => {
                    isAdmin == "true"
                      ? navigate("/admin/login")
                      : navigate("/");
                  }}
                >
                  Back to Login
                </Index.Button>
              </Index.Box>
            </Index.Box>
          )}
        </Index.Formik>
      </Index.Box>
    </Index.Box>
  );
};

export default ForgotPassword;
