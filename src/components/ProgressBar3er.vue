<template>
  <div class="contenedor">

    <div  :style="fillerStyles">
      <span class="label">

      {{ `${completed}%` }}


    </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ProgressBar",
  props: {
    bgcolor: String,
    completed: Number,
  },
  setup(props) {

    const fillerStyles = computed(() => {
      return {
        height: "100%",
        width: `${props.completed}%`,
        backgroundColor: props.bgcolor,
        transition: "width 1s ease-in-out",
        borderRadius: "inherit",
        textAlign: "right",
      };
    });

    return { fillerStyles };
  },
};
</script>


<style scoped>
.contenedor {
  height: 15px;
  width: 100%;


  background-color: #e0e0de;
  border-radius: 5px;
}

.label {

  background-color: #2d83d5;
  border: solid 1px #d2d2d2;

  padding-left: 5px;
  padding-right: 5px;

  color: white;
  font-weight: bold;

  float: right;
  margin-top: -4px;
  font-size: 14px;
}


</style>
