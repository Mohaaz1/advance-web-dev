```vue
<template>
  <div class="container">
    <h1>Student Management System</h1>

    <div class="form-container">
      <input
        v-model="student.fullname"
        placeholder="Full Name"
      />

      <input
        v-model="student.email"
        placeholder="Email"
      />

      <input
        v-model="student.course"
        placeholder="Course"
      />

      <button @click="saveStudent">
        {{ isEditing ? "Update Student" : "Add Student" }}
      </button>

      <button
        v-if="isEditing"
        @click="clearForm"
      >
        Cancel
      </button>
    </div>

    <div class="search-container">
      <input
        v-model="searchTerm"
        placeholder="Search student by name..."
      />

      <button @click="sortStudents">
        Sort A-Z
      </button>

      <button @click="sortStudentsDesc">
        Sort Z-A
      </button>
    </div>

    <div class="dashboard">
      <h2>Student Dashboard</h2>
      <h3>Total Students: {{ students.length }}</h3>
    </div>

    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="s in filteredStudents"
          :key="s._id"
        >
          <td>{{ s.fullname }}</td>
          <td>{{ s.email }}</td>
          <td>{{ s.course }}</td>
          <td>
            <button @click="editStudent(s)">
              Edit
            </button>

            <button @click="deleteStudent(s._id)">
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="filteredStudents.length === 0">
          <td colspan="4">
            No students found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

const students = ref([]);
const searchTerm = ref("");

const student = ref({
  fullname: "",
  email: "",
  course: "",
});

const isEditing = ref(false);
const editId = ref(null);

const filteredStudents = computed(() => {
  return students.value.filter((student) =>
    student.fullname
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  );
});

const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    students.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const saveStudent = async () => {
  try {
    if (
      !student.value.fullname ||
      !student.value.email ||
      !student.value.course
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing.value) {
      await axios.put(
        `${API_URL}/${editId.value}`,
        student.value
      );
    } else {
      await axios.post(API_URL, student.value);
    }

    clearForm();
    fetchStudents();
  } catch (error) {
    console.error(error);
  }
};

const editStudent = (s) => {
  student.value = {
    fullname: s.fullname,
    email: s.email,
    course: s.course,
  };

  editId.value = s._id;
  isEditing.value = true;
};

const deleteStudent = async (id) => {
  const confirmed = confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmed) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  } catch (error) {
    console.error(error);
  }
};

const sortStudents = () => {
  students.value.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
};

const sortStudentsDesc = () => {
  students.value.sort((a, b) =>
    b.fullname.localeCompare(a.fullname)
  );
};

const clearForm = () => {
  student.value = {
    fullname: "",
    email: "",
    course: "",
  };

  editId.value = null;
  isEditing.value = false;
};

onMounted(() => {
  fetchStudents();
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

.container {
  width: 80%;
  margin: auto;
  padding: 20px;
}

.form-container,
.search-container {
  margin-bottom: 20px;
}

.dashboard {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 5px;
}

.dashboard h2,
.dashboard h3 {
  margin: 5px 0;
}

input {
  display: block;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}
</style>
```
