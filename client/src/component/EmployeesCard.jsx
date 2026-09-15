import { PencilIcon, TrashIcon } from "lucide-react";

const EmployeesCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    // Nanti ketika backend sudah siap, proses delete API ditaruh di sini.
    // Untuk sementara:
    onDelete();
  };

  const initials = `${employee.firstName?.[0] || ""}${employee.lastName?.[0] || ""}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Profile Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-sm">
            <span className="text-2xl font-semibold uppercase text-white">{initials}</span>
          </div>
        </div>
      </div>

      {/* Department & Status */}
      <div className="absolute left-3 top-3 flex gap-2">
        <span className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
          {employee.department || "Remote"}
        </span>

        {employee.isDelete && (
          <span className="rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">DELETED</span>
        )}
      </div>

      {/* Action Buttons */}
      {!employee.isDelete && (
        <div className="absolute inset-0 flex items-end justify-center gap-3 bg-gradient-to-t from-indigo-700/20 via-transparent to-transparent pb-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(employee)}
            className="rounded-xl bg-white/90 p-2.5 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:text-indigo-600"
            title="Edit employee"
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl bg-white/90 p-2.5 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:text-rose-600"
            title="Delete employee"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Employee Information */}
      <div className="p-5">
        <h3 className="truncate text-base font-semibold text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500">{employee.position}</p>
      </div>
    </div>
  );
};

export default EmployeesCard;
