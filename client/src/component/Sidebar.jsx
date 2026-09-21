import {
  CalendarCheckIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MenuIcon,
  Settings,
  UserIcon,
  XIcon,
  BriefcaseBusinessIcon,
  LogOutIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";

const SideBar = () => {
  const { pathname } = useLocation();

  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = "EMPLOYEE";
  console.log(role);

  const navItems = [
    {
      name: "Dashboard",
      href: "/Dashboard",
      icon: LayoutDashboardIcon,
    },

    role === "ADMIN"
      ? {
          name: "Employee",
          href: "/Employees",
          icon: UserIcon,
        }
      : {
          name: "Leave",
          href: "/Leave",
          icon: FileTextIcon,
        },

    {
      name: "Attendance",
      href: "/Attendance",
      icon: CalendarCheckIcon,
    },

    {
      name: "Paylips",
      href: "/Paylips",
      icon: DollarSignIcon,
    },

    {
      name: "Setting",
      href: "/Setting",
      icon: Settings,
    },
  ];

  const handleLogOut = () => {
    window.location.href = "/login";
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
              <BriefcaseBusinessIcon className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Employee MS</p>

              <p className="mt-0.5 text-[11px] text-slate-500">Management System</p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* User Profile */}
      {userName && (
        <div className="mx-3 mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10">
              <span className="text-sm font-semibold uppercase text-indigo-400">{userName.charAt(0)}</span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">{userName}</p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <p className="text-[11px] text-slate-500">{role === "ADMIN" ? "Administrator" : "Employee"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Label */}
      <div className="px-5 pb-2 pt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">Navigation</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map(item => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon
                className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />

              <span className="flex-1">{item.name}</span>

              {isActive && <ChevronRightIcon className="h-4 w-4 text-indigo-200" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-white/10 px-3 py-4">
        <button
          type="button"
          onClick={handleLogOut}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOutIcon className="h-5 w-5 text-slate-500 transition-colors duration-200 group-hover:text-red-400" />

          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white shadow-lg transition-colors hover:bg-slate-800 lg:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className="hidden h-full w-64 shrink-0 flex-col border-r border-white/5 bg-linear-to-b from-slate-900 
      via-slate-900 to-slate-950 text-white lg:flex"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-50
    flex w-72 flex-col
    bg-linear-to-b from-slate-900 via-slate-900 to-slate-950
    text-white shadow-2xl
    transition-transform duration-300
    lg:hidden
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default SideBar;
