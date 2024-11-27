<template>

	<VueDatePicker class="calendario" :max-date="manana.toISOString().substr(0, 10)" v-model="date" range
		multi-calendars @closed="filtrarBusqueda()" />


</template>

<script setup>

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, defineEmits } from 'vue';


const outGoingData = defineEmits(['fromTo'])

let hoy = new Date();
let un_diaMilisegundos = 24 * 60 * 60 * 1000


//let ayer = new Date(hoy.getTime() - (un_diaMilisegundos) * 2)

let date = ref();

let fechainicio = new Date(new Date().setDate(hoy.getDate() - 7));
fechainicio.setHours(0, 0)

let manana = new Date(hoy.getTime() + un_diaMilisegundos)
manana.setHours(23, 59)

date.value = [fechainicio, hoy];



function filtrarBusqueda() {

	try {
		//console.log(date.value[0].toISOString(),date.value[1].toISOString())

		outGoingData('fromTo', date.value[0].toISOString(), date.value[1].toISOString());


	} catch (error) {
		console.log(error)
	}

}

</script>
<style scoped>
.calendario {
	min-width: 355px;
	height: 100%;
	margin-right: 15px;
	margin-top: auto;
	margin-bottom: auto;
	border-color: #80808030;
}
</style>