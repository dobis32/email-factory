<template>
  <TreeEditor :elementTreeData="elementTreeData" />
  <ModuleOptions />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeEditor from './components/TreeEditor.vue';
import ModuleOptions from './components/ModuleOptions.vue';
import iTreeElement from './interfaces/iTreeElement';

const elTree: Array<iTreeElement> = [
 {
   type: 'table',
   alias: 'rootTable',
   id: 'foo',
   children: [
     {
       type: 'tr',
       alias: 'rootTR',
       id: 'bar',
       children: [{
         type: 'td',
         id: 'fizz',
         alias: 'rootTD',
         children: [
           {
             type: 'p',
             alias: 'rootP',
             id: 'buzz',
             children: undefined
           }
         ]
       }]
     }
   ]
 }
]

@Options({
  components: {
    TreeEditor, ModuleOptions
  },
  data() {
    return {
      elementTreeData: elTree
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
