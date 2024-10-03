import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/Nota/CreateView.vue'
import ListView from '../views/Nota/ListView.vue'
import registerView from '../views/Auth/RegisterView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true},
    },
    {
      path: '/register',
      name: 'register',
      component: registerView,
      meta: { guest: true}
    },
    {
      path: '/nota',
      name: 'create',
      component: CreateView,
      meta: { auth: true}
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: { auth: true}
    },
  ]
})

router.beforeEach(async (to, form) => {
    const authStore = useAuthStore();
    await authStore.getUser();

    if (authStore.user && to.meta.guest) {
        return { name: "home"};
    }

    if (!authStore.user && to.meta.auth) {
        return { name: "login"};
    }


} );

export default router
