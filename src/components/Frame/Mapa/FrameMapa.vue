<template>
	<div class="AreaTrabajoPage">

		<div class="contenedorMapa_Menu">

			<div class="MenuMapa">
				<FrameMapaMenu @traces="showTrace" @buscar="Busqueda" :transfer_id="incomingData.transfer_id"
					:transferBlits="transferBlits" />
			</div>

			<div class="mapa">
				<MapaPage v-if="mapaListo" :inputData="valoresDefectoMapa" ref="mapaRef" />
				<div class="text-center" v-else>
					<h2 style="padding: 20px; color: #58bbda;">{{ mensaje }}</h2>

				</div>
			</div>

		</div>

	</div>

</template>
<script setup>

import FrameMapaMenu from '@/components/Frame/Mapa/FrameMapaMenu.vue'

import MapaPage from '@/components/MapaPage.vue'

import { blitsTranfers } from '@/components/conexion/DataConector.js'
//import import { blitsTranfers } from '@/components/conexion/DataConectorTest.js'

import { ref, defineProps } from 'vue'

import { ultimoElementoGeneral } from '@/components/utils.js'

import { useRoute } from 'vue-router';

const route = useRoute();

const incomingData = defineProps(['transfer_id']);

let mapaListo = ref(false)

let mensaje = ref("No Hay Resultado Disponible")


let transferBlits = ref({

	transfer: {
		id: 36365,
		clientId: 6,
		bl: "PYRR2408280",
		startPlace: {
			id: 2388925,
			label: "Puerto de Santo Domingo",
			radius: 101,
			latitude: 18.4691788,
			longitude: -69.9566977,
			address: "Dirección General de Aduanas Puerto de Sans Soucí, Paseo Padre Billini, Santo Domingo de Guzmán, Distrito Nacional, República Dominicana, 10210"
		},
		endPlace: {
			id: 2388926,
			label: "Piisa",
			radius: 670,
			latitude: 18.50135,
			longitude: -69.7791422,
			address: "Calle Lateral 5, Parque Industrial Itabo, San Gregorio de Nigua, San Cristóbal, República Dominicana, 00809"
		},
		address: "SANTO DOMINGO, False",
		city: "San Cristóbal",
		note: "",
		timeTravelEst: "2024-03-23 00:00:00",
		timeRequest: "2024-09-27 16:23:41"
	},
	transferLnkBlits: [
		/*                    {
								transferLinked:{
									id:581,
									transferId:36365,
									deviceId:1073543,
									container:"CXDU2193240",
									currentState:2,
									timeLinked:"2024-09-27 16:23:41",
									lastBlitTime:"2024-09-30 17:20:14"
								},
								transferBlits:[
									{ 
										id:215,
										trLnkId:581,
										transferId:36365,
										deviceId:1073543,
										blitTime:"2024-09-27 15:26:32",
										lat:18.4717183,
										lng:-69.8810183,
										heading:0,
										speed:0,
										distance:0,
										distanceRemain:25039,
										travelTime:0,
										timeRemain:1578,
										statusId:2,
										completed:1
									}
								]
							}*/
	]
}
);


function showTrace(blits) {

	/*	mapaListo.value=false
		mapaListo.value=true*/


	if (transferBlits.value.transfer.startPlace && transferBlits.value.transfer.endPlace) {


		if (blits.length === 0) {
			console.log("Error Inesperado.... ");

			mensaje.value = "Error Inesperado.... No blits "
			mapaListo.value = false

		} else {
			mapaListo.value = true

			const medioIndex = Math.floor(blits.length / 2);

			mapaRef.value.setCenter(blits[medioIndex])
			//console.log((blits[blits.length - 1]))

			mapaRef.value.locations(transferBlits.value.transfer.startPlace, transferBlits.value.transfer.endPlace)

			/*	mapaRef.value.clearMap()*/

			mapaRef.value.update_motorIcon(ultimoElementoGeneral(blits))
			//		mapaRef.value.update_motorIcon((blits[blits.length - 1]) || blits[0])
			/*mapaRef.value.trace(blits)*/
			mapaRef.value.updateTrace(blits)

		}

	} else {
		mapaListo.value = false
		mensaje.value = "No Hay Ruta Disponible"
	}

}





function Busqueda(texto) {

	let text_buscar = texto || false

	if (!text_buscar) {
		text_buscar = incomingData.transfer_id
	}

	if (text_buscar != 0) {
		console.log("voy a buscar", text_buscar)

		blitsTranfers(route.params.hash, text_buscar).then(result => {


			if (result.success) {

				/*console.log(result.clientFullTransferBlits.fullTransferBlits)*/


				transferBlits.value = result.clientFullTransferBlits.fullTransferBlits

				valoresDefectoMapa.value.center = [transferBlits.value.transfer.startPlace.latitude, transferBlits.value.transfer.startPlace.longitude]

				mapaListo.value = true

			} else {
				console.log(result)
			}



		}).catch(error => {
			console.log(error)
			console.log("Error al Hacer La peticion")
		});
	} else {
		console.log("valor invalido")
	}
}

Busqueda();

const mapaRef = ref(null);

let valoresDefectoMapa = ref({
	center: [18.468025816718264, -69.93920818790205],
	zoom: 13,
	lat: 18.468025816718264,
	lng: -69.95920818790205
})

</script>

<style scoped>
.AreaTrabajoPage {

	width: 100%;
	height: 90%;
	overflow: auto;
	padding: 20px;
}

.contenedorMapa_Menu {
	height: 100%;
	display: flex;
	height: 100%;
	overflow: auto;
}

.MenuMapa {
	width: 550px;
	height: 100%;
	background-color: white;
	border-radius: 8px 0px 0px 8px;
	border: solid 1px;
	border-color: #80808030;

}

.mapa {
	height: 100%;
	width: 100%;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 0px 8px 8px 0px;
}
</style>