import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/auth/dashboard",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setUser(res.data.user);
    } catch (err) {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      {user && (
        <>
          <h3>
            Welcome {user.email}
          </h3>

          <button onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
