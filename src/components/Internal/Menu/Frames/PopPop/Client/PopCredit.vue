<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">


        <div class="creditIMG">
        </div>


        <div class="targetaLogin">
          <TitleParrafHeader3 :titulo="headerForm.titulo" :parrafo="headerForm.parrafo" />


          <div class="targetaOpen">

            <CreditForm1 :client="incomingData.client" @cerrar="close" style="min-height: 440px;" />

          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineProps, defineExpose, defineEmits } from 'vue'; //defineProps ref onMounted defineEmits


import CreditForm1 from '@/components/Internal/Menu/Frames/Forms/steps/credit_steps/CreditForm1.vue'


import TitleParrafHeader3 from '@/components/Internal/Menu/Frames/TitleParrafHeader3.vue'


const headerForm = ref({

  titulo: "Asignacion de Credito",
  parrafo: " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "

})


const incomingData = defineProps(['client']);

const outGoingData = defineEmits(
  ['cerrar']
)



function close() {

  outGoingData('cerrar')
}




defineExpose({})

</script>

<style scoped>
.popContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 20;
}

.areaContent {
  backdrop-filter: blur(3px);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}


.targeta {
  display: flex;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: -2px 0px 5px 2px rgba(52, 52, 52, 0.4);
}

/*.videoContainer {
  height: 100%;
  background-color: blue !important;
  border-radius: 10px 0px 0px 10px;
  background: blue;
}
*/


.creditIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/creditImg.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: -60px center;
  /* Mueve la imagen 40px desde el borde izquierdo */
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}





.fondoIMG {

  /* max-height: 470px;*/
  height: 100%;
  max-width: 400px;



  object-fit: cover;
  /* Ajusta la imagen para cubrir el contenedor */
  object-position: center;
  /* Centra la imagen dentro del contenedor */
}


.parrafo {
  user-select: none;
  font-size: 14px;
  /*padding: 2%;*/
  color: grey;

  max-width: 80%;

  word-wrap: break-word;
  /* Opcional: permite cortar palabras largas si no caben */
  text-align: justify;
  line-height: 1;
  overflow-wrap: break-word;
  margin: 0;
}

.targetaOpen {
  border-radius: 0px 0px 10px 0px;
  height: 100%;
  padding-left: 25px;
  background: #f5f6f7;

}

img {
  /*  width: 100%;*/
  border-radius: 10px 0px 0px 10px;
  background-color: blue
}






.targetaLogin {
  display: flex;
  flex-direction: column;
  /*  justify-content: space-between;
  min-width: 60%;*/
  width: 100%;
  max-width: 600px;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}
</style>
