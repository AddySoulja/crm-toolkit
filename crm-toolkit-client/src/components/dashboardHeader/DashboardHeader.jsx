import React, { useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomerModal from "../modal/CustomerModal";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "78px",
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
      <CustomerModal open={open} handleModalClose={handleModalClose} />
    </>
  );
};

export default DashboardHeader;
