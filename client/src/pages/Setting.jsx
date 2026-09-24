import { useEffect, useState } from "react";
import { dummyProfileData } from "../assets/assets";
import Loading from "../component/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../component/ProfileForm";
import ChangePasswordModal from "../component/ChangePasswordModal";

const Setting = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyProfileData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Setting</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>
      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

      {/* Change Password trigger */}
      <div className="group flex max-w-md items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-200 group-hover:bg-indigo-50">
            <Lock className="h-5 w-5 text-slate-500 transition-colors duration-200 group-hover:text-indigo-600" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">Password</p>

            <p className="mt-1 text-sm text-slate-400">Update your account password</p>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-50"
        >
          Change
        </button>
      </div>
      <ChangePasswordModal open={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </div>
  );
};

export default Setting;
