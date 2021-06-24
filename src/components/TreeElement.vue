<template>
  <div class="tree-element-wrapper">
    <div :class="treeElementClass" @click="promptAction">
      <h3 id="alias">{{alias}}</h3>
      <h4 id="type">({{ type }})</h4>
    </div>
  
    <TreeElement
      v-for="(child) of children"
      :key="child.id"
      :isRoot="child.root"
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
import iTreeElement from "@/interfaces/iTreeElement";
import { Options, Vue } from "vue-class-component";
@Options({
  props: ["type", "alias", "id", "children", "parentid", "isRoot", "attributes"],
  data: () => {
    return {
      treeElementClass: "tree-element"
    };
  },
  created() {
    this.treeElementClass = `${this.type} ${this.treeElementClass}`;
  },
  inject: [
    'openModal'
  ],
  methods: {
    async promptAction() {
      const f: ElementTreeFactory = this.$store.state.elementTreeFactory;
      const treeData = this.$store.state.treeData;
      const id = this.id;
      const el = f.findElementByID(treeData, id);
      const activeElement = el ? el : {};
      const card = 'ElementControlsCard'
      const data = { activeElement }
      this.$store.dispatch('setModal', { card, data });
      const result = await this.openModal();
      this.performAction(result);
    },
    performAction(action: string) {
        switch(action) {
          case 'add':
            console.log('add a child');
            this.addChild();
            break;
          case 'copy':
            console.log('copy a branch');
            this.copyBranch();
            break;
          case 'edit':
            console.log('edit an element');
            this.editElement();
            break;
          case 'delete':
            console.log('delete a branch');
            this.deleteBranch();
            break;
          default:
            console.log('Did not recognize that action...');
        }
    },

    async addChild() {
      const f: ElementTreeFactory = this.$store.state.elementTreeFactory;
      const treeData: Array<iTreeElement> = this.$store.state.treeData;
      const el = f.findElementByID(treeData, this.id);
      if (!el) throw new Error(`[ Tree element Vue ] element of type ${this.id} is not supported`);
      const activeElement = el ? el : {};
      const card = 'CreateChildElementCard';
      const data = { activeElement };
      this.$store.dispatch('setModal', { card, data });
      const result: { alias: string, type: string } = await this.openModal();
      const { alias, type } = result;
      if (type) {
        const newEl = f.createTreeElement(type, false, alias);
        this.$store.dispatch('addChild', { newElement: newEl, parentID: this.id});
      }
    },

    copyBranch() {
      const f: ElementTreeFactory = this.$store.state.elementTreeFactory;
      const headID = this.id;
      const treeData: Array<iTreeElement> = this.$store.state.treeData;
      const flattenedBranch = f.copyBranch(treeData, headID);
      let parentID: string | undefined;
      if (!this.isRoot) parentID = this.parentid;
      this.$store.dispatch('addBranch', { branch: flattenedBranch, parentID });
    },

    deleteBranch() { // TODO unit test
      this.$store.dispatch('deleteBranch', { idToRemove: this.id, parentid: this.parentid });
    },

    async editElement() {
      const card = 'EditTreeElementCard';
      const data = {
        alias: this.alias,
        attributes: this.attributes
      };
      this.$store.dispatch('setModal', { card, data });
      const { alias, attributes } = await this.openModal();
      console.log('[ Tree Element Vue ] edit element mode result', { alias, attributes });
      this.$store.dispatch('updateElement', { eid: this.id, alias, attributes });
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

.th {
  background-color: seagreen;
}

.p {
  background-color: khaki;
}


</style>
