import React from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, EyeClosedIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preseventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white ">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/login">
            <ArrowLeftIcon size={16} /> back to portal
          </Link>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight">{title}</h1>

            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">{subtitle}</p>
          </div>
          {error && (
            <div
              className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 
              text-sm rounded-xl flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="dodi@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-800 transition-colors cursor-pointer"
              >
                {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2" />}
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
