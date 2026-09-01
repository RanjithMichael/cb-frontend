import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatBox />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* Toast container at the bottom */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;

