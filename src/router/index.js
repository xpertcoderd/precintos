import { createRouter, createWebHistory } from 'vue-router'


import PrivateDashboard from '../views/PrivateDashboard.vue'
import LoginPage from '../views/LoginPage.vue'


import ATM_Local  from '@/components/conexion/socket/Atmosphere/Socket_Local.vue'
import ATM_Navixy from '@/components/conexion/socket/Atmosphere/Socket_Navixy.vue'
import ATM_Navixy_Mejorado from '@/components/conexion/socket/Atmosphere/Socket_Navixy_Mejorado.vue'

import WS_Navixy from '@/components/conexion/socket/WS/Socket_Navixy.vue'


const routes = [

  {
    path: '/',
    name: 'precintos',
    component: LoginPage
  },
  {
    path: '/socket1/',
    name: 'ATM_Local',
    component: ATM_Local
  },
  {
    path: '/socket2/',
    name: 'ATM_Navixy',
    component: ATM_Navixy
  },
  {
    path: '/socket3/',
    name: 'WS_Navixy',
    component: WS_Navixy
  },
  {
    path: '/socket4/',
    name: 'ATM_Navixy_Mejorado',
    component: ATM_Navixy_Mejorado
  },
  {
    path: '/dashboard/',
    name: 'PrivateDashboard',
    component: PrivateDashboard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
