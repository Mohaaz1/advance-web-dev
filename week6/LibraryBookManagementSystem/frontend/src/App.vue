<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

const books = ref([]);

const bookId = ref("");
const title = ref("");
const author = ref("");
const category = ref("");

const editingId = ref(null);

// Fetch Books
const fetchBooks = async () => {
  try {
    const res = await axios.get(API_URL);
    books.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Add or Update
const saveBook = async () => {
  try {
    const payload = {
      bookId: bookId.value,
      title: title.value,
      author: author.value,
      category: category.value,
    };

    if (editingId.value) {
      await axios.put(`${API_URL}/${editingId.value}`, payload);
      editingId.value = null;
    } else {
      await axios.post(API_URL, payload);
    }

    clearForm();
    fetchBooks();
  } catch (err) {
    console.error(err);
  }
};

// Edit
const editBook = (book) => {
  editingId.value = book._id;
  bookId.value = book.bookId;
  title.value = book.title;
  author.value = book.author;
  category.value = book.category;
};

// Delete
const deleteBook = async (id) => {
  if (!confirm("Delete this book?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  } catch (err) {
    console.error(err);
  }
};

// Clear Form
const clearForm = () => {
  bookId.value = "";
  title.value = "";
  author.value = "";
  category.value = "";
};

onMounted(fetchBooks);
</script>

<template>
  <div class="container">
    <h1>📚 Library Book Management System</h1>

    <div class="form">
      <input v-model="bookId" placeholder="Book ID" />
      <input v-model="title" placeholder="Title" />
      <input v-model="author" placeholder="Author" />
      <input v-model="category" placeholder="Category" />

      <button @click="saveBook">
        {{ editingId ? "Update Book" : "Add Book" }}
      </button>
    </div>

    <h2>Books List</h2>

    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book.bookId }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.category }}</td>

          <td>
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  margin: 0;
}

.container {
  width: 90%;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.form {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
}

table {
  width: 100%;
  background: white;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background: #333;
  color: white;
}
</style>
