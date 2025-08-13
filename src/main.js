import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'  // Add Tailwind CSS
import VueCookies from 'vue-cookies'

const app=createApp(App)

app.use(router)
app.use(VueCookies, { expires: '2d'})

app.mount('#app')
