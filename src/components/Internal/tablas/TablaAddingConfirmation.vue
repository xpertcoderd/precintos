<template>
	<div class="expandible">


		<!-- 		

	{{ dato.type }}

 -->

		<div class="row targetaHeader">
			<div class="col-3" style="line-height: 1.2;">
				<div class="mainTitleTable">Broker</div>
				<div class="mainValueTable">{{ incomingData.headerData.serverClient }}</div>
			</div>
			<div class="col-3" style="line-height: 1.2;">
				<div class="mainTitleTable">Cliente Final</div>
				<div class="mainValueTable">{{ incomingData.headerData.finalClient }}</div>
			</div>
			<div class="col-3" style="line-height: 1.2;">
				<div class="mainTitleTable">Tipo de Carga</div>
				<div class="mainValueTable">{{ incomingData.headerData.typeName }}</div>
			</div>
			<div class="col-3" style="line-height: 1.2;">
				<div class="mainTitleTable">Costo por Contenedor</div>
				<div v-if="incomingData.headerData.unitPrice" class="mainValueTable">
					{{ `RD$${(incomingData.headerData.unitPrice).toLocaleString('es-419')}` }}</div>
				<div v-else class="mainValueTable">N/A</div>
			</div>

			<div class="col-6 mt-2" style="line-height: 1.2;">
				<div class="mainTitleTable">Origen</div>
				<div class="mainValueTable">{{ incomingData.headerData.startPlace }}</div>
			</div>

			<div class="col-6 mt-2" style="line-height: 1.2;">
				<div class="mainTitleTable">Destino</div>
				<div class="mainValueTable">{{ incomingData.headerData.endPlace }}</div>
			</div>


		</div>

		<table class="table table-lg requests-table">


			<thead class="columnaName">
				<tr>

					<th>
						<div class="titleTable">NO.BL</div>

					</th>

					<th>
						<div class="titleTable ">Contenedores</div>

					</th>

					<th>
						<div class="titleTable ">Total</div>

					</th>

				</tr>

			</thead>

			<tbody>
				<tr v-for=" (dato, index) in incomingData.bl_ContainerList" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': dato.check }">
						<div class="valueTable">{{ dato.bl }}</div>
					</td>



					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<div class="valueTable">{{ dato.bl_count }}</div>

					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">

						<div class="valueTable">{{ `RD$${dato.amount.toLocaleString('es-419')}` }}</div>

					</td>

				</tr>

			</tbody>
		</table>




	</div>
</template>

<script setup>

import { defineProps } from 'vue';

const incomingData = defineProps(['headerData', 'bl_ContainerList']);



</script>

<style scoped>
.expandible {
	width: 100%;
	height: 100%;
	overflow: auto;
}

.targetaHeader {
	background-color: #2ec0e2;
	border-radius: 8px 8px 0px 0px;
	padding-top: 5px;
	padding-bottom: 2px;
}

.titleTable {
	/*	background-color: #f7f8fa;*/
	font-size: 10px;
	font-weight: 700;
}

.mainTitleTable {
	color: white;
	font-size: 10px;
	font-weight: 600;
}

.mainValueTable {
	color: white;
	font-size: 10px;
	font-weight: 400;
}

.valueTable {
	font-weight: 400;
	font-size: 10px;
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
	background-color: white;
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