import Index from "../Index";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = Index.useState<null | HTMLElement>(null);

  return (
    <Index.Box className="header  " sx={{ flexGrow: 1 }}>
      <Index.AppBar position="static">
        <Index.Toolbar>
          <Index.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello !
          </Index.Typography>
          <div>
            <Index.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <Index.AccountCircle />
            </Index.IconButton>
            <Index.Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <Index.MenuItem onClick={() => setAnchorEl(null)}>
                Profile
              </Index.MenuItem>
              <Index.MenuItem onClick={() => setAnchorEl(null)}>
                Sign out
              </Index.MenuItem>
            </Index.Menu>
          </div>
        </Index.Toolbar>
      </Index.AppBar>
    </Index.Box>
  );
};

export default AdminHeader;
