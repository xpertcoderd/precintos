<template>
	<div class="conenido">

		<div class="userInfo">

			<i class="bi bi-chat-dots"></i>
			<i class="bi bi-bell"></i>

			<div class="bola"></div>
			<div class="userInfoText">
				{{ `${user.firstName} ${user.lastName}` }}
			</div>
			<span class="bi bi-chevron-down"></span>



		</div>
	</div>


</template>

<script setup>


import { ref } from 'vue'

import { decodeBase64Token } from '@/components/conexion/DataConector.js'
import Cookies from 'js-cookie';




let user = ref({
	firstName: 'Alba',
	lastName: 'Perez'
})



const token = Cookies.get('userPublicInfo');

//const token=`eyJpZCI6MSwiY2xpZW50SWQiOjEsInJvbElkIjoxLCJmaXJzdE5hbWUiOiJBdXJvcmEiLCJsYXN0TmFtZSI6IlRlY2hub2xvZ2llcyIsImlkY2FyZCI6IjAwMTExMjIzNDU2Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6InJvb3QiLCJzY29wZSI6IioiLCJwZXJtaXNzaW9ucyI6IioifX0=`

//const token=false

if (token) {

	let user_session = decodeBase64Token(token);

	user.value.firstName = user_session.firstName || 'alba'
	user.value.lastName = user_session.lastName || 'perez'

	/*{
		"id": 1,
		"clientId": 1,
		"rolId": 1,
		"firstName": "Aurora",
		"lastName": "Technologies",
		"idcard": "00111223456",
		"role": {
			"id": 1,
			"name": "root",
			"scope": "*",
			"permissions": "*"
		}
	}*/

} else {

	console.error("User info not found in cookies");
	console.log("redirigiendo al Login... ")
	// window.location.replace("./");
}



</script>

<style scoped>
.conenido {
	background-color: white;
	border-bottom: #80808030 solid 1px;
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
	margin-top: auto;
	margin-bottom: auto;
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
