<template>
	<div class="vistaStandarList">

		<div class="contendorTabla">
			<TablaHeader :filtro="filtroLabels" @buscar="buscar" class=myTableHeader />
			<TablaList :indice="incomingData.indice" :transferLnk="incomingData.incomingData" class="myTable" />
		</div>

	</div>
</template>

<script setup>
import TablaHeader from '@/components/TablaHeader.vue'
import TablaList from '@/components/TablaList.vue'
import { ref } from 'vue'


import { defineProps } from 'vue' //onMounted defineExpose ref

const incomingData = defineProps(['incomingData', 'indice']);


let filtroLabels = ref({
	Label1: "precinto",
	Label2: "ruta",
	Label3: "estatus",
})


function buscar(texto) {

	let text_buscar = texto || false

	if (text_buscar) {

		console.log("voy a buscar", text_buscar)
		/*
				if (token) {
		
				devicesAll(token).then(listCandados => {
			
					if (listCandados.success) {
		
						const resultado=listCandados.devicesGroupsDevicesStates.filter(item => item.device.label.includes(text_buscar))
						
						//console.log(resultado)
						deviceList.value=resultado
			
					} else {
						console.log(listCandados)
					}
			
				}).catch(error => {
					console.log(error)
					console.log("Error al Hacer La peticion")
				})
			}else{
				console.log("token invalido", token)
		
			}
		
		*/


	}

}


</script>

<style scoped>
.vistaStandarList {
	width: 100%;
	height: 50%;
	overflow: auto;
	border: solid 1px;
	background-color: white;
	border-radius: 8px 8px 0px 0px;
	border-color: #80808030;
	padding: 10px;
	padding-bottom: 0px;
}

.contendorTabla {

	display: flex;
	flex-direction: column;
	height: 100%;
	padding-left: 10px;
	padding-right: 10px;
}

.myTable {
	height: auto;
	overflow: auto;
	padding-left: 15px;
	padding-right: 15px;
}
</style>