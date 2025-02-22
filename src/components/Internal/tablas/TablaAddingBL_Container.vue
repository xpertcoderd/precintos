<template>
	<div class="expandible">

		<table class="table table-lg requests-table">


			<thead>
				<tr class="columnaName">
					<th class="titleTable">NO</th>
					<th class="titleTable ">{{ incomingData.columnName1 }}</th>
					<th class="titleTable ">{{ incomingData.columnName2 }}</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for=" (dato, index) in incomingData.blList" :key="index" class="hovertabla">

					<td class="datoTable" :class="{ 'listaSelected': dato.check }">
						{{ index + 1 }}
					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<span>{{ dato[1].text1 }}</span>
					</td>

					<td class="datoTable " :class="{ 'listaSelected': dato.check }">
						<span>{{ dato[1].text2 }}</span>

						<!-- font-size: 18px; -->

						<i @click="outGoingData('removeBl', `${dato[1].text1}-${dato[1].text2}`)"
							class="bi bi-dash-square-fill"
							style="cursor: pointer; color: red; float: right; padding-right: 20px;"></i>
					</td>

				</tr>




			</tbody>
		</table>




	</div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue';

const incomingData = defineProps(['blList', 'columnName1', 'columnName2']);

const outGoingData = defineEmits(['removeBl'])

console.log(incomingData.blList)


</script>

<style scoped>
.expandible {
	width: 100%;
	height: 100%;
	overflow: auto;
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