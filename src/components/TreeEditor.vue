<template>
  <div class="tree-editor-wrapper">
    <div class="editor-overflow-buffer">
      <div v-if="elementTree.length === 0">
        <div class="empty-tree-button">
          +
        </div>
      </div>
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
  height: 560px;
  margin: 10px;
  padding: 14px;
  border: 2px solid #2A2438;
  border-radius: 30px;
}

.empty-tree-button {
  width: 60px;
  height: 60px;
  text-align: center;
  background-color: greenyellow;
  cursor: pointer;
}

.editor-overflow-buffer {
  overflow: scroll;
  height: 560px;

}


</style>
