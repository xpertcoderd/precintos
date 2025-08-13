<template>
	<div class="vistaStandar">

		<TitleBtnSearch :title="'Traslados'" :btnTitle="'Crear Traslado'" @functionBtn="crearTraslado"
			@search="busquedaTraslado" />
		<TrasladosList :containersList="incomingData.containersList" @containerRowSelected="showEnlacePop" />

	</div>

</template>
<script setup>



import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'
import TrasladosList from '@/components/Internal/tablas/TrasladosList.vue'

import { defineProps, defineEmits } from 'vue'

const incomingData = defineProps(['containersList']);
const outGoingData = defineEmits(['showAddTransfer', 'showEnlacePop'])

function crearTraslado() {
	outGoingData('showAddTransfer')
}

function busquedaTraslado(texto) {
	console.log(texto)
}


function showEnlacePop(contenedorActual) {
	outGoingData('showEnlacePop', contenedorActual)

}


</script>
<style scoped>
.vistaStandar {

	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
}
</style>