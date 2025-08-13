<template>

	<!-- 	<PopClientCard  v-show="addClientShowing"  @cerrar="closeMe"  @updateClientList="consultarListaClientes" ref="update"/> -->

	<div class="containerPage">


		<section>


			<HeaderLog />

			<!-- <DatePicker class="datePicker" /> -->


		</section>


		<div class="vistaStandarList" style="margin-top: 25px;">

			<div class="contendorBlanco" style="height: 100%;">

				<div style="width: 100%; padding-bottom: 10px;">
					<TitleBtnSearch style="border-left: none;	border-right: none" :right="true" :title="'Tarifas'"
						:btnTitle="'Crear Tarifa'"  @search="busquedaUsuario" />
				</div>

				<div style="width: 100%; height: 100%; padding:30px">

					<div>Creacion de Tarifas</div>

					<CreacionTarifaForm1 :transferTypes="transferTypes" :tariffTypes="tariffTypes" :places_List="places_List" @form="crearTarifa"/>

					<div>Lista de Tarifas Creadas</div>


				</div>
				<TarifaList :tariffsList="tariffsList" style="width: 100%; height: 100%;" @tarifa_row_Selected="eliminar_Tariff" /> 



			</div>


		</div>


	</div>
</template>


<script setup>


import CreacionTarifaForm1 from '@/components/Internal/Menu/Frames/Forms/Tarifa/CreacionTarifaForm1.vue'

import TarifaList from '@/components/Internal/tablas/TarifaList.vue'
import HeaderLog from '@/components/external/components/HeaderLog.vue'
//import PopClientCard from '@/components/Internal/Menu/Frames/PopClientCard.vue'
import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'

//import { clientsList } from '@/components/conexion/DataConector.js'

import { transfer_Types, placesList_All, decodeBase64Token, tarrifs_create, tariffs_List, tariffsDelete} from '@/components/conexion/DataConector.js'


import {ref,  onMounted } from 'vue' //ref

import Cookies from 'js-cookie';

const session = ref({
  id: 0,
  serverClientId: 0
});


const transferTypes = ref([
  {
    id: 1,
    name: "import 1",
    description: "Transfer belong from other country to free zone by a port"
  },
  {
    id: 2,
    name: "export 2",
    description: "Transfer go to the another country by a port"
  }
])


const tariffTypes=ref([
	{
		id: 1, 
		name: 'Metro',
		description: 'FIXED_METRO'
	}, 
	{
		id: 2, 
		name: 'Interior',
		description: 'FIXED_UPSTATE'
	}, 
	{
		id: 3, 
		name: 'viajes cortos',
		description: 'FIXED_SHORT'
	},
	{
		id: 4, 
		name: 'Por distancia',
		description: 'BY_DISTANCE'
	},
	{
		id: 5, 
		name: 'Especial',
		description: 'CUSTOM_GEO'
	} 
])


const places_List = ref([
  {
    id: 2388933,
    clientId: 1,
    label: "destino 1 Defecto",
    radius: 288,
    latitude: 18.39053905,
    longitude: -70.04629971,
    address: "Calle 2ª, Zona ",
    show: true,
    startWeight: 0,
    endWeight: 0
  },
  {
    id: 2388934,
    clientId: 1,
    label: "destino 2 Defecto",
    radius: 240,
    latitude: 18.42153715,
    longitude: -70.11888742,
    address: "San Cristóbal, República Dominicana, 91000",
    show: true,
    startWeight: 0,
    endWeight: 0
  }
])


const tariffsList=ref([
	{
		id: 0,
		name: "N/A",
		transferTypeId: 0,
		tariffTypeId: 0,
		price: 0
	}

])


//importacion
//exportacion
//local

function consultarTransferTypes() {

transfer_Types().then(typeList => {

  if (typeList.success) {
	transferTypes.value = typeList.transferTypes
  }
}).catch(error => {
  console.log(error)
  console.log("Error al Hacer La peticion")

}).finally(() => {

  console.log("consutla done")

})
}

function consultarplaces_List(serverClientId) {
	placesList_All(serverClientId).then(listPlaces => {

		console.log(listPlaces)

    if (listPlaces.success) {

		places_List.value = listPlaces.places
    }
  })
    .catch(error => {
      console.log(error)

    })
    .finally(() => {

      console.log("Finalizo el request places")
    })


}

function consultartariffsList() {
	tariffs_List().then(listTariffs => {

		//console.log(listTariffs)

    if (listTariffs.success) {

		tariffsList.value = listTariffs.tariffs
    }
  })
    .catch(error => {
      console.log(error)

    })
    .finally(() => {

      console.log("Finalizo el request listTariffs")
    })


}

function eliminar_Tariff(row) {

	//console.log(row.id)
	tariffsDelete(row.id).then(ResponseDeleted => {

		console.log(ResponseDeleted)
		consultartariffsList();

  })
    .catch(error => {
      console.log(error)

    })
    .finally(() => {

      console.log("Finalizo el request eliminar_Tariff")
    })


}





function busquedaUsuario(texto) {
	console.log(texto)
}


function crearTarifa(form){
	//console.log(form)

	let transferTypeId=null
	let tariffTypeId= null
	let originId= null
	let destinationId=null

	if(form.transferType){
		transferTypeId=form.transferType.id
	}

	if(form.tariffType){
		tariffTypeId=form.tariffType.id
	}

	if(form.origin){
		originId=form.origin.id
	}

	if(form.destination){
		destinationId=form.destination.id
	}

	const parmetros={
		//id: Option[Int] = None,

		name: form.name,
		transferTypeId: transferTypeId,
		tariffTypeId: tariffTypeId,
		price: form.price,
		originId: originId,
		destinationId: destinationId,
		distanceFreeKm: form.distanceFreeKm,
		distanceOffsetKm: form.distanceOffsetKm,
		distanceOffsetCost: form.distanceOffsetCost,
		shortTripKm: form.shortTripKm
	}

	
console.log(parmetros)

tarrifs_create(parmetros).then(respuesta=>{
	console.log(respuesta)
	consultartariffsList();

}).catch(error => {
  console.log(error)
  console.log("Error al Hacer La peticion")

})

}


/*function closeMe() {

	addClientShowing.value = false

}
*/

onMounted(() => {


	/*	if (window.$cookies.isKey('PLAY_SESSION')) {
	
			console.log("Welcome Back")

		} else {
	
			console.log("logueate por favor")
			window.location.replace("./");
		}
	*/



	const token = Cookies.get('userPublicInfo');

if (token) {

  let user_session = decodeBase64Token(token);

  session.value.serverClientId = user_session.clientId || 0
  session.value.id = user_session.id || 0

  /*{
	  "id": 1,
	  "clientId": 1,
	  "rolId": 1,
	  "firstName": "Aurora",
	  "lastName": "Technologies",
	  "idcard": "00111223456",
	  "role": {
		  "id": 1,
		  "name": "root",
		  "scope": "*",
		  "permissions": "*"
	  }
  }*/

} else {

  console.error("User info not found in cookies");
  console.log("redirigiendo al Login... ")
  // window.location.replace("./");
}

consultarTransferTypes();
consultartariffsList();
consultarplaces_List(session.value.serverClientId);

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