import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search, X, UserPlus, UserPenIcon } from "lucide-react";
import EmployeesCard from "../component/EmployeesCard";
import EmployeeForm from "../component/EmployeeForm";
import api from "../api/axios";

const employees = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const url = selectDept ? `employees?department=${selectDept}` : "/employees";
      const res = await api.get(url);
      setEmployee(res.data);
    } catch (error) {
      console.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [selectDept]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employee.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="">
          <h1 className="page-title">Employee</h1>
          <p className="page-subtitle">Manage your team member</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

          <input
            type="text"
            placeholder="Search Employee..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/* Department Filter */}
        <select
          value={selectDept}
          onChange={e => setSelectDept(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
        >
          <option value="">All Departments</option>

          {DEPARTMENTS.map(deptName => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>
      {/* Employee Cards */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-slate-300 bg-white">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>

                <p className="text-sm font-medium text-slate-600">No employees found</p>

                <p className="text-xs text-slate-400 mt-1">Try adjusting your search or department filter.</p>
              </div>
            ) : (
              filtered.map(emp => (
                <EmployeesCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={e => setEditEmployee(e)} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Create Employee Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="relative my-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-7">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <UserPlus className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Add New Employee</h2>
                    <p className="mt-0.5 text-sm text-slate-500">Create a new user account and employee profile</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <EmployeeForm
              onSuccess={() => {
                setEditEmployee(null);
                fetchEmployees();
              }}
              onCancel={() => setShowCreateEmployee(null)}
            />
          </div>
        </div>
      )}

      {/* Edit Employee Modal  */}
      {editEmployee && (
        <div
          onClick={() => setEditEmployee(null)}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative my-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:my-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserPenIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Edit Employee</h2>

                  <p className="mt-0.5 text-sm text-slate-500">Update employee profile</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditEmployee(null)}
                className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <EmployeeForm
              initialData={editEmployee}
              onSuccess={() => {
                setEditEmployee(null);
                fetchEmployees();
              }}
              onCancel={() => setEditEmployee(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default employees;
