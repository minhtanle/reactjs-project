import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Index";
import Settings from "../pages/Settings/Index";
import Profile from "../pages/Profile/Index";
import Vocabulary from "../pages/Vocabulary/Index";
import Contact from "../components/Contact";
import Login from "../pages/Auth/Login";
import Error404 from "../components/404";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import Register from "../pages/Auth/Register";

export default function MyRoute() {
  return useRoutes([
    {
      path: "*",
      element: <Error404 />,
    },
    {
      path: "404",
      element: <Error404 />,
    },
    {
      path: "login",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      ),
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
    },
    {
      path: "contact",
      element: (
        <AuthGuard>
          <Contact />
        </AuthGuard>
      ),
    },
    {
      path: "vocabulary",
      element: (
        <AuthGuard>
          <Vocabulary />
        </AuthGuard>
      ),
    },
    {
      path: "settings",
      element: (
        <AuthGuard>
          <Settings />
        </AuthGuard>
      ),
    },
    {
      path: "profile",
      element: (
        <AuthGuard>
          <Profile />
        </AuthGuard>
      ),
    },
  ]);
}