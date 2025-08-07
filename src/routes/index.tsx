import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import SMSSender from "../components/SMSSender";
import SMSHistory from "../components/SMSHistory";
import SMSStats from "../components/SMSStats";
import ProtectedRoute from "./middleware/ProtectedRoute";
import NotFound from "../components/notFound/404";
import Dashboard from "../pages/Dashboard/Dashboard";

// Define route paths as constants for better maintainability


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "send",
        element: <SMSSender />,
      },
      {
        path: "history",
        element: <SMSHistory />,
      },
      {
        path: "stats",
        element: <SMSStats />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

// Re-export other routing utilities
export * from './types';