import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/login",
        form
      );

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save role
      localStorage.setItem(
        "role",
        res.data.role
      );

      // Save user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: form.email,
          role: res.data.role
        })
      );

      alert("Login Successful");

      // Role-based navigation
      if (res.data.role === "student") {
        navigate("/student");
      } else if (res.data.role === "lecturer") {
        navigate("/lecturer");
      } else if (res.data.role === "admin") {
        navigate("/admin");
      }

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Multi User Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;
