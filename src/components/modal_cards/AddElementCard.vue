<template>
  <div id="modal-card" @click="stopPropagation">
    <h3>Element type:</h3>
    <input type="text" v-model="elementType" name="type" placeholder id="type" />
    <div id="submit-button" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  data: () => {
    return { elementType: "" };
  },
  inject: ["stopPropagation"],
  props: ["cb"],
  methods: {
    submitData() {
      console.log(this.elementType);
    }
  }
})
export default class EditCartModal extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
}
</style>
