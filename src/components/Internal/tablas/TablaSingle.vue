<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">

					<th class="titleTable">
						<input type="checkbox" @change="marcar_desmarcar" class="checkIcon" />
						<span>ID</span>
					</th>
					<!-- 					<th class="titleTable">Nombre</th> -->
					<th class="titleTable ">Bateria</th>
					<!-- 					<th class="titleTable ">Estado</th> -->
					<!-- 					<th class="titleTable ">Último Reporte</th> -->
				</tr>
			</thead>

			<tbody>
				<tr @click="candadoSelected(dato)" v-for=" (dato, index) in incomingData.locksList" :key="index"
					class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': dato.check }">

						<input type="checkbox" v-model="dato.check" class="checkIcon" />

						<span>{{ dato.row.device.deviceid }}</span>



						<i class="bi bi-circle-fill"
							:style="{ color: getStatusGPS(dato.row.deviceState.connectionStatus).colorText }"
							style="padding-left: 5px;"></i>
					</td>

					<!-- 					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.row.device.label
						}}
					</td> -->
					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{
						dato.row.deviceState.batteryLevel }} %</td>
					<!-- 					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.row.group.title }}
					</td> -->
					<!-- 					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{
						dato.row.deviceState.actualTrackUpdate }}</td> -->
				</tr>




			</tbody>
		</table>




	</div>
</template>

<script setup>
import { getStatusGPS } from '@/components/utils.js'

 //ref 


const incomingData = defineProps(['locksList']);
const outGoingData = defineEmits(['lockSelected', 'disableBtn', 'showMapaBtn', 'listChecked', 'marcarTodos', 'desmarcarTodos', 'actual'])

function candadoSelected(dato) {

	dato.check = !dato.check

	if (dato.check) {

		/*	//heading deviceId lat lng
			mapaRef.value.update_motorIcon()
		
		*/
		const actual = {
			deviceId: "dato.row.device.id",
			lat: dato.row.deviceState.lat,
			lng: dato.row.deviceState.lng,
			heading: 60

		}
		//console.log("esta activo el candado ...", actual)

		outGoingData('actual', actual);
	}



	const activos = incomingData.locksList.filter(elem => elem.check == true)


	if (activos.length == 1) {
		//console.log(activos[0].row)
		console.log("si puedes abrir el candado unico")
		outGoingData('lockSelected', activos[0].row);

	} else {
		console.log("vete a gris disable")
		outGoingData('disableBtn');
	}

	if (activos.length >= 1) {
		outGoingData('showMapaBtn');
		outGoingData('listChecked', activos);

	}


}
function marcar_desmarcar() {
	const isChecked = event.target.checked;

	if (isChecked) {
		//console.log("voy a marcar todos")
		outGoingData('marcarTodos')
	} else {
		//console.log("voy a desmarcar  todos")
		outGoingData('desmarcarTodos')
	}
}





</script>

<style scoped>
.expandible {
	width: 100%;
}

.titleTable {
	background-color: #f7f8fa;
	font-size: 14px;
	font-weight: 700;
}

.datoTable {
	font-size: 12px;
	padding-top: 5px;
	padding-bottom: 5px;
}

.checkIcon {
	/*	float: left;
	padding-left: 20px;*/
	font-size: 14px;
	padding-right: 20px;

}

.columnaName {
	position: sticky;
	top: 0px;
}

.listaSelected {
	background-color: lightblue;
}

.hovertabla:hover td {

	background-color: lightblue;
	/*lightgrey*/
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