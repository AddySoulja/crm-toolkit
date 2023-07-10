import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "#00000059",
      }}
    >
      <CircularProgress variant="indeterminate" thickness={5} size={50} />
    </Box>
  );
};

export default Loader;
