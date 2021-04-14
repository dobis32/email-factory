<template>
  <div class="tree-element-wrapper">
    <div class="button-wrapper">
      <div class="add-button" @click="addSiblingBefore">
        <span>+</span>
      </div>
    </div>
    <div :class="treeElementClass">
      <h3 id="alias">{{alias}}</h3>
      <h4 id="type">({{type}})</h4>
    </div>
    <div class="button-wrapper">
      <div class="add-button" @click="addSiblingAfter">
        <span>+</span>
      </div>
    </div>

    <TreeElement
      v-for="(child) of children"
      :key="child.id"
      :type="child.type"
      :alias="child.alias"
      :id="child.id"
      :parentid="id"
      :children="child.children"
    />
  </div>
</template>

<script lang="ts">
import iTreeElement from "@/interfaces/iTreeElement";
import iAddSiblingPayload from "@/interfaces/iAddSiblingPayload";
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["type", "alias", "id", "children", "parentid"],
  data: () => {
    return {
      treeElementClass: "tree-element"
    };
  },
  created() {
    this.treeElementClass = `${this.type} ${this.treeElementClass}`;
  },
  methods: {
    addSiblingBefore() {
      // TODO use modal to prompt user for element type
      let elType = "td"; // temp default element type
      let newEl: iTreeElement = {
        type: elType,
        alias: "newSibling",
        id: "siblingid",
        children: []
      };
      const payload: iAddSiblingPayload = {
        elementToAdd: newEl,
        parentid: this.parentid,
        pre: true
      };
      this.$store.dispatch("addElementSibling", payload);
    },
    async addSiblingAfter() {
      // TODO use modal to prompt user for element type
      let elType = "td";
      let newEl: iTreeElement = {
        type: elType,
        alias: "newSibling",
        id: "siblingid",
        children: []
      };
      const payload: iAddSiblingPayload = {
        elementToAdd: newEl,
        parentid: this.parentid,
        pre: false
      };
      this.$store.dispatch("addElementSibling", payload);
    }
  }
})
export default class TreeElement extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tree-element-wrapper {
  padding-left: 40px;
}

.button-wrapper {
  width: 120px;
  height: 7px;
  display: flex;
}

.tree-element {
  width: 120px;
  text-align: center;
  padding: 30px 0px;
  margin-bottom: 0px;
}

.table {
  background-color: brown;
}

.tr {
  background-color: cadetblue;
}

.td {
  background-color: coral;
}

.p {
  background-color: khaki;
}

.add-button {
  display: inline-block;
  background-color: #fff;
  width: 30px;
  height: inherit;
  margin: 0px auto;
  padding: 0px;
  text-align: center;
  span {
    font-size: 6px;
    color: #fff;
    text-align: center;
  }
}
.button-wrapper:hover {
  height: 30px;

  .add-button {
    &:hover {
      cursor: pointer;
    }
    background-color: lightgreen;
    span {
      font-size: 28px;
      color: #000;
    }
  }
}
</style>
