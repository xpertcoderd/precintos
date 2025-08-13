<template>
	<div class="contenedorWorking">
		<VistaGeneral @transfer_id="toMapa" :contenedoresCount="incomingData.contenedoresCount"
			:incomingData="incomingData.fullTransfer" />

	</div>
</template>

<script setup>

import VistaGeneral from './VistaGeneral.vue'

import { defineProps, defineEmits } from 'vue'

const incomingData = defineProps(['fullTransfer', 'contenedoresCount']);

const outGoingData = defineEmits(['transfer_id']);

function toMapa(transfer_id) {

	outGoingData('transfer_id', transfer_id);
}



</script>

<style scoped>
.contenedorWorking {
	width: 100%;
	height: 100%;
	padding-left: 20px;
	padding-right: 20px;
	overflow: auto;
}
</style>