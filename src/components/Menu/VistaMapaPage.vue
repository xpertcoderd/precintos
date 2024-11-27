<template>
	<div class="AreaTrabajoPage">
		<div class="mainTitulo">
			<strong>Vista Mapa</strong>
			<span @click="changeToPrecintoPage" v-if="incomingData.logined" class="gotoPrecintos">ir a Precintos</span>
		</div>

		<HeaderComun class="disabled" />
		<CounterPage :countersGeneral="incomingData.countersGeneral" />
		<FrameMapa :transfer_id="incomingData.transfer_id" class="miMapa" />

	</div>
</template>
<script setup>
import HeaderComun from '@/components/HeaderComun.vue'
import CounterPage from '@/components/CounterPage.vue'

import FrameMapa from '@/components/Frame/Mapa/FrameMapa.vue'

import { defineProps } from 'vue';



const incomingData = defineProps(['transfer_id', 'countersGeneral', 'logined']);


function changeToPrecintoPage() {
	window.location.replace("./precintos");
}




</script>

<style scoped>
.mainTitulo {
	padding: 15px;
	padding-left: 29px;
	width: 100%;
	font-size: 22px;
	font-weight: 400;
	border-bottom: solid 2px;
	border-color: #80808030;
	background-color: white;
	position: relative;
}

.gotoPrecintos {
	cursor: pointer;
	margin-right: 10px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	padding: 20px;
	padding-top: 8px;
	padding-bottom: 8px;
	font-size: 16px;
	font-weight: 700;
	display: flex;
	background-color: #e46564;
	color: white;
	border-radius: 8px 8px 8px 8px;

}
.AreaTrabajoPage {
	width: auto;
	display: flex;
	flex-direction: column;
	/*height: 100%;*/
}

.selectorVistaContainer {
	display: flex;
	padding-left: 29px;
	padding-top: 20px;
	border-radius: 8px 8px 8px 8px;
	justify-content: space-between;
	width: 100%;
}

.selectorVista {
	background-color: #ebedf4;
	padding: 4px;
	border-radius: 8px 8px 8px 8px;
	display: flex;

}

.targetas {
	padding: 8px;
	cursor: pointer;
	border-radius: 8px 8px 8px 8px;
}

.dateSelectorContainer {
	cursor: pointer;
	margin-right: 20px;
}

.dateSelector {
	background-color: #54bbda;
	color: white;
	cursor: pointer;
	font-weight: 700;
	padding: 10px;
	padding-top: 8px;
	padding-bottom: 8px;
	border-radius: 8px 8px 8px 8px;
	border-color: #80808030;

}

.vistaSelected {
	background-color: white;
}

.miMapa {
	border-bottom: solid 1px;
	border-color: #80808030;
	height: 100%;
}

.disabled {
	pointer-events: none;
	/* Deshabilita interacciones */
	opacity: 0.5;
	/* Aplica un efecto de transparencia */
}
</style>