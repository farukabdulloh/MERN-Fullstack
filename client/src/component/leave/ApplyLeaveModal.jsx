import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/leave", data);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message);
    }

    console.log("Leave request submitted");
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Apply for Leave</h2>

            <p className="mt-1 text-sm text-slate-500">Submit your leave request for approval.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Leave Type */}
          <div>
            <label htmlFor="leaveType" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="h-4 w-4 text-slate-400" />
              Leave Type
            </label>

            <select
              id="leaveType"
              name="type"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            >
              <option value="" disabled>
                Select leave type
              </option>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              Leave Duration
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="mb-1.5 block text-xs font-medium text-slate-500">
                  Start Date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  min={minDate}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="mb-1.5 block text-xs font-medium text-slate-500">
                  End Date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  min={minDate}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-400">Leave can be requested starting from tomorrow.</p>
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="h-4 w-4 text-slate-400" />
              Reason
            </label>

            <textarea
              id="reason"
              name="reason"
              rows={4}
              maxLength={500}
              required
              placeholder="Tell us briefly why you are requesting leave..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />

            <p className="mt-1.5 text-xs text-slate-400">Please provide a short explanation for your leave request.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
