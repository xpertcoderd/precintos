<template>
	<div class="tablaListMapa">

		<div @click="showTrace(dato.transferBlits)"
			v-for=" (dato, index) in incomingData.transferBlits.transferLnkBlits" :key="index" class="targeticas">

			<div class="rowMenu">

				<div>
					<div class="fontPeq"> BL(Bill of Lading)</div>
					<div class="titleMapa">{{ incomingData.transferBlits.transfer.bl }} </div>
					<div class="fontPeq">ID Container</div>
					<div class="titleMapa">{{ dato.transferLinked.container }} </div>

					<div class="fontPeq">ID Precinto</div>
					<div class="titleMapa">{{ dato.transferLinked.deviceId }} </div>
				</div>


				<img width="100" src="@/components/../assets/camionCerrado.svg">

				<i @click="toggleCollapse(index)" class="bi bi-chevron-bar-expand"
					style="color:#66b9d9; position:absolute; right:0px; bottom: 0px;">
				</i>




			</div>


			<div v-show="isOpen(index)">

				<hr class="divisor">

				<BarraPorcentaje :porcentaje="ultimoElemento(dato.transferBlits).completed || 0" />
				<span><i class="bi bi-circle-fill vineta" style="color: #72c9eb;"></i>
					<span v-if="incomingData.transferBlits.transfer.startPlace" class="destinos">{{
						incomingData.transferBlits.transfer.startPlace.label }}</span>
					<span v-else>{{ " N/A" }}</span>
				</span>

				<span style="float: right;"><i class="bi bi-circle-fill vineta"></i>
					<span v-if="incomingData.transferBlits.transfer.endPlace" class="destinos">{{
						incomingData.transferBlits.transfer.endPlace.label }}</span>
					<span v-else>{{ " N/A" }}</span>
				</span>



			</div>


		</div>

	</div>
</template>

<script setup>

import { ref, defineProps, defineEmits } from 'vue'
import BarraPorcentaje from '@/components/BarraPorcentaje.vue'
import { ultimoElemento } from '@/components/utils.js'
let openIndex = ref()


const incomingData = defineProps(['transferBlits', 'indice']);
const outGoingData = defineEmits(['traces'])


function toggleCollapse(index) {

	//console.log("toggleCollapse")	
	openIndex.value = openIndex.value === index ? null : index;

}

function showTrace(blits) {

	outGoingData('traces', blits);

}

function isOpen(index) {

	return openIndex.value === index;
}



</script>

<style scoped>
.tablaListMapa {
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: white;
	padding-top: 5px;
}

.targeticas {
	border: solid 1px;
	padding: 8px;
	border-color: #80808030;
	cursor: pointer;
	margin-bottom: 7px;
	background: white;
	margin-left: 7px;
	margin-right: 7px;
	/*	min-height: 65px;*/
	border-radius: 8px 8px 8px 8px;
}


.rowMenu {
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
}

.titleMapa {
	font-weight: 700;
}

.divisor {
	color: grey;
	margin: 0px;
	margin-top: 10px;
	margin-bottom: 10px;
}

.targeticas:hover {
	/* box-shadow: none;*/
	box-shadow: 0px 0px 10px 5px rgba(102, 185, 217, 0.7)
}

.vineta {
	font-size: 12px;
	color: #3aaa35;
	padding: 5px;
}

.fontPeq {
	font-size: 11px;
}


.destinos {
	font-weight: 600;
	font-size: 11px;
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