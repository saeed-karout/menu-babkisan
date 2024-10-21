import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/menu',
      name: 'home',
      component: HomeView
    },
     {
    path: '/menu/item/:slug',
    name: 'FoodItem',
    component: () => import('../views/ItemsView.vue'),
    props: true, // لتمرير الـ slug كـ prop
  },
  ]
})

export default router
