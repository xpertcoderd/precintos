<template>
	<div class="selectorVistaContainer">
		<div class="selectorVista">


			<div @click="fuction_uno" class="targetas text-center" :class="{ 'vistaSelected': vista.uno }">
				{{ labels[0] }}
			</div>
			<div @click="fuction_dos" class="targetas text-center" :class="{ 'vistaSelected': vista.dos }">
				{{ labels[1] }}
			</div>

			<div @click="fuction_tres" class="targetas text-center" :class="{ 'vistaSelected': vista.tres }">
				{{ labels[2] }}
			</div>

		</div>



		<!-- 		<div class="dateSelectorContainer">

			<CalendarioComp v-if="timeSelected == 3" @fromTo="filtrarBusqueda" />

			<select @change="updatetransfersList(timeSelected)" v-model="timeSelected" class="dateSelector">
				<option value="1">Ultimos 48Hrs</option>
				<option value="3">Personalizado</option>
				<option value="2">Mostrar Todo</option>
			</select>


		</div>
 -->
	</div>



</template>
<script setup>



import { ref, defineEmits, defineProps, onMounted } from 'vue';

let vista = ref({
	uno: false,
	dos: false,
	tres: true,

})

const labels = ref(['Uno', 'dos', 'tres'])

const incomingData = defineProps(['labels'])

const outGoingData = defineEmits(['fuction_uno', 'fuction_dos', 'fuction_tres'])


function resetBtn() {
	vista.value.uno = false
	vista.value.dos = false
	vista.value.tres = false
	vista.value.cuatro = false
}

function fuction_uno() {
	resetBtn()
	vista.value.uno = true
	outGoingData('fuction_uno');
}

function fuction_dos() {
	resetBtn()
	vista.value.dos = true
	outGoingData('fuction_dos');
}

function fuction_tres() {
	resetBtn()
	vista.value.tres = true
	outGoingData('fuction_tres');
}



function updateLabels(label) {

	labels.value = label || ["Hoy", "Semanal", "Mensual"]
}



onMounted(async () => {

	updateLabels(incomingData.labels)


})

/*
import CalendarioComp from '@/components/CalendarioComp.vue'

const outGoingData = defineEmits(
	['fuction_uno', 'fuction_dos'] //'datePicker', 'fromTo'
)


const timeSelected = ref("1");

function filtrarBusqueda(from, to) {
	outGoingData('fromTo', from, to);
}

function updatetransfersList(modo) {
	outGoingData('datePicker', modo);
}

*/


</script>

<style scoped>
.selectorVistaContainer {
	display: flex;
	border-radius: 8px 8px 8px 8px;
	justify-content: space-between;
	width: 100%;
}

.selectorVista {
	background-color: #ebe3e3;
	border-radius: 5px;
	user-select: none;
	display: flex;
	font-size: 15px;

}

.targetas {
	min-width: 90px;
	padding: 5px;
	padding-top: 8px;

	margin: 1px;
	/*border:  #d3c9c9 solid 1px;*/
	background-color: white;
	padding-bottom: 8px;
	cursor: pointer;
	font-weight: 700;
	border-radius: 5px;
}

/*.dateSelectorContainer {
	cursor: pointer;
	margin-right: 20px;
	margin-top: auto;
	display: flex;
}
*/
/*.dateSelector {
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
*/
.vistaSelected {
	color: white;
	font-weight: 700;
	margin: 0px;
	background-color: #2ec0e2;
	border: #d3c9c9 solid 1px;
}
</style>