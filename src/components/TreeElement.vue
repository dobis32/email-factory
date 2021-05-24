<template>
  <div class="tree-element-wrapper">
    <div :class="treeElementClass" @click="promptAction">
      <h3 id="alias">{{alias}}</h3>
      <h4 id="type">({{element.getElementType()}})</h4>
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
  </div>
</template>

<script lang="ts">
import ElementTreeFactory from "@/classes/ElementTreeFactory";
import iTreeElement from "@/interfaces/iElementDescriptor";
import { Options, Vue } from "vue-class-component";

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
    // getNewElementCredentials(validChildren: Array<string>) { // todo unit test
    //   return new Promise(resolve => {
    //     // I don't know how to test this....
    //     this.$store.dispatch("setModalCB", resolve);
    //     this.$store.dispatch("openModal", "HTMLElementCard");
    //   });
    // },
    // async addElement(payload: { sibling: boolean, pre: boolean }) {
    //   const { sibling, pre } = payload;
    //   const factory: ElementTreeFactory = this.getTreeFactoryInstance();
    //   const parent = factory.findElementByID(this.$store.state.treeData, this.parentid) as iTreeElement;
    //   const validChildren = sibling ? parent.element.getValidChildren() : this.element.getValidChildren();
    //   const { alias } = await this.getNewElementCredentials(validChildren);
    //   if (alias) {
    //     let newEl: iTreeElement = {
    //       id: factory.getNewElementID(),
    //       root: this.root ? true : false,
    //       element: this.element,
    //       alias,
    //       children: new Array<iTreeElement>(),
    //       attributes: new Array<HTMLAttribute>()
    //     };
    //     const payload: iAddElementPayload = {
    //       elementToAdd: newEl,
    //       parentid: sibling? this.parentid : this.id,
    //       pre,
    //     };
    //     this.$store.dispatch("addTreeElement", payload);
    //   }
    // },
    promptAction() {
      console.log('prompt action');
      const factory: ElementTreeFactory = this.getTreeFactoryInstance();
      const id = this.id;
      const payload = { factory, id };
      this.$store.dispatch('setActiveElement', payload);
      this.$store.dispatch('openModal', 'ElementControlsCard');
      new Promise((resolve) => {
        this.$store.dispatch('setModalCB', resolve);
      });
    },
    performAction(action: string) {
      this.$store.dispatch('foobar');
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
  cursor: pointer;
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


</style>
