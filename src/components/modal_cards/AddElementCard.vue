<template>
  <div id="modal-card" @click="stopPropagation">
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="elementAlias" name="alias" placeholder id="alias" />
    </div>
    <div id="submit-button" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { elementAlias: "", submitting: false, supportedChildren: new Array<SupportedHTMLElement>()};
  },
  inject: ["stopPropagation"],
  props: ["cb"],
  methods: {
    submitData() {
      // TODO validate type and lias
      // type should be table, tr, th, td, a, span, img (maybe h1, h2, etc?)
      // alias should be unique to the tree
      this.submitting = true;
      this.$store.dispatch("closeModal");
    }
  },
  beforeMount() {
    this.supportedChildren;
  },
  beforeUnmount() {
    if (!this.submitting) {
      this.elementAlias = "";
    }
    this.cb({ alias: this.elementAlias });
    this.$store.dispatch("resetModalCB");
  }
})
export default class EditCartModal extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
}

#submit-button {
  background-color: #062;
  color: #fff;
  cursor: pointer;
  width: 80px;
  margin: 0px auto;
  padding: 15px 0px;
}
</style>
