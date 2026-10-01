import { CalendarDays, Loader2, Plus, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const GeneratePaylipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100"
      >
        <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        Generate Payslips
      </button>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/paylips", data);
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("GENERATE PAYSLIP ERROR:", error);
      console.error("RESPONSE:", error?.response?.data);

      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={() => !loading && setIsOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">Generate Monthly Payslip</h3>

            <p className="mt-1 text-sm text-slate-500">Generate a payslip for an employee.</p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Employee */}
          <div>
            <label htmlFor="employeeId" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <User className="h-4 w-4 text-slate-400" />
              Employee
            </label>

            <select
              id="employeeId"
              name="employeeId"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            >
              <option value="" disabled>
                Select employee
              </option>

              {employees.map(e => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Month */}
            <div>
              <label htmlFor="month" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                Month
              </label>

              <select
                id="month"
                name="month"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option value={m} key={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="mb-2 block text-sm font-medium text-slate-700">
                Year
              </label>

              <input
                id="year"
                type="number"
                name="year"
                min="2020"
                max="2100"
                defaultValue={new Date().getFullYear()}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* Basic Salary */}
          <div>
            <label htmlFor="basicSalary" className="mb-2 block text-sm font-medium text-slate-700">
              Basic Salary
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">$</span>

              <input
                id="basicSalary"
                type="number"
                name="basicSalary"
                min="0"
                required
                placeholder="5000"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Allowances */}
            <div>
              <label htmlFor="allowances" className="mb-2 block text-sm font-medium text-slate-700">
                Allowances
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">$</span>

                <input
                  id="allowances"
                  type="number"
                  name="allowances"
                  min="0"
                  defaultValue="0"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            {/* Deductions */}
            <div>
              <label htmlFor="deductions" className="mb-2 block text-sm font-medium text-slate-700">
                Deductions
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">$</span>

                <input
                  id="deductions"
                  type="number"
                  name="deductions"
                  min="0"
                  defaultValue="0"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Generate Payslip
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePaylipForm;
