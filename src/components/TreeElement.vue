<template>
    <div class="tree-element-wrapper">

        <div :class="treeElementClass">
          <AddTreeElement />
            <h3>{{alias}}</h3>
            <h4>({{type}})</h4>
          <AddTreeElement />
        </div>
        <div class="treeElementChild">
          <TreeElement v-for="(child) of children" :key="child.id" :type="child.type" :alias="child.alias" :id="child.id" :children="child.children ? child.children : []" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddTreeElement from './AddTreeElement.vue';

@Options({
  props: ['type', 'alias', 'id', 'children'],
  components: { AddTreeElement },
  data: () => {
    return {
      treeElementClass: 'tree-element'
    }
  },
  created() {
    this.treeElementClass = `${this.type} ${this.treeElementClass}`;
  }
})
export default class TreeElement extends Vue {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  

  .tree-element-wrapper {
    padding-left: 40px;
    
  }

  .tree-element {
    width: 120px;
    text-align: center;
    padding: 30px 0px;
    margin-bottom: 10px;
  }

  .table {
    background-color: brown;
  }

  .tr {
    background-color: cadetblue;
  }

  .td {
    background-color:coral
  }

  .p {
    background-color:khaki
  }
</style>
