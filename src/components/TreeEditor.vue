<template>
  <div class="tree-editor-wrapper">
    <TreeElement
      v-for="(el) of elementTreeData"
      :key="el.id"
      :root="el.root"
      :type="el.type"
      :alias="el.alias"
      :id="el.id"
      :parentid="undefined"
      :children="el.children"
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
    return {};
  },
  props: ["elementTreeData"]
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
