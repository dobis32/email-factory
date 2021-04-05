<template>
  <TreeEditor />
  <ModuleOptions />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeEditor from './components/TreeEditor.vue';
import ModuleOptions from './components/ModuleOptions.vue';

@Options({
  components: {
    TreeEditor, ModuleOptions
  },
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
