<template>
	<div class="contendor">
		<div class="selectorVista">


			<div @click="fuction_uno" class="targetas text-center" :class="{ 'vistaSelected': vista.uno }">
				{{ labels[0] }}
			</div>
			<div @click="fuction_dos" class="targetas text-center" :class="{ 'vistaSelected': vista.dos }">
				{{ labels[1] }}
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
	dos: true

})

const labels = ref(['Uno', 'dos'])

const incomingData = defineProps(['labels'])

const outGoingData = defineEmits(['fuction_uno', 'fuction_dos'])


function resetBtn() {
	vista.value.uno = false
	vista.value.dos = false
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

function updateLabels(label) {

	labels.value = label || ["Companias", "Choferes"]
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
.contendor {
	display: flex;
	width: 100%
}

.selectorVista {
	background-color: #ebedf4;
	padding: 0px;
	padding-left: 5px;
	padding-right: 5px;
	user-select: none;
	border-radius: 8px;
	display: flex;
	font-size: 14px;

}

.targetas {
	min-width: 90px;
	padding: 6px;
	margin-top: 4px;
	margin-bottom: 4px;
	padding-top: 8px;
	padding-bottom: 8px;
	cursor: pointer;
	border-radius: 8px 8px 8px 8px;
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
	background-color: white;
	border-bottom: #d3c9c9 solid 1px;
}
</style>