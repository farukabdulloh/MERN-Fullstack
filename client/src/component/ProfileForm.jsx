import { Loader2, Save, User } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const bio = e.currentTarget.bio.value;
    try {
      await api.post("/profile", { bio });
      setMessage("Profile updated successfully");
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
            <User className="h-4.5 w-4.5 text-indigo-500" />
          </div>
          Public Profile
        </h2>
        <p className="mt-1 ml-11 text-sm text-slate-400">Manage your profile information and personal details.</p>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span>{message}</span>
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 outline-none cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              disabled
              value={initialData.email}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 outline-none cursor-not-allowed"
            />
          </div>

          {/* Position */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>
            <input
              disabled
              value={initialData.position || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 outline-none cursor-not-allowed"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Bio */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Bio</label>

          <textarea
            disabled={initialData.isDeleted}
            defaultValue={initialData.bio || ""}
            name="bio"
            rows={4}
            placeholder="Write a brief bio..."
            className={`w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-300 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 ${
              initialData.isDeleted ? "cursor-not-allowed bg-slate-50 text-slate-400" : ""
            }`}
          />

          <p className="mt-2 text-xs text-slate-400">This will be displayed on your profile.</p>
        </div>

        {/* Deleted Account */}
        {initialData.isDeleted ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold tracking-tight text-rose-700">Account Deactivated</p>
            <p className="mt-1 text-sm text-rose-500">You can no longer update your profile.</p>
          </div>
        ) : (
          /* Submit */
          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
