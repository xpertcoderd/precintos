<template>
	<div class="vistaStandar">

		<TitleBtnSearch :title="'Traslados'" :btnTitle="'Crear Traslado'" @functionBtn="crearTraslado"
			@search="busquedaTraslado" style="padding-bottom: 10px;" />
		<EtaList />

	</div>

</template>
<script setup>

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'
import EtaList from '@/components/Internal/tablas/EtaList.vue'


import { defineEmits } from 'vue'

const outGoingData = defineEmits(['showAddTransfer'])


function crearTraslado() {
	outGoingData('showAddTransfer')
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