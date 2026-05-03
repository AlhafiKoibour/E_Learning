import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatCard from "./StatCard";
import RevenueChartCard from "./RevenueChartCard";
import WeeklySalesCard from "./WeeklySalesCard";
import MobileDesktopCard from "./MobileDesktopCard";
import TasksTable from "./TasksTable";
import FooterPage from "./FooterPage";
import "./dashboardLayout.css";


export const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard__main">
        <Topbar />

        <main className="dashboard__content">
          <Outlet />
        </main>

        
      </div>
    </div>
  );
}