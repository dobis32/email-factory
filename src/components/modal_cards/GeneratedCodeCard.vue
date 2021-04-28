<template>
  <div id="modal-card" @click="stopPropagation">
    <textarea name="code" id="generated-code" wrap="off" cols="30" rows="10" v-model="generatedCode"></textarea>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return {
      generatedCode: ''
    }
  },
  props: ["elementTreeData"],
  inject: ["stopPropagation", "getTreeFactoryInstance"],
  beforeMount() {
    this.generatedCode = this.getTreeFactoryInstance().generateCode(this.elementTreeData);
  },
  beforeUnmount() {
    this.$store.dispatch("resetModalCB");
  }
})
export default class GeneratedCodeCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 800px; /* Could be more or less, depending on screen size */
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
}
</style>
