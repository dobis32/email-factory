<template>
  <div>
    <TreeEditor :elementTreeData="getElementTree" />
    <ModuleOptions />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeEditor from "./components/TreeEditor.vue";
import ModuleOptions from "./components/ModuleOptions.vue";
import iTreeElement from "./interfaces/iTreeElement";

@Options({
  components: {
    TreeEditor,
    ModuleOptions
  },
  computed: {
    getElementTree() {
      return this.$store.getters.getElementTree;
    }
  },
  provide: {
    stopPropagation: (e: Event) => {
      e.stopPropagation();
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
