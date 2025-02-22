<template>

	<div class="contendorTabla">



		<ConfirmationPin v-show="pinShowing" @cerrar="closeme" @pin="setPin" ref="pinRef" />

		<TablaHeader :btn="true" :btnEnable="btnEnable" @openLock="abrirCandado" @buscar="Busqueda"
			@showInMapa="showMapaDevices" @showList="showListDevices" @buscarisEmpty="buscarisEmpty" class=myTableHeader
			:filtro="filtroLabels" @searchMode="changeSearchMode" />


		<TablaCandado v-if="!mapaIsShowing" :locksList="deviceList" @marcarTodos="marcarTodos"
			@desmarcarTodos="desmarcarTodos" @listChecked="listChecked" @lockSelected="lockSelected"
			@disableBtn="disableBtn" @downloadList="downLoadList" style="width: 100%;" class="myTable" />


		<CandadosMapa v-if="mapaIsShowing" :locksList="deviceList" @listChecked="listChecked"
			@lockSelected="lockSelected" @disableBtn="disableBtn" @marcarTodos="marcarTodos"
			@desmarcarTodos="desmarcarTodos" />
		<!-- @actual="actual" -->



	</div>
</template>

<script setup>

import { ref, onMounted, } from 'vue' //defineProps

import TablaHeader from '@/components/TablaHeader.vue'
import TablaCandado from '@/components/Internal/TablaCandado.vue'
import CandadosMapa from '@/components/Internal/CandadosMapa.vue'
import ConfirmationPin from '@/components/Internal/Menu/ConfirmationPin.vue'
import { devicesAll, openSeal } from '@/components/conexion/DataConector.js'// openSeal
import Swal from 'sweetalert2'
import { generateAndDownloadCSV } from '@/components/utils.js'

//const incomingData = defineProps(['locksList']);


let btnEnable = ref(false);

let pinShowing = ref(false);

const pinRef = ref(null);


const mapaIsShowing = ref(false)

const listdevices = ref()

const searchMode = ref("device.label") //group.title //device.label 

let busquedaEmpty = ref(false)

let filtroLabels = ref({
	Label1: "nombre",
	Label2: "estado",
	Label3: "bateria",
})


const deviceSelected = ref({
	deviceId: 0,
	label: ""

}
)

let deviceList = ref([
	{
		check: false,
		row: {
			device: {
				id: 644657, sourceId: 417317, deviceid: "7591116296", model: "jointech_jt701",
				label: "7591116296-SEKU5765721 / HAYCO", groupId: 129346, created: "20200:00:00"
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
		}
	}
])



function downLoadList() {

	devicesAll().then(listCandados => {

		if (listCandados.success) {


			const listadevices = listCandados.devicesGroupsDevicesStates.map(row => (

				{
					id: row.device.id,
					estado_device: row.deviceState.connectionStatus,
					nombre: row.device.label,
					bateria: row.deviceState.batteryLevel,
					estado_candado: row.group.title,
					ultimo_reporte: row.deviceState.actualTrackUpdate
				}


			))


			generateAndDownloadCSV(listadevices)



		} else {
			console.log(listCandados)
		}

	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	})
		.finally(() => {

			console.log("consulta realizada")

		})
}



function lockSelected(actualLock) {
	console.log()

	deviceSelected.value.deviceId = actualLock.device.id
	deviceSelected.value.label = actualLock.device.deviceid
	btnEnable.value = true
	//showMapaBtn.value=false

}


function disableBtn() {
	btnEnable.value = false
	//showMapaBtn.value=false
}

function abrirCandado() {

	/*	console.log(deviceSelected.value)*/

	showpinpanel();
}
/*
function actual(device_actual){
	console.log(device_actual)
}
*/

function showpinpanel() {
	pinShowing.value = true
	pinRef.value.updateSerialN(deviceSelected.value.label)
}

function closeme() {
	pinShowing.value = false
}

function showMapaDevices() {
	mapaIsShowing.value = true
}

function showListDevices() {
	mapaIsShowing.value = false
}


function buscarisEmpty() {
	busquedaEmpty.value = true
	Busqueda("")
}

function sms(texto) {

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		}
	});
	Toast.fire({
		icon: "success",
		title: texto
	});

}

function setPin(pin) {

	openSeal(deviceSelected.value, pin).then(resOpening => {

		console.log(resOpening)
		//sms(resOpening)


	})
		.catch(error => {
			console.log(error)
			console.log("Error al Hacer La peticion")
		})

		.finally(() => {

			sms(deviceSelected.value)

			console.log("se abrio el candado", deviceSelected.value)
		})
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

function listChecked(listSelected) {
	//console.log(listSelected)
	listdevices.value = listSelected

}

function marcarTodos() {
	disableBtn()

	devicesAll().then(listCandados => {

		if (listCandados.success) {
			/*console.log(listCandados.devicesGroupsDevicesStates)*/
			//deviceList.value = listCandados.devicesGroupsDevicesStates;
			deviceList.value = listCandados.devicesGroupsDevicesStates.map(row => ({ check: true, row }))



		} else {
			console.log(listCandados)
		}

	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	})

}

function desmarcarTodos() {

	devicesAll().then(listCandados => {

		if (listCandados.success) {
			/*console.log(listCandados.devicesGroupsDevicesStates)*/
			//deviceList.value = listCandados.devicesGroupsDevicesStates;
			deviceList.value = listCandados.devicesGroupsDevicesStates.map(row => ({ check: false, row }))



		} else {
			console.log(listCandados)
		}

	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	})

}


function changeSearchMode(id) {

	let modo = parseInt(id, 10)

	//console.log(modo)

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

	devicesAll().then(listCandados => {

		const listDeviceTemp = listCandados.devicesGroupsDevicesStates.map(row => ({ check: false, row }))

		if (listCandados.success) {

			if (searchMode.value == 'device.label') {
				deviceList.value = listDeviceTemp.filter(item => item.row.device.label.toString().toUpperCase().includes(texto.toUpperCase()))


			} else if (searchMode.value == 'group.title') {
				deviceList.value = listDeviceTemp.filter(item => item.row.group.title.toString().toUpperCase().includes(texto.toUpperCase()))

			} else if (searchMode.value == 'deviceState.batteryLevel') {
				deviceList.value = listDeviceTemp.filter(item => item.row.deviceState.batteryLevel <= parseInt(texto, 10))
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

}

function consultarCandadoList() {

	devicesAll().then(listCandados => {

		if (listCandados.success) {
			/*console.log(listCandados.devicesGroupsDevicesStates)*/
			//deviceList.value = listCandados.devicesGroupsDevicesStates;
			deviceList.value = listCandados.devicesGroupsDevicesStates.map(row => ({ check: false, row }))



		} else {
			console.log(listCandados)
		}

	}).catch(error => {
		console.log(error)
		console.log("Error al Hacer La peticion")
	})
		.finally(() => {

			console.log("consulta realizada")

		})

}


onMounted(() => {


	consultarCandadoList()
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