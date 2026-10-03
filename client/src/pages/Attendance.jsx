import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { dummyAttendanceData } from "../assets/assets";
import AttendanceHistory from "../component/attendance/AttendanceHistory";
import AttendanceStats from "../component/attendance/AttendanceStats";
import CheckinButton from "../component/attendance/CheckinButton";
import Loading from "../component/Loading";
import toast from "react-hot-toast";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/attendance");
      const json = res.data;
      setHistory(json.date || []);
      if (json.employee?.isDeleted) setIsDeleted(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(r => new Date(r.date).toDateString() === today.toDateString());

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work hours and daily check-ins</p>
      </div>

      {isDeleted ? (
        <div className="mb-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
          <p className="text-rose-600">
            You can no longer clock in or out because your empolyee record have been marked as deleted
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckinButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      <AttendanceStats history={history} />
      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;
