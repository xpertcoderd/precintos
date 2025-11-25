<template>

	<PopCredit :client="actualClient" @cerrar="closeCreditPop" v-if="popCreditShowing" />

	<PopClientCard v-show="addClientShowing" @cerrar="closeMe" @updateClientList="consultarListaClientes"
		ref="update" />

	<div class="containerPage">


		<section>


			<HeaderLog />

			<!-- <DatePicker class="datePicker" /> -->


		</section>


		<div class="vistaStandarList" style="margin-top: 25px;">

			<div class="contendorBlanco" style="height: 100%;">

				<div style="width: 100%; padding-bottom: 10px;">
					<TitleBtnSearch style="border-left: none;	border-right: none" :right="true" :title="'Clientes'"
						:btnTitle="'Crear Cliente'" @functionBtn="showCrearClientCard" @search="busquedaUsuario" />
				</div>


				<ClientList :clientList="list_Client" style="width: 100%; height: 100%;"
					@clientSelected="showUpdateClientCard" @showCreditPop="showCreditPop" />

			</div>


		</div>


	</div>
</template>


<script setup>


import HeaderLog from '@/components/external/components/HeaderLog.vue'


import PopClientCard from '@/components/Internal/Menu/Frames/PopPop/Client/PopClientCard.vue'

import ClientList from '@/components/Internal/tablas/ClientList.vue'

import PopCredit from '@/components/Internal/Menu/Frames/PopPop/Client/PopCredit.vue'


//import DatePicker from '@/components/external/frames/DatePicker.vue'

//import DispositivosCard from '@/components/Internal/Menu/Frames/DispositivosCard.vue'

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'

import { useClients } from '@/composables/useClients'

import { ref, onMounted, watch } from 'vue'

const { useClientsList } = useClients();
const { data: clientsData, refetch } = useClientsList();

const update = ref(form => console.log(form));

const popCreditShowing = ref(false)

const actualClient = ref({
	id: null,
	name: null,
	rnc: null
})

const list_Client = ref([])

watch(clientsData, (newData) => {
  if (newData && newData.success) {
    list_Client.value = newData.clients;
  }
}, { immediate: true });

function consultarListaClientes() {
  refetch();
}

function closeCreditPop() {
	actualClient.value.name = null
	actualClient.value.rnc = null
	popCreditShowing.value = false
}

function showCreditPop(rowClient) {

	const temporalclient = {
		id: rowClient.client.id,
		name: rowClient.client.name,
		rnc: rowClient.client.rnc
	}
	actualClient.value.id = temporalclient.id
	actualClient.value.name = temporalclient.name
	actualClient.value.rnc = temporalclient.rnc
	popCreditShowing.value = true
}



function showCrearClientCard() {
	addClientShowing.value = true

	/*update.value.restore();*/
}





function showUpdateClientCard(rowSelected) {

	console.log(rowSelected.client.id)


	const temp = {
		id: rowSelected.client.id,
		type: rowSelected.client.type,
		name: rowSelected.client.name,
		rnc: rowSelected.client.rnc,
		contact: rowSelected.client.contact,
		email: rowSelected.client.email,
		phone: rowSelected.client.phone,
		address: rowSelected.client.address,
		web: rowSelected.client.web

	}


	update.value.rellenarFormulario(temp);

	addClientShowing.value = true
}



function closeMe() {

	addClientShowing.value = false

}

function busquedaUsuario(texto) {
	console.log(texto)
}


let addClientShowing = ref(false)


onMounted(() => {
	// consultarListaClientes() // Handled by Vue Query
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


.contendorBlanco {
	/*padding: 20px;*/
	height: 100%;
	display: flex;
	flex-direction: column;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 12px 12px 0px 0px;
	border-top: none;
	background-color: white;
}
</style>