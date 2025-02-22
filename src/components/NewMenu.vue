<template>
	<div class="MenuPage">

		<div class="logoContainer">
			<img class="logo" src="../assets/logo/auroraLogob.png">
		</div>

		<div class="menuItem">
			<div class="contents">

				<div class="titleMenu"> {{ incomingData.LegalName }}</div>

				<div class="userInfo">
					<div class="bola"></div>
					<div class="userInfoText">
						{{ incomingData.LegalName }}
					</div>




				</div>

				<div class="subMenu">Menu Principal</div>

				<div @click="showDasboard" class="targetas" :class="{ 'menuSelected': vistas.dashboard_selected }">

					<div class="row">
						<div class="col-2">
							<img :class="{ 'iconSeleected': vistas.dashboard_selected }" class="logo"
								src="../assets/icons/dashboard.svg">
						</div>
						<div v-if="!incomingData.isLoguer" class="col-10 btnMenu">Dashboard</div>
						<div v-else class="col-10 btnMenu">Precintos</div>
					</div>


				</div>

				<div @click="showMapa" class="targetas" :class="{ 'menuSelected': vistas.mapa_selected }">

					<div class="row">
						<div class="col-2">
							<img :class="{ 'iconSeleected': vistas.mapa_selected }" class="logo"
								src="../assets/icons/mapa.svg">
						</div>
						<div v-if="!incomingData.isLoguer" class="col-10 btnMenu">Vista Mapa</div>
						<div v-else class="col-10 btnMenu">Clientes</div>
					</div>


				</div>

				<div @click="showHistorial" class="targetas" :class="{ 'menuSelected': vistas.historial_selected }">

					<div class="row">
						<div class="col-2">
							<img :class="{ 'iconSeleected': vistas.historial_selected }" class="logo"
								src="../assets/icons/historial.svg">
						</div>
						<div class="col-10 btnMenu">Historial</div>
					</div>


				</div>

			</div>
			<div class="cuadroVacio">
				<div class="contenido">
					<!-- Aquí va el contenido del cuadro, si lo tienes -->

				</div>

				<div v-if="incomingData.logined" @click="outGoingData('logout')" class="mybtn">
					<i class="bi bi-box-arrow-left" style="margin-right: 10px"></i>
					<span>Cerrar Sesion</span>
				</div>

			</div>


		</div>

	</div>
</template>
<script setup>

import { ref, defineProps, defineEmits, defineExpose } from 'vue'


let vistas = ref({
	dashboard_selected: true,
	mapa_selected: false,
	historial_selected: false,
})

const incomingData = defineProps(
	['LegalName', 'isLoguer', 'logined']
)

const outGoingData = defineEmits(
	['vista', 'logout']
)


function updateView(indice) {

	const viewSelected = indice || 1

	switch (viewSelected) {

		case 1:
			showDasboard();
			break;

		case 2:
			showMapa();
			break;

		case 3:
			showHistorial()
			break;

		default:
			showDasboard();
			break;
	}

}



function showDasboard() {
	vistas.value.dashboard_selected = true;
	vistas.value.mapa_selected = false;
	vistas.value.historial_selected = false;

	outGoingData('vista', 1);

}

function showMapa() {
	vistas.value.dashboard_selected = false;
	vistas.value.mapa_selected = true;
	vistas.value.historial_selected = false;

	outGoingData('vista', 2);

}

function showHistorial() {
	vistas.value.dashboard_selected = false;
	vistas.value.mapa_selected = false;
	vistas.value.historial_selected = true;

	outGoingData('vista', 3);

}

defineExpose({ updateView })

</script>

<style scoped>
.logoContainer {
	background-color: white;
	padding: 20px;
	height: 14%;
	display: flex;
	border-right: solid 2px;
	border-color: #80808030;
	flex-direction: column;
	justify-content: space-between;
}

.logo {
	width: 100%;
	margin-top: auto;
	margin-bottom: auto;
}

.contents {
	max-height: 70%;
}

.cuadroVacio {
	border: solid 2px;
	border-color: #80808030;
	border-radius: 8px 8px 8px 8px;
	height: 20%;

	display: flex;
	flex-direction: column;
	/* Alinea los elementos verticalmente */
	justify-content: flex-start;
	/* Asegura que el contenido no se distribuya */

}

.mybtn {
	margin: 10px;
	padding: 10px;
	text-align: center;
	background-color: #3dbdda;
	font-weight: 500;
	color: white;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 8px 8px 8px 8px;
	margin-top: auto;
	cursor: pointer;

}


.menuItem {
	background-color: white;
	border-right: solid 2px;
	border-color: #80808030;
	padding: 12px;
	padding-top: 0px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 86%;
}

.userInfo {
	border-radius: 8px 8px 8px 8px;
	border: solid 1px;
	border-color: #80808030;
	padding: 5px;
	display: flex;
	margin-top: 5px;
}

.userInfoText {
	font-weight: 600;
	font-size: 10px;
	margin-top: auto;
	margin-bottom: auto;
}

.subMenu {
	font-weight: 600;
	font-size: 11px;
	padding: 5px;
	padding-left: 0px;
}

.bola {
	background: #d5d8de;
	width: 15px;
	padding: 15px;
	margin: 2px;
	margin-right: 5px;
	border-radius: 15px 15px 15px 15px;
}

.MenuPage {
	width: auto;
	/*background-color: grey;*/
	display: flex;
	flex-direction: column;
	/*justify-content: space-between;*/

}

.targetas {
	border: solid 1px;
	border-color: transparent;
	padding: 5px;
	cursor: pointer;
	margin-bottom: 10px;
}

.menuSelected {

	color: #559ebd;

	border-color: transparent;
	border-radius: 3px 3px 3px 3px;
	background-color: #eaf1fb;

}

.iconSeleected {
	/*color: #559ebd;*/
	filter: drop-shadow(16px 16px 20px blue) invert(75%);
}

.titleMenu {
	font-size: 14px;
	font-weight: 600;
	border-top: solid 2px;
	border-bottom: solid 2px;
	padding-top: 10px;
	padding-bottom: 10px;
	border-color: #80808030;
}

.btnMenu {
	font-weight: 600;
}
</style>