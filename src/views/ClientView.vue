<template>
  <div class="windows_Page">

    <!-- <HeaderComponet/> -->
    <!-- <DashBoard/> -->

    <ClientDashBoard />


  </div>

</template>
<script>

//import {ref} from 'vue'

// import HeaderComponet from './HeaderComponet.vue'
import ClientDashBoard from '@/components/ClientDashBoard.vue'




export default {
  //props: [],
  components: {
    // HeaderComponet,
    //DashBoard,
    ClientDashBoard
  },
  setup() { //  setup(props) 

    // let hash=ref("defecto")

    //let saludo = "hola mundo"

    ///console.log(props)


    return {
      //DashBoard //,hash
      ClientDashBoard
    }
  },
  mounted() {

    // this.hash=this.$route.params.hash
    // console.log(this.$route.params.hash)
  }

}


</script>

<style scoped>
.windows_Page {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}
</style>