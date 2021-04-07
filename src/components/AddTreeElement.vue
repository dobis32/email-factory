<template>
  <div class="add-element-wrapper">
      <h1>+</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeElement from './TreeElement.vue';

@Options({
  components: {
    TreeElement
  },
  data() {
    return {
      root: undefined
    }
  },
  props: ['elementTreeData'],
  created() {
    this.root = this.elementTreeData && this.elementTreeData.length ? this.elementTreeData[0] : undefined;
  },
})
export default class AddToElementTree extends Vue {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .add-element-wrapper {
   display: inline-block;
    background-color: inherit;
    width: 40px;
    height: 5px;
  }

  .add-element-wrapper:hover {
    background-color: lightgreen;
    height: 40px;
  }
</style>
