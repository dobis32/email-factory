<template>
    <div v-if="editing">
        <div id="att-wrapper">
            <input type="text" v-model="newName" name="name" class="attribute-input" />
            <input type="text" v-model="newValue" :name="name" class="attribute-input" />
            <div class="control-row">
                <div id="save-btn"  class="btn" @click="save">
                    Save
                </div>
                <div id="remove-btn"  class="btn" @click="remove">
                    Remove
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div id="att-wrapper">
            <h3>{{ name }}:</h3>
            <input type="text" v-model="value" :name="name" class="attribute-input" />
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
    },
    save() {
        this.editing = false;
    },
    remove() {
        console.log('delete attribute', this.name)
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
        padding-bottom: 10px;
        h3 {
            margin-bottom: 5px;
        }
    }
    .btn {
        padding: 10px 0px;
        margin: 10px auto 10px auto;
        width: 140px;
        cursor: pointer;
        justify-content: center;
    }

    #edit-btn {
        background-color: orange;
    }

    #save-btn {
        background-color: green;
        color: #fff;
    }

    #remove-btn {
        background-color: red;
        color: #fff;
    }
</style>
