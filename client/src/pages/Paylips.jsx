import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loading from "../component/Loading";
import GeneratePaylipForm from "../component/paylips/GeneratePaylipForm";
import PayLipsList from "../component/paylips/PayLipsList";
import { useAuth } from "../context/AuthContext";

const Paylips = () => {
  const [paylips, setPayLips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const fetchPaylips = useCallback(async () => {
    try {
      const res = await api.get("/paylips");
      setPayLips(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaylips();
  }, [fetchPaylips]);

  useEffect(() => {
    if (isAdmin)
      api
        .get("/employees")
        .then(res => setEmployees(res.data.filter(e => !e.isDeleted)))
        .catch(() => {});
  }, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Payslips</h1>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {isAdmin ? "Generate and manage employee payslips." : "View your payslip history."}
          </p>
        </div>

        {/* Admin Placeholder */}
        {isAdmin && (
          <div className="rounded-xl shadow-sm">
            <GeneratePaylipForm employees={employees} onSuccess={fetchPaylips} />
          </div>
        )}
      </div>

      {/* Payslip List */}
      <PayLipsList paylips={paylips} isAdmin={isAdmin} />
    </div>
  );
};

export default Paylips;
