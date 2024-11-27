<template>
	<div class="AreaTrabajoPage">
		<div class="mainTitulo"><strong>Dashboard</strong></div>


		<CounterGPS :counters="counters" :statusDevices="statusDevices" />

		<div class="vistaStandarList">

			<div class="contendorBlanco" style="height: 100%;">
				<div class="contendorTabla">
					<TablaHeader :btn="true" :btnEnable="btnEnable" @openLock="abrirCandado" @buscar="Busqueda"
						@buscarisEmpty="buscarisEmpty" class=myTableHeader :filtro="filtroLabels"
						@searchMode="changeSearchMode" />
					<TablaCandado :locksList="deviceList" @lockSelected="lockSelected" @disableBtn="disableBtn"
						v-if="true" style="width: 100%;" class="myTable" />

				</div>
			</div>


		</div>


	</div>
</template>

<script setup>

import TablaHeader from '@/components/TablaHeader.vue'
import TablaCandado from '@/components/Internal/TablaCandado.vue'
import CounterGPS from '@/components/Internal/CounterGPS.vue'
import { devicesAll, counterCandado } from '@/components/conexion/DataConector.js'
import { convertirCounters } from '@/components/utils.js'

import { ref, onMounted } from 'vue'

let token

let counters = ref({
	asignados: 0,
	stock: 0
})

let filtroLabels = ref({
	Label1: "nombre",
	Label2: "estado",
	Label3: "bateria",
})

let statusDevices = ref({
	offline: 0,
	lowBaterry: 0,
	lostSignal: 0
})

let busquedaEmpty = ref(false)
const searchMode = ref("device.label") //group.title //device.label //deviceState.batteryLevel 


let btnEnable = ref(false);

let deviceList = ref([

	/*    {
			device: {
				id: 644657, sourceId: 417317, deviceid: "7591116296", model: "jointech_jt701", 
				label: "7591116296/ASSZX408352 - SEKU5765721/HAYCO DOMINICAN REPUBLI", groupId: 129346, created: "20200:00:00"
			},
			group: {
				id: 129346, title: "ENLACES ACTIVOS", color: "009688"
			},
			deviceState: {
				deviceId: 644657, sourceId: 417317, gpsUpdated: "2024-11-13 13:42:17", gpsSignalLevel: 75,
				lat: 18.463476666666665, lng: -69.71110666666667, connectionStatus: "active", movementStatus: "parked",
				lastUpdate: "2024-11-13 13:42:18", gsmUpdated: "2024-11-13 13:42:17", gsmSignalLevel: 90, batteryLevel: 99,
				batteryUpdate: "2024-11-13 13:42:17", lockStatus: "ready_for_command", lockStatusUpdated: "2024-11-13 ",
				lockState: "sealed", lockStateUpdated: "2024-11-13 13:42:17", lockCommandResultlockCommandResultUpdated: "2024-11-13 10:07:46",
				hardwareKey: "0006471762", hardwareKeyUpdated: "2024-11-12 15:06:44", actualTrackUpdate: "2024-11-13 13:42:17"
			}
		},*/
])

function buscarisEmpty() {
	busquedaEmpty.value = true
	Busqueda("")
}

function Busqueda(texto) {

	let text_buscar = texto || false

	if (text_buscar) {
		busquedaEmpty.value = false

		consultarCandadoListFilterBY(text_buscar)

		//console.log("voy a buscar", text_buscar)

	} else if (busquedaEmpty.value) {
		console.log("voy a buscar algo vacio")

		consultarCandadoList()

	}

}

function changeSearchMode(id) {

	let modo = parseInt(id, 10)

	console.log(modo)

	switch (modo) {

		case 1:
			searchMode.value = "device.label"
			break;

		case 2:
			searchMode.value = "group.title"
			break;

		case 3:
			searchMode.value = "deviceState.batteryLevel"
			break;

		default:
			searchMode.value = "device.label"
			console.log("No exite el id ", id)
			break;
	}

}

function consultarCandadoListFilterBY(texto) {

	if (token) {

		devicesAll(token).then(listCandados => {

			console.log(searchMode.value)

			if (listCandados.success) {

				if (searchMode.value == 'device.label') {
					deviceList.value = listCandados.devicesGroupsDevicesStates.filter(item => item.device.label.toString().toUpperCase().includes(texto.toUpperCase()))


				} else if (searchMode.value == 'group.title') {
					deviceList.value = listCandados.devicesGroupsDevicesStates.filter(item => item.group.title.toString().toUpperCase().includes(texto.toUpperCase()))

				} else if (searchMode.value == 'deviceState.batteryLevel') {
					deviceList.value = listCandados.devicesGroupsDevicesStates.filter(item => item.deviceState.batteryLevel <= parseInt(texto, 10))
				} else {
					console.log("no exite el SearchMode")
				}

			} else {
				console.log(listCandados)
			}

		}).catch(error => {
			console.log(error)
			console.log("Error al Hacer La peticion")
		})
	} else {
		console.log("token invalido", token)

	}
}

function consultarCandadoList() {

	if (token) {

		devicesAll(token).then(listCandados => {

			if (listCandados.success) {
				/*console.log(listCandados.devicesGroupsDevicesStates)*/
				deviceList.value = listCandados.devicesGroupsDevicesStates;

			} else {
				console.log(listCandados)
			}

		}).catch(error => {
			console.log(error)
			console.log("Error al Hacer La peticion")
		})
			.finally(() => {

				counterCandado(token).then(countersList => {

					if (countersList.success) {

						//console.log(countersList.deviceStateStats.groupsStats)
						counters.value = convertirCounters(countersList.deviceStateStats.groupsStats)
						statusDevices.value.offline = countersList.deviceStateStats.offline

						const baterryQ1 = countersList.deviceStateStats.batteryStat.q1
						const baterryQ2 = countersList.deviceStateStats.batteryStat.q2
						statusDevices.value.lowBaterry = baterryQ1 + baterryQ2

						const signalQ1 = countersList.deviceStateStats.gpsSignalStat.q1
						const signalQ2 = countersList.deviceStateStats.gpsSignalStat.q2
						statusDevices.value.lostSignal = signalQ1 + signalQ2

					}


				}).catch(error2 => {
					console.log(error2)
					console.log("Error al Hacer La peticion")
				})

			})
	} else {
		console.log("token invalido", token)

	}

}

onMounted(() => {



	if (window.$cookies.isKey('authorized')) {

		console.log("Welcome Back")
		token = window.$cookies.get('authorized').hash

		consultarCandadoList()

	} else {
		token = false;
		window.location.replace("./precintos");
	}




});



function lockSelected(actualLock) {
	console.log(actualLock)
	btnEnable.value = true

}


function disableBtn() {
	btnEnable.value = false
}

function abrirCandado() {
	console.log("se abrio el candado")
}


</script>

<style scoped>
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

.AreaTrabajoPage {
	width: auto;
	display: flex;
	flex-direction: column;
	width: 100%;

	/*background-color: pink;*/

}

.mainTitulo {
	padding: 15px;
	padding-left: 29px;
	width: 100%;
	font-size: 22px;
	font-weight: 400;
	border-bottom: solid 2px;
	border-color: #80808030;
	background-color: white;
}



.contendorBlanco {
	padding: 20px;
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