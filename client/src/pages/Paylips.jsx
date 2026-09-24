import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets";
import Loading from "../component/Loading";
import GeneratePaylipForm from "../component/paylips/GeneratePaylipForm";
import PayLipsList from "../component/paylips/PayLipsList";

const Paylips = () => {
  const [paylips, setPayLips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPaylips = useCallback(async () => {
    setPayLips(dummyPayslipData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPaylips();
  }, [fetchPaylips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
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
            <GeneratePaylipForm employees={employees} onSucces={fetchPaylips} />
          </div>
        )}
      </div>

      {/* Payslip List */}
      <PayLipsList paylips={paylips} isAdmin={isAdmin} />
    </div>
  );
};

export default Paylips;
