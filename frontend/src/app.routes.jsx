import { createBrowserRouter, Outlet } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import JobBoard from "./features/interview/components/JobBoard";
import Navbar from "./components/Navbar";

// Root layout to include the Navbar on all pages
const RootLayout = () => {
    return (
        <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#0B0E14' }}>
            <Navbar />
            <Outlet />
        </div>
    );
};

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home /> // Public landing page
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/dashboard",
                element: <Protected><JobBoard /></Protected>
            },
            {
                path: "/interview/:interviewId",
                element: <Interview /> // Works for both preview and saved reports
            }
        ]
    }
]);