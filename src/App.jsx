import "./App.css";
import { isBrowser, isMobile } from "react-device-detect";
import MyRoute from "./routes/MyRoute";
import NavBottom from "./components/NavBottom";
import useAuth from "./hooks/useAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isBrowser && <h1>Browser is not support, go to mobile to enjoy</h1>}

      <div className="h-[calc(100vh-80px)]">
        <div className={isAuthenticated ? "h-full p-2 overflow-y-scroll" : "h-full"}>
          {isMobile && (
            <>
              <MyRoute />

              {isAuthenticated && <NavBottom />}
            </>
          )}

          <ToastContainer stacked  limit={3} />
        </div>
      </div>
    </>
  );
};

export default App;
