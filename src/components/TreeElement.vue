<template>
  <div class="tree-element-wrapper">
    <div class="tree-element" @click="promptAction">
      <span class="element-text">&lt;{{ type }}&nbsp;<span class="att-name">alias</span>=&quot;<span id="alias">{{alias}}</span>&quot; id=&quot;{{ id }}&quot; &gt;</span>
    </div>
    <TreeElement
      v-for="(child) of children"
      :key="child.element.getElementID()"
      :isRoot="child.element.elementIsARoot()"
      :type="child.element.getElementType()"
      :alias="child.element.getElementAlias()"
      :id="child.element.getElementID()"
      :attributes="child.element.getElementAttributes()"
      :parentid="id"
      :children="child.children"
    />
  </div>
</template>

<script lang="ts">
import ElementTreeFactory from "@/classes/ElementTreeFactory";
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iAppState from "@/interfaces/iAppState";
import { Options, Vue } from "vue-class-component";
@Options({
  props: ["type", "alias", "id", "children", "parentid", "isRoot", "attributes"],
  data: () => {
    return {
      
    };
  },
  inject: [
    'openModal'
  ],
  methods: {
    async promptAction() {
      const f: ElementTreeFactory = this.$store.state.elementTreeFactory;
      const state: iAppState = this.$store.state;
      const treeData: Array<SupportedHTMLElement> = state.activeModule.getModuleTreeData();
      const id: string = this.id;
      const el: SupportedHTMLElement | undefined = f.findElementByID(treeData, id);
      if (!el) throw new Error(`[ Tree Element Vue ] No element with ID ${id} found`);
      const activeElement = el ? el : {};
      const card = 'ElementControlsCard';
      const data = { activeElement };
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
            console.log('Did not recognize that action...', action);
        }
    },

    async addChild() {
      const state: iAppState = this.$store.state;
      const f: ElementTreeFactory = state.elementTreeFactory;
      const treeData: Array<SupportedHTMLElement> = state.activeModule.getModuleTreeData();
      const el = f.findElementByID(treeData, this.id);
      if (el) {
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
      }
      
    },
    copyBranch() {
      const state: iAppState = this.$store.state;
      const f: ElementTreeFactory = state.elementTreeFactory;
      const headID = this.id;
      const treeData: Array<SupportedHTMLElement> = state.activeModule.getModuleTreeData();
      const branch: Array<SupportedHTMLElement> = f.copyBranch(treeData, headID);
      let parentID: string | undefined;
      if (!this.isRoot) parentID = this.parentid;
      this.$store.dispatch('addBranch', { branch: branch, parentID });
    },
    deleteBranch() {
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
      this.$store.dispatch('updateElement', { eid: this.id, alias, attributes });
    }
  }
})
export default class TreeElement extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tree-element-wrapper {
  padding-left: 30px;
}

.button-wrapper {
  // width: 120px;
  height: 7px;
  display: flex;
}

.tree-element {
  // width: 120px;
  text-align: left;
  padding: 10px 0px;
  margin-bottom: 0px;
  font-size: 24px;
  cursor: pointer;
  // overflow: hidden;
  color: #3A9188;
  white-space: nowrap;
  .element-text {
    &:hover {
      color: #B8E1DD;
    }
  }
}

#type {
  color: #3A9188;
}

#alias {
  color: #A12559;
  
}

.att-name {
  color: #3282B8;
  &:hover {
    color: #3282B8;
  }
} 



</style>
