import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Paylips from "./pages/Paylips";
import Setting from "./pages/Setting";
import PrintPaylips from "./pages/PrintPaylips";
import LoginForm from "./component/LoginForm";

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginLanding />} />

        <Route
          path="/login/admin"
          element={<LoginForm role="admin" title="Admin Login" subtitle="Sign in to manage the organization" />}
        />
        <Route
          path="/login/employee"
          element={<LoginForm role="employee" title="Employee Login" subtitle="Sign in to acces your account" />}
        />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/paylips" element={<Paylips />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        <Route path="/print/paylips/:id" element={<PrintPaylips />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
