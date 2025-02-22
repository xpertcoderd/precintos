<template>

	<AddFormCard :vista="1" @cerrar="closeMe" @updateUserList="consultarListaTransporitistas"
		v-show="addUsuarioShowing" />

	<div class="containerPage">


		<section>


			<HeaderLog :userName="userName" />

			<!-- 		<DatePicker class="datePicker" /> -->

			<div class="selectorVista">
				<SelectorVistaSingle />
			</div>


		</section>


		<div class="vistaStandarList" style="margin-top: 25px;">

			<div class="contendorBlanco" style="height: 100%;">

				<div style="width: 100%; padding-bottom: 10px;">
					<TitleBtnSearch style="border-left: none;	border-right: none" :right="true"
						:title="'Transportistas'" :btnTitle="'Crear Tranportista'" @functionBtn="showCrearUsuarioCard"
						@search="busquedaUsuario" />
				</div>


				<TransportistaList style="width: 100%; height: 100%;" />

			</div>


		</div>


	</div>
</template>


<script setup>


import HeaderLog from '@/components/external/components/HeaderLog.vue'


import AddFormCard from '@/components/Internal/Menu/Frames/AddFormCard.vue'

import TransportistaList from '@/components/Internal/tablas/TransportistaList.vue'

import SelectorVistaSingle from '@/components/external/components/SelectorVistaSingle.vue'

//import DatePicker from '@/components/external/frames/DatePicker.vue'

//import DispositivosCard from '@/components/Internal/Menu/Frames/DispositivosCard.vue'

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'


/*import { usersList } from '@/components/conexion/DataConector.js'*/


import { ref, onMounted } from 'vue'


function showCrearUsuarioCard() {
	addUsuarioShowing.value = true
}


function closeMe() {

	addUsuarioShowing.value = false

}

function busquedaUsuario(texto) {
	console.log(texto)
}


let addUsuarioShowing = ref(false)


let userName = ref('Alba Perez')

/*
const list_User = ref([
		{
			user: {
				id: 1,
				clientId: 1,
				rolId: 1,
				firstName: "firstName",
				lastName: "lastName",
				idcard: "idcard",
				email: null,
				phone: null,
				address: null,
				username: "username",
				passwd: "passwd",
				pin: "pin"
			},
			createdAt: "createdAt",
			updatedAt: "updatedAt"
		}
	])
*/





function consultarListaTransporitistas() {

	console.log("Se consultara listado de Transporitistas")

	/*	usersList().then(usersList => {
	
			if (usersList.success) {
				list_User.value = usersList.users
			}
	
		}).catch(error => {
			console.log(error)
			console.log("Error al Hacer La peticion")
		})
			.finally(() => {
	
				console.log("consutla done")
	
	
			})
	*/
}

onMounted(() => {


	consultarListaTransporitistas()
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

.selectorVista {
	padding-top: 20px;
	padding-left: 1%;
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
	/*	padding-top: 15px;*/
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