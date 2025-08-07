import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import SMSSender from "../components/SMSSender";
import SMSHistory from "../components/SMSHistory";
import SMSStats from "../components/SMSStats";
import ProtectedRoute from "./middleware/ProtectedRoute";
import NotFound from "../components/notFound/404";
import Dashboard from "../pages/Dashboard/Dashboard";
import User from "../components/User";
import Roles from "../components/Roles";
import Profile from "../components/Profile";
import Templates from "../components/Templates";  
import APISettings from "../components/APISettings";

// Define route paths as constants for better maintainability
const renderLayout = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  )
}

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
    element: renderLayout() ,  
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
    
      {
        path: "profile",
        element: <Profile />,
      },
      {
          path: "templates",
        element: <Templates />,
      },
      {
        path: "api-settings",
          element: <APISettings />,
        },
    ],
  },
  {
    path: "/admin", 
    element: renderLayout(),
    children: [
      {
        path: "user",
        element: <User />,
      },
      {
        path: "roles",
        element: <Roles />,
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