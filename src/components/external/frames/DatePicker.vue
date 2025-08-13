<template>

	<div class="mainContainer">
		<div class="tittlePage">
			Dashboard
		</div>

		<div class="containerPicker">
			<BotonGrouped style="margin-right: 20px;" />
			<CalendarioComp @fromTo="buscarFecha" />
		</div>

	</div>





</template>

<script setup>

import BotonGrouped from '@/components/external/components/BotonGrouped.vue'

import CalendarioComp from '@/components/CalendarioComp.vue'


function buscarFecha(fecha) {
	console.log(fecha)
}

</script>

<style scoped>
.mainContainer {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.tittlePage {
	font-size: 19px;
	margin-top: auto;
	font-weight: 700;
}

.containerPicker {
	display: flex;
}
</style>