import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'  // Add Tailwind CSS
import VueCookies from 'vue-cookies'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)
app.use(VueCookies, { expires: '2d' })

app.mount('#app')
