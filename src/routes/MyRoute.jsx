import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "../pages/Auth/Login";
import Error404 from "../components/404";

const privateRoute = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
]

const publicRoute = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default function MyRoute() {
  const isLogin = false
  return (
    <Routes>
      {privateRoute.map(route => 
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute isLogin={isLogin}>
              {route.element}
            </ProtectedRoute>
          }
        />
      )}

      {publicRoute.map(route => 
        <Route
            key={route.path}
            path={route.path}
            element={route.element}
        />
      )}
    </Routes>
  )
}

const ProtectedRoute = ({
  isLogin = false,
  redirectPath = '/login',
  children,
}) => {
  if (!isLogin) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};
  