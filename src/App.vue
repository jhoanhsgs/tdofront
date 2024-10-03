<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)

onMounted(() => {

});
</script>

<template>
  <header>

      <nav>
        <RouterLink :to="{ name: 'create'}"  class="nav-link">Notas</RouterLink>

        <div v-if="authStore.user" class="flex items-center space-x-6">
            <p class="text-sm text-slate-300">
                Bienvenido {{ authStore.user.name }}
            </p>
            <RouterLink :to="{ name: 'create'}"
            class="nav-link">Nueva nota</RouterLink>

            <form @submit.prevent="authStore.logout">
                <button class="nav-link">logout</button>
            </form>
        </div>

        <div v-else class="space-x-6">
            <RouterLink :to="{ name: 'register'}"
            class="nav-link">Registrar</RouterLink>
            <RouterLink :to="{ name: 'login'}"
            class="nav-link">Login</RouterLink>
        </div>
      </nav>

  </header>

  <RouterView />
</template>
