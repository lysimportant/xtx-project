import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LStepsItem',
  props: {
    title: String,
    desc: String
  },
  setup(props, { slots, emit }: any) {},
  render() {
    return <></>;
  }
});
