import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useThemeStore } from "./stores/themeStore";

export default function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Apply theme class on initial load
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return <RouterProvider router={router} />;
}
