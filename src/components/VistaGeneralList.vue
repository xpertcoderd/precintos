<template>

	<div class="VistaGeneralList">

		<div class="rowMenu" style="height: 36vh">

			<div class="contenedorLeft">
				<div style="height: 10%; background: white;">


					<div class="rowMenu" style="padding-top: 8px;"> <!-- columnaName -->

						<div>
							<img class="icons" src="../assets/icons/bl.svg">
							<strong> BL</strong><span style="font-size: 12px;">(Bill of Lading)</span>
						</div>

						<div class="softBorders">
							<i class="bi bi-sliders filter"> Filtros</i>
						</div>
					</div>

				</div>

				<VistaStandarList @transfer_id="toMapa" @indice="cambiarIndice" @contarStatus="contarEstados"
					:transfers_list="incomingData.incomingData" :vista="1" style="border: none; height: 90%;" />


			</div>

			<div class="contenedorRigth">

				<div class="text-right mb-1">{{ incomingData.totalContenedores.date }}</div>
				<div class="cuadro">

					<div class="row" style="height: 100%;">

						<div class="col cuadroImagen">
							<img class="imagen" style="" height="100" src="../assets/camionAzul.svg">

						</div>




						<div class="col cuadroTexto">

							<div class="text-center">

								<div class="cuadroTextoTitle">Contenedores</div>
								<div class="cuadroTextoValue">{{ incomingData.totalContenedores.count }}</div>

							</div>



						</div>

					</div>

				</div>


				<div class="row text-center">
					<div class="col borderRight">
						<div>
							<img class="imagen" style="" height="100" src="../assets/carga.png">

						</div>
					</div>
					<div class="col borderRight">
						<div>
							<div>Enlazado</div>
							<div class="statusValue">{{ incomingData.counterTransferLnk.linked }}</div>

						</div>
					</div>

					<div class="col borderRight">
						<div>
							<div>Transito</div>
							<div class="statusValue">{{ incomingData.counterTransferLnk.in_transit }}</div>

						</div>
					</div>

					<div class="col borderRight">
						<div>
							<div>Completado</div>
							<div class="statusValue">{{ incomingData.counterTransferLnk.done }}</div>

						</div>
					</div>
					<div class="col borderRight">
						<div>
							<div>Expirado</div>
							<div class="statusValue">{{ incomingData.counterTransferLnk.expired }}</div>

						</div>
					</div>
					<div class="col borderRight">
						<div>
							<div>UBI ER</div>
							<div class="statusValue">{{ incomingData.counterTransferLnk.start_end_error }}</div>

						</div>
					</div>


				</div>

			</div>

		</div>

	</div>

</template>

<script setup>
import VistaStandarList from '@/components/VistaStandarList.vue'

import { defineEmits, defineProps } from 'vue'; //ref

const incomingData = defineProps(['incomingData', 'counterTransferLnk', 'totalContenedores']);

const outGoingData = defineEmits(
	['indice', 'contarStatus', 'transfer_id']
)

function toMapa(transfer_id) {

	outGoingData('transfer_id', transfer_id);
}



function cambiarIndice(indice_selected) {
	outGoingData('indice', indice_selected);
}

function contarEstados(transfer_id) {
	outGoingData('contarStatus', transfer_id)
}



</script>

<style scoped>
.VistaGeneralList {
	border-radius: 8px;
	border: solid 1px;
	border-color: #80808030;
	margin-bottom: 10px;
	background-color: white;
}

.rowMenu {
	display: flex;
	justify-content: space-between;
	/*padding-bottom: 5px;*/
}


.softBorders {
	margin-right: 20px;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 7px 7px 7px 7px;
}


.titlePop {
	padding: 2px;
	padding-left: 4px;
	font-size: 14px;
	font-weight: 600;
}

.icons {
	width: 25px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	border-radius: 6px 6px 6px 6px;
}

.filter {
	padding-left: 15px;
	padding-right: 15px;
	cursor: pointer;
	color: #cacaca;
}

.cuadro {

	border-radius: 8px;
	border: solid 1px;
	height: 70%;
	position: relative;
	border-color: #80808030;
}

.contenedorRigth {
	padding: 15px;
	width: 43%;
}

.cuadroImagen {
	display: flex;
	padding-left: 5%;
	/*justify-content: center;*/
	/*align-items: center;*/
	height: 100%;


}


.cuadroTexto {
	margin-top: auto;
	margin-bottom: auto;

	display: flex
		/* Ocupa todo el espacio disponible */
}

.cuadroTextoTitle {
	font-size: 30px;

}

.cuadroTextoValue {
	font-size: 40px;
	font-weight: 600;
}


.imagen {
	max-width: 50%;
	height: auto;
}

.borderRight {
	margin-top: 8px;
	border-right: solid 1px;
	border-color: #80808030;

	height: 40px;
}

.statusValue {
	font-weight: 600;
}

.borderRightLast {
	margin-top: 5px;
	height: 40px;
}

.contenedorLeft {
	min-width: 45%;
	background-color: blue;
}
</style>