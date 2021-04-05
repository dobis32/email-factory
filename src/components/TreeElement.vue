<template>
    <div class="tree-element-wrapper">
        <div class="tree-element table">
            TABLE
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: ['elementType']
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
</style>
