import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const [employee, setEmployee] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/auth/profile", {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      })
      .then((res) =>
        setEmployee(res.data)
      )
      .catch(() => {
        localStorage.removeItem(
          "token"
        );

        navigate("/login");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      {employee && (
        <>
          <p>
            Name:
            {employee.fullName}
          </p>

          <p>
            Employee ID:
            {employee.employeeId}
          </p>

          <p>
            Email:
            {employee.email}
          </p>

          <p>
            Department:
            {employee.department}
          </p>

          <p>
            Position:
            {employee.position}
          </p>
        </>
      )}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
