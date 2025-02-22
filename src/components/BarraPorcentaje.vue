<template>

	<div style="background-color: white;" class="progress " role="progressbar" aria-label="Example with label"
		aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">

		<div class="progress-bar progress-bar-striped progress-bar-animated"
			:style="{ width: incomingData.porcentaje + '%' }">{{ incomingData.porcentaje + "%" }}</div>
	</div>

</template>

<script setup>
import { defineProps } from 'vue' //defineEmits
const incomingData = defineProps(['porcentaje']);
//const outGoingData = defineEmits(['traces'])
</script>