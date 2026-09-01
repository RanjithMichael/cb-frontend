import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("✅ Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-md">
      <ul className="flex justify-center gap-6 text-white font-semibold">
        <li>
          <Link
            to="/chat"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            💬 Chat
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            📝 Register
          </Link>
        </li>
        {!token ? (
          <li>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              🔑 Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              🚪 Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;


