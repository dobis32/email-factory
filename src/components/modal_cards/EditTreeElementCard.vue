<template>
  <div id="modal-card" @click="stopPropagation">
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="newAlias" name="alias" id="alias-input" />
      
    </div>
    <div id="input-row">
      <h3>Attributes:</h3>
      <div v-for="(att) of newAttributes" v-bind:key="att" :id="`attribute-${att.name}`" class="input-row" >
        <h3>{{ att.name }}:</h3>
        <input type="text" v-model="att.value" :name="att.name" class="attribute-input" />
      </div>
    </div>
    <div id="submit-button" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iHTMLAttribute from "@/interfaces/iHTMLAttribute";
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
    newAlias: '',
    newAttributes: new Array<iHTMLAttribute>(),
    submitting: false, 
    supportedChildren: new Array<SupportedHTMLElement>()
    };
  },
  inject: [ "stopPropagation" ],
  props: [ "cb", "alias", "attributes" ],
  methods: {
    submitData() {
      this.submitting = true;
      this.$store.dispatch("closeModal");
    }
  },
  beforeMount() {
    this.newAlias = this.alias
    this.newAttributes = [ ...this.attributes ];
  },
  beforeUnmount() {
    if (!this.submitting) {
      this.elementAlias = "";
    }
    this.cb({ 
      alias: this.newAlias,
      attributes: this.newAttributes 
    });
    this.$store.dispatch("resetModalCB");
  }
})
export default class EditTreeElementCard extends Vue {}
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

input {
  width: 120px;
}

select {
  text-align: center;
}
</style>
