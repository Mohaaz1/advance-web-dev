import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    salary: ""
  });

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      salary: ""
    });

    setEditingId(null);
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, {
          ...form,
          salary: Number(form.salary)
        });
      } else {
        await api.post("/employees", {
          ...form,
          salary: Number(form.salary)
        });
      }

      resetForm();
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const editEmployee = (employee) => {
    setEditingId(employee._id);

    setForm({
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary
    });
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    (
      emp.firstName +
      " " +
      emp.lastName +
      " " +
      emp.department +
      " " +
      emp.position +
      " " +
      emp.email
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management System</h1>

      <form onSubmit={saveEmployee}>
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
        />

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <br />

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "8px"
        }}
      />

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>
                {emp.firstName} {emp.lastName}
              </td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>

              <td>
                <button onClick={() => editEmployee(emp)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteEmployee(emp._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
