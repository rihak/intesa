import { createRouter, createWebHistory } from 'vue-router'
import IntesaView from '../views/IntesaView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'vue-active-href',
  routes: [
    {
      path: '/',
      name: 'intesa',
      component: IntesaView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
