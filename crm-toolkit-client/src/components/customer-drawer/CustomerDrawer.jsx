import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import "./customerDrawer.css";
import { useDeleteCustomerMutation } from "../../redux/slices/customersApiSlice";
import { setCustomers } from "../../redux/slices/customersListReducer";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import CustomerModal from "../modal/CustomerModal";
const drawerWidth = 500;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function CustomerDrawer({ open, inDrawer, handleDrawer }) {
  const [cookie] = useCookies(["jwt"]);
  const [openModal, setOpenModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { name, email, phone, address, _id } = open && inDrawer;

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const [deleteCustomer, { isLoading }] = useDeleteCustomerMutation();

  const handleDeleteCustomers = async () => {
    try {
      const res = await deleteCustomer({ customers: [_id], cookie });
      const { customersList, message } = res.data.data;
      dispatch(setCustomers(customersList.list));
      toast.success(message);
      handleDrawer(false);
    } catch (error) {
      toast.error(error?.message || error);
    }
  };
  return (
    <>
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
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={() => handleDrawer(false)}
            edge="start"
          >
            <ArrowForward />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box className="customer-drawer">
          <Box className="customer-drawer-header-wrapper">
            <Box className="customer-drawer-header">
              <Box className="customer-drawer-profile">{name}</Box>
              <Box className="customer-drawer-info">
                <Typography className="customer-drawer-name">{name}</Typography>
                <Box className="customer-drawer-email-group">
                  <Typography className="email-group">{email}</Typography>
                  <Box className="divider" />
                  <Typography className="email-group">{phone}</Typography>
                </Box>
                <Typography className="customer-drawer-address">
                  {address}
                </Typography>
              </Box>
            </Box>
            <Box className="customer-drawer-btn-group">
              <Button variant="outlined" onClick={handleDeleteCustomers}>
                Delete
              </Button>
              <Button variant="contained" onClick={handleModalOpen}>
                Edit
              </Button>
            </Box>
          </Box>

          <Box className="customer-drawer-body-wrapper">
            <Box className="customer-drawer-body-header">
              <Tabs value={0}>
                <Tab label="Remarks" />
                <Tab label="Files" disabled />
              </Tabs>
            </Box>
            <Paper className="customer-drawer-body-main">
              <Box className="customer-drawer-body-main-header">
                <Box className="customer-drawer-body-profile">
                  {userInfo.username[0]}
                </Box>
                <Typography className="customer-drawer-body-main-header-text">
                  {userInfo.username}
                </Typography>
              </Box>
              <Box className="customer-drawer-body-content">
                <Typography>No remarks!</Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Drawer>
      <CustomerModal
        open={openModal}
        handleModalClose={handleModalClose}
        edit
        customer={open && inDrawer}
      />
    </>
  );
}
