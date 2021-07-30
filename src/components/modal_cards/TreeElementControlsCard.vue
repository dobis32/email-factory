<template>
  <div id="modal-card" @click="stopPropagation">
    <h1 id="element-alias">{{ activeElement.getElementAlias() }}</h1>
    <h3 id="element-type">{{ activeElement.getElementType() }}</h3>
    <DumbButton id="add-button" :text="'Add Child'" :type="'primary'" @click="selectAction('add')" />
    <DumbButton id="edit-button" :text="'Edit Element'" :type="'primary'" @click="selectAction('edit')"  />
    <DumbButton id="copy-button" :text="'Copy Branch'" :type="'primary'" @click="selectAction('copy')" />
    <DumbButton id="delete-button" :text="'Delete Branch'" :type="'primary'" @click="selectAction('delete')" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DumbButton from '@/components/dumb_ui/DumbButton.vue';
@Options({
  components: {
    DumbButton
  },
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
  background-color: #171717;
  color: #BBE1FA;
  margin: 30px auto;
  padding: 20px;
  // border: 1px solid #888;
  width: 400px;   
  text-align: center;
  border-radius: 30px;

}

.input-row {
  padding-bottom: 20px;
}

.action-button {
  width: 180px;
  padding: 10px 6px;
  text-align: center;
  font-weight: bold;
  margin: 8px auto;
  background-color: #3282B8;
  color: #BBE1FA;
  cursor: pointer;
  border-radius: 8px;
  &:hover{
    color: #CCF0FA;
  }
}
</style>
