import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";

const drawerWidth = 500;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function CustomerDrawer({ open }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader />
      <Divider />
    </Drawer>
  );
}
