<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">

					<th class="titleTable">
						<!--  @change="marcar_desmarcar"  -->
						<input type="checkbox" class="checkIcon" />
						<span style="padding-left: 10px">ID</span>
					</th>
					<th class="titleTable ">Nombre</th>
					<th class="titleTable ">Apellidos</th>
					<th class="titleTable ">Fecha de nacimiento</th>
					<th class="titleTable ">Edad</th>
					<th class="titleTable ">Telefono</th>
					<th class="titleTable ">Datos de licencia</th>
					<th class="titleTable ">Datos del Seguro</th>
					<th class="titleTable ">Datos del Camion</th>
					<th class="titleTable ">Configuracion</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for=" (dato, index) in transportistaList" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': false }">

						<input type="checkbox" v-model="dato.check" class="checkIcon" />

						<span style="padding-left: 10px">{{ dato.id }}</span>

					</td>


					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.name }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.lastname }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.birthday }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.age }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.phone }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">
						<span>{{ isActive(dato.license) }}</span>
						<i class="bi bi-person-vcard "
							:class="{ 'activo': dato.license, 'inactivo': !dato.license }"></i>

					</td>
					<td class="datoTable " :class="{ 'listaSelected': false }">
						<span>{{ isActive(dato.insurance) }}</span>
						<i class="bi bi-person-vcard"
							:class="{ 'activo': dato.insurance, 'inactivo': !dato.insurance }"></i>
					</td>
					<td class="datoTable " :class="{ 'listaSelected': false }">
						<span>{{ isAvaible(dato.truck) }}</span>
						<i class="bi bi-truck-front" :class="{ 'activo': dato.truck, 'inactivo': !dato.truck }"></i>
					</td>
					<td class="datoTable " :class="{ 'listaSelected': false }">

						<i class="bi bi-pencil "></i>
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
import { isActive, isAvaible } from '@/components/utils.js'

const transportistaList = [
	{
		id: 1,
		name: "Alba",
		lastname: "Perez Zorrilla",
		birthday: "10-12-1980",
		age: 40,
		phone: "809-833-3324",
		license: true,
		insurance: true,
		truck: true,
	},

	{
		id: 2,
		name: "Juan",
		lastname: "Alcantara Mateo",
		birthday: "12-01-1970",
		age: 50,
		phone: "809-123-3432",
		license: false,
		insurance: false,
		truck: false,
	},

	{
		id: 3,
		name: "Marcos",
		lastname: "Alcantara",
		birthday: "12-1-1971",
		age: 39,
		phone: "809-338-4233",
		license: false,
		insurance: true,
		truck: false,
	}
]




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

.activo {
	color: #77d298 !important;
}

.inactivo {
	color: #f6808f !important;
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