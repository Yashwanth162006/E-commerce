import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app">
      <ToastContainer  autoClose={1000}
        pauseOnHover={false}/>
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
