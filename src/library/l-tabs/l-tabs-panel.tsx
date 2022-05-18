import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'LTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { slots }) {
    const activeName: any = inject('activeName');
    return {
      activeName
    };
  },
  render() {
    return (
      <>
        <div class="xtx-tabs-panel" v-show={this.name === this.activeName}>
          {this.$slots.default && this.$slots.default()}
        </div>
      </>
    );
  }
});
