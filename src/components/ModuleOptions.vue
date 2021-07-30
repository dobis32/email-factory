<template>
  <div class="module-options-wrapper">
    <DumbButton :text="'SAVE MODULE'" :type="'primary'" @click="saveModule" />
    <DumbButton :text="'GENERATE CODE'" :type="'primary'" @click="generateCode" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DumbButton from '@/components/dumb_ui/DumbButton.vue';
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
      await this.$store.dispatch('openModal');
    }
  },
  props: {
   
  }
})
export default class ModuleOptions extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .module-options-wrapper {
    margin-left: 20px;
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
