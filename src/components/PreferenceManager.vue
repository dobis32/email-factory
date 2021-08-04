<template>
    <div class="preference-editor-wrapper">
        <div class="editor-overflow-buffer">
            <div v-if="activeElement">Module Preferences</div>
            <div v-else>Global preferences</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DumbButton from "./dumb_ui/DumbButton.vue";

@Options({
  components: {
    DumbButton
  },
  props: ["attributePreferences", "activeElement", "activeModule"],
  
})
export default class PreferenceManager extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.preference-editor-wrapper {
  display: inline-block;
  width: 800px;
  height: 560px;
  margin: 10px;
  padding: 14px;
  border: 2px solid #2A2438;
  border-radius: 30px;
}

.empty-tree-button {
  width: 60px;
  height: 60px;
  text-align: center;
  background-color: greenyellow;
  cursor: pointer;
}

.editor-overflow-buffer {
  overflow: scroll;
  height: 560px;

}


</style>
