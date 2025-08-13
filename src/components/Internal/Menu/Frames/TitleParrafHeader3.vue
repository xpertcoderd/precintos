<template>

	<div class="paginaContainer">


		<div class="tituloDinamico">
			{{ incomingData.titulo }}
		</div>

		<div class="parrafo">
			{{ incomingData.parrafo }}
		</div>

		<img src="@/assets/logo/auroraLogob.png" class="imgHeader">


	</div>


</template>

<script setup>

import { defineProps } from 'vue';

const incomingData = defineProps(['titulo', 'parrafo']);


</script>

<style scoped>
.paginaContainer {
	padding: 20px;
	padding-left: 20px;
	position: relative;
}

.tituloDinamico {
	font-weight: 600;
	color: black;
}

.imgHeader {
	position: absolute;
	background:
		transparent;
	width: 180px;
	top: 15px;
	right: 10px;
}
</style>