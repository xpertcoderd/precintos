<template>
	<div class="conenido">

		<div class="userInfo">

			<i class="bi bi-chat-dots"></i>
			<i class="bi bi-bell"></i>

			<div class="bola"></div>
			<div class="userInfoText">
				{{ incomingData.userName }}
			</div>
			<span class="bi bi-chevron-down"></span>



		</div>
	</div>


</template>

<script setup>


const incomingData = defineProps(['userName']);
</script>

<style scoped>
.conenido {
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
}

.userInfo {
	/*border-radius: 8px 8px 8px 8px;
	border: solid 1px;
	border-color: #80808030;*/
	padding: 5px;
	display: flex;
	margin-top: 5px;
}

.userInfo i {
	margin-right: 15px;
	color: grey;
	cursor: pointer;
}

.userInfo span {
	font-size: 15px;
	padding-left: 10px;
	margin-top: auto;
	margin-bottom: auto;
	cursor: pointer;
}

.bola {
	background: #57b8ff;
	width: 15px;
	padding: 15px;
	margin: 2px;
	margin-right: 5px;
	border-radius: 15px 15px 15px 15px;
}

.userInfoText {
	font-weight: 600;
	font-size: 10px;
	margin-top: auto;
	margin-bottom: auto;
}
</style>
