import { useEffect } from "react";
import { useState } from "react";
import { dummyEmployeeDashboardData, dummyAdminDashboardData } from "../assets/assets";
import AdminDashboard from "../component/AdminDashboard";
import EmployeeDashboard from "../component/EmployeeDashboard";
import Loading from "../component/Loading";

const Dashboard = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyAdminDashboardData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;
  if (!data) return <p className="text-center text-slate-500 py-12">Failed to load Dashboard</p>;

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
