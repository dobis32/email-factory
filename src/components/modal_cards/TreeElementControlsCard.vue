<template>
  <div id="modal-card" @click="stopPropagation">
    <h1>{{ activeElement.alias }}</h1>
    <h3>{{ activeElement.element.getElementType() }}</h3>
    <div id="add-button" class="action-button" @click="selectAction('add')">
      Add Child
    </div>
    <div id="edit-button" class="action-button" @click="selectAction('edit')">
      Edit Element
    </div>
    <div id="duplicate-button" class="action-button" @click="selectAction('copy')">
      Copy Branch
    </div>
    <div id="delete-button" class="action-button" @click="selectAction('delete')">
      Delete Branch
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["activeElement", "cb"],
  data: () => {
    return {
      selectedAction: '',
      submitting: false
    }
  },
  inject: ["stopPropagation"],
  methods: {
    selectAction(action: string) {
      this.submitting = true;
      this.selectedAction = action;  
      this.closeModal();

    },
    closeModal() {
      this.$store.dispatch('closeModal');
    },
  },
  beforeUnmount() {
    if (!this.submitting) this.selectedAction = '';
    this.cb(this.selectedAction);
  } 
})
export default class TreeElementControlsCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 200px;   
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
}

.action-button {
  width: 180px;
  padding: 10px 0px;
  text-align: center;
  margin: 8px auto;
  background-color: darkcyan;
  color: #fff;
  cursor: pointer;
}
</style>
