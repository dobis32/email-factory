<template>
  <div id="modal-wrapper" @click="closeModal" >
    <EditTreeElementCard v-if="payload.activeModal == 'EditTreeElementCard'" :cb="payload.modalcb" :alias="payload.modalData.alias" :attributes="payload.modalData.attributes" />
    <GeneratedCodeCard v-if="payload.activeModal == 'GeneratedCodeCard'" :cb="payload.modalcb" />
    <TreeElementControlsCard v-if="payload.activeModal == 'ElementControlsCard'"  :activeElement="payload.modalData.activeElement" :cb="payload.modalcb" />
    <CreateChildElementCard v-if="payload.activeModal == 'CreateChildElementCard'"  :validChildren="validChildren" :cb="payload.modalcb" />

    <!-- card components here -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EditTreeElementCard from "./modal_cards/EditTreeElementCard.vue";
import GeneratedCodeCard from "./modal_cards/GeneratedCodeCard.vue";
import TreeElementControlsCard from "./modal_cards/TreeElementControlsCard.vue";
import CreateChildElementCard from "./modal_cards/CreateChildElementCard.vue";
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
@Options({
  props: ["payload"],
  data() {
    return {
      validChildren: Array<string>()
    }
  },
  components: { EditTreeElementCard, GeneratedCodeCard, TreeElementControlsCard, CreateChildElementCard },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
    }
  },
  beforeMount() {
    const activeElement: SupportedHTMLElement = this.payload.modalData.activeElement;
    const modalActive = this.payload.modalState;
    if (activeElement && modalActive) {
      this.validChildren =  this.$store.state.elementTreeFactory.getValidChildren(activeElement.getElementType());
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
