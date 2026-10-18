import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EyeClosedIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
      <LoginLeftSide />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm p-7 sm:p-9">
            {/* Back */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
            >
              <ArrowLeftIcon size={16} />
              Back to portal
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-2">
                {role} portal
              </p>

              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
                {title}
              </h1>

              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 leading-relaxed">{subtitle}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm rounded-xl flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 outline-none transition focus:bg-white dark:focus:bg-slate-800/80 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 outline-none transition focus:bg-white dark:focus:bg-slate-800/80 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign In */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading && <Loader2Icon className="animate-spin h-4 w-4" />}

                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
            © 2026 Employee Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
