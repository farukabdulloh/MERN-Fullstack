import React from "react";
import { getDayTypeDisplay } from "../../assets/assets";
import { format } from "date-fns";

const AttendanceHistory = ({ history = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
          <p className="mt-0.5 text-xs text-slate-400">Your recent attendance records</p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {history.length} Records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Check In
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Check Out
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Working Hours
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Day Type
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-sm text-slate-400">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              history.map(record => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr
                    key={record._id || record.id}
                    className="group transition-colors duration-150 hover:bg-slate-50/70"
                  >
                    {/* Date */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-medium text-slate-900">
                        {format(new Date(record.date), "MMM dd, yyyy")}
                      </span>
                    </td>

                    {/* Check In */}
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "-"}
                    </td>

                    {/* Check Out */}
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "-"}
                    </td>

                    {/* Working Hours */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-medium text-slate-700">
                        {record.workingHours ? `${record.workingHours} hrs` : "-"}
                      </span>
                    </td>

                    {/* Day Type */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {dayType?.label || dayType || "-"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${
                          record.status === "PRESENT"
                            ? "bg-emerald-50 text-emerald-600"
                            : record.status === "LATE"
                            ? "bg-amber-50 text-amber-600"
                            : record.status === "ABSENT"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {record.status || "-"}
                      </span>
                    </td>
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

export default AttendanceHistory;
