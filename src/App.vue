<template>
  <div id="app-background">
    <div id="app-wrapper">
      <div id="app-heading">
        <div v-if="getActiveCodeModule.getModuleID().length" id="module-name">{{ getActiveCodeModule.getModuleName() }}</div>
        <div v-else id="module-manager-heading">Module Manager</div>
        <div v-if="getActiveCodeModule.getModuleID().length" id="back-button">
          <DumbButton :text="'BACK'" :type="'cancel'" @click="clearActiveModule" />
        </div>

      </div>
      <div id="app-window">
        
        <div id="side-panel">
          <ModuleOptions v-if="getActiveCodeModule.getModuleID().length" />
          <GlobalOptions v-else />
        </div>
        <div id="editor">
          <TreeEditor v-if="getActiveCodeModule.getModuleID().length" :elementTree="getTree" />
          <ModuleManager v-else :codeModules="getCodeModules" />
        </div>
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
import DumbButton from "./components/dumb_ui/DumbButton.vue";

@Options({
  components: {
    TreeEditor,
    ModuleOptions,
    Modal,
    ModuleManager,
    GlobalOptions,
    DumbButton
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
    getActiveCodeModule() { // TODO unit test
      return this.$store.getters.getActiveCodeModule;
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
    },
  },
  methods: {
    clearActiveModule() { // TODO unit test
      this.$store.dispatch('clearActiveModule');
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
  height: 636px;
  // display: flex;
  // flex-direction: row;
}
#modal {
  z-index: 9; /* Sit on top */
}

#editor {
  // float: left;
  display: inline-block;
  width: 800px;
}

#side-panel {
  // float: right;
  display: inline-block;
  width: 240px;
}

#app-background {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #A9C9FF;
  background-image: linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%);
}

#app-heading {
  color: #3A9188;
  font-weight: bold;
  font-size: 26px;
}

#back-button {
  padding-left: 10px;
  display: inline-block;
  height: 40px;
  font-size: 14px;
  position: relative;
  top: -20px;
}

#module-name {
  display: inline-block;
}
</style>
