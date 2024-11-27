<template>
  <div class="windows_Page">

    <!-- <HeaderComponet/> -->
    <!-- <DashBoard/> -->

    <InternalDasboard />


  </div>

</template>
<script>

//import {ref} from 'vue'

// import HeaderComponet from './HeaderComponet.vue'
import InternalDasboard from '@/components/Internal/InternalDasboard.vue'




export default {
  //props: [],
  components: {
    // HeaderComponet,
    //DashBoard,
    InternalDasboard
  },
  setup() { //  setup(props) 

    // let hash=ref("defecto")

    //let saludo = "hola mundo"

    ///console.log(props)


    return {
      //DashBoard //,hash
      InternalDasboard
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