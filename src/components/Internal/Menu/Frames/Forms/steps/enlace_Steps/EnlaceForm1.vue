      <template>

        <form @submit.prevent="enviar" class="targetaLogin">

          <div style=" padding:20px;">

            <div class="mainLabelGrey">Usted esta a punto de crear un </div>
            <div class="mainLabel">Enlace</div>

            <div class="row mt-1">

              <div class="col-6">
                <div>
                  <input class="inputsearchBar" v-model="formData.id" maxlength="40" placeholder="Compania" type="text"
                    required>
                </div>
              </div>

              <div class="col-6">
                <div>
                  <input class="inputsearchBar" v-model="formData.container" style=" width: 100%;" maxlength="40"
                    placeholder="Contenedor" type="text" required>
                </div>
              </div>

              <div class="col-12">
                <div>
                  <!--   @change="consultarTarifa" -->

                  <select class="inputsearchBar selectionable" v-model="formData.device">

                    <option :value="null" selected disabled default>Seleccione el Candado</option>

                    <option v-for=" (tracker, index) in incomingData.deviceList" :key="index" :value="tracker">{{
                      tracker.device.label
                      }}</option>

                  </select>


                </div>


                <div>
                  <!--   @change="consultarTarifa" -->

                  <select class="inputsearchBar selectionable" v-model="formData.transportista">

                    <option :value="null" selected disabled default>Seleccione el Transportista</option>

                    <option v-for=" (tracker, index) in incomingData.deviceList" :key="index" :value="tracker">{{
                      tracker.device.label
                      }}</option>

                  </select>


                </div>


                <div>

                  <select class="inputsearchBar selectionable" v-model="formData.driver">

                    <option :value="null" selected disabled default>Seleccione Chofer</option>

                    <option v-for=" (tracker, index) in incomingData.deviceList" :key="index" :value="tracker">{{
                      tracker.device.label
                      }}</option>

                  </select>


                </div>


                <div>

                  <select class="inputsearchBar selectionable" v-model="formData.vehicle">

                    <option :value="null" selected disabled default>Seleccione Vehiculo</option>

                    <option v-for=" (tracker, index) in incomingData.deviceList" :key="index" :value="tracker">{{
                      tracker.device.label
                      }}</option>

                  </select>


                </div>

              </div>

            </div>

          </div>


          <div class="targetaOpen">
            <div style="padding:20px;">


              <div>

                <button @click="outGoingData('cerrar')" type="button" class="btn btn-secundary mybtn"
                  style="  background: grey;   margin-right: 15px;">Cancelar</button>
                <button type="submit" class="btn btn-primary mybtn">Confirmar</button>

              </div>

            </div>

          </div>

        </form>

      </template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const incomingData = defineProps(['containerSelected', 'deviceList']);
const outGoingData = defineEmits(['cerrar'])



const formData = ref(
  {
    id: null,
    container: "hola",
    device: null,
    transportista: null,
    driver: null,
    vehicle: null,
  })



function enviar(){
  console.log(formData.value)
}


onMounted(() => {
  if (incomingData.containerSelected) {
    formData.value.id = incomingData.containerSelected.id || 0
    formData.value.container = incomingData.containerSelected.container || 'init'
  }


});

</script>

<style scoped>
.mainLabelGrey {
  color: grey;
  font-weight: 400;
  font-size: 20px;

}


.mainLabel {
  color: #35c2e3;
  font-weight: 700;
  font-size: 21px;

}


.targetaOpen {
  border-radius: 0px 0px 10px 0px;
  /* height: 100%;*/
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
  justify-content: space-between;
  width: 100%;

  min-width: 400px;
  max-width: 700px;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}

.mybtn {
  background: #56bcda;
  font-weight: 600;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  border: none;
}


.inputsearchBar {

  min-width: 100%;
  padding: 9px;
  box-shadow: 0px 0px 1px 2px rgba(233, 236, 239, 0.8);
  margin-bottom: 8px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.campoSelected {
  border: solid 1px red;
}

.selectionable {
  width: 40px;
  /* Establece un ancho fijo */
  overflow: hidden;
  /* Evita que el contenido desborde */
  text-overflow: ellipsis;
  /* Agrega "..." si el texto es muy largo */
  white-space: nowrap;
  /* Mantiene el texto en una sola línea */
}


option {
  color: grey;
}
</style>
