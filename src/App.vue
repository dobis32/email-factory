<template>
  <div>
    <TreeEditor :elementTreeData="getElementTree" />
    <ModuleOptions />
    <Modal :activeState="getModalState" :activeModal="getActiveModal" :cb="getModalCB" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeEditor from "./components/TreeEditor.vue";
import ModuleOptions from "./components/ModuleOptions.vue";
import Modal from "./components/Modal.vue";
import ElementTreeFactory from "./classes/ElementTreeFactory";
import SUPPORTED_HTML_ELEMENTS from "./constants/SupportedHTMLElementTypes"
const factory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS);
@Options({
  components: {
    TreeEditor,
    ModuleOptions,
    Modal
  },
  computed: {
    getElementTree() {
      return this.$store.getters.getElementTree;
    },
    getModalState() {
      return this.$store.getters.getModalState;
    },
    getActiveModal() {
      return this.$store.getters.getActiveModal;
    },
    getModalCB() {
      return this.$store.getters.getModalCB;
    }
  },
  provide: {
    stopPropagation: (e: Event) => {
      e.stopPropagation();
    },
    factory: () => {
      return factory;
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  vertical-align: top;
}
</style>
