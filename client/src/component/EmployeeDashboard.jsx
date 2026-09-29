import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This Month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting Approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPaysLip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payout",
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome, {emp?.firstName}!</h1>

        <p className="text-sm text-slate-500 mt-1">
          {emp?.position} · {emp?.department || "No Department"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            {/* Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-indigo-500 transition-colors duration-200" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>

                <p className="text-2xl font-bold text-slate-900 mt-2">{card.value}</p>

                <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
              </div>

              <card.icon className="w-10 h-10 p-2.5 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/attendance"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200"
          >
            Mark Attendance
            <ArrowRightIcon className="w-4 h-4" />
          </Link>

          <Link
            to="/leave"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors duration-200"
          >
            Apply for Leave
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
