<template>

	<!-- 	@updateUserList="consultarListaUsuarios" -->

	<PopUserCard @cerrar="closeMe" v-show="addUsuarioShowing" ref="update" />


	<div class="containerPage">


		<section>


			<HeaderLog />

			<!-- 		<DatePicker class="datePicker" /> -->


		</section>


		<div class="vistaStandarList" style="margin-top: 25px;">

			<div class="contendorBlanco" style="height: 100%;">

				<div style="width: 100%; padding-bottom: 10px;">
					<TitleBtnSearch style="border-left: none;	border-right: none" :right="true" :title="'Usuarios'"
						:btnTitle="'Crear Usuario'" @functionBtn="showCrearUsuarioCard" @search="busquedaUsuario" />
				</div>


				<UserList :userList="list_User" style="width: 100%; height: 100%;" @userSelected="showUpdateUserCard" />

			</div>


		</div>


	</div>
</template>


<script setup>


import HeaderLog from '@/components/external/components/HeaderLog.vue'


import PopUserCard from '@/components/Internal/Menu/Frames/PopPop/User/PopUserCard.vue'

import UserList from '@/components/Internal/tablas/UserList.vue'

//import DatePicker from '@/components/external/frames/DatePicker.vue'

//import DispositivosCard from '@/components/Internal/Menu/Frames/DispositivosCard.vue'

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'


import { usersList } from '@/components/conexion/DataConector.js'


import { ref, onMounted } from 'vue'

const update = ref(form => console.log(form));


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



function showUpdateUserCard(rowSelected) {

	console.log(rowSelected)

	const preLoad = {
		id: rowSelected.user.id,
		clientId: rowSelected.user.clientId,
		rolId: rowSelected.user.rolId,
		firstName: rowSelected.user.firstName,
		lastName: rowSelected.user.lastName,
		idcard: rowSelected.user.idcard,
		email: rowSelected.user.email,
		phone: rowSelected.user.phone,
		address: rowSelected.user.address,
		username: rowSelected.user.username,
		passwd: rowSelected.user.passwd,
		pin: rowSelected.user.pin

	}

	update.value.rellenarFormulario(preLoad);

	addUsuarioShowing.value = true
}


function consultarListaUsuarios() {

	usersList().then(usersList => {

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

}

onMounted(() => {


	consultarListaUsuarios()
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