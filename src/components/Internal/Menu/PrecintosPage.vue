
<template>
	<div class="AreaTrabajoPage">

		<div class="vistaStandarList">



			<PanelPrincipal :counters="counters" v-if="incomingData.menuSelected == 1" />

			<SolicitudesPage :counters="counters" v-if="incomingData.menuSelected == 2" />

			<DispositivoPage :counters="counters" v-if="incomingData.menuSelected == 3" />

			<TarifasPage v-if="incomingData.menuSelected == 5" />

			<ClientesPage v-if="incomingData.menuSelected == 6" />

			<UsuariosPage v-if="incomingData.menuSelected == 7" />

			<TransportistaPage v-if="incomingData.menuSelected == 8" />




		</div>


	</div>
</template>


<script setup>

// Refactored Pages
import DispositivoPage from '@/pages/DispositivoPage.vue'
import SolicitudesPage from '@/pages/SolicitudesPage.vue'
import ClientesPage from '@/pages/ClientesPage.vue'
import UsuariosPage from '@/pages/UsuariosPage.vue'
import TransportistaPage from '@/pages/TransportistaPage.vue'
import TarifasPage from '@/pages/TarifasPage.vue'

// Unchanged Pages
import PanelPrincipal from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal.vue'




import { convertirCounters } from '@/components/utils.js'
import { counterCandado } from '@/components/conexion/DataConector.js'


import { ref, onMounted, defineProps } from 'vue'

const incomingData = defineProps(['menuSelected']);




let counters = ref(
	{
		card1: { label: 'card1', value: 0 },
		card2: { label: 'card2', value: 0 },
		card3: { label: 'card3', value: 0 },
		card4: { label: 'card4', value: 0 },
		card5: { label: 'card5', value: 0 }
	})

function consultarCounters() {

	counterCandado("token").then(countersList => {

		if (countersList.success) {


			const st_asn = convertirCounters(countersList.deviceStateStats.groupsStats)

			const baterryQ1 = countersList.deviceStateStats.batteryStat.q1
			const baterryQ2 = countersList.deviceStateStats.batteryStat.q2

			const signalQ1 = countersList.deviceStateStats.gpsSignalStat.q1
			const signalQ2 = countersList.deviceStateStats.gpsSignalStat.q2

			counters.value = {

				card1: { label: 'Stock Candados', value: st_asn.stock },
				card2: { label: 'Asignados', value: st_asn.asignados },
				card3: { label: 'Fuera de Linea', value: countersList.deviceStateStats.offline },
				card4: { label: 'Bateria Baja', value: baterryQ1 + baterryQ2 },
				card5: { label: 'Señal Perdida', value: signalQ1 + signalQ2 }

			}

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


	consultarCounters()
	/*
		if (window.$cookies.isKey('PLAY_SESSION')) {

			console.log("Welcome Back")



		} else {

			console.log("logueate por favor")
			window.location.replace("./");
		}
	*/



});

</script>

<style scoped>
.vistaStandarList {
	width: 100%;
	height: 100%;
	overflow: auto;
}



.AreaTrabajoPage {
	width: auto;
	display: flex;
	flex-direction: column;
	width: 100%;

	/*background-color: pink;*/

}
</style>
