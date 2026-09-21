import { AlertCircleIcon, Calendar1Icon, ClockIcon } from "lucide-react";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(h => h.status === "PRESENT" || h.status === "LATE").length;

  const totalLate = history.filter(h => h.status === "LATE").length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: Calendar1Icon,
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon,
    },
    {
      label: "Avg. Work Hrs",
      value: "8 hrs",
      icon: ClockIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {stats.map(s => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 transition-colors duration-200 group-hover:bg-indigo-500" />

          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-200 group-hover:bg-indigo-50">
              <s.icon className="h-5 w-5 text-slate-500 transition-colors duration-200 group-hover:text-indigo-600" />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">{s.label}</p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{s.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
