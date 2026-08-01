import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // این صفحه نیاز به لاگین دارد
      // meta: { requiresAuth: true }, 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      // اگر می‌خواهی این هم محافظت‌شده باشد، این خط را بنویس:
      // meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
})

// نگهبان مسیرها (Route Guard)
router.beforeEach(async (to) => {
  const { user, fetchUser } = useAuth()

  // ۱. اگر وضعیت لاگین هنوز مشخص نیست (صفحه تازه رفرش شده)، آن را از لاراول بپرس
  if (user.value === null) {
    await fetchUser()
  }

  // ۲. اگر صفحه نیاز به لاگین دارد اما کاربر لاگین نکرده، بفرستش به لاگین
  if (to.meta.requiresAuth && !user.value) {
    return '/login'
  }
})

export default router