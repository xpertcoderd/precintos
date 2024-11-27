import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import VueCookies from 'vue-cookies'

const app=createApp(App)

app.use(router)
app.use(VueCookies, { expires: '2d'}) 

app.mount('#app')
