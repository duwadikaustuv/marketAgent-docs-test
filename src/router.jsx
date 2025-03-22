import { createBrowserRouter, Navigate } from "react-router-dom";
import DocPage from "./pages/[slug]";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/overview" replace />,
    },
    {
      path: "/:slug",
      element: <DocPage />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
