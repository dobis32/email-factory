<template>
  <div id="modal-card" @click="stopPropagation">
    <h1>{{ this.activeElement.alias }}</h1>
    <h2>{{ this.activeElement.element.getElementType() }}</h2>
    <div id="edit-button" class="action-button" @click="selectAction('edit')">
      Edit
    </div>
    <div id="duplicate-button" class="action-button" @click="selectAction('duplicate')">
      Duplicate
    </div>
    <div id="delete-button" class="action-button" @click="selectAction('delete')">
      Delete
    </div>
  </div>
</template>

<script lang="ts">
import iTreeElement from "@/interfaces/iTreeElement";
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["activeElementID"],
  data: () => {
    return {
      selectedAction: '',
      activeElement: {} as iTreeElement
    }
  },
  inject: ["stopPropagation", "getTreeFactoryInstance"],
  methods: {
      selectAction(action: string) {
        this.selectedAction = action;
        
      },
      closeModal() {
        this.$store.dispatch('resetActiveElementID');
        this.$store.dispatch('closeModal');

      }
  },
  beforeMount() { // idk how to test this lol
    const factory = this.getTreeFactoryInstance();
    const el = factory.findElementByID(this.activeElementID);
    if (el) this.activeElement = el;
    else this.closeModal(); 
  }
})
export default class ElementControlsCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 800px; /* Could be more or less, depending on screen size */
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
}

.action-button {
  width: 85%;
  padding: 10px 0px;
  text-align: center;
  margin: 0 auto;
}
</style>
