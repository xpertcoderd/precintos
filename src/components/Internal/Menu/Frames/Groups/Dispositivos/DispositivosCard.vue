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

import { ref, onMounted, watch } from 'vue' //defineProps

import TablaHeader from '@/components/TablaHeader.vue'
import TablaCandado from '@/components/Internal/TablaCandado.vue'
import CandadosMapa from '@/components/Internal/CandadosMapa.vue'
import ConfirmationPin from '@/components/Internal/Menu/ConfirmationPin.vue'
import { useDevices } from '@/composables/useDevices'
import Swal from 'sweetalert2'
import { generateAndDownloadCSV } from '@/components/utils.js'

//const incomingData = defineProps(['locksList']);

const { useDevicesAll, useOpenDeviceSeal } = useDevices();
const { data: devicesData } = useDevicesAll({ pageSize: 20000 });
const { mutateAsync: openSeal } = useOpenDeviceSeal();

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

let deviceList = ref([])

// Watch for data changes to update local list
watch(devicesData, (newData) => {
    if (newData && newData.success && newData.data && newData.data.devices) {
        deviceList.value = newData.data.devices.map(row => ({ check: false, row }));
    }
}, { immediate: true });


function downLoadList() {
    if (devicesData.value && devicesData.value.success && devicesData.value.data && devicesData.value.data.devices) {
        const listadevices = devicesData.value.data.devices.map(row => ({
            id: row.device.id,
            estado_device: row.deviceState.connectionStatus,
            nombre: row.device.label,
            bateria: row.deviceState.batteryLevel,
            estado_candado: row.group.title,
            ultimo_reporte: row.deviceState.actualTrackUpdate
        }));
        generateAndDownloadCSV(listadevices);
    }
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

	openSeal({ params: deviceSelected.value, pin }).then(resOpening => {

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
    if (deviceList.value.length > 0) {
        deviceList.value.forEach(item => item.check = true);
    }
}

function desmarcarTodos() {
    if (deviceList.value.length > 0) {
        deviceList.value.forEach(item => item.check = false);
    }
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
    if (devicesData.value && devicesData.value.success && devicesData.value.data && devicesData.value.data.devices) {
        const listDeviceTemp = devicesData.value.data.devices.map(row => ({ check: false, row }));

        if (searchMode.value == 'device.label') {
            deviceList.value = listDeviceTemp.filter(item => item.row.device.label.toString().toUpperCase().includes(texto.toUpperCase()))
        } else if (searchMode.value == 'group.title') {
            deviceList.value = listDeviceTemp.filter(item => item.row.group.title.toString().toUpperCase().includes(texto.toUpperCase()))
        } else if (searchMode.value == 'deviceState.batteryLevel') {
            deviceList.value = listDeviceTemp.filter(item => item.row.deviceState.batteryLevel <= parseInt(texto, 10))
        } else {
            console.log("no exite el SearchMode")
        }
    }
}

function consultarCandadoList() {
    if (devicesData.value && devicesData.value.success && devicesData.value.data && devicesData.value.data.devices) {
        deviceList.value = devicesData.value.data.devices.map(row => ({ check: false, row }));
    }
}


onMounted(() => {
	// consultarCandadoList() // Data is fetched automatically by Vue Query
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