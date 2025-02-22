<template>

	<PopEnlazar :containerSelected="containerSelected" @cerrar="closeEnlacePop" v-if="enlaceShowing" />

	<PopTransfersCard @cerrar="closeAddTransfer" @updateTransfersList="consultarTransfers" v-if="addTransferShowing" />


	<div class="containerPage">


		<section>


			<HeaderLog />

			<DatePicker class="datePicker" />

			<CounterCards :counters="incomingData.counters" />

			<div class="selectorVista">
				<SelectorVista @fuction_uno="showContainier" @fuction_dos="showBl" @fuction_tres="showETA"
					@fuction_cuatro="showMapa" ref="selectorBtn" />
			</div>



		</section>


		<div class="vistaStandarList">

			<div class="contendorBlanco" style="height: 100%;">


				<ContenedoresCard @showEnlacePop="showEnlacePop" v-if="views.contenedor"
					:containersList="containersList" @showAddTransfer="showAddingTransfer" />

				<TransfersListCard v-if="views.bl" :fullTransfer="transferList.fullTransfer"
					@showAddTransfer="showAddingTransfer" @transfer_id="cargarMapa" />

				<EtaCard v-if="views.eta" :fullTransfer="transferList.fullTransfer"
					@showAddTransfer="showAddingTransfer" @transfer_id="cargarMapa" />

				<MapaContainers v-if="views.mapa" :transfer_id="transferIdSelected"
					@showAddTransfer="showAddingTransfer" class="miMapa" />


			</div>


		</div>


	</div>
</template>


<script setup>

import HeaderLog from '@/components/external/components/HeaderLog.vue'


import PopTransfersCard from '@/components/Internal/Menu/Frames/PopPop/PanelPrincipal/PopTransfersCard.vue'

import CounterCards from '@/components/Internal/CounterCards.vue'

import DatePicker from '@/components/external/frames/DatePicker.vue'

import { transfers_list, transfer_UnitsAll } from '@/components/conexion/DataConector.js'

import SelectorVista from '@/components/external/components/SelectorVista.vue'

import TransfersListCard from '@/components/Internal/Menu/Frames/Groups/PanelPrincipal/TransfersListCard.vue'

import EtaCard from '@/components/Internal/Menu/Frames/Groups/PanelPrincipal/EtaCard.vue'

import ContenedoresCard from '@/components/Internal/Menu/Frames/Groups/PanelPrincipal/ContenedoresCard.vue'

import MapaContainers from '@/components/Internal/Menu/Frames/Groups/PanelPrincipal/MapaContainers.vue'

import PopEnlazar from '@/components/Internal/Menu/Frames/PopPop/PanelPrincipal/PopEnlazar.vue'



import { ref, onMounted, defineProps } from 'vue'

//let addUsuarioShowing=ref(false)

let transferList = ref({
	client: {
		name: "Loading... "
	},

	fullTransfer: []

});

const containersList = ref([
	{
		id: 1,
		container: "container",
		device: "device",
		startDate: "2025-02-11 13:38:12",
		startPlaceName: "startPlaceName",
		endPlaceName: "endPlaceName",
		state: "state"
	}
])

const views = ref({
	contenedor: false,
	bl: true,
	eta: false,
	mapa: false
})

const transferIdSelected = ref()

const selectorBtn = ref(null);

const addTransferShowing = ref(false)

const enlaceShowing = ref(false)

const containerSelected = ref({
	id: 1,
	container: "1234"
})

const incomingData = defineProps(['counters']);

function showContainier() {
	views.value.contenedor = true
	views.value.bl = false
	views.value.eta = false
	views.value.mapa = false
}

function showBl() {
	views.value.contenedor = false
	views.value.bl = true
	views.value.eta = false
	views.value.mapa = false
}

function showETA() {
	views.value.contenedor = false
	views.value.bl = false
	views.value.eta = true
	views.value.mapa = false
}

function showMapa() {
	views.value.contenedor = false
	views.value.bl = false
	views.value.eta = false
	views.value.mapa = true

}

function cargarMapa(transfer_id) {

	showMapa()
	selectorBtn.value.fuction_cuatro()

	transferIdSelected.value = transfer_id

}





function closeAddTransfer() {

	addTransferShowing.value = false

}

function closeEnlacePop() {

	enlaceShowing.value = false
}

function showEnlacePop(contenedorSelected) {
	console.log(contenedorSelected)

	containerSelected.value = contenedorSelected

	enlaceShowing.value = true
}



function showAddingTransfer() {
	addTransferShowing.value = true
}




async function consultarTransfers() {


	await transfers_list().then(result => {

		if (result.success) {

			transferList.value = result.clientFullTransfers;
		} else {
			console.log(result)
		}
	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	}).finally(() => {
		console.log("consutla done")
	})






}

function consultarContenedoresAll() {


	transfer_UnitsAll().then(result => {

		if (result.success) {

			containersList.value = result.transfersUnitTransfer;
		} else {
			console.log(result)
		}
	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	}).finally(() => {
		console.log("consutla done")
	})


}




onMounted(() => {


	consultarTransfers().then(() => {
		consultarContenedoresAll()
	})

});

</script>

<style scoped>
.containerPage {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;



}

.selectorVista {
	padding-top: 15px;
	padding-left: 1%;
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
	padding-top: 15px;
	padding-right: 2%;
	padding-left: 1%;
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
	/*	padding: 20px;*/
	height: 100%;
	display: flex;
	/*	border: solid 1px;
	border-color: #80808030;*/
	border-radius: 12px;
	background-color: white;
}


.myTable {
	height: auto;
	overflow: auto;
	padding-left: 15px;
	padding-right: 15px;
}

.miMapa {

	height: 100%;
}
</style>