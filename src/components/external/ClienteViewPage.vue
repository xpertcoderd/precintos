<template>
	<div class="windows_Page">
		<div class="DashBoardPage">

			<!-- 		<NewMenu :logined="logined" @logout="logout" :LegalName="transferList.client.name" @vista="changeVista"
			style=" width:15%;" ref="menuRef" /> -->

			<MenuClient :logined="logined" :LegalName="transferList.client.name" :isLoguer="true" @vista="changeVista"
				@logout="logout" style=" width:15%;" ref="menuRef" />


			<DashboardPage :logined="logined" @fromTo="filtrarBusqueda" @datePicker="updateAll"
				:totalContainers="contenedoresCount" :counters="counters" :transferList="transferList.fullTransfer"
				@transfer_id="changeIndiceMapa" style=" width: 100%;" v-if="vistaSelected == 1" />

			<NewDashboardPage :logined="logined" @fromTo="filtrarBusqueda" @datePicker="updateAll"
				:totalContainers="contenedoresCount" :counters="counters" :transferList="transferList.fullTransfer"
				@transfer_id="changeIndiceMapa" style=" width: 100%;" v-if="vistaSelected == 2" />



			<VistaMapaPage :logined="logined" :countersGeneral="countersGeneral" :transfer_id="transfer_id_selected"
				style=" width: 100%;" v-if="vistaSelected == 3" />
			<HistorialPage style=" width: 100%;" v-if="vistaSelected == 4" />

		</div>

	</div>

</template>

<script>
import { ref, onMounted } from 'vue'

import DashboardPage from '@/components/external/frames/DashboardPage.vue'

import NewDashboardPage from '@/components/external/frames/NewDashboardPage.vue'


//import DashboardPage from '@/components/Menu/DashboardPage.vue'
import VistaMapaPage from '@/components/Menu/VistaMapaPage.vue'
import HistorialPage from '@/components/Menu/HistorialPage.vue'

//import NewMenu from '@/components/NewMenu.vue'

import MenuClient from '@/components/external/components/MenuClient.vue'

import { transfers_list, transfers_listFrame, transfers_listRange, counterGeneral, counterGeneralFrame, counterGeneralRange } from '@/components/conexion/DataConector.js'
//import { transfers_list, counterGeneral, transfers_listFrame, counterGeneralFrame  } from '@/components/conexion/DataConectorTest.js'

import { convertirStatus } from '@/components/utils.js' //

import { useRoute } from 'vue-router';


export default {
	props: [],

	components: {
		DashboardPage,
		VistaMapaPage,
		HistorialPage,
		NewDashboardPage,
		/*		NewMenu,*/
		MenuClient
	},
	setup() { //props

		let vistaSelected = ref(1);


		let contenedoresCount = ref({ count: 0, date: '1/10/2024; 00:00PM' });

		const menuRef = ref(null)

		let transfer_id_selected = ref(0)

		let transferList = ref({
			client: {
				name: "Loading... "
			},

			fullTransfer: []

		});

		const logined = ref(true);

		const route = useRoute();


		let counters = ref(
			{
				card1: { label: 'card1', value: 0 },
				card2: { label: 'card2', value: 0 },
				card3: { label: 'card3', value: 0 },
				card4: { label: 'card4', value: 0 },
				card5: { label: 'card5', value: 0 }
			}
		)


		let countersGeneral = ref({
			linked: 0,
			in_transit: 0,
			done: 0,
			canceled: 0,
			expired: 0,
			start_end_error: 0
		})




		function changeVista(vista_Selected) {
			/*console.log(vista_Selected)*/
			vistaSelected.value = vista_Selected
		}

		function logout() {
			try {
				// setTimeout(()=>{
				window.$cookies.remove('authorized')
				window.location.replace("./precintos");
				//window.location.reload();
				// },2000)
			}
			catch (error) {
				console.log(error)
			}
		}


		function filtrarBusqueda(from, to) {

			const hash = route.params.hash

			transfers_listRange(hash, from, to).then(result => {

				if (result.success) {

					transferList.value.fullTransfer = result.data.transfers;
				} else if (result.note) {

					transferList.value.fullTransfer = []

				} else {
					console.log(result)
				}
			}).catch(error => {
				console.log(error)
				console.log("Error al Hacer La peticion")
			})

				.finally(() => {

					counterGeneralRange(hash, from, to).then(result2 => {

						if (result2.success) {
							countersGeneral.value = convertirStatus(result2.states)

							console.log(convertirStatus(result2.states))


							if (result2.states.length === 0) {
								console.log("no hay cuenta")
								contenedoresCount.value.count = 0;

							} else {
								let tempCounters = 0
								result2.states.forEach(elemCount => {
									tempCounters = tempCounters + elemCount.count

								})

								contenedoresCount.value.count = tempCounters;

								tempCounters = 0;

							}



						} else if (result2.note) {
							countersGeneral.value = convertirStatus([])

							contenedoresCount.value.count = 0;
						} else {
							console.log("error desconocido")
						}
					}).catch(error2 => {
						console.log(error2)
						console.log("Error al Hacer La peticion")
					});

				});
		}


		function updateAll(modo) {

			const hash = route.params.hash

			contenedoresCount.value.date = new Date().toLocaleString();

			if (modo == 1) {

				transfers_listFrame(hash).then(result => {

					if (result.success) {


										transferList.value.fullTransfer = result.data.transfers;

					} else if (result.note) {

						transferList.value.fullTransfer = []

					} else {
						console.log(result)
					}
				}).catch(error => {
					console.log(error)
					console.log("Error al Hacer La peticion")
				})

					.finally(() => {

						counterGeneralFrame(hash).then(result2 => {

							if (result2.success) {

								countersGeneral.value = convertirStatus(result2.states)
								counters.value = {
									card1: { label: 'Enlazados ', value: convertirStatus(result2.states).linked },
									card2: { label: 'En Transito ', value: convertirStatus(result2.states).in_transit },
									card3: { label: 'Completados ', value: convertirStatus(result2.states).done },
									card4: { label: 'Expirados ', value: convertirStatus(result2.states).expired },
									card5: { label: 'Ubicaciones Erroneas ', value: convertirStatus(result2.states).start_end_error }
								}






								if (result2.states.length === 0) {
									console.log("no hay cuenta")
									contenedoresCount.value.count = 0;

								} else {
									let tempCounters = 0
									result2.states.forEach(elemCount => {
										tempCounters = tempCounters + elemCount.count

									})

									contenedoresCount.value.count = tempCounters;

									tempCounters = 0;

								}



							} else if (result2.note) {
								countersGeneral.value = convertirStatus([])

								contenedoresCount.value.count = 0;
							} else {
								console.log("error desconocido")
							}
						}).catch(error2 => {
							console.log(error2)
							console.log("Error al Hacer La peticion")
						});

					});

			}
			else if (modo == 2) {

				transfers_list(hash).then(result => {

					if (result.success) {


										transferList.value.fullTransfer = result.data.transfers;

					} else {
						console.log(result)
					}
				}).catch(error => {
					console.log(error)
					console.log("Error al Hacer La peticion")
				})

					.finally(() => {

						counterGeneral(hash).then(result2 => {

							if (result2.success) {
								countersGeneral.value = convertirStatus(result2.states)

								counters.value = {
									card1: { label: 'Enlazados ', value: convertirStatus(result2.states).linked },
									card2: { label: 'En Transito ', value: convertirStatus(result2.states).in_transit },
									card3: { label: 'Completados ', value: convertirStatus(result2.states).done },
									card4: { label: 'Expirados ', value: convertirStatus(result2.states).expired },
									card5: { label: 'Ubicaciones Erroneas ', value: convertirStatus(result2.states).start_end_error }
								}

								if (result2.states.length === 0) {
									console.log("no hay cuenta")
									contenedoresCount.value.count = 0;

								} else {
									let tempCounters = 0
									result2.states.forEach(elemCount => {
										tempCounters = tempCounters + elemCount.count

									})

									contenedoresCount.value.count = tempCounters;

									tempCounters = 0;

								}








							} else if (result2.note) {
								countersGeneral.value = convertirStatus([])
								contenedoresCount.value.count = 0;
							}

							else {

								console.log(result2)
							}
						}).catch(error2 => {
							console.log(error2)
							console.log("Error al Hacer La peticion")
						});

					});

			} else {
				console.log("a filtrar por calendario")
			}



		}

		function changeIndiceMapa(transfer_id) {

			vistaSelected.value = 3;
			menuRef.value.updateView(3)
			transfer_id_selected.value = transfer_id
		}

		/*console.log(props)*/

		onMounted(() => {
			if (window.$cookies.isKey('authorized')) {
				logined.value = true;
				console.log("Welcome Back");
			} else {
				logined.value = true; // va false por defecto
				console.log("usuario invitado");
			}
			updateAll(1);
		});



		return {
			DashboardPage, HistorialPage,
			MenuClient, changeVista,
			VistaMapaPage, vistaSelected,
			transferList, transfer_id_selected,
			changeIndiceMapa, countersGeneral, counters,
			menuRef, updateAll, contenedoresCount, filtrarBusqueda,
			logined, logout
		}

	}

}


</script>

<style scoped>
.windows_Page {
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

}

.DashBoardPage {
	/*	height: 90%;*/
	width: 100%;
	height: 100%;
	display: flex;

}

#resizeElement {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	width: 380px;
	/* Valor inicial */
	min-width: 380px;
	max-width: 850px;
	background-color: var(--lista-fondo);
	box-shadow: rgba(0, 0, 0, 0.49) 8px 10px 15px 0px;
	transition: width 0.1s;
	/* Transición suave para el cambio de ancho */
	/* Sin cursor aquí */
}

#resizeHandle {
	position: absolute;
	top: 0;
	right: 0;
	width: 10px;
	/* Ancho del área del cursor */
	height: 100%;
	cursor: ew-resize;
	/* Cursor para indicar redimensionamiento horizontal */
	background-color: rgba(0, 0, 0, 0);
	/* Puede ser transparente o del color de fondo */
}
</style>