import React from "react";
import Index from "../../../Index";
import "./UserList.css";
import PageIndex from "../../../PageIndex";

const AddUser = () => {
  const navigate = Index.useNavigate();
  const [showPassword, setShowPassword] = Index.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = Index.useState(false);
  // const [image, setImage] = Index.useState("");

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show: boolean) => !show);

  let initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    profile: "",
  };

  const handleFormSubmit = async () => {};

  //   const getAllUserApi = async () => {
  //     const res = await PageIndex.getAllUser();
  //     if (res?.status == 200) {
  //       setUserData(res?.data?.userData);
  //     }
  //   };

  //   Index.useEffect(() => {
  //     getAllUserApi();
  //   }, []);

  return (
    <Index.Box className="main-container">
      <Index.Box className="inner-container-add">
        <Index.Box className="upper-container">
          <Index.Typography className="table-heading-add" variant="h6">
            Add User
          </Index.Typography>
        </Index.Box>
        <Index.Box className="form-container">
          <Index.Formik
            // enableReinitialize
            initialValues={initialValues}
            validationSchema={PageIndex.userValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box>
                  <Index.Box className="grid-main">
                    <Index.Box className="grid-column">
                      <Index.Box className="add-user-input-main">
                        <Index.FormHelperText className="admin-form-lable">
                          Profile image
                          <span className="required-sign">*</span>
                        </Index.FormHelperText>

                        <Index.Box>
                          <Index.Box className="profile-image">
                            {/* {!errors?.profile &&
                            (image || editData?.profile) ? ( */}
                            <img
                              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800"
                              // src={
                              //   image
                              //     ? URL.createObjectURL(image)
                              //     : editData?.profile
                              //       ? `${process.env.REACT_APP_IMAGE_URL}${editData?.profile}`
                              //       : ""
                              // }
                              // onError={(e) => {
                              //   e.target.src = PageIndex.Svg.avtarIcon;
                              // }}
                              alt=""
                            />
                            {/* ) : (
                              <img
                                className="admin-upload-profile-img"
                                src={PageIndex.Svg.avtarIcon}
                                alt=""
                              />
                            )} */}
                            <Index.Button variant="contained" component="label">
                              <img
                                // src={Index.EditIcon}
                                className="admin-upload-icon"
                                alt="upload img"
                              ></img>
                              <input
                                type="file"
                                name="profile"
                                accept=".jpeg, .jpg, .png"
                                className="upload-image-input"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  try {
                                    if (
                                      e.currentTarget.files &&
                                      e.currentTarget.files[0]
                                    ) {
                                      setFieldValue(
                                        "profile",
                                        e.currentTarget.files[0]
                                      );
                                      // setImage(e.currentTarget.files[0]);
                                    }
                                  } catch (error) {
                                    // e.currentTarget.value = null;
                                  }
                                }}
                                hidden
                              />
                            </Index.Button>
                          </Index.Box>
                          <Index.FormHelperText className="admin-error-text">
                            {touched?.profile &&
                              !values?.profile &&
                              errors?.profile}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Name<span className="required-sign">*</span>
                      </Index.FormHelperText>
                      <Index.TextField
                        fullWidth
                        hiddenLabel
                        placeholder="Name"
                        name="name"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue?.toString().length <= 30) {
                            setFieldValue(
                              "name",
                              inputValue
                                .replace(/^\s+/, "")
                                .replace(/\s+/g, " ")
                            );
                          }
                        }}
                        onBlur={handleBlur}
                        value={values?.name}
                        size="small"
                      />
                      <Index.FormHelperText className="admin-error-text">
                        {touched?.name && errors?.name}
                      </Index.FormHelperText>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Email<span className="required-sign">*</span>
                      </Index.FormHelperText>

                      <Index.TextField
                        fullWidth
                        className="admin-form-control"
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Email"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue?.toString().length <= 30) {
                            setFieldValue("email", inputValue.trim());
                          }
                        }}
                        onBlur={handleBlur}
                        value={values?.email}
                        size="small"
                      />
                      <Index.FormHelperText className="admin-error-text">
                        {touched?.email && errors?.email}
                      </Index.FormHelperText>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Mobile Number
                        <span className="required-sign">*</span>
                      </Index.FormHelperText>

                      <Index.TextField
                        fullWidth
                        id="filled-hidden-label-normal"
                        type="text"
                        placeholder="Mobile number"
                        className="admin-form-control"
                        name="mobileNumber"
                        onBlur={handleBlur}
                        value={values.mobileNumber}
                        size="small"
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(
                            /[^\d]/g,
                            ""
                          );
                          if (inputValue.toString().length <= 10) {
                            setFieldValue("mobileNumber", inputValue);
                          }
                        }}
                      />
                      <Index.FormHelperText className="admin-error-text">
                        {touched?.mobileNumber && errors?.mobileNumber}
                      </Index.FormHelperText>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Role<span className="required-sign">*</span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-dropdown-box">
                        <Index.Select
                          fullWidth
                          defaultValue={values?.role ? values?.role : ""}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => {
                            setFieldValue("role", e.target.value);
                          }}
                          size="small"
                        >
                          <Index.MenuItem disabled value={""}>
                            Select role
                          </Index.MenuItem>
                          <Index.MenuItem value="Admin">Admin</Index.MenuItem>
                          <Index.MenuItem value="User">User</Index.MenuItem>
                          {/* {roleData?.map((items, index) => (
                              <Index.MenuItem
                                value={items?._id}
                                key={items?._id}
                              >
                                {items?.role}
                              </Index.MenuItem>
                            ))} */}
                        </Index.Select>
                        <Index.FormHelperText className="admin-error-text">
                          {touched?.role && errors?.role}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Password<span className="required-sign">*</span>
                      </Index.FormHelperText>

                      <Index.Stack component="label">
                        <Index.OutlinedInput
                          className="admin-form-control admin-form-control-eye"
                          name="password"
                          onBlur={handleBlur}
                          placeholder="Password"
                          autoComplete="new-password"
                          type={showPassword ? "text" : "password"}
                          inputProps={{ maxLength: 16 }}
                          value={values.password}
                          size="small"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue("password", e.target.value.trim());
                          }}
                          endAdornment={
                            <Index.InputAdornment
                              position="end"
                              className="pass_position"
                            >
                              <Index.IconButton
                                className="icon_end_icon eye-btn-set"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Index.VisibilityOff />
                                ) : (
                                  <Index.Visibility />
                                )}
                              </Index.IconButton>
                            </Index.InputAdornment>
                          }
                        />
                        <Index.FormHelperText className="admin-error-text">
                          {touched?.password && errors?.password}
                        </Index.FormHelperText>
                      </Index.Stack>
                    </Index.Box>

                    <Index.Box className="grid-column">
                      <Index.FormHelperText className="admin-form-lable">
                        Confirm password
                        <span className="required-sign">*</span>
                      </Index.FormHelperText>

                      <Index.Stack component="label">
                        <Index.OutlinedInput
                          className="admin-form-control admin-form-control-eye"
                          name="confirmPassword"
                          onBlur={handleBlur}
                          placeholder="Confirm password"
                          autoComplete="new-password"
                          type={showConfirmPassword ? "text" : "password"}
                          inputProps={{ maxLength: 16 }}
                          value={values.confirmPassword}
                          size="small"
                          onChange={(e) => {
                            setFieldValue(
                              "confirmPassword",
                              e.target.value.trim()
                            );
                          }}
                          endAdornment={
                            <Index.InputAdornment
                              position="end"
                              className="pass_position"
                            >
                              <Index.IconButton
                                className="icon_end_icon eye-btn-set"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <Index.VisibilityOff />
                                ) : (
                                  <Index.Visibility />
                                )}
                              </Index.IconButton>
                            </Index.InputAdornment>
                          }
                        />
                        <Index.FormHelperText className="admin-error-text">
                          {touched?.confirmPassword && errors?.confirmPassword}
                        </Index.FormHelperText>
                      </Index.Stack>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="button-box">
                  <Index.Button
                    className="table-add-button"
                    size="small"
                    variant="contained"
                    onClick={() => navigate("/admin/user-list")}
                  >
                    Back
                  </Index.Button>
                  <Index.Button
                    variant="contained"
                    type="submit"
                    size="small"
                    className="table-add-button"
                  >
                    Submit
                  </Index.Button>
                </Index.Box>
              </form>
            )}
          </Index.Formik>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default AddUser;
