<template>
  <div id="modal-wrapper" v-if="activeState" @click="closeModal">
    <HTMLElementCard v-if="activeModal == 'HTMLElementCard'" :cb="cb" :validChildren="validChildren" />
    <GeneratedCodeCard v-if="activeModal == 'GeneratedCodeCard'" :cb="cb" :elementTreeData="elementTreeData"/>
    <!-- card components here -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HTMLElementCard from "./modal_cards/HTMLElementCard.vue";
import GeneratedCodeCard from "./modal_cards/GeneratedCodeCard.vue";

@Options({
  props: ["activeState", "activeModal", "cb", "elementTreeData", "validChildren"],
  components: { HTMLElementCard, GeneratedCodeCard },
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
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
