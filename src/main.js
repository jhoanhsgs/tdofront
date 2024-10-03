import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.router = router
})


app.use(pinia)
app.use(router)

app.mount('#app')
