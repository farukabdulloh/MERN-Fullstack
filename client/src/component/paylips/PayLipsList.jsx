import { format } from "date-fns";
import { Download } from "lucide-react";

const PayLips = ({ paylips = [], isAdmin }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Payslips</h3>

          <p className="mt-0.5 text-xs text-slate-400">
            {isAdmin ? "Employee payslip records." : "Your recent payslip history."}
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {paylips.length} Records
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
                Period
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Basic Salary
              </th>

              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Net Salary
              </th>

              {isAdmin && (
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paylips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-14 text-center text-sm text-slate-400">
                  No payslips found.
                </td>
              </tr>
            ) : (
              paylips.map(payslip => {
                const payslipId = payslip._id || payslip.id;

                return (
                  <tr key={payslipId} className="group transition-colors duration-150 hover:bg-slate-50/70">
                    {/* Employee */}
                    {isAdmin && (
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {payslip.employee?.firstName || "-"} {payslip.employee?.lastName || ""}
                        </div>
                      </td>
                    )}

                    {/* Period */}
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {format(new Date(payslip.year, payslip.month - 1), "MMM yyyy")}
                    </td>

                    {/* Basic Salary */}
                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {payslip.basicSalary ? `$${payslip.basicSalary.toLocaleString()}` : "-"}
                    </td>

                    {/* Net Salary */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-semibold text-slate-800">
                        {payslip.netSalary ? `$${payslip.netSalary.toLocaleString()}` : "-"}
                      </span>
                    </td>

                    {/* Action */}
                    {isAdmin && (
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => window.open(`/print/paylips/${payslipId}`)}
                          className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-600 ring-1 ring-indigo-600/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-100 hover:text-indigo-700 hover:shadow-sm"
                          title="Download payslip"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
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

export default PayLips;
