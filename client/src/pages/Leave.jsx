import { CalendarDaysIcon, CoffeeIcon, PlusIcon, ThermometerIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../component/Loading";
import LeaveHistory from "../component/leave/LeaveHistory";
import ApplyLeaveModal from "../component/leave/ApplyLeaveModal";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // For testing
  const isAdmin = true;

  const fetchLeaves = useCallback(() => {
    setLoading(true);
    setLeaves(dummyLeaveData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  const approvedLeaves = leaves.filter(leave => leave.status === "APPROVED");

  const sickCount = approvedLeaves.filter(leave => leave.type === "SICK").length;

  const casualCount = approvedLeaves.filter(leave => leave.type === "CASUAL").length;

  const annualCount = approvedLeaves.filter(leave => leave.type === "ANNUAL").length;

  const leavesStats = [
    {
      label: "Sick Leave",
      value: sickCount,
      icon: ThermometerIcon,
    },
    {
      label: "Casual Leave",
      value: casualCount,
      icon: CoffeeIcon,
    },
    {
      label: "Annual Leave",
      value: annualCount,
      icon: CalendarDaysIcon,
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Leave Management</h1>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {isAdmin
              ? "Manage leave applications from employees."
              : "View your leave history and submit a new request."}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Leave Statistics */}
      {!isAdmin && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {leavesStats.map(stat => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-slate-200 transition-colors duration-200 group-hover:bg-indigo-500" />

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-200 group-hover:bg-indigo-50">
                    <Icon className="h-5 w-5 text-slate-500 transition-colors duration-200 group-hover:text-indigo-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>

                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                      <span className="ml-1 text-sm font-normal text-slate-400">taken</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leave History */}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />

      {/* Apply Leave Modal */}
      <ApplyLeaveModal open={showModal} onClose={() => setShowModal(false)} onSucces={fetchLeaves} />
    </div>
  );
};

export default Leave;
