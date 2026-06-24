import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FooterPage from "./FooterPage";
import "./dashboardLayout.css";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`dashboard ${sidebarOpen ? "" : "dashboard--collapsed"}`}>
      <Sidebar collapsed={!sidebarOpen} />

      <div className="dashboard__main">
        <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="dashboard__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};