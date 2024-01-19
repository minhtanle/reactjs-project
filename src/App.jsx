import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { isBrowser, isMobile } from "react-device-detect";
import MyRoute from "./routes/MyRoute";
import NavBottom from "@/components/NavBottom";
import useAuth from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="h-[95vh]">
      <div className="h-full">
        {isBrowser && <h1>Browser is not support, go to mobile to enjoy</h1>}

        {isMobile && (
          <>
            <MyRoute />

            {isAuthenticated && <NavBottom />}
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
