<template>
  <div id="modal-card" @click="stopPropagation">
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="newAlias" name="alias" id="alias-input" />
    </div>
    <div id="attribute-row">
      <h3>Attributes:</h3>
      <div v-for="(att) of newAttributes" v-bind:key="att" :id="`attribute-${att.name}`" class="attribute-row" >
        <HTMLAttribute :name="att.name" :value="att.value" @remove-attribute="removeAttribute" @editing="handleEdit" />
      </div>
    </div>
    <div id="add-attribute" class="button">
      Add Attribute
    </div>
    <div id="submit-button" :class="{ button: true, disabled: disableSubmit }" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iHTMLAttribute from "@/interfaces/iHTMLAttribute";
import { Options, Vue } from "vue-class-component";
import HTMLAttribute from '@/components/modal_cards/modal_elements/HTMLAttribute.vue';
@Options({
  components: { HTMLAttribute },
  data: () => {
    return { 
    newAlias: '',
    newAttributes: new Array<iHTMLAttribute>(),
    submitting: false, 
    supportedChildren: new Array<SupportedHTMLElement>(),
    disableSubmit: false
    };
  },
  inject: [ "stopPropagation" ],
  props: [ "cb", "alias", "attributes" ],
  methods: {
    submitData() {
      this.submitting = true;
      this.$store.dispatch("closeModal");
    },
    removeAttribute(attName: string) {
      this.newAttributes = this.newAttributes.filter((a: iHTMLAttribute) => a.name != attName);
    },
    updateAttribute(payload: { name: string, newName: string, value: string }) {
      const { name, newName, value } = payload;
      const target  = this.newAttributes.find((a: iHTMLAttribute) => a.name === name);
      target.name = newName;
      target.value = value;
    },
    handleEdit(disable: boolean) {
      this.disableSubmit = disable
    }
  },
  beforeMount() {
    this.newAlias = this.alias
    this.newAttributes = this.attributes.map((a: iHTMLAttribute) => Object.assign({}, a));
  },
  beforeUnmount() {
    if (!this.submitting) {
      this.newAlias = this.alias;
      this.newAttributes = [ ...this.attributes ];
    }
    this.cb({ 
      alias: this.newAlias,
      attributes: this.newAttributes 
    });
  }
})
export default class EditTreeElementCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 2% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
  width: 80%;
  margin: 0px auto;
}

.attribute-row {
  width: 80%;
  margin: 0px auto;
}

.button {
  display: block;
  width: 140px;
  margin: 20px auto 0px auto;
  padding: 15px 0px;
}

#submit-button {
  background-color: #062;
  color: #fff;
  cursor: pointer;
}

.disabled {
  display: none;
}

input {
  width: 120px;
}

#add-attribute {
  background-color: #05a;
  color: #fff;
  cursor: pointer;
}

#alias-input {
  margin-top: 6px;
}
</style>
