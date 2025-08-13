<template>
	<div class="contenedorWorking">
		<VistaStandar @transfer_id="toMapa" :incomingData="incomingData.fullTransfer" />

	</div>
</template>

<script setup>

import VistaStandar from './VistaStandar.vue'

import { defineProps, defineEmits } from 'vue'

const incomingData = defineProps(['fullTransfer']);

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
	padding-bottom: 20px;
	overflow: auto;
}
</style>