<template>
  <div class="tree-editor-wrapper">
    <TreeElement
      v-if="root"
      :type="root.type"
      :alias="root.alias"
      :id="root.id"
      :parentid="'root'"
      :children="root.children ? root.children : []"
    />
  </div>
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
export default class TreeEditor extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tree-editor-wrapper {
  display: inline-block;
  width: 800px;
  min-height: 200px;
  margin: 10px;
  padding: 10px;
  border: 2px solid #999;
}
</style>
