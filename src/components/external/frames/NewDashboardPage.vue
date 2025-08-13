<template>

	<div class="containerPage">

		<section>


			<HeaderLog :userName="userName" />

			<DatePicker class="datePicker" />


			<CounterCards :counters="incomingData.counters" />

			<div class="selectorVista">
				<SelectorVista @fuction_uno="showContainier" @fuction_dos="showBl" @fuction_tres="showETA"
					@fuction_cuatro="showMapa" />
			</div>


		</section>


		<div class="areaTrabajo">
			<!-- 			<FrameVistaGeneral @transfer_id="toMapa" :contenedoresCount="incomingData.totalContainers"
			:fullTransfer="incomingData.transferList" v-if="!vistaGeneral" /> -->

			<FrameVistaStandar @transfer_id="toMapa" :fullTransfer="incomingData.transferList" v-if="vista == 2" />


		</div>






	</div>
</template>
<script setup>
import CounterCards from '@/components/Internal/CounterCards.vue'

//import FrameVistaGeneral from '@/components/Frame/Dashboard/FrameVistaGeneral.vue'
import FrameVistaStandar from '@/components/Frame/Dashboard/FrameVistaStandar.vue'

import HeaderLog from '@/components/external/components/HeaderLog.vue'
import SelectorVista from '@/components/external/components/SelectorVista.vue'

import DatePicker from '@/components/external/frames/DatePicker.vue'





import { ref, defineProps } from 'vue'; //defineEmits

const incomingData = defineProps(['counters', 'transferList', 'totalContainers', 'logined']);
//const outGoingData = defineEmits(['transfer_id', 'datePicker', 'fromTo']);

const userName = ref("Maritima Dominicana")



/*
function toMapa(transfer_id) {

	outGoingData('transfer_id', transfer_id);
}
*/
let vista = ref(2)


function showContainier() {

	vista.value = 1
}

function showBl() {

	vista.value = 2
}

function showETA() {

	vista.value = 3
}

function showMapa() {

	vista.value = 4
}




/*function updatetransfersList(modo) {
	outGoingData('datePicker', modo);
}*/

/*function filtrarBusqueda(from, to) {
	outGoingData('fromTo', from, to);
}
*/
/*function changeToPrecintoPage() {
	window.location.replace("./precintos");
}
*/

</script>

<style scoped>
.containerPage {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;


}

.datePicker {
	padding: 10px;
}

.selectorVista {
	width: 100%;
	padding: 20px;
}


section {
	/*max-height: 37%;*/
}


.areaTrabajo {
	max-height: 70%;
	height: auto;
}
</style>