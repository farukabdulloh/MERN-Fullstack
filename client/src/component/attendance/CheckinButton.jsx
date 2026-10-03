import { Loader2Icon, LogInIcon, LogOutIcon, CheckCircle2Icon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const CheckinButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    console.log("1. START");

    try {
      console.log("2. BEFORE POST");
      await api.post("/attendance");
      console.log("3. POST SUCCESS");

      await onAction();
      console.log("4. onAction SUCCESS");
    } catch (error) {
      console.error("ATTENDANCE ERROR:", error);
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      console.log("5. FINALLY");
      setLoading(false);
    }
  };

  // Work day already completed
  if (todayRecord?.checkOut) {
    return (
      <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
            <CheckCircle2Icon className="h-6 w-6 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900">Work Day Completed</h3>

            <p className="mt-1 text-sm text-slate-500">Great job! See you tomorrow.</p>
          </div>
        </div>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.isCheckedIn;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleAttendance}
        disabled={loading}
        className={`
            group flex w-full items-center justify-between gap-4
            rounded-2xl border p-5
            text-left transition-all duration-300
            disabled:cursor-not-allowed disabled:opacity-70
            ${
              isCheckedIn
                ? "border-orange-200 bg-orange-50 hover:border-orange-300 hover:shadow-md"
                : "border-indigo-200 bg-indigo-50 hover:border-indigo-300 hover:shadow-md"
            }
          `}
      >
        {/* Left Content */}
        <div className="flex min-w-0 items-center gap-4">
          {/* Icon */}
          <div
            className={`
                flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                transition-transform duration-300
                group-hover:scale-105
                ${isCheckedIn ? "bg-orange-100 text-orange-600" : "bg-indigo-100 text-indigo-600"}
              `}
          >
            {loading ? (
              <Loader2Icon className="h-6 w-6 animate-spin" />
            ) : isCheckedIn ? (
              <LogOutIcon className="h-6 w-6" />
            ) : (
              <LogInIcon className="h-6 w-6" />
            )}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900">
              {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Please wait a moment..." : isCheckedIn ? "Click to end your shift" : "Start your work day"}
            </p>
          </div>
        </div>

        {/* Arrow */}
        {!loading && (
          <div
            className={`
                flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                transition-all duration-300
                group-hover:translate-x-1
                ${isCheckedIn ? "bg-orange-100 text-orange-600" : "bg-indigo-100 text-indigo-600"}
              `}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        )}
      </button>
    </div>
  );
};

export default CheckinButton;
