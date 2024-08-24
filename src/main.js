import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './style.css'

import 'vue3-toastify/dist/index.css' // Importar los estilos de vue3-toastify

createApp(App).use(router).use(PrimeVue).mount('#app')