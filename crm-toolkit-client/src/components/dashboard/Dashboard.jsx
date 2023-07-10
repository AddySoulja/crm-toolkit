import React, { useState } from "react";
import TableComponent from "../table/TableComponent";
import Appbar from "../appbar/Appbar";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import MiniDrawer from "../mini-drawer/MiniDrawer";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <MiniDrawer drawerOpen={drawerOpen} handleDrawer={handleDrawer}>
        <Appbar drawerOpen={drawerOpen} />
        <DashboardHeader />
        <TableComponent />
      </MiniDrawer>
    </>
  );
};

export default Dashboard;
