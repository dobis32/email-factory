<template>
  <div class="tree-element-wrapper">
    <div :class="treeElementClass" @click="promptAction">
      <h3 id="alias">{{alias}}</h3>
      <!-- <h4 id="type">({{element.getElementType()}})</h4> -->
    </div>
  
    <TreeElement
      v-for="(child) of children"
      :key="child.id"
      :root="child.root"
      :type="child.type"
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
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["type", "alias", "id", "children", "parentid", "root", "attributes"],
  inject: ["getTreeFactoryInstance"],
  data: () => {
    return {
      treeElementClass: "tree-element"
    };
  },
  created() {
    this.treeElementClass = `${this.type} ${this.treeElementClass}`;
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
    async promptAction() {
      console.log('prompt action');
      const factory: ElementTreeFactory = this.getTreeFactoryInstance();
      const treeData = this.$store.state.treeData;
      const id = this.id;
      const el = factory.findElementByID(treeData, id);
      this.$store.dispatch('setActiveElement', el ? el : {});
      this.$store.dispatch('openModal', 'ElementControlsCard');
      const result = await new Promise((resolve) => {
        this.$store.dispatch('setModalCB', resolve);
      });
      this.performAction(result);
    },
    performAction(action: string) {
        switch(action) {
          case 'add':
            console.log('add a child');
            
            break;
          case 'copy':
            console.log('copy a branch');
            break;
          case 'edit':
            console.log('edit an element');
            break;
          case 'delete':
            console.log('delete a branch');
            break;
          default:
            console.log('Did not recognize that action...');
        }
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
