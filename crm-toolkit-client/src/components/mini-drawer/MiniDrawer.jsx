import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Tooltip } from "@mui/material";

import PersonalIcon from "@mui/icons-material/BusinessCenterOutlined";
import SubscribersIcon from "@mui/icons-material/Groups2Outlined";
import HomeIconFilled from "@mui/icons-material/Home";
import ProgressIcon from "@mui/icons-material/DonutLarge";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../../redux/slices/authReducer";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const navigation = [
  { page: "Dashboard", icon: <HomeIconFilled /> },
  { page: "Subscribers", icon: <SubscribersIcon /> },
  { page: "Personal", icon: <PersonalIcon /> },
  { page: "Progress", icon: <ProgressIcon /> },
];
export default function MiniDrawer({ children, drawerOpen, handleDrawer }) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          {drawerOpen ? (
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawer}
              edge="start"
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
            >
              <Tooltip title="Menu">
                <MenuIcon />
              </Tooltip>
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {navigation.map((item) => (
            <ListItem key={item.page} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? "initial" : "center",
                  px: 2.5,
                  marginBottom: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={item.page}>{item.icon}</Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={item.page}
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => dispatch(removeCredentials())}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
                marginBottom: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Log out">
                  <LogoutIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: "0 10px" }}>
        {children}
      </Box>
    </Box>
  );
}
