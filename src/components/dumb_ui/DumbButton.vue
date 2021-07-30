<template>
    <div class="button-body" :class="[ type ]" >
        <span>{{ text }}</span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
        buttonType: ''
    };
  },
  props: [ 'text', 'type'],
  methods: {
    beforeMount() {
        this.buttonType = this.type;
    }
  }
})
export default class HTMLAttribute extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .button-body {
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    padding: 20px 10px;
    margin: 10px 0px;
    border-radius: 8px;
  }

  .primary {
    background-color: #3282B8;
    color: #BBE1FA;
    &:hover{
      color: #CCF0FA;
    }
  }

  .accept {
    background-color: #3A9188;
    color: #B8E1DD;
      &:hover{
      color: #DDF0EE;
    }
  }

  .cancel {
    background-color: #88304E;
    color: #fff;
    &:hover {
      background-color: #AA225C;
    }
  }
</style>
