<template>
  <div class="module-options-wrapper">
   <div class="module-option" @click="saveModule">
       SAVE MODULE
   </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  methods: {
    saveModule(): void {
      return;
    }
  },
  props: {
   
  }
})
export default class ModuleOptions extends Vue {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .module-options-wrapper {
    display: inline-block;
    width: 150px;
    min-height: 200px;
  }

  .module-option {
    background-color: cornflowerblue;
    text-align: center;
    padding: 20px 0px;
    margin: 10px 0px;
  }
</style>
