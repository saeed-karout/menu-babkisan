// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MenuView from '../views/MenuView.vue'
import ItemsMenuView from '../views/ItemsMenuView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/menu/item/:slug',
    name: 'FoodItem',
    component: ItemsMenuView,
    props: true // لتمرير الـ slug كـ prop
  },
  // يمكنك إضافة مسارات أخرى هنا
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
