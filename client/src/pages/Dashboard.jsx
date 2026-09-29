import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminDashboard from "../component/AdminDashboard";
import EmployeeDashboard from "../component/EmployeeDashboard";
import Loading from "../component/Loading";

const Dashboard = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return data?.role === "ADMIN" ? <AdminDashboard data={data} /> : <EmployeeDashboard data={data} />;
};

export default Dashboard;
