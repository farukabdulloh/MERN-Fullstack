import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../component/Loading";

const PrintPaylips = () => {
  const { id } = useParams();

  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPayslip = dummyPayslipData.find(slip => slip._id === id);

    setPayslip(foundPayslip);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading />;

  if (!payslip) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-base font-medium text-slate-700">Payslip not found</p>
          <p className="mt-1 text-sm text-slate-400">The payslip you're looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        {/* Header */}

        <div className="border-b border-slate-200 px-6 py-7 text-center sm:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">PAYSLIP</h1>

          <p className="mt-1 text-sm text-slate-500">{period}</p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Total Salary This Month</p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-indigo-600">
              ${payslip.netSalary?.toLocaleString() || "0"}
            </p>
          </div>
        </div>

        {/* Employee Information */}
        <div className="px-6 py-7 sm:px-8">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-slate-900">Employee Information</h2>
            <p className="mt-1 text-xs text-slate-400">Employee details for this payslip.</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Employee Name</p>
              <p className="font-medium text-slate-900">
                {payslip.employee?.firstName || "-"} {payslip.employee?.lastName || ""}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Position</p>
              <p className="font-medium text-slate-900">{payslip.employee?.position || "-"}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Email</p>
              <p className="break-all font-medium text-slate-900">{payslip.employee?.email || "-"}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Pay Period</p>
              <p className="font-medium text-slate-900">{period}</p>
            </div>
          </div>
        </div>
        {/* Salary Breakdown */}
        <div className="px-6 pb-7 sm:px-8">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-slate-900">Salary Breakdown</h2>
            <p className="mt-1 text-xs text-slate-400">Detailed breakdown of your monthly salary.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Basic Salary */}
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3.5 text-slate-600">Basic Salary</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-900">
                    ${payslip.basicSalary?.toLocaleString() || "0"}
                  </td>
                </tr>

                {/* Allowances */}
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3.5 text-slate-600">Allowances</td>
                  <td className="px-4 py-3.5 text-right font-medium text-emerald-600">
                    + ${payslip.allowances?.toLocaleString() || "0"}
                  </td>
                </tr>

                {/* Deductions */}
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3.5 text-slate-600">Deductions</td>
                  <td className="px-4 py-3.5 text-right font-medium text-rose-600">
                    - ${payslip.deductions?.toLocaleString() || "0"}
                  </td>
                </tr>

                {/* Net Salary */}
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900">Net Salary</td>
                  <td className="px-4 py-4 text-right text-lg font-bold text-indigo-600">
                    ${payslip.netSalary?.toLocaleString() || "0"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-6 text-center sm:px-8">
          <p className="text-xs text-slate-400">
            This document is generated electronically and does not require a signature.
          </p>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-5 inline-flex cursor-pointer
            items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 print:hidden"
          >
            Print Payslip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintPaylips;
