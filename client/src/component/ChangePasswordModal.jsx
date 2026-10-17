import { EyeIcon, EyeOffIcon, LockIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
      const { data } = await api.post("/auth/change-password", { currentPassword, newPassword });
      if (!data.success) throw new Error(data.error || "Failed");
      e.target.reset();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40">
                <LockIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Change Password</h2>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Update your account password securely.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Message */}
          {message.text && (
            <div
              className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${
                message.type === "success"
                  ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                  : "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
              }`}
            >
              <div
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  message.type === "success" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />

              <span>{message.text}</span>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Current Password
            </label>

            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                required
                placeholder="Enter your current password"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-11 text-sm text-slate-700 dark:text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
              >
                {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                required
                minLength={6}
                placeholder="Enter your new password"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-11 text-sm text-slate-700 dark:text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
              >
                {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Password must be at least 6 characters.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 dark:border-slate-800 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <LockIcon className="h-4 w-4" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
