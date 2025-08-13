<template>

	<div class="windows_Page">

		<div class="DashBoardPage">

			<InternalMenu :logined="logined" :LegalName="transferList.client.name" :isLoguer="true" @vista="changeVista"
				@logout="logout" style=" width:15%;" ref="menuRef" />


			<PrecintosPage :menuSelected="vistaSelected" />


		</div>


	</div>


</template>

<script setup>
import { ref } from 'vue'

import InternalMenu from '@/components/Internal/Menu/InternalMenu.vue'
import PrecintosPage from '@/components/Internal/Menu/PrecintosPage.vue'

import { logOut } from '@/components/conexion/DataConector.js'

import Cookies from 'js-cookie';

let vistaSelected = ref(1);
let logined = ref(true)

let transferList = ref({
	client: {
		name: "Aurora Central "
	},
	fullTransfer: []
});




function changeVista(vista_Selected) {

	vistaSelected.value = vista_Selected

}


function logout() {


	if (Cookies.get('userPublicInfo')) {

		logOut().then(respuesta => {

			if (respuesta.success) {

				console.log("Hasta luego ...")

				//Cookies.remove('userPublicInfo'); //optinal
				window.location.replace("./");


			} else {
				console.log("Error al hacer Login ")
			}

		}).catch(error => {
			console.log(error)

		})
			.finally(() => {

				console.log("Se Desloguio resquet donde")

			})

	} else {
		window.location.replace("./");

	}


}


</script>

<style scoped>
.DashBoardPage {
	/*	height: 90%;*/
	z-index: 2;
	width: 100%;
	height: 100%;
	display: flex;

}

.windows_Page {
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

}

.vistaCell {
	z-index: 1;
	position: absolute;
	top: 0px;
	right: 0px;
	left: 0px;
	bottom: 0px;
}

/*@media (width <590px) {

	.vistaPC {
		display: none;
	}

}*/
</style>