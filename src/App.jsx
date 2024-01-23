import "./App.css";
import { isBrowser, isMobile } from "react-device-detect";
import MyRoute from "./routes/MyRoute";
import NavBottom from "./components/NavBottom";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isBrowser && <h1>Browser is not support, go to mobile to enjoy</h1>}

      <div className="h-[calc(100vh-80px)]">
        <div className={isAuthenticated ? "h-full p-2" : "h-full"}>
          {isMobile && (
            <>
              <MyRoute />

              {isAuthenticated && <NavBottom />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
