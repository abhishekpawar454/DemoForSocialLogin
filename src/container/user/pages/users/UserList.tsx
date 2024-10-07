import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import "./UserList.css";
import moment from "moment";

interface UserInterface {
  _id?: string;
  code: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  isActive: boolean;
}

const UserList = () => {
  const navigate = Index.useNavigate();
  const [page, setPage] = Index.useState(0);
  const [rowsPerPage, setRowsPerPage] = Index.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [userData, setUserData] = Index.useState<UserInterface[]>([]);
  console.log(userData);

  const getAllUserApi = async () => {
    const res = await PageIndex.getAllUser();
    if (res?.status == 200) {
      setUserData(res?.data?.userData);
    }
  };

  Index.useEffect(() => {
    getAllUserApi();
  }, []);

  return (
    <Index.Box className="main-container">
      <Index.Box className="inner-container">
        <Index.Box className="upper-container">
          <Index.Typography className="table-heading" variant="h6">
            User List
          </Index.Typography>
          <Index.Box className="search-add-box">
            <Index.TextField
              className="table-search-field"
              size="small"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <Index.InputAdornment position="start">
                    <Index.SearchIcon />
                  </Index.InputAdornment>
                ),
              }}
            />
            <Index.Button
              className="table-add-button"
              size="small"
              variant="contained"
              onClick={() => navigate("add-edit-user")}
            >
              Add User
            </Index.Button>
          </Index.Box>
        </Index.Box>
        <Index.TableContainer
          className="table-container"
          component={Index.Paper}
        >
          <Index.Table sx={{ minWidth: 650 }} aria-label="simple table">
            <Index.TableHead>
              <Index.TableRow>
                <Index.TableCell>Code</Index.TableCell>
                <Index.TableCell align="center">Name</Index.TableCell>
                <Index.TableCell align="center">Email</Index.TableCell>
                <Index.TableCell align="center">Mobile</Index.TableCell>
                <Index.TableCell align="center">Created Date</Index.TableCell>
                <Index.TableCell align="center">Status</Index.TableCell>
                <Index.TableCell align="center">Actions</Index.TableCell>
              </Index.TableRow>
            </Index.TableHead>
            <Index.TableBody>
              {userData.map((user, index) => (
                <Index.TableRow
                  className={index % 2 ? "table-even-row" : "table-odd-row"}
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Index.TableCell scope="row">
                    {user.code ? user.code : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    {user.name ? user.name : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    {user.email ? user.email : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    {user.mobile ? user.mobile : "-"}
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    {moment(user.createdAt).format("DD-MM-YYYY")}
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    <Index.Switch
                      className="table-switch"
                      checked={user?.isActive}
                      size="small"
                    />
                  </Index.TableCell>
                  <Index.TableCell align="center">
                    <Index.Box className="action-icons-box">
                      <Index.EditIcon className="action-icons" />
                      <Index.DeleteIcon className="action-icons" />
                    </Index.Box>
                  </Index.TableCell>
                </Index.TableRow>
              ))}
            </Index.TableBody>
          </Index.Table>
        </Index.TableContainer>
        <Index.Box className="table-pagination">
          <Index.TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default UserList;
