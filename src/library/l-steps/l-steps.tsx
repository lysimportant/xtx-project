import { defineComponent } from 'vue';
import './l-steps.less';
export default defineComponent({
  name: 'LSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  setup(props, { slots, emit }: any) {
    const panels = slots.default();
    const dymanicItems: any[] = [];
    // 把动态组件组合到一起
    panels.forEach((item: any) => {
      if (item.type.name === 'LStepsItem') {
        dymanicItems.push(item);
      } else {
        item.children.forEach((item: any) => {
          dymanicItems.push(item);
        });
      }
    });
    // 生成Tsx组件
    const ItemTsx = dymanicItems.map((item: any, index: number) => {
      return (
        <div
          class={`xtx-steps-item ${index + 1 <= props.active ? 'active' : ''} `}
        >
          <div class="step">
            <span>{index + 1}</span>
          </div>
          <div class="title">{item.props.title}</div>
          <div class="desc">{item.props.desc}</div>
        </div>
      );
    });
    return {
      ItemTsx
    };
  },
  render() {
    return (
      <>
        <div class="xtx-steps">
          {this.ItemTsx}
          {/* {this.$slots.default && this.$slots.default()} */}
        </div>
      </>
    );
  }
});
