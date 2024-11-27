<template>
	<div class="expandible">

		<!--  table-striped -->
		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">
					<th class="titleTable text-center">ID</th>
					<th class="titleTable text-center">Nombre</th>
					<th class="titleTable text-center">Bateria</th>
					<th class="titleTable text-center">Estado</th>
					<th class="titleTable text-center">Último Reporte</th>
				</tr>
			</thead>

			<tbody v-if="incomingData.locksList.length == 0">
				<tr class="hovertabla">
					<td></td>
					<td></td>
					<td class="datoTable text-center" style="color: #46b0d1; font-weight: bolder;">No se Encontrarons
						Prencitos</td>
					<td></td>
					<td></td>

				</tr>

			</tbody>


			<tbody>
				<tr @click="toggleCollapse(index, dato)" v-for=" (dato, index) in incomingData.locksList" :key="index"
					class="hovertabla">

					<td class="datoTable text-center" :class="{ 'listaSelected': isOpen(index) }">

						<i :class="{ 'bi bi-check-square': isOpen(index), 'bi bi-square': !isOpen(index) }"
							class="checkIcon"></i>
						<span>{{ dato.device.deviceid }}</span>



						<i class="bi bi-circle-fill"
							:style="{ color: getStatusGPS(dato.deviceState.connectionStatus).colorText }"
							style="padding-left: 5px;"></i>
					</td>

					<td class="datoTable text-center" :class="{ 'listaSelected': isOpen(index) }">{{ dato.device.label
						}}
					</td>
					<td class="datoTable text-center" :class="{ 'listaSelected': isOpen(index) }">{{
						dato.deviceState.batteryLevel }} %</td>
					<td class="datoTable text-center" :class="{ 'listaSelected': isOpen(index) }">{{ dato.group.title }}
					</td>
					<td class="datoTable text-center" :class="{ 'listaSelected': isOpen(index) }">{{
						dato.deviceState.actualTrackUpdate }}</td>
				</tr>




			</tbody>


		</table>




	</div>
</template>

<script setup>
import { getStatusGPS } from '@/components/utils.js'
import { ref, defineProps, defineEmits } from 'vue'

let openIndex = ref();

const incomingData = defineProps(['locksList']);
const outGoingData = defineEmits(['lockSelected', 'disableBtn'])

function toggleCollapse(index, device) {

	openIndex.value = openIndex.value === index ? null : index;

	if (openIndex.value != null) {
		//console.log(device)
		outGoingData('lockSelected', device);
	} else {
		outGoingData('disableBtn');
	}

}

function isOpen(index) {

	//console.log("isOpen")

	return openIndex.value === index;
}
</script>

<style scoped>
.expandible {
	width: 100%;
}

.titleTable {
	font-size: 14px;
	font-weight: 600;
}

.datoTable {
	font-size: 12px;
	padding-top: 5px;
	padding-bottom: 5px;
}

.checkIcon {
	float: left;
	padding-left: 20px;
	font-size: 14px;
}

.columnaName {
	position: sticky;
	top: 0px;
}

.listaSelected {
	background-color: #ffd8de;
}

.hovertabla:hover td {

	background-color: lightblue;
}


/*  scrollbar stiyles width */

::-webkit-scrollbar {
	width: 10px;
}

/* scrollbar stiyles Handle */
::-webkit-scrollbar-thumb {
	background-color: #66b9d9;
	border-radius: 10px;
}
</style>