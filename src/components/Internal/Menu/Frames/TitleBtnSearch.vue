<template>
	<div class="headerContainer">

		<div class="flex justify-content-around">
      <img style="display: inline" class="icons" src="@/assets/icons/bl.svg">
			<span class="text-lg font-bold mt-1 mx-2">{{ incomingData.title }}</span>
			<span style="font-size: 12px;">{{ incomingData.subtitle }}</span>

			<button v-if="!incomingData.right" @click="outGoingData('functionBtn')"
				type="button" class="ml-2 px-4 py-2 rounded-lg bg-custom-blue text-sm text-white font-semibold shadow hover:bg-sky-600 transition">{{ incomingData.btnTitle }}</button>
		</div>



		<div>
			<button v-if="incomingData.right" @click="outGoingData('functionBtn')" style="margin-right: 20px"
				type="button" class="btn btn-primary mybtn">{{ incomingData.btnTitle }}</button>

			<input v-model="searchText" class="inputsearchBar" maxlength="8" placeholder="Search ..." type="text"
				@keyup="onPress">

		</div>



	</div>
</template>
<script setup>
import { ref } from 'vue';


const incomingData = defineProps(['title', 'subtitle', 'btnTitle', 'right']);

const outGoingData = defineEmits(['functionBtn', 'search'])

let searchText = ref("")

const onPress = (e) => {
	if (e.key == "Enter") {
		enviar()
		return;
	} else {

		return;
	}
};


function enviar() {

	outGoingData('search', searchText.value);

}

</script>
<style scoped>
.headerContainer {

	display: flex;
	justify-content: space-between;

	border-radius: 8px 8px 0px 0px;
	border-top: solid 1px;
	border-left: solid 1px;
	border-right: solid 1px;

	border-color: #80808030;
	background-color: white;
	padding: 15px;
	padding-bottom: 0px;

}


.mybtn {
	background: #56bcda;
	font-weight: 600;
	padding-left: 20px;
	padding-right: 20px;
	height: 100%;
	padding-left: 15px;
	padding-right: 15px;
	border-radius: 7px;
	color: white;
	border: none;
}

.inputsearchBar {
	padding: 5px;
	border-radius: 7px;
	border-color: #80808030;
	outline: none;
}

.icons {
	width: 27px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	margin-right: 5px;
	margin-left: 4px;
	border-radius: 6px;
}
</style>
