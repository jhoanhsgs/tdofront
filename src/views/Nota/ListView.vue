<script setup>
import { usePostsStore } from '@/stores/posts';
import {onMounted, ref} from 'vue';

const {getAllNotas} = usePostsStore();
const notas = ref([]);


onMounted(async() => (notas.value = await getAllNotas()) );
</script>
<template>
    <main>
        <h1 class="title">Notas registradas</h1>

        <div v-if="notas.lenght > 0">
            <div v-for="nota in notas" :key="nota.id">
                <h2>{{ nota.titulo }}</h2>
            </div>
        </div>
    </main>
</template>
