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
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    window.location.replace("/login");
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
