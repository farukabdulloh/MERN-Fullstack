import LoginLeftSide from "../component/LoginLeftSide";
import { ShieldIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../component/Loading";

const LoginLanding = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return <Navigate to="/" />;

  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll, and system configuration.",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View your profile, track attendance, request time off, and access payslips.",
      icon: UserIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* Header */}
          <div className="mb-9 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight mb-3">Welcome Back!</h2>

            <p className="text-sm leading-6 text-slate-500">Select your portal to securely access the system.</p>
          </div>

          {/* Portal List */}
          <div className="space-y-4">
            {portalOptions.map(portal => {
              const Icon = portal.icon;

              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group flex items-center gap-4 p-5 sm:p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-indigo-100">
                    <Icon className="w-5 h-5 text-indigo-500" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                      {portal.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-400">{portal.description}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRightIcon className="shrink-0 w-4 h-4 text-slate-300 transition-all duration-300 group-hover:text-indigo-400 group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} GreatStack. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
