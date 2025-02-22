<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">

					<th class="titleTable">
						<input type="checkbox" @change="marcar_desmarcar" class="checkIcon" />
						<span style="padding-left: 10px">ID</span>
					</th>

					<th class="titleTable ">Nombre</th>
					<th class="titleTable ">Apellidos</th>
					<th class="titleTable ">Loging</th>
					<th class="titleTable ">Usuario</th>
					<th class="titleTable ">Rol</th>
					<th class="titleTable ">Configuracion</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for=" (dato, index) in incomingData.userList" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': false }">

						<input type="checkbox" v-model="dato.check" class="checkIcon" />

						<span style="padding-left: 10px">{{ dato.user.id }}</span>

					</td>


					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.user.firstName }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.user.lastName }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.updatedAt }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.user.username }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ validarRol(dato.user.rolId) }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">

						<i @click="outGoingData('userSelected', dato)" class="bi bi-pencil "></i>
						<i class="bi bi-trash"></i>

						<button style="border: none; background: transparent;" data-toggle="dropdown">
							<i class="bi bi-three-dots"></i>
						</button>

						<div class="dropdown-menu">

							<a class="dropdown-item" href="#">Perfiles</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Perfil Crediticio</a>
							<a class="dropdown-item" href="#">Perfil Tarifario</a>

							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Optiones Operativas</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Crear Traslado</a>

						</div>

					</td>
				</tr>




			</tbody>
		</table>




	</div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'


const incomingData = defineProps(['userList']);

const outGoingData = defineEmits(['userSelected'])

function validarRol(indice) {
	let output = "Unknown"
	switch (indice) {
		case 1:
			output = "Administrador"
			break;
		default:
			output = "No Founded"
			break;
	}

	return output;
}



</script>

<style scoped>
.datoTable {
	font-size: 12px;
	padding-top: 3px;
	padding-bottom: 1px;
}

.datoTable i {
	color: grey;
	font-size: 16px;
	cursor: pointer;
	padding-left: 10px;

}

.expandible {
	padding-left: 20px;
	padding-right: 20px;
	overflow: auto;
	max-height: 90%;
	width: 100%;
}

.titleTable {
	background-color: #f7f8fa;
	font-size: 14px;
	font-weight: 700;
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