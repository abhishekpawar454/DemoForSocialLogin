import Index from "../../Index";
import PageIndex from "../../PageIndex";

interface otpInterface {
  otp: string;
}

interface otpFormInterface {
  email: string;
  otp: string;
}

const VerifyOtp = () => {
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const email = location.state;

  let initialValues = {
    otp: "",
  };

  const handleFormSubmit = async (values: otpInterface) => {
    const formData: otpFormInterface = {
      email: email,
      otp: values.otp,
    };
    let res;
    if (isAdmin == "true") {
      res = await PageIndex.adminVerifyOtp(formData);
    } else {
      res = await PageIndex.userVerifyOtp(formData);
    }
    if (res?.status === 200) {
      localStorage.setItem("token", res?.data?.data?.token);
      Index.toast.success(res?.data?.message);
      navigate("/reset-password");
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
          <Index.Typography> Enter the otp sent to your email</Index.Typography>
        </Index.Box>

        <Index.Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={PageIndex.otpValidation}
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
              <Index.Box>
                <Index.MuiOtpInput
                  value={values.otp}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("otp", e);
                  }}
                />
                <Index.Typography variant="h6" className="error-message">
                  {touched?.otp && errors?.otp}
                </Index.Typography>
              </Index.Box>
              <Index.Box
                className={
                  isAdmin == "true" ? "login-button" : "login-button-user"
                }
              >
                <Index.Button type="submit" size="small" variant="contained">
                  Verify
                </Index.Button>
              </Index.Box>
            </Index.Box>
          )}
        </Index.Formik>
      </Index.Box>
    </Index.Box>
  );
};

export default VerifyOtp;
