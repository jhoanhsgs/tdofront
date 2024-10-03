<script setup>
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";


const {errors} = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore();


const formData = reactive({
    email: '',
    password: '',
})

onMounted(() => (errors.value={}));
</script>

<template>
  <main>
    <h1 class="title">Iniciar sesion</h1>

    <form @submit.prevent="authenticate('login',formData);"
        class="w-1/2 mx-auto space-y-6">


        <div>
            <input type="email" placeholder="Email" v-model="formData.email">
            <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
        </div>
        <div>
            <input type="password" placeholder="Contraseña" v-model="formData.password">
            <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
        </div>


    <button class="primary-btn">Ingresar</button>
    </form>

  </main>
</template>
