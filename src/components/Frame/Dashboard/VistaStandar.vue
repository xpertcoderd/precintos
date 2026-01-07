<template>
	<div class="vistaStandar">

		<VistaStandarHeader />
		<VistaStandarList @transfer_id="toMapa" :transfers_list="incomingData.fullTransfer" :vista="2" />

	</div>

</template>
<script setup>
import VistaStandarHeader from '@/components/VistaStandarHeader.vue'
import VistaStandarList from '@/components/VistaStandarList.vue'


const incomingData = defineProps(['fullTransfer']);

const outGoingData = defineEmits(['transfer_id']);

function toMapa(transfer_id) {
	outGoingData('transfer_id', transfer_id);
}



</script>
<style scoped>
.vistaStandar {

	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 8px 8px 0px 0px;
}
</style>