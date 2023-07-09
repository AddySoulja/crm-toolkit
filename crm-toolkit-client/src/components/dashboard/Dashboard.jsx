import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import AddIcon from "@mui/icons-material/Add";
import NavDrawer from "../common/nav-drawer/NavDrawer";
import TableComponent from "../common/table/TableComponent";
import CustomerModal from "../common/modal/CustomerModal";

import { useGetAllCustomersMutation } from "../../redux/slices/customersApiSlice";

const Dashboard = () => {
  const [cookie] = useCookies(["jwt"]);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [getCustomers, { isLoading }] = useGetAllCustomersMutation();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const fetchClients = useCallback(async () => {
    const res = await getCustomers(cookie);
    const customers = res;
    // dispatch(setCustomers(customers));
  }, [cookie, getCustomers]);

  // useEffect(() => {
  //   fetchClients();
  // }, [fetchClients]);
  return (
    <>
      <NavDrawer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Customers</h2>
          <Tooltip title="Add a new client">
            <Button
              sx={{ height: "40px", display: "flex", alignItems: "center" }}
              variant="outlined"
              onClick={handleModalOpen}
            >
              <Typography>Add New </Typography>
              <AddIcon />
            </Button>
          </Tooltip>
        </Box>
        <CustomerModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        />
        <TableComponent />
      </NavDrawer>
    </>
  );
};

export default Dashboard;
