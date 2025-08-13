<template>
	<div class="AreaTrabajoPage">
		<div class="mainTitulo">
			<strong>Dashboard</strong>
			<span @click="changeToPrecintoPage" v-if="incomingData.logined" class="gotoPrecintos">ir a Precintos</span>
		</div>


		<HeaderComun @fromTo="filtrarBusqueda" @datePicker="updatetransfersList" @vistaGeneral="cambiarvistaGeneral"
			@vistaStandar="cambiarVistaStandar" />


		<CounterPage :countersGeneral="incomingData.countersGeneral" />
		<FrameVistaGeneral @transfer_id="toMapa" :contenedoresCount="incomingData.totalContainers"
			:fullTransfer="incomingData.transferList" v-if="vistaGeneral" />

		<FrameVistaStandar @transfer_id="toMapa" :fullTransfer="incomingData.transferList" v-if="!vistaGeneral" />


	</div>
</template>
<script setup>
import CounterPage from '@/components/CounterPage.vue'
import HeaderComun from '@/components/HeaderComun.vue'

import FrameVistaGeneral from '@/components/Frame/Dashboard/FrameVistaGeneral.vue'
import FrameVistaStandar from '@/components/Frame/Dashboard/FrameVistaStandar.vue'

import { ref, defineEmits, defineProps } from 'vue';

const incomingData = defineProps(['countersGeneral', 'transferList', 'totalContainers', 'logined']);
const outGoingData = defineEmits(['transfer_id', 'datePicker', 'fromTo']);


function toMapa(transfer_id) {

	outGoingData('transfer_id', transfer_id);
}

let vistaGeneral = ref(true)


function cambiarvistaGeneral() {
	vistaGeneral.value = false
}

function cambiarVistaStandar() {

	vistaGeneral.value = true
}

function updatetransfersList(modo) {
	outGoingData('datePicker', modo);
}

function filtrarBusqueda(from, to) {
	outGoingData('fromTo', from, to);
}

function changeToPrecintoPage() {
	window.location.replace("./precintos");
}


</script>

<style scoped>
.mainTitulo {
	position: relative;
	padding: 15px;
	padding-left: 29px;
	width: 100%;
	font-size: 22px;
	font-weight: 400;
	border-bottom: solid 2px;
	border-color: #80808030;
	background-color: white;
}

.AreaTrabajoPage {
	width: auto;
	display: flex;
	flex-direction: column;

	/*background-color: pink;*/

}

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
}

.gotoPrecintos {
	cursor: pointer;
	margin-right: 10px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	padding: 20px;
	padding-top: 8px;
	padding-bottom: 8px;
	font-size: 16px;
	font-weight: 700;
	display: flex;
	background-color: #e46564;
	color: white;
	border-radius: 8px 8px 8px 8px;

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

}

.vistaSelected {
	background-color: white;
}
</style>