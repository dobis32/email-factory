<template>
  <div class="tree-element-wrapper">
    <div class="button-wrapper">
      <div id="add-before" class="add-button" @click="addSiblingBefore">
        <span>+</span>
      </div>
    </div>
    <div :class="treeElementClass">
      <h3 id="alias">{{alias}}</h3>
      <h4 id="type">({{element.getElementType()}})</h4>
    </div>
    <div class="button-wrapper">
      <div id="add-after" class="add-button" @click="addSiblingAfter">
        <span>+</span>
      </div>
    </div>

    <TreeElement
      v-for="(child) of children"
      :key="child.id"
      :root="child.root"
      :element="child.element"
      :alias="child.alias"
      :id="child.id"
      :attributes="child.attributes"
      :parentid="id"
      :children="child.children"
    />

    <div v-if="children.length == 0" id="add-child-button" @click="addChildElement">
      <h3>Add child</h3>
    </div>
  </div>
</template>

<script lang="ts">
import iTreeElement from "@/interfaces/iTreeElement";
import iAddElementPayload from "@/interfaces/iAddElementPayload";
import HTMLAttribute from "@/classes/HTMLAttribute";
import { Options, Vue } from "vue-class-component";
import ElementTreeFactory from "@/classes/ElementTreeFactory";

@Options({
  props: ["element", "alias", "id", "children", "parentid", "root", "attributes"],
  inject: ["getTreeFactoryInstance"],
  data: () => {
    return {
      treeElementClass: "tree-element"
    };
  },
  created() {
    this.treeElementClass = `${this.element.getElementType()} ${this.treeElementClass}`;
  },
  methods: {
    getNewElementCredentials(validChildren: Array<string>) { // todo unit test
      return new Promise(resolve => {
        // I don't know how to test this....
        this.$store.dispatch("setModalCB", resolve);
        this.$store.dispatch("setValidChildren", this.root ? ['table'] : validChildren); 
        this.$store.dispatch("openModal", "HTMLElementCard");
      });
    },
    async addElement(payload: { sibling: boolean, pre: boolean }) {
      const { sibling, pre } = payload;
      const factory: ElementTreeFactory = this.getTreeFactoryInstance();
      const parent = factory.findElementByID(this.$store.state.treeData, this.parentid) as iTreeElement;
      const validChildren = sibling ? parent.element.getValidChildren() : this.element.getValidChildren();
      const { alias } = await this.getNewElementCredentials(validChildren);
      if (alias) {
        let newEl: iTreeElement = {
          id: factory.getNewElementID(),
          root: this.root ? true : false,
          element: this.element,
          alias,
          children: new Array<iTreeElement>(),
          attributes: new Array<HTMLAttribute>()
        };
        const payload: iAddElementPayload = {
          elementToAdd: newEl,
          parentid: sibling? this.parentid : this.id,
          pre,
        };
        this.$store.dispatch("addTreeElement", payload);
      }
    },
    addSiblingBefore() {
      this.addElement({ sibling: true, pre: true });
    },
    addSiblingAfter() {
      this.addElement({ sibling: true, pre: false });
    },
    addChildElement() {
      this.addElement({ sibling: false, pre: false});
    }
  }
})
export default class TreeElement extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tree-element-wrapper {
  padding-left: 50px;
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

.add-button:hover {
  
  position: relative;
  height: 30px;
  cursor: pointer;
  background-color: lightgreen;
  span {
    font-size: 28px;
    color: #000;
  }
}

#add-after:hover {
  bottom: 24px;
}

#add-child-button {
  width: 100px;
  text-align: center;
  margin-top: 5px;
  margin-left: 50px;
  background-color: slateblue;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
