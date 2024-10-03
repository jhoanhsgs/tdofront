<script setup>
import { reactive } from "vue";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";


const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore();


const formData = reactive({
    titulo: "",
    descripcion: "",
    fecha_creacion: "",
    grupo: "",
    imagen: "",
});

//
const submitForm = () => {

  formData.fecha_creacion = new Date().toISOString(); // fecha actual

  createPost(formData);
};
</script>

<template>
  <main>
    <h1 class="title">Crear nota</h1>

    <form @submit.prevent="submitForm" class="w-1/2 mx-auto">
      <div class="w-1/10 mx-auto space-y-6">
        <div class="w-1/3">
          <input
            type="text"
            v-model="formData.titulo"
            placeholder="Nueva nota"
          />
        </div>


        <div class="w-1/2">
          <textarea
            rows="3"
            v-model="formData.descripcion"
            placeholder="Descripción"
          ></textarea>
        </div>

        <div class="w-1/2">
          <input
            type="text"
            v-model="formData.grupo"
            placeholder="Grupo"
          />
        </div>

        <!-- Añadir campo de imagen si es necesario -->
        <div class="w-1/2">
          <input
            type="file"
            @change="e => formData.imagen = e.target.files[0]"
            placeholder="Imagen"
          />
        </div>


        <button class="primary-btn">Guardar</button>
      </div>
    </form>
  </main>
</template>
