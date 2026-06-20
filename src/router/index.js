import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/week3/task2', component: () => import('../views/week3/Task2.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
