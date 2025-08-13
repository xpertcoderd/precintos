<template>
	<div class="vistaGeneral">

		<div class="rowMenu">

			<div>
				<img class="icons" src="@/components/../assets/icons/bl.svg">
				<span class="titleMapa">Mapa Online </span>
			</div>

			<div class="softBorders">
				<input v-model="search.text" @keyup="onPress" placeholder="Buscar..." type="text" class="textInput">
			</div>

		</div>


		<TablaListMapa @traces="showTrace" :transferBlits="incomingData.transferBlits"
			class="contenedorTablaMapa mt-2" />



	</div>

</template>
<script setup>

import TablaListMapa from '@/components/TablaListMapa.vue'

import { defineProps, defineEmits, ref } from 'vue'

const incomingData = defineProps(['transferBlits', 'transfer_id']);

const outGoingData = defineEmits(
	['buscar', 'traces']
)

let search = ref({
	text: incomingData.transfer_id,
	loading: false,
	isFilter: false
})

function showTrace(blits) {

	outGoingData('traces', blits);

}


const onPress = (e) => {
	if (e.key == "Enter") {
		buscar()
		return;
	} else {

		return;
	}
};

function buscar() {

	if (!search.value.text || search.value.text == " ") {
		console.log("Campos Vacios")

	} else {

		outGoingData('buscar', search.value.text);
		console.log(search.value.text)
	}
}



</script>
<style scoped>
.vistaGeneral {

	display: flex;
	flex-direction: column;
	height: 100%;
	padding-top: 10px;
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