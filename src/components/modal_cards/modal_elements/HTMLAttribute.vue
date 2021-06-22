<template>
    <div id="att-wrapper">
        <div v-if="editing">
            <div>
                <label for="attName">Name:</label>
                <input type="text" v-model="newName" name="attName" class="attribute-input" />
            </div>
            <div>
                <label for="attValue">Value:</label>
                <input type="text" v-model="newValue" name="attValue" class="attribute-input" />
            </div>
            <div  class="control-row">
                <div id="save-btn"  class="btn" @click="save">
                    Save
                </div>
                <div id="cancel-btn"  class="btn" @click="cancel">
                    Cancel
                </div>
                <div id="remove-btn"  class="btn" @click="remove">
                    Remove
                </div>
            </div>
        </div>
        <div id="static-att" v-else>
            <div id="att-name-heading">
               <h3>{{ name }}</h3>
            </div>
            <div id="edit-btn" class="btn" @click="edit">
                Edit
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
        editing: false,
        newName: '',
        newValue: ''
    };
  },
  props: [ 'name', 'value' ],
  methods: {
    edit() {
        this.editing = true;
        this.$emit('editing', true);
    },
    save() {
        this.editing = false;
        if (!this.newName.length) alert('Element attributes must have a name');
        else {
            this.$emit('update-attribute', { name: this.name, newName: this.newName, value: this.newValue});
            this.$emit('editing', false);
        } 
   },
    cancel() {
        this.newName = this.name;
        this.newValue = this.value;
        this.editing = false;
        this.$emit('editing', false);
    },
    remove() {
        this.$emit('remove-attribute', this.name);
        this.$emit('editing', false);
    }
  },
  beforeMount() {
    this.newName = this.name;
    this.newValue = this.value;
  }
})
export default class HTMLAttribute extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #att-wrapper {
        padding-top: 10px;
    }

    input {
        margin-bottom: 6px;
        max-width: 100px;
    }

    .btn {
        display: inline-block;
        padding: 10px 0px;
        margin: 6px auto 6px auto;
        width: 80px;
        cursor: pointer;
        justify-content: center;
    }

    #edit-btn {
        background-color: orange;
        width: 60px;
    }

   

    #save-btn {
        background-color: green;
        color: #fff;
        margin-right: 10px;
    }

     #cancel-btn {
        background-color: orange;
        margin-right: 10px;
    }

    #static-att {
        vertical-align: middle;
    }

    #remove-btn {
        background-color: red;
        color: #fff;
        display: inline-block;
    }

    #att-name-heading {
        display: inline-block;
        padding: 10px 0px;
        margin-top: 3px;
        width: 60px;
        justify-content: center;
    }

    label {
        padding-right: 6px;
    }
</style>
