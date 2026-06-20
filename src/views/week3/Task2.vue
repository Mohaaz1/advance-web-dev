<template>
  <div class="page">
    <h1>Task 2 – DOM Manipulation</h1>

    <section>
      <h2>1. Dynamic Menu</h2>
      <button @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Hide Menu' : 'Show Menu' }}
      </button>
      <ul v-show="menuOpen" class="menu">
        <li @click="currentPage = 'Home'"    :class="{ active: currentPage === 'Home' }">Home</li>
        <li @click="currentPage = 'About'"   :class="{ active: currentPage === 'About' }">About</li>
        <li @click="currentPage = 'Shop'"    :class="{ active: currentPage === 'Shop' }">Shop</li>
        <li @click="currentPage = 'Contact'" :class="{ active: currentPage === 'Contact' }">Contact</li>
      </ul>
      <p v-if="currentPage">You selected: <strong>{{ currentPage }}</strong></p>
    </section>

    <section>
      <h2>2. Interactive Buttons</h2>
      <div class="row">
        <button @click="count--" :disabled="count === 0">−</button>
        <span class="count-display">{{ count }}</span>
        <button @click="count++">+</button>
      </div>
      <button @click="isLoggedIn = !isLoggedIn" :class="isLoggedIn ? 'btn-red' : 'btn-green'">
        {{ isLoggedIn ? 'Log Out' : 'Log In' }}
      </button>
      <p>Status: <strong>{{ isLoggedIn ? 'Logged In ✅' : 'Logged Out ❌' }}</strong></p>
      <div :style="{ background: boxColor }" class="colour-box">Colour Box</div>
      <div class="row">
        <button @click="boxColor = '#3498db'">Blue</button>
        <button @click="boxColor = '#2ecc71'">Green</button>
        <button @click="boxColor = '#e74c3c'">Red</button>
        <button @click="boxColor = '#f39c12'">Orange</button>
      </div>
    </section>

    <section>
      <h2>3. Live Text Preview</h2>
      <input v-model="userText" type="text" placeholder="Type something here..." class="text-input" />
      <div class="preview-box">
        <p v-if="!userText" class="placeholder">Preview will appear here...</p>
        <p v-else>{{ userText }}</p>
      </div>
      <p>Character count: <strong>{{ userText.length }}</strong></p>
      <button @click="userText = ''" :disabled="!userText">Clear</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen    = ref(false)
const currentPage = ref('')
const count       = ref(0)
const isLoggedIn  = ref(false)
const boxColor    = ref('#3498db')
const userText    = ref('')
</script>

<style scoped>
.page { max-width: 600px; margin: 0 auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { margin-bottom: 24px; }
h2 { margin-top: 32px; border-bottom: 2px solid #eee; padding-bottom: 6px; }
section { margin-bottom: 20px; }
button { padding: 8px 16px; margin: 4px; border: none; border-radius: 6px; cursor: pointer; background: #1a1a2e; color: white; font-size: 0.9rem; }
button:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-green { background: #2ecc71; }
.btn-red   { background: #e74c3c; }
.menu { list-style: none; padding: 0; margin: 10px 0; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; width: 200px; }
.menu li { padding: 10px 16px; cursor: pointer; border-bottom: 1px solid #eee; }
.menu li:hover  { background: #f5f5f5; }
.menu li.active { background: #1a1a2e; color: white; }
.row { display: flex; align-items: center; gap: 8px; margin: 10px 0; flex-wrap: wrap; }
.count-display { font-size: 1.4rem; font-weight: bold; min-width: 40px; text-align: center; }
.colour-box { width: 200px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin: 10px 0; transition: background 0.3s; }
.text-input { width: 100%; padding: 10px; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; margin-bottom: 10px; }
.preview-box { min-height: 50px; padding: 12px; border: 1px dashed #ccc; border-radius: 6px; background: #f9f9f9; font-size: 1.1rem; margin-bottom: 8px; }
.placeholder { color: #aaa; font-style: italic; margin: 0; }
</style>
