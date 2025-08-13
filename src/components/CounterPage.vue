<template>

	<!-- 	v-show="showingCounter" -->

	<div id="collapseOne" class="contenedor collapse show">

		<div class="targeticasContainer">


			<div class="targeticas">



				<div class="headerContainer">

					<div class="checkColor">

						<!-- bi bi-square -->
						<!-- @click="change('progIschecked')"  -->
						<!-- 						<i :class="{ 'bi bi-check-square-fill': keys.progIschecked, 'bi bi-square-fill':!keys.progIschecked}" :style="{ color: getStatus(4).color, cursor: 'pointer'}">							
						</i> -->
						<img class="icons" src="../assets/icons/enlace.svg">

					</div>

					<div class="title">{{ "Enlazados" }} <i class="bi bi-info-circle infoIcon"></i></div>

					<!-- sumarCounters([countList.inTime, countList.warning, countList.overdue]) -->

					<div class="labelCounter">{{ incomingData.countersGeneral.linked }}
						<!-- <sub>{{ '/' + (countList.total || 0)}} </sub> -->

					</div>


				</div>

				<!-- 	<div class="comentario">+30 Desde la Ultima Semana</div> -->





			</div>



		</div>

		<div class="targeticasContainer">


			<div class="targeticas">



				<div class="headerContainer">

					<div class="checkColor">
						<!--  @click="change('pendIschecked')"  -->
						<img class="icons" src="../assets/icons/transito.svg">

					</div>

					<!-- getStatus(1).label -->

					<div class="title">{{ "En Transito" }} <i class="bi bi-info-circle infoIcon"></i></div>

					<!-- (countList.pending || 0)  -->

					<div class="labelCounter">{{ incomingData.countersGeneral.in_transit }}
						<!-- <sub>{{ '/' + (countList.total || 0)}} </sub> -->

					</div>


				</div>

				<!-- 				<div class="comentario">+30 Desde la Ultima Semana</div> -->





			</div>



		</div>
		<div class="targeticasContainer">


			<div class="targeticas">

				<!-- :style="{ borderColor: getStatus(3).color }" -->



				<div class="headerContainer">

					<div class="checkColor">
						<!--  @click="change('checkIschecked')" -->
						<img class="icons" src="../assets/icons/complete.svg">


					</div>

					<div class="title">{{ "Completados" }} <i class="bi bi-info-circle infoIcon"></i></div>
					<!-- countList.checkin-->
					<!-- 					sumarCounters([countList.preCheckin, countList.lateCheckin]) -->
					<div class="labelCounter">{{ incomingData.countersGeneral.done }}
						<!-- 						<sub>{{ '/' + (countList.total || 0)}} </sub> -->

					</div>


				</div>

				<!-- 				<div class="comentario">+30 Desde la Ultima Semana</div> -->





			</div>



		</div>
		<div class="targeticasContainer">


			<div class="targeticas">



				<div class="headerContainer">

					<div class="checkColor">
						<!-- @click="change('cancelIschecked')" -->


						<!-- 	border-color: #80808030; -->

						<img class="icons" src="../assets/icons/expired.svg">






						<!-- 						<i  :class="{ 'bi bi-check-square-fill': keys.cancelIschecked, 'bi bi-square-fill':!keys.cancelIschecked}" :style="{ color: getStatus(10).color, cursor: 'pointer' }" >
							
						</i> -->

					</div>

					<div class="title">{{ "Expirados" }} <i class="bi bi-info-circle infoIcon"></i></div>
					<!-- sumarCounters([countList.expired, countList.cancelled]) -->
					<div class="labelCounter">{{ incomingData.countersGeneral.expired }}
						<!-- 	<sub>{{ '/' + (countList.total  || 0)}} </sub> -->

					</div>


				</div>

				<!-- <div class="comentario">+30 Desde la Ultima Semana</div> -->





			</div>



		</div>
		<div class="targeticasContainer">


			<div class="targeticas">



				<div class="headerContainer">

					<div class="checkColor">
						<!--  @click="change('doneIschecked')" -->
						<img class="icons" src="../assets/icons/canceled.svg">


					</div>

					<div class="title">{{ "Ubicaciones Erroneas" }} <i class="bi bi-info-circle infoIcon"></i></div>
					<!-- 					sumarCounters([countList.doneInTime, countList.doneLate]) -->
					<div class="labelCounter">{{ incomingData.countersGeneral.start_end_error }}
						<!-- <sub>{{ '/' + (countList.total || 0)}} </sub> -->

					</div>


				</div>

				<!-- <div class="comentario">+30 Desde la Ultima Semana</div> -->





			</div>



		</div>


	</div>




	<i data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
		class="bi bi-arrow-down-right-square mb-1 text-right"
		style="color:#66b9d9; cursor: pointer; padding-right: 10px;"></i>


</template>

<script setup>


import { defineProps } from 'vue' //defineEmits, defineProps 

const incomingData = defineProps(['countersGeneral']);

</script>

<style scoped>
/*@import url('./styles/counters.css');*/



.contenedor {
	/*	background: red;*/
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;
}

.targeticasContainer {

	width: 20%;
	height: auto;
	padding: 20px;
	padding-bottom: 0px;

}

.targeticas {
	padding: 15px;
	background-color: white;
	min-height: 90px;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 10px 10px 10px 10px;
}

.infoIcon {
	font-size: 10px;
	cursor: pointer
}


.labelCounter {
	font-size: 29px;
	padding-top: 0px;
	font-weight: 600;
}

.headerContainer {

	position: relative;
	/*	border-left: solid 6px;
*/
	padding-left: 10px;
	border-color: #80808030;

}

.icons {
	width: 27px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	border-radius: 6px 6px 6px 6px;
}

.title {

	font-size: 14px;
	font-weight: bold;
	color: #adaeb2;
}

.checkColor {
	font-size: 25px;
	position: absolute;
	right: 0px;
	top: -10px;

}

.comentario {
	font-size: 10px;
	padding-top: 5px;
	color: #adaeb2;
}
</style>