import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeStore } from "../stores/themeStore";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    toggleTheme();
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      disabled={animating}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      <div className="relative transition-transform duration-500 ease-spring">
        <div
          className={`transform transition-all duration-500 ${
            animating
              ? isDark
                ? "rotate-[360deg] scale-0"
                : "-rotate-[360deg] scale-0"
              : ""
          }`}
        >
          {isDark ? (
            <Brightness7
              className="text-yellow-400 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              fontSize="small"
            />
          ) : (
            <Brightness4
              className="text-gray-700 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              fontSize="small"
            />
          )}
        </div>
      </div>

      {/* Ripple effect */}
      <span
        className={`absolute inset-0 transform scale-0 rounded-full ${
          isDark ? "bg-yellow-400/20" : "bg-gray-700/10"
        } ${animating ? "animate-ripple" : ""}`}
      />
    </button>
  );
}
