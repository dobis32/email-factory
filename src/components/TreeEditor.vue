<template>
  <div class="tree-editor-wrapper">
    <TreeElement
      v-for="(node) of elementTree"
      :key="node.element.getElementID()"
      :isRoot="node.element.elementIsARoot()"
      :type="node.element.getElementType()"
      :alias="node.element.getElementAlias()"
      :id="node.element.getElementID()"
      :attributes="node.element.getElementAttributes()"
      :parentid="undefined"
      :children="node.children"
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
  props: ["elementTree"]
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
