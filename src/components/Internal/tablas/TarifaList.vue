<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">


					<th class="titleTable ">Nombre de la tarifa</th>
					<th class="titleTable ">Tipo de Carga</th>
					<th class="titleTable ">Tipo de Tarifa</th>
					<th class="titleTable ">Precio RD$</th>
					<th class="titleTable ">Viajes Cortos</th>
					<th class="titleTable ">Origen</th>
					<th class="titleTable ">Destino</th>
					<th class="titleTable ">Adicionales</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for=" (dato, index) in incomingData.tariffsList" :key="index" class="hovertabla">


					<td class="datoTable " :class="{ 'listaSelected': false }">{{dato.name }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.transferTypeId }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.tariffTypeId }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ dato.price }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ 'N/A' }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ 'Puerto Haina' }} </td>
					<td class="datoTable " :class="{ 'listaSelected': false }">{{ 'Dajabon' }} </td>

					<td class="datoTable " :class="{ 'listaSelected': false }">
						<i class="bi bi-pencil "></i>
						<i @click="outGoingData('tarifa_row_Selected',dato)" class="bi bi-trash"></i>


						<button style="border: none; background: transparent;" data-toggle="dropdown">
							<i class="bi bi-three-dots"></i>
						</button>

						<div class="dropdown-menu">

							<a class="dropdown-item" href="#">Perfiles</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item">Perfil Crediticio</a>

							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Optiones Operativas</a>

						</div>

					</td>
				</tr>




			</tbody>
		</table>




	</div>
</template>

<script setup>
 //ref   tariffsList


const incomingData = defineProps(['tariffsList']);

const outGoingData = defineEmits(['tarifa_row_Selected'])


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