import { create } from "zustand";
import { persist } from "zustand/middleware";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return true;
};

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: getInitialTheme(),
      toggleTheme: () =>
        set((state) => {
          const newTheme = !state.isDark;
          document.documentElement.classList.toggle("dark", newTheme);
          return { isDark: newTheme };
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);
