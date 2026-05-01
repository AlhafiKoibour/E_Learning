import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatCard from "./StatCard";
import RevenueChartCard from "./RevenueChartCard";
import WeeklySalesCard from "./WeeklySalesCard";
import MobileDesktopCard from "./MobileDesktopCard";
import TasksTable from "./TasksTable";
import Footer from "./Footer";
import "./dashboardLayout.css";

export const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard__main">
        <Topbar />

        <main className="dashboard__content">
          <div className="dashboard__head">
            <div>
              <h1>Default dashboard</h1>
              <p>Welcome back, Kelvin!</p>
            </div>

            <div className="dashboard__date">Today: July 25 ▾</div>
          </div>

          <div className="dashboard__stats">
            <StatCard title="Sales Today" value="13,456" trend="+34%" tone="success" label="TODAY" />
            <StatCard title="Visitors" value="4,145" trend="-13%" tone="danger" label="ANNUAL" />
            <StatCard title="Total Earnings" value="$ 74,5" trend="+18%" tone="success" label="MONTHLY" />
            <StatCard title="Pending Orders" value="188" trend="-30%" tone="danger" label="TODAY" />
          </div>

          <div className="dashboard__row">
            <RevenueChartCard />
            <WeeklySalesCard />
          </div>

          <div className="dashboard__row dashboard__row--bottom">
            <MobileDesktopCard />
            <TasksTable />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}