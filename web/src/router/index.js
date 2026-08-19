import { createRouter, createWebHistory } from 'vue-router'
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
        { path: 'about', name: 'about', component: () => import('../views/AboutView.vue') },
        { path: 'articles', name: 'articles.public', component: () => import('../views/ArticlesView.vue') },
        { path: 'articles/:slug', name: 'articles.show', component: () => import('../views/ArticleDetailView.vue') },
      ],
    },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
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

router.beforeEach(async (to) => {
  const { user, fetchUser } = useAuth()
  if (user.value === null) {
    await fetchUser()
  }
  if (to.meta.requiresAuth && !user.value) {
    return '/login'
  }
})

export default router