<template>
  <div>
    <TreeEditor :elementTreeData="getTreeData" :elementTree="getTree" />
    <ModuleOptions />
    <Modal :payload="getModalPayload" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeEditor from "./components/TreeEditor.vue";
import ModuleOptions from "./components/ModuleOptions.vue";
import Modal from "./components/Modal.vue";
import _SUPPORTED_HTML_ELEMENTS_ from "./constants/SupportedHTMLElementTypes"
@Options({
  components: {
    TreeEditor,
    ModuleOptions,
    Modal
  },
  computed: {
    getTree() {
      return this.$store.getters.getBuiltTree;
    },
    getTreeData() {
      return this.$store.getters.getTreeData;
    },
    getModalState() {
      return this.$store.getters.getModalState;
    },
    getActiveModal() {
      return this.$store.getters.getActiveModal;
    },
    getModalCB() {
      return this.$store.getters.getModalCB;
    },
    getValidChildren() {
      return this.$store.getters.getValidChildren;
    },
    getModalPayload() {
      return this.$store.getters.getModalPayload;
    }
  },
  provide: {
    stopPropagation: (e: Event) => {
      e.stopPropagation();
    },
    openModal() {
      return new Promise((resolve) => {
        this.$store.dispatch('setModalCallback', resolve);
        this.$store.dispatch('openModal');
      });
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
