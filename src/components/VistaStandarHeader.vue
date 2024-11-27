<template>
	<div class="vistaStandarHeader">

		<div class="rowMenu" style="min-width: 30%;">
			<div>
				<img class="icons" src="../assets/icons/bl.svg">

				<strong>BL</strong><span style="font-size: 12px;">(Bill of Lading)</span>
			</div>

			<div class="softBorders d-none">
				<i class="bi bi-sliders filter"> Filtros</i>

			</div>

		</div>

		<div class="rowMenu">

			<div class="softBorders">
				<input placeholder="BL" type="text" class="textInput">
			</div>

			<div class="softBorders">
				<input placeholder="Contenedor" type="text" class="textInput">

			</div>




			<select class="dateSelector" style="outline: none">
				<option value="ultima">{{ "Estatus" }}</option>
				<option value="ultima">{{ "Otro Estatus" }}</option>
			</select>

		</div>

	</div>
</template>
<script setup>

</script>
<style scoped>
.vistaStandarHeader {

	display: flex;
	justify-content: space-between;
	border-radius: 8px 8px 0px 0px;
	border-top: solid 1px;
	border-left: solid 1px;
	border-right: solid 1px;

	border-color: #80808030;
	background-color: white;
	padding: 10px;
	padding-top: 20px;

}


.dateSelector {
	background-color: white;
	color: #cacaca;
	cursor: pointer;
	font-weight: 700;
	padding: 10px;
	padding-top: 4px;
	padding-bottom: 4px;
	border-radius: 7px 7px 7px 7px;
	border-color: #80808030;

}

.softBorders {
	margin-right: 20px;
	border: solid 1px;
	border-color: #80808030;
	border-radius: 7px 7px 7px 7px;
}



.filter {
	padding-left: 15px;
	padding-right: 15px;
	cursor: pointer;
	color: #cacaca;
}

.textInput {
	margin-left: 5px;
	background-color: transparent;
	color: grey;
	/*color: #cacaca;*/
	outline: none;
	width: 100%;
	border: none
}

.icons {
	width: 27px;
	border: solid 1px;
	border-color: #80808030;
	padding: 2px;
	margin-right: 5px;
	margin-left: 4px;
	border-radius: 6px 6px 6px 6px;
}


.rowMenu {
	display: flex;
	justify-content: space-between;
}
</style>