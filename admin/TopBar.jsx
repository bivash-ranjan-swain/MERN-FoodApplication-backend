import {
  Menu,
  User,
  LogOut,
  Maximize,
  Minimize,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopBar = ({ setSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Detect Escape Key Exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const userData = JSON.parse(localStorage.getItem("user"))

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-10 bg-white border-b border-slate-200 px-6 h-15 flex items-center justify-between shrink-0"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </motion.button>

        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="text-[15px] font-medium tracking-widest text-slate-800"
        >
          Manoj Food Shop
        </motion.span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Fullscreen Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleFullscreen}
          className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize size={18} />
          ) : (
            <Maximize size={18} />
          )}
        </motion.button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setProfileOpen((o) => !o)}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="hidden sm:block text-right">
              <p className="text-[13px] font-medium text-slate-800 leading-tight">
                {userData?.fullName}
              </p>

              <p className="text-[11px] uppercase tracking-wider text-slate-400 leading-tight">
                {userData?.role}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[13px] font-medium text-blue-700">
              <User />
            </div>
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="absolute right-0 mt-2.5 w-52 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden z-50"
              >
                {/* Identity */}
                <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[13px] font-medium text-blue-700 shrink-0">
                  </div>

                  <div>
                    <p className="text-[13px] font-medium text-slate-800">
                      {userData?.fullName}
                    </p>

                    <p className="text-[11px] text-slate-400 capitalize">
                      {userData?.role}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-1.5">
                  <motion.button
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{
                      backgroundColor: "#f8fafc",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 transition text-left"
                  >
                    <User
                      size={15}
                      className="text-slate-400"
                    />
                    My profile
                  </motion.button>
                </div>

                {/* Sign out */}
                <div className="border-t border-slate-100 p-1.5">
                  <motion.button
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05,
                      duration: 0.2,
                    }}
                    whileHover={{
                      backgroundColor: "#fef2f2",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-red-500 transition text-left cursor-pointer"
                  >
                    <LogOut size={15} />
                    Sign out
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;