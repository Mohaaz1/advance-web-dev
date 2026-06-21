function StudentDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
