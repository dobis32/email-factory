<template>
  <div></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeElement from "./TreeElement.vue";

@Options({
  components: {
    TreeElement
  },
  data() {
    return {
      root: undefined
    };
  },
  props: ["elementTreeData"],
  created() {
    this.root =
      this.elementTreeData && this.elementTreeData.length
        ? this.elementTreeData[0]
        : undefined;
  }
})
export default class AddToElementTree extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
