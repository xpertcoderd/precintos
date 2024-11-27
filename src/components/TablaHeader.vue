<template>
	<div class="rowMenu"> <!-- columnaName -->

		<div>
			<img class="icons" src="../assets/icons/contenedor.svg">

			<span class="titlePop">Contenedores</span>


			<button @click="outGoingData('openLock')" v-if="incomingData.btn" type="button"
				:class="{ 'disabled': !incomingData.btnEnable }" class="btn btn-primary mybtn">Abrir Candado</button>


		</div>


		<div class="rowMenu">
			<div class="softBorders">
				<input v-model="search.text" @keyup="onPress" placeholder="Buscar..." type="text" class="textInput">
			</div>

			<SelectOption v-if="incomingData.filtro" :filtro="incomingData.filtro" @filtrarBy="filtrarBy" />
			<SelectOption v-else :filtro="defaultFilter" @filtrarBy="filtrarBy" />



		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import SelectOption from '@/components/SelectOption.vue'

const incomingData = defineProps(['btn', 'btnEnable', 'filtro']);
const outGoingData = defineEmits(['openLock', 'buscar', 'buscarisEmpty', 'searchMode']);

let defaultFilter = {
	Label1: "Label1",
	Label2: "label2",
	Label3: "label3"
}

let search = ref({
	text: "",
	loading: false,
	isFilter: false
})

function filtrarBy(filtroSelected) {
	console.log(filtroSelected)
	outGoingData('searchMode', filtroSelected)

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
		outGoingData('buscarisEmpty')

	} else {

		outGoingData('buscar', search.value.text);
		//console.log(search.value.text)
	}
}


</script>

<style scoped>
.rowMenu {
	display: flex;
	justify-content: space-between;
	padding-bottom: 5px;
}


.softBorders {
	margin-right: 10px;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 7px 7px 7px 7px;
}


.textInput {
	margin-left: 5px;
	background-color: transparent;
	color: grey;
	height: 100%;
	/*color: #cacaca;*/
	outline: none;
	width: 100%;
	border: none
}



.icons {
	width: 25px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	border-radius: 6px 6px 6px 6px;
}

.mybtn {
	background: #56bcda;
	font-weight: 700;
	color: white;
	margin-left: 10px;
	border: none;
}




.titlePop {
	padding: 2px;
	padding-left: 4px;
	font-size: 14px;
	font-weight: 600;
}

.columnaName {
	position: sticky;
	top: 0px;

}



/*  scrollbar stiyles width */

::-webkit-scrollbar {
	width: 10px;
}

/* scrollbar stiyles Handle */
::-webkit-scrollbar-thumb {
	background-color: #66b9d9;
	border-radius: 10px;
}
</style>