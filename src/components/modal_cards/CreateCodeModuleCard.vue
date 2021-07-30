<template>
  <div id="modal-card" @click="stopPropagation">
    <h1>Create Code Module Card</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
   
    };
  },
  inject: [ "stopPropagation" ],
})
export default class CreateCodeModuleCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #171717;
  color: #BBE1FA;
  margin: 2% auto; 
  padding: 20px;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
  border-radius: 30px;
}

</style>
