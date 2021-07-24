<template>
  <div id="modal-card" @click="stopPropagation">
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="elementAlias" name="alias" id="alias-input" />
      
    </div>
    <div class="input-row">
      <h3>Element type:</h3>
      <select name="type" v-model="elementType" id="type-input">
        <option v-for="(child) of validChildren" id="elementType" v-bind:key="child">{{ child }}</option>
      </select>
    </div>
    <div id="submit-button" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
    elementAlias: '',
    elementType: '',
    submitting: false, 
    supportedChildren: new Array<SupportedHTMLElement>()
    };
  },
  inject: [ "stopPropagation" ],
  props: [ "cb", "validChildren" ],
  methods: {
    submitData() {
      this.submitting = true;
      this.$store.dispatch("closeModal");
    }
  },
  beforeMount(){
    this.elementType = this.validChildren[0];
  },
  beforeUnmount() {
    if (!this.submitting) {
      this.elementAlias = "";
      this.elementType = "";
    }
    this.cb({ alias: this.elementAlias, type: this.elementType });
    this.$store.dispatch("resetModalCallback");
  }
})
export default class CreateChildElementCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #171717;
  color: #BBE1FA;
  margin: 2% auto; 
  padding: 20px;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
  border-radius: 30px;

}

h3 {
  padding-bottom: 10px;
}

input {
  color: #BBE1FA;
}

select {
  color: #BBE1FA;
}

.input-row {
  padding-bottom: 20px;
}

#submit-button {
  background-color: #3282B8;
  font-weight: bold;
  color: #BBE1FA;
  cursor: pointer;
  width: 120px;
  margin: 0px auto;
  padding: 10px 0px;
  border-radius: 8px;
  &:hover{
    color: #CCF0FA;
  }
}

input {
  width: 120px;
}

select {
  text-align: center;
}
</style>
