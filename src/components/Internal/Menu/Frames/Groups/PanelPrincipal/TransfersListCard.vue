<template>
	<div class="vistaStandar">

		<TitleBtnSearch :title="'Traslados'" :btnTitle="'Crear Traslado'" @functionBtn="crearTraslado"
			@search="busquedaTraslado" />
		<VistaStandarList @transfer_id="toMapa" :transfers_list="incomingData.fullTransfer" :vista="2" />

	</div>

</template>
<script setup>

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'
import VistaStandarList from '@/components/VistaStandarList.vue'

import { defineProps, defineEmits } from 'vue'

const incomingData = defineProps(['fullTransfer']);

const outGoingData = defineEmits(['transfer_id', 'showAddTransfer']);


function crearTraslado() {
	outGoingData('showAddTransfer')
}


function toMapa(transfer_id) {
	outGoingData('transfer_id', transfer_id);
}

function busquedaTraslado(texto) {
	console.log(texto)
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