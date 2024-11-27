<template>

	<div class="windows_Page">

		<div class="DashBoardPage">

			<NewMenu :logined="logined" :LegalName="transferList.client.name" :isLoguer="true" @vista="changeVista"
				@logout="logout" style=" width:15%;" ref="menuRef" />


			<PrecintosPage v-if="vistaSelected == 1" />


		</div>

	</div>


</template>

<script setup>
import { ref } from 'vue'

import NewMenu from '@/components/NewMenu.vue'
import PrecintosPage from '@/components/Internal/Menu/PrecintosPage.vue'

let vistaSelected = ref(1);
let logined = ref(false)

if (window.$cookies.isKey('authorized')) {

	logined.value = true

	console.log("Welcome Back")
} else {
	logined.value = false
	window.location.replace("./precintos");
}


let transferList = ref({
	client: {
		name: "Luis Felipe "
	},
	fullTransfer: []
});




function changeVista(vista_Selected) {

	vistaSelected.value = vista_Selected

}

function logout() {

	try {
		// setTimeout(()=>{
		window.$cookies.remove('authorized')
		window.location.replace("./precintos");
		// },2000)

	}
	catch (error) {
		console.log(error)
	}
}


</script>

<style scoped>
.DashBoardPage {
	/*	height: 90%;*/
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
</style>