<template>
  <div id="modal-wrapper" v-if="payload.modalState" @click="closeModal" >
    <HTMLElementCard v-if="payload.activeModal == 'HTMLElementCard'" :cb="payload.modalcb" />
    <GeneratedCodeCard v-if="payload.activeModal == 'GeneratedCodeCard'" :cb="payload.modalcb" />
    <TreeElementControlsCard v-if="payload.activeModal == 'ElementControlsCard'"  :activeElement="payload.activeElement" :cb="payload.modalcb" />
    <CreateChildElementCard v-if="payload.activeModal == 'CreateChildElementCard'"  :validChildren="payload.validChildren" :cb="payload.modalcb" />

    <!-- card components here -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HTMLElementCard from "./modal_cards/HTMLElementCard.vue";
import GeneratedCodeCard from "./modal_cards/GeneratedCodeCard.vue";
import TreeElementControlsCard from "./modal_cards/TreeElementControlsCard.vue";
import CreateChildElementCard from "./modal_cards/CreateChildElementCard.vue";

@Options({
  props: ["payload"],
  components: { HTMLElementCard, GeneratedCodeCard, TreeElementControlsCard, CreateChildElementCard },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
    }
  }
})
export default class Modal extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-wrapper {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: none; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
