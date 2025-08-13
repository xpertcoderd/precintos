<template>
	<div class="vistaGeneral">

		<TablaListMapa @traces="showTrace" :transferBlits="incomingData.transferBlits" class="contenedorTablaMapa" />



	</div>

</template>
<script setup>

import TablaListMapa from '@/components/TablaListMapa.vue'

import { defineProps, defineEmits } from 'vue'

const incomingData = defineProps(['transferBlits', 'transfer_id']);

const outGoingData = defineEmits(
	['traces']
)


function showTrace(blits) {

	outGoingData('traces', blits);

}


</script>
<style scoped>
.vistaGeneral {


	display: flex;
	flex-direction: column;
	height: 100%;
}

.titleMapa {
	font-weight: 700;
	padding-left: 5px;
	width: 100%;
}

.icons {
	width: 27px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	padding-left: 0px;
	border-radius: 6px 6px 6px 6px;
}

.rowMenu {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	margin-left: auto;
	/*justify-content: space-around;*/
}

.softBorders {
	width: 45%;
	border: solid 1px;
	height: 30px;
	margin-left: 5px;
	border-color: #80808030;
	border-radius: 7px 7px 7px 7px;
}

.textInput {
	margin-left: 5px;
	background-color: transparent;
	height: 22px;
	color: grey;
	/*color: #cacaca;*/
	outline: none;
	width: auto;
	border: none
}

.contenedorTablaMapa {
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>