<template>
	<div class="selectorVistaContainer">
		<div class="selectorVista">


			<div @click="cambiarVistaStandar" class="targetas" :class="{ 'vistaSelected': vistaGeneral }">
				Vista General
			</div>
			<div @click="cambiarvistaGeneral" class="targetas" :class="{ 'vistaSelected': !vistaGeneral }">
				Vista Standar
			</div>

		</div>



		<div class="dateSelectorContainer">

			<CalendarioComp v-if="timeSelected == 3" @fromTo="filtrarBusqueda" />

			<select @change="updatetransfersList(timeSelected)" v-model="timeSelected" class="dateSelector">
				<option value="1">Ultimos 48Hrs</option>
				<option value="3">Personalizado</option>
				<option value="2">Mostrar Todo</option>
			</select>


		</div>

	</div>



</template>
<script setup>

import CalendarioComp from '@/components/CalendarioComp.vue'

import { ref, defineEmits } from 'vue';

let vistaGeneral = ref(true)

const timeSelected = ref("1"); // Valor por defecto


const outGoingData = defineEmits(
	['vistaGeneral', 'vistaStandar', 'datePicker', 'fromTo']
)

function filtrarBusqueda(from, to) {
	outGoingData('fromTo', from, to);
}


function cambiarvistaGeneral() {
	vistaGeneral.value = false
	outGoingData('vistaGeneral');
}

function cambiarVistaStandar() {

	vistaGeneral.value = true
	outGoingData('vistaStandar');
}

function updatetransfersList(modo) {
	outGoingData('datePicker', modo);
}

</script>

<style scoped>
.selectorVistaContainer {
	display: flex;
	padding-left: 29px;
	padding-top: 20px;
	border-radius: 8px 8px 8px 8px;
	justify-content: space-between;
	width: 100%;
}

.selectorVista {
	background-color: #ebedf4;
	padding: 4px;
	border-radius: 8px 8px 8px 8px;
	display: flex;

}

.targetas {
	padding: 8px;
	cursor: pointer;
	border-radius: 8px 8px 8px 8px;
}

.dateSelectorContainer {
	cursor: pointer;
	margin-right: 20px;
	margin-top: auto;
	display: flex;
}

.dateSelector {
	background-color: #54bbda;
	color: white;
	cursor: pointer;
	font-weight: 700;
	padding: 10px;
	padding-top: 8px;
	padding-bottom: 8px;
	border-radius: 8px 8px 8px 8px;
	border-color: #80808030;
	outline: none;

}

.vistaSelected {
	background-color: white;
}
</style>