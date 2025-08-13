<template>


	<div class="containerPage">


		<section>


			<HeaderLog />

			<DatePicker class="datePicker" />

			<CounterCards :counters="incomingData.counters" style="padding-bottom: 10px;" />


		</section>


		<div class="vistaStandarList">

			<div class="contendorBlanco" style="height: 100%;">

				<DispositivosCard />

			</div>


		</div>


	</div>
</template>


<script setup>

import HeaderLog from '@/components/external/components/HeaderLog.vue'

import CounterCards from '@/components/Internal/CounterCards.vue'
import DatePicker from '@/components/external/frames/DatePicker.vue'


import DispositivosCard from '@/components/Internal/Menu/Frames/Groups/Dispositivos/DispositivosCard.vue'


//import { counterCandado } from '@/components/conexion/DataConector.js'


import { onMounted, defineProps } from 'vue'

const incomingData = defineProps(['counters']);


onMounted(() => {


	console.log("disposivito")
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
.containerPage {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;



}

.datePicker {
	padding-top: 20px;
	padding-bottom: 15px;
	padding-left: 1%;
	padding-right: 2%;
}

.vistaStandarList {
	width: 100%;
	height: 100%;
	overflow: auto;
	padding-right: 20px;
	padding-left: 20px;
}

.contendorTabla {

	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	padding-left: 10px;
	padding-right: 10px;
}


.mainTitulo {
	padding: 1px;
	padding-left: 29px;
	width: 100%;
	font-size: 22px;
	font-weight: 400;
	border-bottom: solid 1px;
	border-color: #80808030;
	background-color: white;
}



.contendorBlanco {
	padding: 20px;
	height: 100%;
	display: flex;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 12px;
	background-color: white;
}


.myTable {
	height: auto;
	overflow: auto;
	padding-left: 15px;
	padding-right: 15px;
}
</style>