<template>

	<div class="contenedorDivisor">

		<TablaSingle class="tableSingle" :locksList="incomingData.locksList" @listChecked="listChecked"
			@lockSelected="lockSelected" @disableBtn="disableBtn" @marcarTodos="marcarTodos"
			@desmarcarTodos="desmarcarTodos" @actual="actual" />

		<MapaPage class="mapaPage" :inputData="valoresDefectoMapa" ref="mapaRef" />

	</div>



</template>

<script setup>

import TablaSingle from '@/components/Internal/tablas/TablaSingle.vue'
import MapaPage from '@/components/MapaPage.vue'

import { onMounted, ref, defineProps, defineEmits } from 'vue';


const mapaRef = ref(null);

const incomingData = defineProps(['locksList']);
const outGoingData = defineEmits(['listChecked', 'lockSelected', 'disableBtn', 'marcarTodos', 'desmarcarTodos']);

let valoresDefectoMapa = ref({
	center: [18.468025816718264, -69.93920818790205],
	zoom: 13,
	lat: 18.468025816718264,
	lng: -69.95920818790205
})



function lockSelected(actualLock) {
	//console.log(actualLock.device.id)
	outGoingData('lockSelected', actualLock);

}

function disableBtn() {
	//console.log("desabilitame")
	outGoingData('disableBtn')
	//btnEnable.value = false
}

function actual(device) {
	//console.log(device)
	//outGoingData('actual', device);

	//heading deviceId lat lng
	//mapaRef.value.update_motorIcon(device)
	//mapaRef.value.clearMarker()
	mapaRef.value.setCenter(device)
}

/*function showMapaBtn() {
	//console.log("showbtnMapa")
	outGoingData('showMapaBtn')
	//btnEnable.value = false
}
*/

function marcarTodos() {
	outGoingData('marcarTodos')
}

function desmarcarTodos() {
	outGoingData('desmarcarTodos')
}


function listChecked(activos) {
	//console.log(activos)

	const candados = activos.map(elem => ({
		label: elem.row.device.label,
		device_id: elem.row.device.deviceid,
		coordenadas: { lat: elem.row.deviceState.lat, lng: elem.row.deviceState.lng }

	}))


	mapaRef.value.setMarkers(candados)
	outGoingData('listChecked', activos);

}



onMounted(async () => {

	//mapaRef.value.actualizarCandadoMapa("datos")	
})

</script>

<style scoped>
.contenedorDivisor {
	display: flex;
	height: 100%;
}

.tableSingle {
	width: 40%;
	height: 100%;
	overflow: auto;
}

</style>
