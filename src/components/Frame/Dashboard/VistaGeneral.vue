<template>
	<div class="vistaGeneral">

		<VistaGeneralList @transfer_id="toMapa" :totalContenedores="props.contenedoresCount"
			:counterTransferLnk="counters" @contarStatus="contarEstados" @indice="changeIndice"
			:incomingData="props.incomingData" class="contendorTabla" />
		<TablaVistaGeneral :indice="indiceSelected" :incomingData="props.incomingData" />

	</div>

</template>
<script>
import VistaGeneralList from '@/components/VistaGeneralList.vue'
import TablaVistaGeneral from './TablaVistaGeneral.vue'

import { convertirStatus } from '@/components/utils.js' //traducir_estatus  

import { ref } from 'vue';




export default {
	emits: ['transfer_id'],
	props: ['incomingData', 'contenedoresCount'],

	components: {
		VistaGeneralList,
		TablaVistaGeneral,

	},
	setup(props, { emit }) {

		let indiceSelected = ref(0)

		let counters = ref({
			linked: 0,
			in_transit: 0,
			done: 0,
			canceled: 0,
			expired: 0,
			start_end_error: 0
		})

		function toMapa(transfer_id) {
			emit('transfer_id', transfer_id);
		}

		function changeIndice(indice_Selected) {

			indiceSelected.value = indice_Selected
		}

		function contarEstados(tranfer_id) {


			if (props.incomingData.length === 0) {
				console.log("Error Fatal vacio");

				counters.value = convertirStatus()

			} else {
				let resultado = props.incomingData.filter(item => item.transfer.id === tranfer_id)


				let tempStatus = {
					linked: 0,
					in_transit: 0,
					done: 0,
					canceled: 0,
					expired: 0,
					start_end_error: 0
				}


				resultado[0].transferLnk.forEach(elem => {

					if (elem.currentState == 1) {
						tempStatus.linked++
					}
					if (elem.currentState == 2) {
						tempStatus.in_transit++
					}
					if (elem.currentState == 3) {
						tempStatus.done++
					}
					if (elem.currentState == 4) {
						tempStatus.canceled++
					}
					if (elem.currentState == 5) {
						tempStatus.expired++
					}
					if (elem.currentState == 6) {
						tempStatus.start_end_error++
					}

				})

				counters.value = tempStatus

				tempStatus = {
					linked: 0,
					in_transit: 0,
					done: 0,
					canceled: 0,
					expired: 0,
					start_end_error: 0
				}
			}

		}

		return { indiceSelected, changeIndice, props, counters, contarEstados, toMapa }
	},
	mounted() {

		//console.log(this.props.incomingData)



	}

}


</script>
<style scoped>
.vistaGeneral {

	display: flex;
	flex-direction: column;
	height: 100%;
}

.contendorTabla {
	padding-left: 10px;
	height: auto;
}
</style>