<template>
  <div id="app-background">
    <div id="app-wrapper">
      <div id="editor">
        <TreeEditor v-if="getActiveModule" :elementTree="getTree" />
        <ModuleManager v-else :codeModules="getCodeModules" />
      </div>
      <div id="side-panel">
        <ModuleOptions v-if="getActiveModule" />
        <GlobalOptions v-else />
      </div>
    </div>
    <div v-if="getModalPayload.modalState">
      <Modal :payload="getModalPayload" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeEditor from "./components/TreeEditor.vue";
import ModuleOptions from "./components/ModuleOptions.vue";
import Modal from "./components/Modal.vue";
import ModuleManager from "./components/ModuleManager.vue";
import _SUPPORTED_HTML_ELEMENTS_ from "./constants/SupportedHTMLElementTypes";
import GlobalOptions from "./components/GlobalOptions.vue";
@Options({
  components: {
    TreeEditor,
    ModuleOptions,
    Modal,
    ModuleManager,
    GlobalOptions
  },
  computed: {
    getTree() {
      return this.$store.getters.getBuiltTree;
    },
    getModalState() {
      return this.$store.state.modalState;
    },
    getModalPayload() {
      return this.$store.getters.getModalPayload;
    },
    getActiveModule() {
      return this.$store.getters.getActiveModule;
    },
    getCodeModules() { // TODO unit test
      return this.$store.getters.getCodeModules;
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
  // background-color: #171717;
}

#app-wrapper {
  max-width: 1100px;
  margin: 8vh auto;
  background-color: #171717;
  padding: 30px;
  border-radius: 30px;
  min-height: 200px;
  // display: flex;
  // flex-direction: row;
}
#modal {
  z-index: 9; /* Sit on top */
}

#editor {
  float: left;
}

#side-panel {
  float: right;
}

#app-background {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #A9C9FF;
  background-image: linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%);
}
</style>
