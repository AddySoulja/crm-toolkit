import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  alpha,
  styled,
  useTheme,
  AppBar as MuiAppBar,
  Toolbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import BellIcon from "@mui/icons-material/NotificationsNone";

const drawerWidth = 200;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  paddingLeft: !open && `calc(${theme.spacing(7)} + 1px)`,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    border: "0.1px solid rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const settings = ["Account", "Settings"];

const Appbar = ({ drawerOpen }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [openUser, setOpenUser] = useState(null);
  const handleOpenUserMenu = (e) => setOpenUser(e.currentTarget);
  const handleCloseUserMenu = () => setOpenUser(null);

  return (
    <AppBar color="inherit" open={drawerOpen}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        <Box sx={{ flexGrow: 0, marginRight: "5%" }}>
          <Tooltip title="Notifications">
            <IconButton sx={{ marginRight: "15px" }}>
              <BellIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {userInfo.username}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={openUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(openUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
