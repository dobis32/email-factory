<template>
  <div id="modal-card" @click="stopPropagation">
    <textarea name="code" id="generated-code" wrap="off" cols="76" rows="10" v-model="generatedCode"></textarea>
  </div>
</template>

<script lang="ts">
import ElementTreeFactory from "@/classes/ElementTreeFactory";
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iNode from "@/interfaces/iNode";
import { Options, Vue } from "vue-class-component";
@Options({
  data: () => {
    return {
      generatedCode: ''
    }
  },
  props: ["elementTreeData"],
  inject: ["stopPropagation"],
  beforeMount() {
    const f: ElementTreeFactory = this.$store.state.elementTreeFactory;
    const builtTree: Array<iNode> = this.$store.state.builtTree;
    this.generatedCode = f.getTreeCode(builtTree);
  },
  beforeUnmount() {
    this.$store.dispatch('closeModal');
  }
})
export default class GeneratedCodeCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #171717;
  color: #BBE1FA;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 600px; /* Could be more or less, depending on screen size */
  text-align: center;
  border-radius: 30px;

}

textarea {
  color: #BBE1FA;
  background-color: #171717;
}

.input-row {
  padding-bottom: 20px;
}
</style>
