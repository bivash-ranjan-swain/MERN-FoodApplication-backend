import { LayoutDashboard, LogOut, X, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const NAV_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/food", label: "Food", icon: Users },
  { path: "/admin/table", label: "Table", icon: Users },



];




const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:8800/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300
          lg:relative lg:translate-x-0 lg:shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between px-6 py-1 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/mylogo.png"
                alt="Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <div>
              <p className="text-md font-extrabold tracking-tight leading-tight">MANOJ FOOD SHOP</p>
            </div>
          </div>

          <button
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.3, ease: "easeOut" }}
            >
              <NavLink
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="px-4 pb-6"
        >
          <motion.button
            whileHover={{ backgroundColor: "red" }}
            whileTap={{ scale: 0.97 }}

            className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white"
            onClick={() => handleLogout()}
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </motion.div>
      </aside>
    </>
  );
};

export default Sidebar;