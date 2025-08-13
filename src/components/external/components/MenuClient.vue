<template>
	<div class="MenuPage">

		<div class="logoContainer">
			<img class="logo" src="@/components/../assets/logo/auroraLogob.png">
		</div>

		<div class="menuItem">
			<div class="contents">

				<div class="titleMenu text-center"> {{ incomingData.LegalName }}</div>

				<div class="userInfo">
					<div class="bola"></div>
					<div class="userInfoText">
						{{ incomingData.LegalName }}
					</div>
				</div>

				<div class="subMenu">Menu Principal</div>

				<div @click="sendIndice(1)" class="targetas" :class="{ 'menuSelected': vistas.dashboard }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-grid-1x2 logo"></i>
							<!-- 							<img :class="{ 'iconSeleected': vistas.dashboard }" class="logo"
								src="@/components/../assets/icons/dashboard.svg"> -->

						</div>
						<div class="col-10 btnMenu">Panel Principal</div>

					</div>


				</div>


				<div @click="sendIndice(2)" class="targetas" :class="{ 'menuSelected': vistas.solicitudes }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-journal-text logo"></i>

							<!-- 							<img :class="{ 'iconSeleected': vistas.solicitudes }" class="logo"
								src="@/components/../assets/icons/dashboard.svg"> -->
						</div>
						<div class="col-10 btnMenu">Solicitudes</div>

					</div>


				</div>

				<div @click="sendIndice(3)" class="targetas" :class="{ 'menuSelected': vistas.dispositivos }">

					<div class="row">
						<div class="col-2">
							<i class="bi bi-file-lock logo"></i>
							<!-- 							<img :class="{ 'iconSeleected': vistas.dispositivos }" class="logo"
								src="@/components/../assets/icons/dashboard.svg"> -->
						</div>

						<div class="col-10 btnMenu">Dispositivos</div>

					</div>


				</div>


				<div @click="sendIndice(4)" class="targetas" :class="{ 'menuSelected': vistas.analitica }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-clipboard2-data logo"></i>
						</div>
						<div class="col-10 btnMenu">Analitica</div>
					</div>


				</div>


				<div @click="sendIndice(5)" class="targetas" :class="{ 'menuSelected': vistas.tarifa }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-coin logo"></i>
						</div>
						<div class="col-10 btnMenu">Tarifa</div>
					</div>


				</div>

				<div class="subMenu">Entidades</div>


				<div @click="sendIndice(6)" class="targetas" :class="{ 'menuSelected': vistas.clientes }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-person-vcard logo"></i>
						</div>
						<div class="col-10 btnMenu">Clientes</div>
					</div>


				</div>

				<div @click="sendIndice(7)" class="targetas" :class="{ 'menuSelected': vistas.usuario }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-person-add logo"></i>
						</div>
						<div class="col-10 btnMenu">Usuarios</div>
					</div>


				</div>


				<div @click="sendIndice(8)" class="targetas" :class="{ 'menuSelected': vistas.transportistas }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-info-circle logo"></i>
						</div>
						<div class="col-10 btnMenu">Transportistas</div>
					</div>


				</div>

				<div class="subMenu">Otras opciones</div>

				<div @click="sendIndice(9)" class="targetas" :class="{ 'menuSelected': vistas.config }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-gear-fill logo"></i>
						</div>
						<div class="col-10 btnMenu">Configuracion</div>
					</div>


				</div>

				<div @click="sendIndice(10)" class="targetas" :class="{ 'menuSelected': vistas.info }">

					<div class="row">
						<div class="col-2">

							<i class="bi bi-info-circle logo"></i>
						</div>
						<div class="col-10 btnMenu">Informacion</div>
					</div>


				</div>

			</div>
			<div class="cuadroVacio">
				<div class="contenido">

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


const incomingData = defineProps(
	['LegalName', 'logined']
)

const outGoingData = defineEmits(
	['vista', 'logout']
)

let vistas = ref({

	dashboard: true,
	solicitudes: false,
	dispositivos: false,
	analitica: false,
	tarifa: false,

	usuario: false,
	clientes: false,
	transportistas: false,

	config: false,
	info: false,

})

function updateView(indice) {

	const viewSelected = indice || 1;

	sendIndice(viewSelected);

}

function clear() {
	vistas.value.dashboard = false;
	vistas.value.solicitudes = false;
	vistas.value.dispositivos = false;
	vistas.value.analitica = false;
	vistas.value.tarifa = false;

	vistas.value.clientes = false;
	vistas.value.usuario = false;
	vistas.value.transportistas = false;

	vistas.value.config = false;
	vistas.value.info = false;
}



function sendIndice(indice) {

	clear();

	switch (indice) {

		case 1:
			vistas.value.dashboard = true;
			break;

		case 2:
			vistas.value.solicitudes = true;
			break;

		case 3:
			vistas.value.dispositivos = true;
			break;

		case 4:
			vistas.value.analitica = true;
			break;

		case 5:
			vistas.value.tarifa = true;
			break;

		case 6:
			vistas.value.clientes = true;
			break;

		case 7:
			vistas.value.usuario = true;

			break;

		case 8:
			vistas.value.transportistas = true;
			break;

		case 9:
			vistas.value.config = true;
			break;

		case 10:
			vistas.value.info = true;
			break;

		default:
			vistas.value.dashboard = true;
			break;
	}

	outGoingData('vista', indice);

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
	/*border: solid 2px;
	border-color: #80808030;*/
	border-radius: 8px 8px 8px 8px;
	height: auto;

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
	min-width: 270px
		/*justify-content: space-between;*/

}

.targetas {
	border: solid 1px;
	border-color: transparent;
	padding: 5px;
	cursor: pointer;
	margin-bottom: 0px;
	margin-left: 2px;
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
	font-size: 15px;
	font-weight: 700;
	border-top: solid 2px;
	border-bottom: solid 2px;
	padding-top: 10px;
	padding-bottom: 10px;
	border-color: #80808030;
}

.btnMenu {
	font-weight: 600;
	padding: 0px !important;
}
</style>