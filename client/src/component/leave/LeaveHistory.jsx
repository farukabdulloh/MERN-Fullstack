import { Check, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const LeaveHistory = ({ leaves = [], isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);

    // Nanti ketika backend sudah siap,
    // API update status ditaruh di sini.
    console.log("Update leave:", id, status);

    setTimeout(() => {
      setProcessing(null);
      onUpdate?.();
    }, 700);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Leave History</h3>

          <p className="mt-0.5 text-xs text-slate-400">
            {isAdmin ? "Review employee leave applications." : "Your recent leave applications."}
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {leaves.length} Records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {isAdmin && (
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>
              )}

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Dates
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reason
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              {isAdmin && (
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className="px-6 py-14 text-center text-sm text-slate-400">
                  No leave applications found.
                </td>
              </tr>
            ) : (
              leaves.map(leave => {
                const leaveId = leave._id || leave.id;

                return (
                  <tr key={leaveId} className="group transition-colors duration-150 hover:bg-slate-50/70">
                    {/* Employee */}
                    {isAdmin && (
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {leave.employee?.firstName || "-"} {leave.employee?.lastName || ""}
                        </div>
                      </td>
                    )}

                    {/* Type */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {leave.type || "-"}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {leave.startDate && leave.endDate
                        ? `${format(new Date(leave.startDate), "MMM dd")} - ${format(
                            new Date(leave.endDate),
                            "MMM dd, yyyy"
                          )}`
                        : "-"}
                    </td>

                    {/* Reason */}
                    <td className="max-w-xs truncate px-6 py-4 text-slate-500" title={leave.reason}>
                      {leave.reason || "-"}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${
                          leave.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-600"
                            : leave.status === "REJECTED"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {leave.status || "PENDING"}
                      </span>
                    </td>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <td className="px-6 py-4">
                        {leave.status === "PENDING" ? (
                          <div className="flex justify-center gap-2">
                            {/* Approve */}
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(leaveId, "APPROVED")}
                              disabled={!!processing}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Approve leave"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>

                            {/* Reject */}
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(leaveId, "REJECTED")}
                              disabled={!!processing}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Reject leave"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="block text-center text-xs text-slate-300">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
