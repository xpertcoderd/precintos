<template>

	<div class="contendorTabla">


		<SolicitudesList style="width: 100%;" class="myTable" />



	</div>
</template>

<script setup>

import { onMounted, } from 'vue' //defineProps


import SolicitudesList from '@/components/Internal/tablas/SolicitudesList.vue'




onMounted(() => {


	console.log("done")
	/*	if (window.$cookies.isKey('PLAY_SESSION')) {
	
			console.log("Welcome Back")
	
		
	
		} else {
	
			console.log("logueate por favor")
			window.location.replace("./");
		}
	*/



});

</script>

<style scoped>
.contendorTabla {

	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	padding-left: 10px;
	padding-right: 10px;
}
</style>