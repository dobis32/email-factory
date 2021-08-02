<template>
    <DummyButton v-for="(m, i) in codeModules" 
    :key="i" 
    :text="m.getModuleName()" 
    :type="'code-module'" 
    @click="activateModule(m)"
    class="module-width" 
    />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CodeModule from "@/classes/CodeModule";
import DummyButton from "@/components/dumb_ui/DumbButton.vue"
@Options({
  components: {
    DummyButton
  },
  props: ["codeModules"],
  data: () => {
    return {
      
    };
  },
  inject: [
    'openModal'
  ],
  methods: {
   activateModule(m: CodeModule) {
      this.$store.dispatch('activateModule', m);
   }
  }
})
export default class ModuleManager extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.module-width {
  width: 180px;
}
// .code-module {
//     background-color: #5F1854;
//     color: #F1BBD5;
//     display: inline-block;
//     width: 800px;
//     min-height: 200px;
//     margin: 10px;
//     padding: 10px;
//     border: 2px solid #2A2438;
//     border-radius: 30px;
// }

</style>
