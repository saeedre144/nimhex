import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import AdminLayout from '@/layouts/AdminLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: () => import('../views/HomeView.vue') },
        { path: 'articles', name: 'articles.public', component: () => import('../views/ArticlesView.vue') },
        { path: 'articles/:slug', name: 'articles.show', component: () => import('../views/ArticleDetailView.vue') },
      ],
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
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: () => import('../views/admin/DashboardView.vue') },
        { path: 'articles', name: 'articles.index', component: () => import('../views/admin/ArticlesIndex.vue') },
        { path: 'articles/create', name: 'articles.create', component: () => import('../views/admin/ArticleForm.vue') },
        { path: 'articles/:id/edit', name: 'articles.edit', component: () => import('../views/admin/ArticleForm.vue'), props: true },
      ],
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