<template>
  <div id="modal-card" @click="stopPropagation">
    <h2>{{alias}}</h2>
    <h3>{{type}}</h3>
    <div id="action" @click="chooseAction('foobar')">
      <h3>foobar</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data: () => {
    return {
      chosenAction: ''
    }
  },
  props: ["alias", "type", "cb"],
  inject: ["stopPropagation"],
  beforeUnmount() {
    this.cb(this.chosenAction)
    this.$store.dispatch("resetModalCB");
  },
  methods: {
    chooseAction(action: string) {
      this.chosenAction = action;
    }
  }
})
export default class TreeElementControlsCard extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#modal-card {
  z-index: 10; /* Sit on top */
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 800px; /* Could be more or less, depending on screen size */
  text-align: center;
}

.input-row {
  padding-bottom: 20px;
}
</style>
