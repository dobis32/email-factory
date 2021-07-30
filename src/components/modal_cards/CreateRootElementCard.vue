<template>
  <div id="modal-card" @click="stopPropagation">
    <h2>Create Root Table Element</h2>
    <div class="input-row">
      <h3>Element alias:</h3>
      <input type="text" v-model="elementAlias" name="alias" id="alias-input" />
    </div>
    <div id="submit-button" @click="submitData">Submit</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return { 
      elementAlias: '',
      elementType: 'table',
      submitting: false 
    };
  },
  inject: [ "stopPropagation" ],
  props: [ "cb" ],
  methods: {
    submitData() {
      this.submitting = true;
      this.$store.dispatch("closeModal");
    }
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
export default class CreateRootElementCard extends Vue {}
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

h2 {
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
