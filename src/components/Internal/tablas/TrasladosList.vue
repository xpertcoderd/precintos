<template>
	<div class="expandible">

		<div v-if="incomingData.containersList.length == 0">
			<h5 class="noFound">
				No Hay Registros para este Cliente
			</h5>
		</div>


		<table v-else class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">
					<th class="titleTable">
						<input type="checkbox" class="checkIcon" />
						<span>No.</span>
					</th>
					<th class="titleTable">Contenedor</th>
					<th class="titleTable ">Precinto</th>
					<th class="titleTable ">Fecha de Inicio</th>
					<!-- 					<th class="titleTable ">Fecha Fin</th> -->
					<th class="titleTable ">Ruta</th>
					<th class="titleTable ">Estado</th>
					<th class="titleTable "></th>

				</tr>
			</thead>

			<tbody>

				<tr v-for=" (dato, index) in incomingData.containersList" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': dato.check }">

						<input type="checkbox" class="checkIcon" />

						<span>{{ dato.id }}</span>

					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						{{ dato.container }}
					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.device }} </td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.startDate }}</td>

					<!-- 					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.startDate }}</td>
 -->


					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<div>
							<i class="bi bi-circle-fill vineta" style="color: #72c9eb;"></i>

							<span v-if="dato.startPlaceName" class="miniLetra">{{ dato.startPlaceName }}</span>
							<span v-else class="miniLetra">{{ "N/A" }}</span>

							<img style="height: 25px; margin-left: 5px;" src="@/assets/icons/flechaAzul.svg">


							<i class="bi bi-circle-fill vineta"></i>

							<span v-if="dato.endPlaceName" class="miniLetra">{{ dato.endPlaceName }}</span>
							<span v-else class="miniLetra">{{ "N/A" }}</span>
						</div>


					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<span class="statusContainer "
							:style="{ color: getStatus(dato.state).colorText, backgroundColor: getStatus(dato.state).color }">

							{{ getStatus(dato.state).label }}
						</span>
					</td>

					<td class="datoTable confiIcons" :class="{ 'listaSelected': dato.check }">

						<i class="bi bi-pencil "></i>
						<i class="bi bi-trash"></i>

						<button style="border: none; background: transparent;" data-toggle="dropdown">
							<i class="bi bi-three-dots"></i>
						</button>

						<div class="dropdown-menu">

							<a class="dropdown-item" href="#">Acciones</a>
							<div class="dropdown-divider"></div>

							<a @click="outGoingData('containerRowSelected', dato)" class="dropdown-item"
								href="#">Enlazar</a>


							<a class="dropdown-item" href="#">Abrir Candado</a>


							<a class="dropdown-item" href="#">Recolectar</a>

						</div>

					</td>
				</tr>






			</tbody>
		</table>




	</div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'

import { getStatus } from '@/components/utils.js'

const incomingData = defineProps(['containersList']);

const outGoingData = defineEmits(['containerRowSelected'])




</script>

<style scoped>
.expandible {
	padding-top: 15px;
	padding-left: 20px;
	padding-right: 20px;
	overflow: auto;
	max-height: 90%;
	width: 100%;
}

.vineta {
	font-size: 8px;
	color: #3aaa35;
	padding: 5px;
}

.miniLetra {
	font-size: 10px;
}

.titleTable {
	background-color: #f6f7f9;
	font-size: 14px;
	font-weight: 700;
}

.datoTable {
	font-size: 12px;
	padding-top: 5px;
	padding-bottom: 5px;
}

.confiIcons {
	color: grey;
	width: 100%;
	font-size: 15px;
	padding-right: 15px;
	cursor: pointer;
	display: flex;
	justify-content: space-around;
}

.checkIcon {
	margin-right: 5px;
	font-size: 14px;
}

.columnaName {
	position: sticky;
	top: 0px;
}

.listaSelected {
	background-color: lightblue;
}

.hovertabla:hover td {

	background-color: #f6f7f9;
}

.statusContainer {
	background-color: #c6bbde;
	border-radius: 3px;
	width: auto;
	text-align: center;
	padding: 3px;
	color: #12387e;
	font-size: 14px;
	font-weight: 500;
	padding-left: 15px;
	padding-right: 15px;
}

.noFound {
	display: flex;
	/* Utiliza Flexbox */
	justify-content: center;
	/* Centra horizontalmente */
	align-items: center;
	/* Centra verticalmente */
	height: 200px;
	/* Ajusta la altura según tus necesidades */
	color: #46b0d1;
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