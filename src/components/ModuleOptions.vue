<template>
  <div class="module-options-wrapper">
    <DumbButton :text="'SAVE MODULE'" :type="'primary'" @click="saveModule" />
    <DumbButton :text="'GENERATE CODE'" :type="'primary'" @click="generateCode" />
    <DumbButton :text="'MODULE PREFERENCES'" :type="'primary'" @click="modulePreferences" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DumbButton from '@/components/dumb_ui/DumbButton.vue';
import iAppState from '@/interfaces/iAppState';
import CodeModule from '@/classes/CodeModule';
@Options({
  components: {
    DumbButton
  },
  methods: {
    saveModule(): void {
      return;
    },
    async generateCode(): Promise<void> {
      this.$store.dispatch('setModal', { card: 'GeneratedCodeCard', data: {} });
      await this.openModal()
    },
    async modulePreferences(): Promise<void> { // TODO unit test
      const state: iAppState = this.$store.state;
      const activeModule: CodeModule = state.activeModule;
      this.$store.dispatch('setModal', { card: 'ModulePreferencesCard', data: { activeModule } });
      await this.openModal()
    } 
  },
  props: {
   
  },
  inject: [
    'openModal'
  ],
})
export default class ModuleOptions extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .module-options-wrapper {
    display: inline-block;
    width: 200px;
    min-height: 200px;
  }

  .module-option {
    background-color: #3282B8;
    font-weight: bold;
    color: #BBE1FA;
    text-align: center;
    cursor: pointer;
    padding: 20px 10px;
    margin: 10px 0px;
    border-radius: 8px;
    &:hover{
      color: #CCF0FA;
    }
  }
</style>
