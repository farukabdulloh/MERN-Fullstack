import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { DEPARTMENTS } from "../assets/assets";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (isEditMode) {
      const pwd = formData.get("password");

      if (!pwd) {
        formData.delete("password");
      }
    }

    try {
      const url = isEditMode ? `/employees/${initialData.id}` : "/employees";

      const method = isEditMode ? "put" : "post";

      await api[method](url, formData);

      onSuccess ? onSuccess() : navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-5 animate-fade-in">
      {/* Personal Information */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
          <p className="mt-1 text-xs text-slate-400">Basic information about the employee.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
            <input
              name="firstName"
              required
              defaultValue={initialData?.firstName || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
            <input
              name="lastName"
              required
              defaultValue={initialData?.lastName || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Enter last name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
            <input
              name="phoneNumber"
              required
              defaultValue={initialData?.number || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Enter phone number"
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Join Date</label>
            <input
              type="date"
              name="date"
              required
              defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Profile Photo */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Profile Photo</label>

            <input
              name="profileImage"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100"
            />

            <p className="mt-1 text-xs text-slate-400">Upload a profile photo (JPG, PNG, or WEBP).</p>
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Bio <span className="font-normal text-slate-400">(Optional)</span>
            </label>

            <textarea
              name="bio"
              defaultValue={initialData?.bio || ""}
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Brief description about the employee..."
            />
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-base font-semibold text-slate-900">Employee Details</h3>
          <p className="mt-1 text-xs text-slate-400">Job position, department, and salary information.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
            <select
              name="department"
              defaultValue={initialData?.department || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="">Select Department</option>

              {DEPARTMENTS.map(deptName => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>
            <input
              name="position"
              required
              defaultValue={initialData?.position || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. Software Engineer"
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Basic Salary</label>
            <input
              name="basicSalary"
              type="number"
              required
              min="0"
              defaultValue={initialData?.basicSalary || 0}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="0"
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Allowances</label>
            <input
              name="allowances"
              type="number"
              required
              min="0"
              step="0.1"
              defaultValue={initialData?.allowances || 0}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="0"
            />
          </div>

          {/* Deductions */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Deductions</label>
            <input
              name="deduction"
              type="number"
              required
              min="0"
              step="0.1"
              defaultValue={initialData?.deductions || 0}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="0"
            />
          </div>

          {/* Status */}
          {isEditMode && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>

              <select
                name="employeeStatus"
                required
                defaultValue={initialData?.employeeStatus || "ACTIVE"}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Account Setup */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-base font-semibold text-slate-900">Account Setup</h3>
          <p className="mt-1 text-xs text-slate-400">Configure the employee's system account.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6">
          {/* Work Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Work Email</label>

            <input
              name="workEmail"
              type="email"
              required
              defaultValue={initialData?.workEmail || ""}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="employee@company.com"
            />
          </div>

          {/* Password */}
          {!isEditMode && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Temporary Password</label>

              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                placeholder="Enter temporary password"
              />
            </div>
          )}

          {isEditMode && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Change Password</label>

              <input
                name="password"
                type="password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                placeholder="Leave blank to keep current password"
              />
            </div>
          )}

          {/* System Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">System Role</label>

            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}

          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
