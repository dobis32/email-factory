<template>
  <div id="modal-card" @click="stopPropagation">
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="newAlias" name="alias" id="alias-input" />
    </div>
    <div id="attribute-row">
      <h3>Attributes:</h3>
      <div v-for="(att) of newAttributes" v-bind:key="att" :id="`attribute-${att.name}`" class="attribute-row" >
        <EditableHTMLAttribute :name="att.name" :value="att.value" :existingAttributes="newAttributes" @update-attribute="updateAttribute" @remove-attribute="removeAttribute" @editing="handleEdit" />
      </div>
    </div>
    <div id="add-attribute" class="button" @click="addAttribute">
      Add Attribute
    </div>
    <div id="submit-button" :class="{ button: true, disabled: disableSubmit }" @click="submitData">Save</div>
  </div>
</template>

<script lang="ts">
import SupportedHTMLElement from "@/classes/SupportedHTMLElement";
import iHTMLAttribute from "@/interfaces/iHTMLAttribute";
import { Options, Vue } from "vue-class-component";
import EditableHTMLAttribute from '@/components/modal_cards/modal_elements/EditableHTMLAttribute.vue';
@Options({
  components: { EditableHTMLAttribute },
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
      const updatedAttributes = [ ...this.newAttributes ];
      const target = updatedAttributes.find((a: iHTMLAttribute) => a.name === name);
      if (!target) throw new Error(`[ Edit Tree Element Card Vue ] Failed to find attribute with name ${name}`)
      target.name = newName;
      target.value = value;
    },
    handleEdit(disable: boolean) {
      this.disableSubmit = disable
    },
    addAttribute() {
      const newAttribute: iHTMLAttribute = {
        name: 'New Attribute',
        value: ''
      }
      this.newAttributes.push(newAttribute);
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
  background-color: #171717;
  color: #BBE1FA;
  margin: 2% auto; 
  padding: 20px;
  width: 400px; /* Could be more or less, depending on screen size */
  text-align: center;
  border-radius: 30px;

}

.input-row {
  padding-bottom: 20px;
  width: 80%;
  margin: 0px auto;
}

.attribute-row {
  width: 90%;
  margin: 0px auto 10px;
}

.button {
  display: block;
  width: 160px;
  margin: 20px auto 0px auto;
  padding: 15px 0px;
  border-radius: 8px;
  font-weight: bold;
}

#submit-button {
  background-color: #3A9188;
  color: #B8E1DD;
  cursor: pointer;
  &:hover{
    color: #DDF0EE;
  }
}

.disabled {
  display: none;
}

input {
  width: 120px;
  color: #BBE1FA;
  background-color: #171717;
}

#add-attribute {
  background-color: #3282B8;
  color: #BBE1FA;
  cursor: pointer;
  &:hover{
    color: #CCF0FA;
  }
}

#alias-input {
  margin-top: 6px;
}
</style>
