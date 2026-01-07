<template>
  <div class="myLogin">

    <div class="contenidoLogin">


      <div class="targeta">

        <div class="videoContainer">

          <video autoplay muted loop id="myVideo" class="Background_Video">
            <source src="@/assets/video/candado2.mp4" type="video/mp4">
          </video>

        </div>




        <!--          <img src="@/components/../assets/icons/candado.png" alt="">
 -->

        <div class="targetaLogin">
          <!--     <i @click="outGoingData('cerrar')" class="bi bi-x-lg exitBtn iconos"></i> -->




          <div style="padding: 10%;">
            <div style="font-weight: 600; color: grey;">Usted esta a punto de abrir un </div>
            <div class="mainLabel">Precinto</div>

            <div class="parrafo">
              <i class="bi bi-check-circle-fill"></i>
              Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn
              renpsn d Lorenpsn d Lorenpsn d Lorenpsn
            </div>

            <span class="subTexto">Serial: </span><span class="subTexto"><strong>{{ serial_(serial_ref)[0]
                }}</strong></span><span class="subTexto" style="color:#66afc8; font-weight: 800">{{
                  serial_(serial_ref)[1] }}</span>


            <div class="row mt-2">
              <div class="col-6">
                <i class="bi bi-calendar-check locationsTitles"> Origen:</i>
                <div class="locationsValues">Causedo</div>
              </div>

              <div class="col-6">
                <i class="bi bi-journal-text locationsTitles"> Destino: </i>
                <div class="locationsValues">Maritima</div>
              </div>

            </div>



          </div>




          <div class="targetaOpen">


            <div class="searchBar rounded-pill">
              <!--         <i class="bi bi-key-fill iconos"></i> -->

              <input v-model="pin" class="inputsearchBar" maxlength="8" placeholder="Codigo de Verificacion" type="text"
                @keyup="onPress">
              <i v-if="wrong" class="bi bi-exclamation-circle icons-error"></i>
            </div>

            <div>

              <button @click="outGoingData('cerrar')" type="button" class="btn btn-secundary mybtn"
                style="  background: grey;   margin-right: 15px;">Cancelar</button>
              <button @click="enviar()" type="button" class="btn btn-primary mybtn">Confirmar</button>

            </div>

          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { serial_ } from '@/components/utils.js'
import { ref } from 'vue';

const outGoingData = defineEmits(
  ['cerrar', 'pin']
)

const pin = ref();
let wrong = ref(false)

const serial_ref = ref(0)



function updateSerialN(serial_number) {

  serial_ref.value = serial_number

}



const onPress = (e) => {
  if (e.key == "Enter") {
    enviar()
    return;
  } else {

    return;
  }
};


function enviar() {

  console.log(pin.value)
  outGoingData('pin', pin.value);

}
defineExpose({ updateSerialN })

</script>

<style scoped>
/*.Background_Video{
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;

}*/

.locationsTitles {
  color: grey;
  font-size: 14px;
}

.locationsValues {
  margin-left: 15px;
  font-weight: 500;
}

.inputsearchBar {
  /* min-width: 55%;*/
  padding: 15px;
  min-width: 75%;
  border-radius: 5px;
  border: none;
  outline: none;
}

.mybtn {
  background: #56bcda;
  font-weight: 600;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  border: none;
}


.parrafo {
  font-size: 14px;
  /*padding: 2%;*/
  color: grey;

  max-width: 17vw;
  word-wrap: break-word;
  /* Opcional: permite cortar palabras largas si no caben */
  text-align: justify;
  line-height: 1;
  /* Aumenta el espacio entre líneas */
  overflow-wrap: break-word;
  /* Alternativa moderna */
  margin: 0;
  margin-right: 15%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.targetaOpen {
  border-radius: 0px 0px 10px 0px;
  height: 110px;
  min-height: 30%;
  padding: 10px;
  padding-left: 10%;
  background: #f5f6f7;

}



.mainLabel {
  color: #66afc8;
  font-weight: 700;
  font-size: 19px;

}

.subTexto {
  font-weight: 600;
  font-size: 15px;
}

.myLogin {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 20;
}

.exitBtn {
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 10px;
  z-index: 21;
  cursor: pointer;
}

.contenidoLogin {
  backdrop-filter: blur(3px);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}

.targeta {
  display: flex;
  background-color: white;
  border-radius: 10px;
  min-width: auto;
}



.videoContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 400px;
  background: black;
  border-radius: 10px 0px 0px 10px;
  box-shadow: -2px 0px 5px 2px rgba(52, 52, 52, 0.4);
}

video {
  /*  width: 100%;*/
  border-radius: 10px 0px 0px 10px;
  max-height: 450px
}

.targetaLogin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 60%;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}

.searchBar {
  padding-top: 5px;
  padding-bottom: 10px;
}

.btAcceder {
  /* min-width: 130px;*/
}

/*.targetaLogin {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 10px 5px rgba(102, 285, 217, 0.9)
}*/

.iconos {
  color: green
}


.icons-error {

  color: red
}

.btAcceder {
  background: orange;
  color: white;
  border: 1px solid grey
}
</style>
