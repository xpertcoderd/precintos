<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">
					<th class="titleTable">
						<input type="checkbox" class="checkIcon" />
						<span>No. Solicitud</span>
					</th>
					<th class="titleTable">Compania</th>
					<th class="titleTable ">Traslado</th>
					<th class="titleTable ">Origen</th>
					<th class="titleTable ">Destino</th>
					<th class="titleTable ">Tarifa</th>
					<th class="titleTable ">Fecha de salida</th>
					<th class="titleTable ">Cantidad contenedores</th>
					<th class="titleTable ">Estado</th>


				</tr>
			</thead>

			<tbody>

				<tr v-for=" (dato, index) in listadoSolicitudes" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': dato.check }">

						<input type="checkbox" class="checkIcon" />

						<span>{{ dato.id }}</span>

					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						{{ dato.company }}
					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.transfer }} </td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.origin }}</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.destiny }}</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ "RD$" + dato.fee }}</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.dateOut }}</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">{{ dato.containers }}</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<span class="statusContainer "
							:style="{ color: getStatusSolicitudes(dato.status).colorText, backgroundColor: getStatusSolicitudes(dato.status).bg }">

							{{ getStatusSolicitudes(dato.status).label }}
						</span>
						<i class="bi bi-receipt libretica"></i>
						<i class="bi bi-three-dots puntitos"></i>
					</td>
				</tr>






			</tbody>
		</table>




	</div>
</template>

<script setup>

import { getStatusSolicitudes } from '@/components/utils.js'

const listadoSolicitudes = [
	{
		id: 89776,
		company: "Maritima Dominicana",
		transfer: "Carga Suelta",
		origin: "Caucedo",
		destiny: "MARDOM",
		fee: 2300,
		dateOut: "02-02-2024:00:00",
		containers: 5,
		status: 1
	},
	{
		id: 94323,
		company: "Compania Tuya",
		transfer: "Carga Suelta",
		origin: "Santiago",
		destiny: "Tuyacomp",
		fee: 3400,
		dateOut: "02-03-2024:00:00",
		containers: 7,
		status: 2
	}
]


</script>

<style scoped>
.expandible {
	width: 100%;
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

.libretica {
	padding-left: 6px;
	font-size: 16px;
	color: #8e8d8d;
	cursor: pointer;

}

.puntitos {
	float: right;
	padding-right: 5px;
	font-size: 18px;
	color: #8e8d8d;
	cursor: pointer;

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