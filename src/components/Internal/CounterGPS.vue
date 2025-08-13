<template>
	<div class="headerContainer">

		<div class="contendorBlanco">

			<div class="targetasContainerRegistrados targetasContainer">

				<div style="font-weight: 500;">Stock candados</div>
				<div class="count">{{ incomingData.counters.stock }}</div>
				<div>Registrados</div>
			</div>

			<div class="targetasContainer headerContainerAsignados">
				<div class="count" style="margin-top: -10px;">{{ incomingData.counters.asignados }}</div>
				<div>Asignados</div>
			</div>

			<div class="targetasContainer" style="text-align: left; border: none;">


				<div style="margin-bottom: 10px;">
					<span class="statuses bgColorRed">{{ incomingData.statusDevices.offline }}</span>
					<span class="colorRed">Fuera de Linea</span>
				</div>


				<div style="margin-bottom: 10px;">
					<span class="statuses bgColorOrange">N/A</span>
					<span class="colorOrange">IDLE</span>
				</div>

				<div style="margin-bottom: 10px;">

					<span class="statuses bgColorBlue">{{ incomingData.statusDevices.lowBaterry }}</span>
					<span class="colorBlue">Low Battery</span>
				</div>

				<div>
					<span class="statuses bgColorGrey">{{ incomingData.statusDevices.lostSignal }}</span>
					<span class="colorGrey">Senal Perdida</span>
				</div>

			</div>
		</div>

	</div>
</template>

<script setup>
import { defineProps } from 'vue'

const incomingData = defineProps(['counters', 'statusDevices']);

</script>
<style scoped>
.headerContainer {
	/*	width: 100%;*/

	padding: 20px;
	display: flex;
	justify-content: right;

}

.contendorBlanco {
	padding: 20px;
	display: flex;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 12px;
	background-color: white;
}

.targetasContainer {
	min-width: 160px;
	border: solid 1px;
	border-radius: 15px;
	border-color: #80808030;
	padding: 15px;
	margin: 5px;
	text-align: center;
}

.targetasContainerRegistrados {
	color: #606060;
	padding-top: 30px;
	padding-bottom: 30px;
}


.headerContainerAsignados {
	background: #afcb07;
	color: white;

	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: space-around;
	padding-top: 30px;
	padding-bottom: 30px;
}


.centered {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}


.count {
	font-weight: 700;
	font-size: 30px;
}



.targetasContainerRegistrados :nth-last-child(1) {
	color: white;
	background-color: #606060;
	border-radius: 8px;
}


.headerContainerAsignados :nth-last-child(1) {
	color: #afcb07;
	background-color: white;
	border-radius: 8px;
}

.statuses {
	margin-right: 7px;
	font-weight: 700;
	border-radius: 6px;
	color: white;
	padding: 7px;
	padding-top: 1px;
	padding-bottom: 1px;
}


.bgColorRed {
	background-color: #e71a1f;
}

.colorRed {
	color: #e71a1f;
	font-weight: 700;
}


.bgColorOrange {
	background-color: #f5a319;
}

.colorOrange {
	color: #f5a319;
	font-weight: 700;

}

.bgColorBlue {
	background-color: #316fb4;
}

.colorBlue {
	color: #316fb4;
	font-weight: 700;

}

.bgColorGrey {
	background-color: #828282;
}

.colorGrey {
	color: #828282;
	font-weight: 700;
}
</style>