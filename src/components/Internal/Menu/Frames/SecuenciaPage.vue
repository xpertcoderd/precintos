<template>

    <div class="pageContainer">

        <div v-if="incomingData.level == 1 && !special">

            <div class="bolasContainer">


                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">1</span>
                </div>

                <div class="bola">
                    <span class="bolaText ">2</span>
                </div>

                <div class="bola ">
                    <span class="bolaText ">3</span>
                </div>

            </div>


        </div>

        <div v-if="incomingData.level == 2 && special">

            <div class="bolasContainer">


                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">1</span>
                </div>

                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">2</span>
                </div>

            </div>

        </div>



        <div v-if="incomingData.level == 2 && !special">

            <div class="bolasContainer">


                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">1</span>
                </div>

                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">2</span>
                </div>

                <div class="bola">
                    <span class="bolaText">3</span>
                </div>

            </div>

        </div>




        <div v-if="incomingData.level == 3 && !special">

            <div class="bolasContainer">

                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">1</span>
                </div>

                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">2</span>
                </div>

                <div class="bola bolaSelected">
                    <span class="bolaText bolaTextSelected">3</span>
                </div>

            </div>



        </div>


    </div>


</template>

<script setup>

import { ref, defineProps, defineExpose } from 'vue';

const incomingData = defineProps(['level']);

const special = ref(false)


function changeSpecial(value) {

    special.value = value

}



defineExpose({ changeSpecial })

</script>

<style scoped>
.pageContainer {
    width: 100%;
}

.bolasContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 5%;
}


.bola {
    background: lightblue;
    width: 48px;

    margin: 15px;

    border-radius: 50px 50px 50px 50px;

    display: flex;
    justify-content: center;
    align-items: center;
}


.bolaText {
    color: black;
    margin: 12px;
    font-weight: 700;
}

.bolaSelected {
    background: #2ec0e2;

}


.bolaTextSelected {
    color: white;
}
</style>